const twitterHandle = 'aymericbeaumet';

const siteMetadata = {
	// rss
	title: 'Aymeric Beaumet | Posts, Talks & Projects',
	// me
	author: 'Aymeric Beaumet',
	description:
		'Aymeric is a Senior Software Engineer with 7 years of experience in deploying resilient, scalable, and highly available back-end systems.',
	// contacts
	email: 'hi@aymericbeaumet.com',
	github: 'https://github.com/aymericbeaumet',
	linkedin: 'https://www.linkedin.com/in/aymericbeaumet/',
	stackoverflow: 'https://stackoverflow.com/users/1071486/aymericbeaumet?tab=topactivity',
	twitter: `https://twitter.com/${twitterHandle}`,
	twitterHandle,
	newsletter: 'https://newsletter.aymericbeaumet.com/subscribe',
	// website
	siteUrl: 'https://aymericbeaumet.com',
	menu: [
		{
			name: 'posts',
			url: '/posts',
			categorySlug: 'post',
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
	],
};

const plugins = [
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			name: 'data',
			path: `${__dirname}/data/`,
			ignore: ['**/drafts/**'],
		},
	},
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			name: 'src',
			path: `${__dirname}/src/`,
		},
	},

	'gatsby-plugin-image',
	'gatsby-plugin-sharp',
	'gatsby-transformer-sharp',

	{
		resolve: 'gatsby-transformer-remark',
		options: {
			plugins: [
				{
					resolve: 'gatsby-remark-images',
					options: {
						maxWidth: 0.8 * 720, // 80% * 720px, see ./src/templates/post.module.scss
						withAvif: true,
						withWebp: true,
						showCaptions: ['title'],
						linkImagesToOriginal: false,
					},
				},
				'gatsby-remark-external-links',
				'gatsby-remark-smartypants',
				'gatsby-remark-responsive-iframe',
				'gatsby-remark-autolink-headers', // before gastby-remark-prismjs
				{
					resolve: 'gatsby-remark-prismjs',
					options: {
						classPrefix: 'language-',
						inlineCodeMarker: null,
						showLineNumbers: false,
						noInlineHighlight: false,
						aliases: {
							js: 'javascript',
							rs: 'rust',
						},
					},
				},
			],
		},
	},

	'gatsby-plugin-catch-links',
	'gatsby-plugin-react-svg',
	'gatsby-plugin-sass',
	'gatsby-plugin-react-helmet',

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
					output: '/feed.xml',
					query: `
            {
              allMarkdownRemark(
                filter: { fields: { categorySlug: { in: ["post", "talk"] } } }
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                      categorySlug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
					serialize: ({ query: { site, allMarkdownRemark } }) =>
						allMarkdownRemark.edges.map((edge) => ({
							...edge.node.frontmatter,
							description: edge.node.excerpt,
							date: edge.node.frontmatter.date,
							url: `${site.siteMetadata.siteUrl}/${edge.node.fields.slug}`,
							guid: `${site.siteMetadata.siteUrl}/${edge.node.fields.slug}`,
							custom_elements: [{ 'content:encoded': edge.node.html }],
						})),
				},
			],
		},
	},

	{
		resolve: 'gatsby-plugin-disqus',
		options: { shortname: 'aymericbeaumet' },
	},

	{
		// before gatsby-plugin-offline
		resolve: 'gatsby-plugin-manifest',
		options: {
			name: siteMetadata.title,
			short_name: 'A. Beaumet',
			start_url: '/',
			background_color: '#663399',
			theme_color: '#663399',
			display: 'minimal-ui',
			icon: `${__dirname}/src/images/aymeric-beaumet-commitstrip.png`,
		},
	},

	'gatsby-plugin-offline',
];

module.exports = { siteMetadata, plugins };
