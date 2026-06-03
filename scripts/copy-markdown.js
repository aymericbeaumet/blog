#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sections = ['posts', 'projects', 'talks'];
const publicDir = path.join(process.cwd(), 'public');

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

		const markdown = fs
			.readFileSync(source, 'utf8')
			.replace(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/, (_match, frontmatter, body) => {
				const publicFrontmatter = frontmatter
					.split('\n')
					.filter((line) => !/^(slug|url):/.test(line))
					.join('\n');
				return `---\n${publicFrontmatter}\n---\n\n${body.replace(/^\n+/, '')}`;
			});

		fs.writeFileSync(path.join(publicDir, `${slug}.md`), markdown);
	}
}
