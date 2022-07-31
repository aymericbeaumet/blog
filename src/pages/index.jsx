import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import ExternalLink from '../components/external-link';
import Layout from '../components/layout';
import Post from '../components/post';
import * as classes from './index.module.scss';

export const query = graphql`
	query {
		site {
			siteMetadata {
				author
				email
				twitter
			}
		}

		posts: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { fields: { categorySlug: { in: ["post"] } } }
			limit: 1
		) {
			...PostsFragment
		}

		talks: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { fields: { categorySlug: { in: ["talk"] } } }
			limit: 1
		) {
			...PostsFragment
		}

		projects: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { fields: { categorySlug: { in: ["project"] } } }
			limit: 1
		) {
			...PostsFragment
		}
	}
`;

export default function AboutAymericBeaumet({ data }) {
	const {
		site: {
			siteMetadata: { author, email, twitter },
		},
		posts,
		talks,
		projects,
	} = data;
	const post = posts.edges[0].node;
	const talk = talks.edges[0].node;
	const project = projects.edges[0].node;

	return (
		<Layout>
			<Helmet>
				<title>{author} Blog</title>
			</Helmet>

			<div className={classes.wrapper}>
				<section className={classes.About}>
					<h1>Hey traveler,</h1>
					<h2>Welcome to my part of the internet</h2>

					<p>
						My name is <strong>{author}</strong>. I&apos;m a 29 years old Software Engineer living
						in Paris, France.
					</p>

					<p>
						I am <strong>passionate about computer science</strong>, which have been so since I was
						13. I am now lucky enough to live from that passion.
					</p>

					<p>
						I work for <ExternalLink href="https://rekki.com">REKKI</ExternalLink> as a{' '}
						<strong>Lead Platform Engineer</strong>. The Platform team focuses on building a robust
						foundation that can be leveraged by the Tech and Product teams to sustain the
						company&apos;s growth. We deal with many topics, including infrastructure, performance,
						observability, and developer experience.
					</p>

					<p>
						I am an <strong>enthusiastic learner</strong>. I firmly believe that struggling is the
						best way to progress, and I always look for new challenges. This is one of the main
						reasons why I work on{' '}
						<ExternalLink href="https://github.com/aymericbeaumet?tab=repositories&type=public">
							side projects
						</ExternalLink>
						.
					</p>

					<p>
						Feel free to get in touch by <ExternalLink href={`mailto:${email}`}>mail</ExternalLink>{' '}
						or on <ExternalLink href={twitter}>Twitter</ExternalLink>.
					</p>

					<p>
						Best,
						<br />
						Aymeric
					</p>
				</section>

				<aside className={classes.Aside}>
					<div>
						<h2>Latest Post</h2>
						<Post post={post} />
					</div>

					<div>
						<h2>Latest Talk</h2>
						<Post post={talk} />
					</div>

					<div>
						<h2>Latest Project</h2>
						<Post post={project} />
					</div>
				</aside>
			</div>
		</Layout>
	);
}
