import { Link, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import * as classes from './subscribed.module.scss';

export const query = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;

export default function SubscribedPage({ data }) {
	const {
		site: {
			siteMetadata: { title },
		},
	} = data;
	return (
		<Layout>
			<Helmet>
				<title>{`Subscribed to the newsletter! - ${title}`}</title>
			</Helmet>

			<section className={classes.Subscribed}>
				<h1>You are subscribed!</h1>

				<p>You are soon going to receive your first newsletter.</p>

				<p>
					In the meantime, you can have a look at my previous <Link to="/posts">posts</Link>,{' '}
					<Link to="/talks">talks</Link> and <Link to="/projects">projects</Link>.
				</p>
			</section>
		</Layout>
	);
}
