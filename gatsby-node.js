const _ = require('lodash')
const path = require('path')
const { singular } = require('pluralize')
const urlFromTag = require('./src/utils/urlFromTag')

const PRIMARY_DOMAIN = 'aymericbeaumet.com'

const SECONDARY_DOMAINS = [
  'aymericbeaumet.netlify.com',
  'aymericbeaumet.me',
  'beaumet.fr',
  'beaumet.me',
]

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const fileRelativePath = path.relative(__dirname, node.fileAbsolutePath)
    const slug = fileRelativePath.replace(/^data\/[^/]+\/([^/]+)\/.*$/, '$1')
    const categorySlug = singular(
      fileRelativePath.replace(/^data\/([^/]+)\/.*$/, '$1'),
    )
    const category = _.capitalize(categorySlug)
    // default values
    createNodeField({ node, name: 'category', value: category })
    createNodeField({ node, name: 'categorySlug', value: categorySlug })
    createNodeField({ node, name: 'fileRelativePath', value: fileRelativePath })
    createNodeField({ node, name: 'slug', value: slug })
  }
}

exports.onPreBuild = ({ actions }) => {
  const { createRedirect } = actions
  // Handle path redirections
  createRedirect({
    fromPath: '/blog/*',
    toPath: '/:splat',
    isPermanent: true,
    force: true,
  })
  // Force https for primary domain
  createRedirect({
    fromPath: `http://${PRIMARY_DOMAIN}/*`,
    toPath: `https://${PRIMARY_DOMAIN}/:splat`,
    isPermanent: true,
    force: true,
  })
  // Handle primary and secondary (sub)domains redirections
  const fromDomains = [
    ...SECONDARY_DOMAINS,
    ..._.flatMap([PRIMARY_DOMAIN, ...SECONDARY_DOMAINS], domain => [
      `blog.${domain}`,
      `links.${domain}`,
      `www.${domain}`,
    ]),
  ]
  const fromProtocols = ['http:', 'https:']
  for (const domain of fromDomains) {
    for (const protocol of fromProtocols) {
      createRedirect({
        fromPath: `${protocol}//${domain}/*`,
        toPath: `https://${PRIMARY_DOMAIN}/:splat`,
        isPermanent: true,
        force: true,
      })
    }
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
      context: node.fields,
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
