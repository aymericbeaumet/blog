import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import Posts from '../components/posts';

export const query = graphql`
	query {
		site {
			siteMetadata {
				author
			}
		}
		posts: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
			filter: { fields: { categorySlug: { eq: "post" } } }
		) {
			...PostsFragment
		}
	}
`;

export default function PostsPage({ data }) {
	const {
		site: {
			siteMetadata: { author },
		},
		posts,
	} = data;

	return (
		<Layout>
			<Helmet>
				<title>{`Posts by ${author}`}</title>
			</Helmet>

			<Posts allMarkdownRemark={posts} />
		</Layout>
	);
}
