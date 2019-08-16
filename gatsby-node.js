const _ = require('lodash')
const path = require('path')
const { singular } = require('pluralize')
const urlFromTag = require('./src/utils/urlFromTag')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const fileRelativePath = path.relative(__dirname, node.fileAbsolutePath)
    const categorySlug = singular(
      fileRelativePath.replace(/^data\/([^/]+)\/.*$/, '$1'),
    )
    const slug = fileRelativePath.replace(/^data\/[^/]+\/([^/]+)\/.*$/, '$1')
    const category = _.capitalize(categorySlug)
    // default values
    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'category', value: category })
    createNodeField({ node, name: 'categorySlug', value: categorySlug })
    createNodeField({ node, name: 'fileRelativePath', value: fileRelativePath })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Query for markdown pages
  const tagsIndex = []
  const { data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
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
  `)
  // Create posts pages
  data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post.jsx'),
      context: { slug: node.fields.slug },
    })
    // Create tags pages
    node.frontmatter.tags.forEach(tag => {
      if (!tagsIndex.includes(tag)) {
        tagsIndex.push(tag)
        createPage({
          path: urlFromTag(tag),
          component: path.resolve('./src/templates/tag.jsx'),
          context: { tag },
        })
      }
    })
  })
}
