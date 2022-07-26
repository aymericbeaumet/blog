import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';

import * as classes from './footer.module.scss';

export default function FooterStaticQuery() {
	return (
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
}

function Footer({ data }) {
	const {
		site: {
			siteMetadata: { author },
		},
	} = data;
	return (
		<footer className={classes.Footer}>
			<Link to="/">
				&copy; 2014&#8211;{new Date().getFullYear()} {author}
			</Link>{' '}
			— <Link to="feed.xml">Subscribe with RSS</Link>
		</footer>
	);
}
