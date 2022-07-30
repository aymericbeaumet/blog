import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import Posts from '../components/posts';

export const query = graphql`
	query ($tag: String!) {
		site {
			siteMetadata {
				author
			}
		}
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			...PostsFragment
		}
	}
`;

export default function Tag({ pageContext, data }) {
	const {
		site: {
			siteMetadata: { author },
		},
	} = data;
	return (
		<Layout>
			<Helmet>
				<title>{`${pageContext.tag} | ${author}`}</title>
				<meta name="description" content={`Posts for tag #${pageContext.tag}`} />
			</Helmet>

			<Posts allMarkdownRemark={data.allMarkdownRemark} />
		</Layout>
	);
}
