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
				<html lang="en" prefix="og: https://ogp.me/ns#" />
				<title>{`${author} Blog`}</title>

				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta name="description" content={description} />
				<meta name="referrer" content="no-referrer" />
				<meta name="rating" content="General" />

				<meta name="author" content="Aymeric Beaumet" />
				<meta name="publisher" content={`${author} Blog`} />
				<meta property="article:author" content="Aymeric Beaumet" />

				<meta property="og:site_name" content={`${author} Blog`} />
				<meta property="og:locale" content="en_US" />
				<meta property="og:locale:alternate" content="fr_FR" />

				<meta name="twitter:site" content="@aymericbeaumet" />
				<meta name="twitter:creator" content="@aymericbeaumet" />
				<meta name="twitter:dnt" content="on" />
			</Helmet>

			<Header />

			<main>{children}</main>

			<Footer />

			<AlternativeHeader />
		</div>
	);
}
