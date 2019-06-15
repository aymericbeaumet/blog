const _ = require('lodash')

const firstName = 'Aymeric'
const lastName = 'Beaumet'
const fullName = `${firstName} ${lastName}`
const sourceUrl = 'https://github.com/aymericbeaumet/aymericbeaumet.com'
const position = 'Senior Software Engineer'

const siteMetadata = {
  // me
  title: `${fullName} Blog`,
  author: fullName,
  position,
  description: `${firstName} is a ${position} with 5 years of experience in deploying resilient, scalable, and highly available back-end systems.`,
  email: 'hi@aymericbeaumet.com',
  github: 'https://github.com/aymericbeaumet',
  linkedin: 'https://linkedin.com/in/aymericbeaumet',
  stackoverflow:
    'https://stackoverflow.com/users/1071486/aymericbeaumet?tab=profile',
  twitter: 'https://twitter.com/aymericbeaumet',
  // website
  siteUrl: 'https://aymericbeaumet.com',
  sourceUrl,
  sourceMasterUrl: `${sourceUrl}/blob/master`,
  algoliaApplicationId: process.env.ALGOLIA_APPLICATION_ID || '',
  algoliaSearchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY || '',
  algoliaIndexName: process.env.ALGOLIA_INDEX_NAME || '',
  disqusShortname: 'aymericbeaumet',
  googleAnalyticsTrackingId: 'UA-60614751-1',
  menu: [
    {
      name: 'articles',
      url: '/articles',
      categorySlug: 'article',
    },
    {
      name: 'talks',
      url: '/talks',
      categorySlug: 'talk',
    },
    {
      name: 'projects',
      url: '/projects',
      categorySlug: 'project',
    },
    {
      name: 'about me',
      url: '/about-aymeric-beaumet',
    },
  ],
}

const plugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/data/`,
    },
  },
  'gatsby-plugin-sharp', // required by gatsby-remark-images
  'gatsby-transformer-sharp',
  'gatsby-plugin-offline',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-react-svg',
  'gatsby-plugin-robots-txt',
  'gatsby-plugin-sass',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: siteMetadata.googleAnalyticsTrackingId,
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: siteMetadata.title,
      short_name: 'A. Beaumet',
      start_url: '/',
      background_color: '#663399',
      theme_color: '#663399',
      display: 'minimal-ui',
      icon: `${__dirname}/src/images/aymericbeaumet.png`,
    },
  },
  {
    resolve: 'gatsby-plugin-feed',
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          title: siteMetadata.title,
          output: '/rss.xml',
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })
            })
          },
        },
        {
          title: `${siteMetadata.title} - Articles`,
          output: '/articles.xml',
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: { fields: { categorySlug: { eq: "article" } } }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })
            })
          },
        },
        {
          title: `${siteMetadata.title} - Talks`,
          output: '/talks.xml',
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: { fields: { categorySlug: { eq: "talk" } } }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })
            })
          },
        },
        {
          title: `${siteMetadata.title} - Projects`,
          output: '/projects.xml',
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: { fields: { categorySlug: { eq: "project" } } }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })
            })
          },
        },
      ],
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-external-links',
          options: {
            target: '_self',
            rel: 'nofollow noopener noreferrer',
          },
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 720,
            withWebp: true,
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
          options: {
            destinationDir: './static/',
          },
        },
        { resolve: 'gatsby-remark-autolink-headers' }, // before gastby-remark-prismjs
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            classPrefix: 'language-',
            inlineCodeMarker: null,
            aliases: {},
            showLineNumbers: false,
            noInlineHighlight: false,
          },
        },
        { resolve: 'gatsby-remark-smartypants' },
        { resolve: 'gatsby-remark-responsive-iframe' },
      ],
    },
  },
]

function withAlgolia(p = []) {
  const { algoliaApplicationId, algoliaIndexName } = siteMetadata
  const algoliaAdminApiKey = process.env.ALGOLIA_ADMIN_API_KEY
  if (!(algoliaApplicationId && algoliaAdminApiKey && algoliaIndexName)) {
    return p
  }
  return [
    ...p,
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: algoliaApplicationId,
        apiKey: algoliaAdminApiKey,
        indexName: algoliaIndexName,
        chunkSize: 10000,
        queries: [
          {
            query: `{
              allMarkdownRemark {
                edges {
                  node {
                    objectID: id
                    frontmatter {
                      title
                      date
                      tags
                    }
                    fields {
                      category
                    }
                    content: rawMarkdownBody
                  }
                }
              }
            }`,
            transformer: ({ data }) =>
              data.allMarkdownRemark.edges.map(({ node }) => {
                const flattened = flattenObject(node)
                return {
                  ...flattened,
                  date: (new Date(flattened.date).getTime() / 1000) | 0, // eslint-disable-line no-bitwise
                }
              }),
          },
        ],
      },
    },
  ]
}

/* Netlify plugin must be in last position */
function withNetlify(p = []) {
  const additionalSecurityHeaders = [
    `content-security-policy-report-only: ${[
      "default-src 'self'",
      "connect-src 'self' https://*.cloudfront.net https://aymericbeaumet.disqus.com https://referrer.disqus.com https://fonts.googleapis.com https://fonts.gstatic.com",
      'font-src https://fonts.gstatic.com',
      'frame-src https://disqus.com https://www.youtube-nocookie.com',
      "img-src 'self' data: https://referrer.disqus.com https://*.disquscdn.com",
      "prefetch-src 'self' https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline' https://*.cloudfront.net https://disqus.com https://aymericbeaumet.disqus.com https://*.disquscdn.com",
      "style-src 'self' 'unsafe-inline' https://*.disquscdn.com https://fonts.googleapis.com",
      //
      'report-uri https://aymericbeaumet.report-uri.com/r/d/csp/reportOnly',
    ].join('; ')}`,
    // "feature-policy: accelerometer 'none'; camera 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; midi 'none'; microphone 'none'; notifications 'none'; payment 'none'; push 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; vibrate 'none'",
    'referrer-policy: no-referrer',
  ]
  return [
    ...p,
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        allPageHeaders: [...additionalSecurityHeaders],
      },
    },
  ]
}

function flattenObject(object, init = {}) {
  return _.reduce(
    object,
    (acc, value, key) => {
      if (_.isPlainObject(value)) {
        return flattenObject(value, acc)
      }
      acc[key] = value
      return acc
    },
    init,
  )
}

module.exports = {
  siteMetadata,
  plugins: withNetlify(withAlgolia(plugins)),
}
