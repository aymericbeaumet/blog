import { graphql } from 'gatsby';
import React from 'react';

import Post from './post';
import * as classes from './posts.module.scss';

export const componentFragment = graphql`
	fragment PostsFragment on MarkdownRemarkConnection {
		edges {
			...PostFragment
		}
	}
`;

export default function Posts({ allMarkdownRemark }) {
	const posts = allMarkdownRemark.edges.map((edge) => (
		<li key={edge.node.fields.slug}>
			<Post post={edge.node} />
		</li>
	));

	return (
		<section className={classes.Posts}>
			<ul className={classes.postsList}>{posts}</ul>
		</section>
	);
}
