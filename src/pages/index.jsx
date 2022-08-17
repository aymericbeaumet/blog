import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
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
			filter: { fields: { slug: { in: ["gors", "squeeze"] } } }
		) {
			...PostsFragment
		}

		profile: file(relativePath: { eq: "images/aymeric-beaumet-profile.jpg" }) {
			childImageSharp {
				gatsbyImageData(
					layout: CONSTRAINED
					placeholder: BLURRED
					width: 90
					formats: [PNG, WEBP, AVIF]
				)
			}
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
		profile,
	} = data;
	const postNode = posts.edges[0].node;
	const talkNode = talks.edges[0].node;
	const projectsNodes = projects.edges.map((edge) => edge.node);

	return (
		<Layout>
			<Helmet>
				<title>{author} Blog</title>
			</Helmet>

			<div className={classes.wrapper}>
				<section className={classes.About}>
					<header>
						<div className={classes.profile}>
							<GatsbyImage
								image={profile.childImageSharp.gatsbyImageData}
								alt="Aymeric Beaumet"
								title="Aymeric Beaumet"
							/>
						</div>

						<div>
							<h1>Hey traveler,</h1>
							<h2>Welcome to my part of the internet</h2>
						</div>
					</header>

					<p>
						My name is <strong>{author}</strong>. I&apos;m a French Software Engineer living in{' '}
						Paris, France.
					</p>

					<p>
						I am <strong>passionate</strong> about computer science, which have been so since I was
						13. I often <Link to="/posts">write</Link> and <Link to="/talks">talk</Link> about it. I
						am also lucky enough to now live from my passion.
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
						reasons why I experiment with many side <Link to="/projects">projects</Link>.
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
						<Post post={postNode} />
					</div>

					<div>
						<h2>Latest Talk</h2>
						<Post post={talkNode} />
					</div>

					<div>
						<h2>Featured Projects</h2>
						<div className={classes.projects}>
							{projectsNodes.map((project) => (
								<Post post={project} key={project.fields.slug} />
							))}
						</div>
					</div>
				</aside>
			</div>
		</Layout>
	);
}
