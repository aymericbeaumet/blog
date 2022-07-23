import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import * as classes from './index.module.scss';
import ExternalLink from '../components/external-link';

export const query = graphql`
	query {
		site {
			siteMetadata {
				title
				author
				github
				stackoverflow
			}
		}
	}
`;

export default function AboutAymericBeaumet({ data }) {
	const {
		site: {
			siteMetadata: { author },
		},
	} = data;
	return (
		<Layout>
			<Helmet>
				<title>{author} Blog</title>
			</Helmet>
			<section className={classes.About}>
				<h1>Hey traveler,</h1>
				<h2>Welcome to my part of the internet</h2>

				<p>
					My name is <strong>{author}</strong>. I am a Lead Platform Engineer working on
					infrastructure and backend topics, with a focus on maintainability, resilience and high
					availability.
				</p>

				<p>
					I am <strong>passionate about computer science</strong>, and it has been so since I was
					13. I am now lucky enough to live from that passion.
				</p>

				<p>
					I am <strong>an enthusiast learner</strong>. I firmly believe that struggling is the best
					way to progress, and I&apos;m always looking for new challenges.
				</p>

				<p>Feel free to get in touch.</p>

				<p>
					Best,
					<br />
					Aymeric
				</p>
			</section>
		</Layout>
	);
}
