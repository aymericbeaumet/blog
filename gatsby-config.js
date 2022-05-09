const firstName = 'Aymeric';
const lastName = 'Beaumet';
const fullName = `${firstName} ${lastName}`;

const siteMetadata = {
	// me
	title: `${fullName} Blog`,
	author: fullName,
	description: `${firstName} is a Senior Software Engineer with 5 years of experience in deploying resilient, scalable, and highly available back-end systems.`,
	// contacts
	email: 'hi@aymericbeaumet.com',
	github: 'https://github.com/aymericbeaumet',
	linkedin: 'https://www.linkedin.com/in/aymericbeaumet/',
	stackoverflow: 'https://stackoverflow.com/users/1071486/aymericbeaumet?tab=topactivity',
	twitter: 'https://twitter.com/aymericbeaumet',
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

function withRSS(plugins = []) {
	const serialize = ({ query: { site, allMarkdownRemark } }) => {
		return allMarkdownRemark.edges.map((edge) => {
			return {
				...edge.node.frontmatter,
				description: edge.node.excerpt,
				date: edge.node.frontmatter.date,
				url: site.siteMetadata.siteUrl + edge.node.fields.slug,
				guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
				custom_elements: [{ 'content:encoded': edge.node.html }],
			};
		});
	};
	const query = (...args) => `
    {
      allMarkdownRemark(
        ${['sort: { order: DESC, fields: [frontmatter___date] }', ...args, ''].join(',')}
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
  `;
	return [
		...plugins,
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
						query: query(),
						serialize,
					},
				],
			},
		},
	];
}

module.exports = {
	siteMetadata,
	plugins: [],
	plugins: withRSS([
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'data',
				path: `${__dirname}/data/`,
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
						options: { maxWidth: 720, withWebp: true },
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
						},
					},
				],
			},
		},
		'gatsby-plugin-catch-links',
		'gatsby-plugin-react-svg',
		'gatsby-plugin-robots-txt',
		'gatsby-plugin-sass',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-disqus',
			options: { shortname: 'aymericbeaumet' },
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
				icon: `${__dirname}/src/images/aymeric-beaumet-commitstrip.png`,
			},
		}, // before gatsby-plugin-offline
		'gatsby-plugin-offline',
	]),
};
