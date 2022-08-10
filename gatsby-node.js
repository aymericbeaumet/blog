/* eslint-disable no-restricted-syntax, import/no-extraneous-dependencies */

const fs = require('fs-extra');
const path = require('path');
const { capitalize } = require('lodash');
const filesize = require('filesize');
const urlFromTag = require('./src/utils/urlFromTag');

// map of { [absPath]: relPath } files to copy to the ./public directory
const filesToCopy = new Map();

// set containing all the tags
const tagsIndex = new Set();

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
	if (getConfig().mode === 'production') {
		actions.setWebpackConfig({ devtool: false }); // disable source maps
	}
};

exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions;

	if (node.internal.type === 'MarkdownRemark') {
		const fileRelativePath = path.relative(__dirname, node.fileAbsolutePath);
		const slug = path.basename(node.fileAbsolutePath, path.extname(node.fileAbsolutePath));
		const categorySlug = node.frontmatter.category || 'post';
		const category = capitalize(categorySlug);
		const isDraft = node.fileAbsolutePath.includes('/_drafts/');

		createNodeField({ node, name: 'fileRelativePath', value: fileRelativePath });
		createNodeField({ node, name: 'slug', value: slug });
		createNodeField({ node, name: 'categorySlug', value: categorySlug });
		createNodeField({ node, name: 'category', value: category });
		createNodeField({ node, name: 'isDraft', value: isDraft });

		// Find the post image (fallback to commitstrip image)
		for (const extension of ['.png', '.jpg', '.jpeg']) {
			const imageAbsPath = path.join(
				path.dirname(node.fileAbsolutePath),
				`${path.basename(node.fileAbsolutePath, path.extname(node.fileAbsolutePath))}${extension}`,
			);
			if (fs.existsSync(imageAbsPath)) {
				const image = path.relative(path.dirname(node.fileAbsolutePath), imageAbsPath);
				createNodeField({ node, name: 'image', value: image });
				break;
			}
		}
	} else if (node.internal.type === 'File') {
		const split = node.name.split('--');
		if (split.length === 2) {
			createNodeField({ node, name: 'postSlug', value: split[0] });
			createNodeField({ node, name: 'prettyName', value: split[1] });
			createNodeField({ node, name: 'prettySize', value: filesize(node.size) });
		}
	}
};

exports.createPages = async ({ graphql, actions }) => {
	// Query pages for this category
	const { data } = await graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						fileAbsolutePath
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

	data.allMarkdownRemark.edges.forEach((edge) => {
		const { node } = edge;

		// Create page
		actions.createPage({
			path: node.fields.slug,
			component: path.resolve('./src/templates/post.jsx'),
			context: { slug: node.fields.slug },
		});

		// Register markdown file for later raw copy
		filesToCopy.set(node.fileAbsolutePath, `${node.fields.slug}.md`);

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
		Array.from(filesToCopy.entries()).map(([abs, rel]) => fs.copy(abs, path.join('./public', rel))),
	);
