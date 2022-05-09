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
    const category = _.capitalize(categorySlug)
    const slug = fileRelativePath.replace(
      /^data\/[^/]+\/([^/]+)(?:\/|\.).*$/,
      '$1',
    )
    // default values
    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'category', value: category })
    createNodeField({ node, name: 'categorySlug', value: categorySlug })
    createNodeField({ node, name: 'fileRelativePath', value: fileRelativePath })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create posts pages
  const { data: posts } = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { categorySlug: { eq: "post" } } }) {
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
  const tagsIndex = []
  posts.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post.jsx'),
      context: { slug: node.fields.slug },
    })
    // Create tags pages
    ;(node.frontmatter.tags || []).forEach((tag) => {
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

  // Create notes pages
  const { data: notes } = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { categorySlug: { eq: "note" } } }) {
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
  notes.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/notes/${node.fields.slug}`,
      component: path.resolve('./src/templates/note.jsx'),
      context: { slug: node.fields.slug },
    })
  })
}
