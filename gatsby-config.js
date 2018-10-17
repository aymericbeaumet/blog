const siteMetadata = {
  title: 'Aymeric Beaumet',
  description: "I'm a from Paris, France.",
  siteUrl: `https://${process.env.HOSTNAME || 'aymericbeaumet.com'}`,
  author: 'Aymeric Beaumet',
  menu: [
    {
      name: '--ab',
      url: '/'
    },
    {
      name: 'articles & talks',
      url: '/articles-and-talks'
    },
    {
      name: 'links',
      url: '/links'
    }
  ]
}

const plugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/data/`
    }
  },
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: siteMetadata.title,
      short_name: 'A. Beaumet',
      start_url: '/',
      background_color: '#663399',
      theme_color: '#663399',
      display: 'minimal-ui',
      icon: `${__dirname}/src/images/aymericbeaumet.png`
    }
  },
  'gatsby-plugin-offline',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-feed',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-sharp', // required by gatsby-remark-images
  'gatsby-plugin-robots-txt',
  `gatsby-plugin-sass`,
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-external-links',
          options: {
            target: '_self',
            rel: 'nofollow noopener noreferrer'
          }
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 590,
            withWebp: true
          }
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
          options: {
            destinationDir: './static/'
          }
        },
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            classPrefix: 'language-',
            inlineCodeMarker: null,
            aliases: {},
            showLineNumbers: false,
            noInlineHighlight: false
          }
        },
        { resolve: 'gatsby-remark-smartypants' },
        { resolve: 'gatsby-remark-responsive-iframe' },
        { resolve: 'gatsby-remark-autolink-headers' }
      ]
    }
  }
]

module.exports = {
  siteMetadata,
  plugins
}
