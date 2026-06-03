#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default;
const { chromium } = require('playwright');

const productionBase = 'https://aymericbeaumet.com';
const localBase = 'http://localhost:9090';
const outDir = path.join(process.cwd(), '.visual-diff');
const viewports = [
	{ name: 'desktop', width: 1440, height: 1000 },
	{ name: 'mobile', width: 390, height: 844 },
];

function tagSlug(tag) {
	return tag.trim().replace(/[.\s]/gi, '').toLowerCase();
}

function routeName(route) {
	return route === '/'
		? 'home'
		: route
				.replace(/^\/+/, '')
				.replace(/\/+$/, '')
				.replace(/[^a-z0-9_-]+/gi, '_');
}

function readContentRoutes() {
	const routes = new Set(['/', '/posts', '/talks', '/projects', '/404.html']);
	const tags = new Set();

	for (const section of ['posts', 'projects', 'talks']) {
		const sectionDir = path.join(process.cwd(), 'content', section);
		for (const slug of fs.readdirSync(sectionDir).filter((entry) => entry !== '_index.md')) {
			routes.add(`/${slug}`);
			const markdown = fs.readFileSync(path.join(sectionDir, slug, 'index.md'), 'utf8');
			const tagsMatch = markdown.match(/^tags:\s*\[(.*)]$/m);
			if (tagsMatch) {
				for (const tag of tagsMatch[1].split(',').map((value) => value.trim())) {
					tags.add(tag);
				}
			}
		}
	}

	for (const tag of tags) {
		routes.add(`/tags/${tagSlug(tag)}`);
	}

	return [...routes].sort((a, b) => a.localeCompare(b));
}

async function capture(page, base, route, file) {
	await page.goto(`${base}${route}`, { waitUntil: 'networkidle', timeout: 45_000 });
	await page.evaluate(async () => {
		if (document.fonts?.ready) {
			await document.fonts.ready;
		}
		await Promise.all(
			Array.from(document.images)
				.filter((image) => !image.complete)
				.map(
					(image) =>
						new Promise((resolve) => {
							image.addEventListener('load', resolve, { once: true });
							image.addEventListener('error', resolve, { once: true });
						}),
				),
		);
	});
	await page.waitForTimeout(250);
	await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
}

async function main() {
	fs.rmSync(outDir, { force: true, recursive: true });
	fs.mkdirSync(outDir, { recursive: true });

	const routes = readContentRoutes();
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		deviceScaleFactor: 1,
		reducedMotion: 'reduce',
		serviceWorkers: 'block',
	});
	await context.route(/utteranc\.es|disqus\.com|disquscdn\.com/, (route) => route.abort());

	const results = [];
	for (const viewport of viewports) {
		const page = await context.newPage();
		await page.setViewportSize({ width: viewport.width, height: viewport.height });
		for (const route of routes) {
			const basename = `${viewport.name}-${routeName(route)}`;
			const prodFile = path.join(outDir, `${basename}-prod.png`);
			const localFile = path.join(outDir, `${basename}-local.png`);
			const diffFile = path.join(outDir, `${basename}-diff.png`);

			await capture(page, productionBase, route, prodFile);
			await capture(page, localBase, route, localFile);

			const prod = PNG.sync.read(fs.readFileSync(prodFile));
			const local = PNG.sync.read(fs.readFileSync(localFile));
			const width = Math.max(prod.width, local.width);
			const height = Math.max(prod.height, local.height);
			const diff = new PNG({ width, height, fill: true });

			let diffPixels = width * height;
			if (prod.width === local.width && prod.height === local.height) {
				diffPixels = pixelmatch(prod.data, local.data, diff.data, width, height, {
					threshold: 0.1,
					includeAA: true,
				});
			}

			PNG.sync.write(diff, { colorType: 6 });
			fs.writeFileSync(diffFile, PNG.sync.write(diff));
			results.push({
				route,
				viewport: viewport.name,
				diffPixels,
				prodSize: `${prod.width}x${prod.height}`,
				localSize: `${local.width}x${local.height}`,
			});
			console.log(
				`${viewport.name.padEnd(7)} ${route.padEnd(64)} diff=${String(diffPixels).padStart(
					8,
				)} prod=${prod.width}x${prod.height} local=${local.width}x${local.height}`,
			);
		}
		await page.close();
	}

	await browser.close();
	fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));

	const failing = results.filter((result) => result.diffPixels !== 0);
	console.log(`\n${failing.length}/${results.length} screenshot comparisons differ`);
	process.exit(failing.length === 0 ? 0 : 1);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
