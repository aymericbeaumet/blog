import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import * as classes from './404.module.scss';

export const query = graphql`
	query {
		site {
			siteMetadata {
				author
			}
		}

		skydiving: file(relativePath: { eq: "images/aymeric-beaumet-indoor-skydiving.jpg" }) {
			childImageSharp {
				gatsbyImageData(
					layout: CONSTRAINED
					placeholder: BLURRED
					width: 500
					formats: [PNG, WEBP, AVIF]
				)
			}
		}
	}
`;

export default function NotFoundPage({ data }) {
	const {
		site: {
			siteMetadata: { author },
		},
		skydiving,
	} = data;

	return (
		<Layout>
			<Helmet>
				<title>{`Page not found | ${author}`}</title>
			</Helmet>

			<section className={classes.NotFound}>
				<h1>Oups...</h1>

				<p>It seems the page you are looking for does not exist!</p>
				<p>
					You can <Link to="/">learn more</Link> about me, or browse my latest{' '}
					<Link to="/posts">posts</Link>, <Link to="/talks">talks</Link> and{' '}
					<Link to="/projects">projects</Link>.
				</p>

				<h2>Fun fact</h2>

				<p>
					I love <a href="https://en.wikipedia.org/wiki/Vertical_wind_tunnel">indoor skydiving</a>!
				</p>
				<figure>
					<GatsbyImage
						image={skydiving.childImageSharp.gatsbyImageData}
						alt="Me having a lot of fun :)"
					/>
					<figcaption>Me flying for the first time :)</figcaption>
				</figure>
				<p>
					Check <a href="https://www.tunnelflight.com/">tunnelflight.com</a> to find the closest
					indoor skydiving station from your location.
				</p>
			</section>
		</Layout>
	);
}
