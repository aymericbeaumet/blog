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
			filter: { fields: { categorySlug: { eq: "talk" } } }
		) {
			...PostsFragment
		}
	}
`;

export default function TalksPage({ data }) {
	const {
		site: {
			siteMetadata: { author },
		},
		posts,
	} = data;
	return (
		<Layout>
			<Helmet>
				<title>{`Talks by ${author}`}</title>
			</Helmet>
			<Posts allMarkdownRemark={posts} />
		</Layout>
	);
}
