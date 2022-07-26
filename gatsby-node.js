/* eslint-disable no-restricted-syntax, import/no-extraneous-dependencies */

const fs = require('fs-extra');
const { capitalize } = require('lodash');
const path = require('path');
const { singular } = require('pluralize');
const urlFromTag = require('./src/utils/urlFromTag');

const markdownFiles = new Map();

exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === 'MarkdownRemark') {
		const fileRelativePath = path.relative(__dirname, node.fileAbsolutePath);
		const categorySlug = singular(fileRelativePath.replace(/^data\/([^/]+)\/.*$/, '$1'));
		const category = capitalize(categorySlug);
		const slug = fileRelativePath.replace(/^data\/[^/]+\/([^/]+)(?:\/|\.).*$/, '$1');

		createNodeField({ node, name: 'slug', value: slug });
		createNodeField({ node, name: 'category', value: category });
		createNodeField({ node, name: 'categorySlug', value: categorySlug });
		createNodeField({
			node,
			name: 'fileRelativePath',
			value: fileRelativePath,
		});
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const tagsIndex = new Set();

	// Query pages for this category
	const { data } = await graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						rawMarkdownBody
						fields {
							slug
						}
						frontmatter {
							tags
						}
					}
				}
			}
		}
	`);

	data.allMarkdownRemark.edges.forEach(({ node }) => {
		// Create page
		actions.createPage({
			path: node.fields.slug,
			component: path.resolve('./src/templates/post.jsx'),
			context: { slug: node.fields.slug },
		});

		// Register markdown file for later creation
		markdownFiles.set(`${node.fields.slug}.md`, node.rawMarkdownBody);

		// Save tags for later
		(node.frontmatter.tags || []).forEach((tag) => {
			tagsIndex.add(tag);
		});
	});

	// Create tags pages
	for (const tag of tagsIndex.values()) {
		actions.createPage({
			path: urlFromTag(tag),
			component: path.resolve('./src/templates/tag.jsx'),
			context: { tag },
		});
	}
};

exports.onPostBuild = async () =>
	Promise.all(
		Array.from(markdownFiles.entries()).map(([filename, data]) =>
			fs.writeFile(path.join('./public', filename.trim()), data),
		),
	);
