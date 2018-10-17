const path = require(`path`)
const urlFromTag = require('./src/utils/urlFromTag')
const { singular } = require('pluralize')
const capitalize = require('lodash/capitalize')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  switch (node.internal.type) {
    case 'MarkdownRemark':
      // Define category + categorySlug
      const categorySlug = singular(
        path
          .relative(__dirname, node.fileAbsolutePath)
          .replace(/^src\/data\/([^/]+)\/.*$/, '$1')
      )
      const category = capitalize(categorySlug)
      createNodeField({ node, name: 'category', value: category })
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
      // Define title slug
      const slug = path
        .relative(__dirname, node.fileAbsolutePath)
        .replace(/^src\/data\/[^/]+\/([^/]+)\/.*$/, '$1')
      createNodeField({ node, name: 'slug', value: slug })
      break
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
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
  data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post.js'),
      context: node.fields
    })
    node.frontmatter.tags.forEach(tag => {
      if (!tagsIndex.includes(tag)) {
        tagsIndex.push(tag)
        createPage({
          path: urlFromTag(tag),
          component: path.resolve('./src/templates/tag.js'),
          context: { tag }
        })
      }
    })
  })
}
