import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import DateComponent from './date';
import Duration from './duration';
import * as classes from './post.module.scss';
import Tag from './tag';

export const componentFragment = graphql`
	fragment PostFragment on MarkdownRemarkEdge {
		node {
			fields {
				slug
				isDraft
			}
			timeToRead
			excerpt(pruneLength: 300)
			frontmatter {
				title
				tags
				timeToWatch
				date
				thumbnail {
					childImageSharp {
						gatsbyImageData(
							layout: CONSTRAINED
							placeholder: BLURRED
							width: 255
							formats: [PNG, WEBP, AVIF]
						)
					}
				}
			}
		}
	}
`;

export default function Post({ post }) {
	const {
		fields: { slug, isDraft },
		frontmatter: { title, tags, thumbnail, timeToWatch, date },
		excerpt,
		timeToRead,
	} = post;

	return (
		<div className={classes.Post}>
			<Link to={`/${slug}`} title={excerpt}>
				<figure>
					<GatsbyImage image={thumbnail.childImageSharp.gatsbyImageData} alt={title} />
					<figcaption>
						{DateComponent({ date })}
						{Duration({ timeToRead, timeToWatch })}
					</figcaption>
				</figure>
				<h2>{isDraft ? `[DRAFT] ${title}` : title}</h2>
			</Link>

			<ul className={classes.tagsList}>
				{tags.map((tag) => (
					<li className={classes.tag} key={tag}>
						<Tag tag={tag} />
					</li>
				))}
			</ul>
		</div>
	);
}
