import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import AlternativeHeader from './alternative-header';
import Footer from './footer';
import Header from './header';
import * as classes from './layout.module.scss';

export default function LayoutStaticQuery({ children }) {
	return (
		<StaticQuery
			query={graphql`
				query {
					site {
						siteMetadata {
							author
							description
						}
					}
				}
			`}
			render={(data) => <Layout data={data}>{children}</Layout>}
		/>
	);
}

function Layout({ children, data }) {
	const {
		site: {
			siteMetadata: { description, author },
		},
	} = data;

	return (
		<div className={classes.Layout}>
			<Helmet>
				<html lang="en" />

				<title>{`${author} Blog`}</title>
				<meta property="og:site_name" content={`${author} Blog`} />

				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta name="description" content={description} />
				<meta name="twitter:site" content="@aymericbeaumet" />
			</Helmet>

			<Header />

			<main>{children}</main>

			<Footer />

			<AlternativeHeader />
		</div>
	);
}
