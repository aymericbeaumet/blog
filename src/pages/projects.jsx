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
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { fields: { categorySlug: { eq: "project" } } }
		) {
			...PostsFragment
		}
	}
`;

export default function ProjectsPage({ data }) {
	const {
		site: {
			siteMetadata: { author },
		},
		posts,
	} = data;
	return (
		<Layout>
			<Helmet>
				<title>{`Projects by ${author}`}</title>
			</Helmet>
			<Posts allMarkdownRemark={posts} />
		</Layout>
	);
}
