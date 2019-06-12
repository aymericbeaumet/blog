const _ = require('lodash')

const siteMetadata = {
  title: 'Aymeric Beaumet',
  description: "I'm a from Paris, France.",
  siteUrl: 'https://aymericbeaumet.com',
  author: 'Aymeric Beaumet',
  email: 'hi@aymericbeaumet.com',
  disqusShortname: 'aymericbeaumet',
  algoliaApplicationId: process.env.ALGOLIA_APPLICATION_ID || '',
  algoliaSearchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY || '',
  algoliaIndexName: process.env.ALGOLIA_INDEX_NAME || '',
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
  'gatsby-plugin-offline',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-react-svg',
  'gatsby-plugin-robots-txt',
  `gatsby-plugin-sass`,
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
          output: '/rss.xml',
          title: siteMetadata.title,
        },
      ],
    },
  },
  'gatsby-transformer-sharp',
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
            maxWidth: 590,
            withWebp: true,
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
          options: {
            destinationDir: './static/',
          },
        },
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
        { resolve: 'gatsby-remark-autolink-headers' },
      ],
    },
  },
]

function withAlgolia(plugins = []) {
  const { algoliaApplicationId, algoliaIndexName } = siteMetadata
  const algoliaAdminApiKey = process.env.ALGOLIA_ADMIN_API_KEY
  if (!(algoliaApplicationId && algoliaAdminApiKey && algoliaIndexName)) {
    return plugins
  }
  return [
    ...plugins,
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
                  date: (new Date(flattened.date).getTime() / 1000) | 0,
                }
              }),
          },
        ],
      },
    },
  ]
}

/* Netlify plugin must be in last position */
function withNetlify(plugins = []) {
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
    ...plugins,
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
