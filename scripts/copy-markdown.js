#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REPO = 'aymericbeaumet/blog';
const BRANCH = 'main';
const sections = ['posts', 'projects', 'talks'];
const publicDir = path.join(process.cwd(), 'public');

function redirectHtml(target) {
	const escaped = target.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting to GitHub source…</title>
<link rel="canonical" href="${escaped}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${escaped}">
</head>
<body>
<p>Redirecting to <a href="${escaped}">${escaped}</a>…</p>
<script>location.replace(${JSON.stringify(target)})</script>
</body>
</html>
`;
}

for (const section of sections) {
	const sectionDir = path.join(process.cwd(), 'content', section);
	if (!fs.existsSync(sectionDir)) {
		continue;
	}

	for (const slug of fs.readdirSync(sectionDir)) {
		const source = path.join(sectionDir, slug, 'index.md');
		if (!fs.existsSync(source)) {
			continue;
		}

		const githubUrl = `https://github.com/${REPO}/blob/${BRANCH}/content/${section}/${slug}/index.md`;
		const outDir = path.join(publicDir, `${slug}.md`);
		const stalePath = path.join(publicDir, `${slug}.md`);
		if (fs.existsSync(stalePath) && fs.statSync(stalePath).isFile()) {
			fs.unlinkSync(stalePath);
		}
		fs.mkdirSync(outDir, { recursive: true });
		fs.writeFileSync(path.join(outDir, 'index.html'), redirectHtml(githubUrl));
	}
}
