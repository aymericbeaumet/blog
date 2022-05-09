import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, Link } from 'gatsby';
import * as classes from './posts.module.scss';
import Duration from './duration';
import DateComponent from './date';
import Tag from './tag';

export const componentFragment = graphql`
	fragment PostsRequirements on MarkdownRemarkConnection {
		edges {
			node {
				fields {
					slug
				}
				timeToRead
				frontmatter {
					title
					tags
					timeToWatch
					date
					thumbnail {
						childImageSharp {
							gatsbyImageData(layout: CONSTRAINED, breakpoints: [255])
						}
					}
				}
			}
		}
	}
`;

export default function Posts({ allMarkdownRemark }) {
	const posts = allMarkdownRemark.edges.map(
		({
			node: {
				fields: { slug },
				frontmatter: { title, tags, thumbnail, timeToWatch, date },
				timeToRead,
			},
		}) => (
			<li className={classes.post} key={slug}>
				<Link to={`/${slug}`}>
					<figure>
						<GatsbyImage fluid={thumbnail.childImageSharp.gatsbyImageData} alt={title} />
						<figcaption>
							{DateComponent({ date })}
							{Duration({ timeToRead, timeToWatch })}
						</figcaption>
					</figure>
					<h2>{title}</h2>
				</Link>
				<ul className={classes.tagsList}>
					{tags.map((tag) => (
						<li className={classes.tag} key={tag}>
							<Tag tag={tag} />
						</li>
					))}
				</ul>
			</li>
		),
	);

	return (
		<section className={classes.Posts}>
			<ul className={classes.postsList}>{posts}</ul>
		</section>
	);
}
