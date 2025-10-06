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

		profile: file(relativePath: { eq: "images/aymeric-beaumet-profile.png" }) {
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
      siteMetadata: { author },
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
              <h2>Welcome to my corner of the internet</h2>
            </div>
          </header>

          <p>
            I&apos;m <strong>{author}</strong>, a French Software Engineer based in Paris, France.
          </p>

          <p>
            My <strong>fascination</strong> for computer science has been a lifelong journey, and I feel fortunate to earn a living doing what I love.
          </p>

          <p>
            I <Link to="/posts">write</Link>, <Link to="/talks">speak</Link>, and <Link to="/projects">build projects</Link> that feed my curiosity and drive me to learn more every day.
          </p>

          <p>
            I believe real growth comes from embracing new challenges, leading me to always push myself out of my comfort zone.
          </p>

          <p>
            Right now, I’m channeling that passion into <ExternalLink href="https://interfaceai.com">Interface, Inc</ExternalLink>  where we leverage cutting-edge AI to shape the future of communication.
          </p>

          <p>
            Thanks for visiting,
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
      </div >
    </Layout >
  );
}
