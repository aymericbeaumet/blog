import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import Layout from '../components/layout';
import 'prismjs/themes/prism-coy.css';
import * as classes from './post.module.scss';
import Duration from '../components/duration';
import DateComponent from '../components/date';
import Tag from '../components/tag';
import { Disqus } from 'gatsby-plugin-disqus';

export const query = graphql`
	query ($slug: String!) {
		site {
			siteMetadata {
				siteUrl
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			timeToRead
			frontmatter {
				date
				title
				tags
				timeToWatch
				attachments {
					publicURL
					name
					extension
				}
			}
			fields {
				slug
			}
		}
	}
`;

export default function Post({ data }) {
	const {
		site: { siteUrl },
		markdownRemark: {
			html,
			timeToRead,
			frontmatter: { date, title, timeToWatch, tags = [], attachments = [] },
			fields: { slug },
		},
	} = data;
	return (
		<Layout>
			<Helmet>
				<title>{title}</title>
			</Helmet>

			<section className={classes.Post}>
				<header>
					<h1>{title}</h1>
					<ul className={classes.info}>
						<li>
							<DateComponent date={date} />
							&nbsp;・
						</li>
						<li>
							&nbsp;
							{Duration({ timeToRead, timeToWatch })}
						</li>
					</ul>
					{tags && tags.length > 0 ? (
						<ul className={classes.tags}>
							{tags.map((tag) => (
								<li key={tag}>
									<Tag tag={tag} />
								</li>
							))}
						</ul>
					) : null}
				</header>

				<article
					className={classes.content}
					dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
				/>

				{attachments && attachments.length > 0 ? (
					<section className={classes.attachments}>
						<h1 id="attachments">Attachments</h1>
						<ul>
							{attachments.map(({ publicURL, name, extension }) => (
								<a href={publicURL}>
									<li>
										<FontAwesomeIcon width="32px" height="32px" icon={faSave} />
										{`${name}.${extension}`}
									</li>
								</a>
							))}
						</ul>
					</section>
				) : null}

				<Disqus
					config={{
						url: `${siteUrl}/${slug}`,
						identifier: slug,
						title,
					}}
				/>
			</section>
		</Layout>
	);
}
