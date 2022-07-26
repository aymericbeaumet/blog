import { faGithub, faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, graphql } from 'gatsby';
import 'prismjs/themes/prism-coy.css';
import React from 'react';
import { Helmet } from 'react-helmet';

import DateComponent from '../components/date';
import Duration from '../components/duration';
import ExternalLink from '../components/external-link';
import Layout from '../components/layout';
import LazyDisqus from '../components/lazy-disqus';
import Tag from '../components/tag';
import * as classes from './post.module.scss';

export const query = graphql`
	query ($slug: String!) {
		site {
			siteMetadata {
				author
				siteUrl
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			timeToRead
			excerpt(pruneLength: 300)
			wordCount {
				words
			}
			frontmatter {
				date
				title
				tags
				timeToWatch
				github
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
		site: {
			siteMetadata: { author, siteUrl },
		},
		markdownRemark: {
			excerpt,
			html,
			timeToRead,
			wordCount,
			frontmatter: { date, title, github, timeToWatch, tags = [], attachments = [] },
			fields: { slug },
		},
	} = data;

	return (
		<Layout>
			<Helmet>
				<title>{`${title} | ${author}`}</title>
				<meta name="description" content={excerpt} />
			</Helmet>

			<section className={classes.Post}>
				<header>
					<h1>{title}</h1>

					<ul className={classes.info}>
						<li>
							<DateComponent date={date} />
						</li>
						<li>
							・&nbsp;
							{Duration({ timeToRead, wordCount, timeToWatch })}
						</li>
						{github ? (
							<li>
								・&nbsp;
								<ExternalLink href={github} title="Browse source code on GitHub">
									<FontAwesomeIcon width="16px" height="16px" icon={faGithub} />
									&nbsp; source
								</ExternalLink>
							</li>
						) : null}
						<li>
							・&nbsp;
							<Link href={`/${slug}.md`} title="View Markdown for this page">
								<FontAwesomeIcon width="16px" height="16px" icon={faMarkdown} />
								&nbsp; markdown
							</Link>
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

				<LazyDisqus
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
