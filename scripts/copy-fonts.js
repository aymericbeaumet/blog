const fs = require('node:fs');
const path = require('node:path');

const srcDir = path.dirname(require.resolve('@fontsource/lato/index.css')) + '/files';
const destDir = path.join(__dirname, '..', 'static', 'fonts');

const files = [
	'lato-latin-400-normal.woff2',
	'lato-latin-400-italic.woff2',
	'lato-latin-700-normal.woff2',
];

fs.mkdirSync(destDir, { recursive: true });
for (const file of files) {
	fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
}
