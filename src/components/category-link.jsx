import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';

export default function CategoryLinkStaticQuery(props) {
	return (
		<StaticQuery
			query={graphql`
				query {
					allMarkdownRemark {
						edges {
							node {
								fields {
									slug
									categorySlug
								}
							}
						}
					}
				}
			`}
			render={(data) => <CategoryLink data={data} {...props} />}
		/>
	);
}

function CategoryLink({ activeClassName, categorySlug, data, ...props }) {
	return (
		<Link
			getProps={(_props) => {
				const isActive =
					_props.isCurrent ||
					_props.isPartiallyCurrent ||
					data.allMarkdownRemark.edges.some(
						(edge) =>
							edge.node.fields.categorySlug === categorySlug &&
							_props.location.pathname.includes(edge.node.fields.slug),
					);
				return isActive ? { className: activeClassName } : null;
			}}
			{...props}
		/>
	);
}
