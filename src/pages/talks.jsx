import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Posts from '../components/posts';
import Layout from '../components/layout';

export const query = graphql`
	query {
		site {
			siteMetadata {
				author
			}
		}
		posts: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { fields: { categorySlug: { eq: "talk" } } }
		) {
			...PostsRequirements
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
