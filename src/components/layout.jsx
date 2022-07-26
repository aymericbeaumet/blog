import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import * as classes from './layout.module.scss';
import Header from './header';
import Footer from './footer';
import AlternativeHeader from './alternative-header';

export default function LayoutStaticQuery(props) {
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
			render={(data) => <Layout {...props} data={data} />}
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
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
			</Helmet>

			<Header />

			<main>{children}</main>

			<Footer />

			<AlternativeHeader />
		</div>
	);
}
