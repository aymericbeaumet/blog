const fs = require('node:fs');
const path = require('node:path');

function copy(src, dest) {
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.copyFileSync(src, dest);
}

const fontSrc = path.dirname(require.resolve('@fontsource/lato/index.css')) + '/files';
const fontDest = path.join(__dirname, '..', 'static', 'fonts');
for (const file of [
	'lato-latin-400-normal.woff2',
	'lato-latin-400-italic.woff2',
	'lato-latin-700-normal.woff2',
]) {
	copy(path.join(fontSrc, file), path.join(fontDest, file));
}

copy(
	require.resolve('instant.page/instantpage.js'),
	path.join(__dirname, '..', 'assets', 'js', 'instantpage.js'),
);
