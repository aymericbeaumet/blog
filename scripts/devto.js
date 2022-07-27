#!/usr/bin/env node

const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');
const datefns = require('date-fns');
const prettier = require('prettier');

const filepath = process.argv[2];
const filecontent = fs.readFileSync(filepath);
const { content, data } = matter(filecontent);

if (data.tags.length > 4) {
	throw new Error('dev.to supports at most 4 tags');
}

const newcontent = prettier.format(content, {
	parser: 'markdown',
	proseWrap: 'never',
});

const newdata = {
	published: true,
	title: data.title,
	date: datefns.format(data.date, "yyyy-MM-dd '00:00:00 UTC'"),
	tags: data.tags,
	canonical_url: `https://aymericbeaumet.com/${path.basename(path.dirname(filepath))}`,
	// cover_image:
	// description:
	// series:
};

console.log(matter.stringify(newcontent, newdata));
