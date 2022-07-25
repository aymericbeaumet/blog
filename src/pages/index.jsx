import React from 'react';
import { graphql } from 'gatsby';
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
					My name is <strong>{author}</strong>. I&apos; from Paris, France.
				</p>

				<p>
					I am <strong>passionate about computer science</strong>, which have been so since I was
					13. I am now lucky enough to live from that passion.
				</p>

				<p>
					I work for <ExternalLink href="https://rekki.com">REKKI</ExternalLink> as a{' '}
					<strong>Lead Platform Engineer</strong>. My team is focusing on building a robust
					foundation that can be leveraged by the Tech and Product teams to sustain the
					company&apos;s growth. We deal with many topics, including infrastructure and developer
					experience.
				</p>

				<p>
					I am an <strong>enthusiastic learner</strong>. I firmly believe that struggling is the
					best way to progress, and I always look for new challenges.
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
