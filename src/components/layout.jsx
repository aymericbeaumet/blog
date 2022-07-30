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
							title
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
			siteMetadata: { description, title },
		},
	} = data;

	return (
		<div className={classes.Layout}>
			<Helmet>
				<html lang="en" />
				<title>{`${title} Blog`}</title>
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
