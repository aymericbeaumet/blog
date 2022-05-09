import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import * as classes from './footer.module.scss';

export default () => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						author
					}
				}
			}
		`}
		render={(data) => <Footer data={data} />}
	/>
);

function Footer({ data }) {
	const {
		site: {
			siteMetadata: { author },
		},
	} = data;
	return (
		<footer className={classes.Footer}>
			<ul>
				<li>
					<Link to="/">{`About ${author}`}</Link>
				</li>
			</ul>
		</footer>
	);
}
