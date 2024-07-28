import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';

import ExternalLink from './external-link';
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
      <Link to="/" title="Go back to the home page">
        &copy; 2014&#8211;{new Date().getFullYear()}&nbsp;&nbsp;{author}
      </Link>
      {' — '}
      <Link to="/feed.xml" title="RSS Feed with all the latest Posts, Talks and Projects">
        RSS Feed
      </Link>
    </footer>
  );
}
