import { faGithub, faFirefoxBrowser, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getSrc } from 'gatsby-plugin-image';
import 'prismjs/themes/prism-coy.css';
import React from 'react';
import { Helmet } from 'react-helmet';

import DateComponent from '../components/date';
import Duration from '../components/duration';
import ExternalLink from '../components/external-link';
import Layout from '../components/layout';
import LazyDisqus from '../components/lazy-disqus';
import Tag from '../components/tag';
import Utterances from '../components/utterances';
import * as classes from './post.module.scss';

export const query = graphql`
	query ($slug: String!) {
		site {
			siteMetadata {
				author
				siteUrl
				twitter
				linkedin
				newsletter
			}
		}

		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			timeToRead
			excerpt(pruneLength: 300)
			ogExcerpt: excerpt(pruneLength: 200)

			wordCount {
				words
			}

			fields {
				slug
				isDraft

				imageCropped: image {
					childImageSharp {
						gatsbyImageData(
							layout: CONSTRAINED
							placeholder: BLURRED
							width: 600
							height: 300
							formats: [PNG, WEBP, AVIF]
						)
					}
				}
				instagramPreview: image {
					childImageSharp {
						gatsbyImageData(
							layout: CONSTRAINED
							placeholder: NONE
							width: 1080
							height: 1080
							formats: [JPG]
						)
					}
				}
				ogPreview: image {
					childImageSharp {
						gatsbyImageData(
							layout: CONSTRAINED
							placeholder: NONE
							width: 1200
							height: 630
							formats: [JPG]
						)
					}
				}
				twitterPreview: image {
					childImageSharp {
						gatsbyImageData(layout: CONSTRAINED, aspectRatio: 2, formats: [WEBP])
					}
				}
			}

			frontmatter {
				date
				title
				tags
				timeToWatch
				github
				unsplash
				website
				until
				disqus
				youtube
			}
		}

		attachments: allFile(filter: { fields: { postSlug: { eq: $slug } } }) {
			edges {
				node {
					publicURL
					extension
					fields {
						prettyName
						prettySize
					}
				}
			}
		}

		profile: file(relativePath: { eq: "images/aymeric-beaumet-profile.jpg" }) {
			childImageSharp {
				gatsbyImageData(
					layout: CONSTRAINED
					placeholder: NONE
					width: 24
					formats: [PNG, WEBP, AVIF]
				)
			}
		}
	}
`;

export default function Post({ data }) {
	const {
		site: {
			siteMetadata: { author, siteUrl, twitter, linkedin, newsletter },
		},
		markdownRemark: {
			excerpt,
			ogExcerpt,
			html,
			timeToRead,
			wordCount,
			fields: { slug, isDraft, imageCropped, ogPreview, twitterPreview, instagramPreview },
			frontmatter: {
				date,
				title,
				github,
				website,
				timeToWatch,
				unsplash,
				tags = [],
				until,
				disqus,
				youtube,
			},
		},
		attachments,
		profile,
	} = data;

	const figure = website ? ( // eslint-disable-line
		<figure>
			<ExternalLink href={website} title={website}>
				<GatsbyImage image={imageCropped.childImageSharp.gatsbyImageData} alt="website preview" />
			</ExternalLink>
		</figure>
	) : github ? ( // eslint-disable-line
		<figure>
			<ExternalLink href={`https://github.com/${github}`} title={`https://github.com/${github}`}>
				<GatsbyImage image={imageCropped.childImageSharp.gatsbyImageData} alt="github preview" />
			</ExternalLink>
		</figure>
	) : youtube ? ( // eslint-disable-line
		<figure>
			<ExternalLink href={youtube} title={youtube}>
				<GatsbyImage image={imageCropped.childImageSharp.gatsbyImageData} alt="youtube preview" />
			</ExternalLink>
		</figure>
	) : unsplash ? (
		<figure>
			<ExternalLink href={unsplash} title={`Credit: ${unsplash}`}>
				<GatsbyImage image={imageCropped.childImageSharp.gatsbyImageData} alt="unsplash preview" />
			</ExternalLink>
		</figure>
	) : (
		<figure>
			<GatsbyImage image={imageCropped.childImageSharp.gatsbyImageData} alt="hero image" />
		</figure>
	);

	// https://github.com/joshbuchea/HEAD#social
	// https://developers.facebook.com/docs/sharing/webmasters/
	// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
	// https://www.linkedin.com/help/linkedin/answer/a521928/making-your-website-shareable-on-linkedin
	// https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254
	//
	// https://www.linkedin.com/post-inspector/
	// https://cards-dev.twitter.com/validator
	return (
		<Layout>
			<Helmet>
				<title>{`${title} | ${author}`}</title>
				<meta name="description" content={excerpt} />

				<meta property="og:title" content={title} />
				<meta property="og:description" content={ogExcerpt} />
				<meta property="og:image" content={`${siteUrl}${getSrc(ogPreview)}`} />
				<meta property="og:url" content={`${siteUrl}/${slug}`} />
				<meta property="og:type" content="article" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content={`${siteUrl}${getSrc(twitterPreview)}`} />
				<meta name="twitter:label1" content="Tags" />
				<meta name="twitter:data1" content={tags.map((tag) => `#${tag}`).join(' ')} />

				<meta name="instagram:image" content={`${siteUrl}${getSrc(instagramPreview)}`} />
			</Helmet>

			<section className={classes.Post}>
				<header>
					<h1>{isDraft ? `[DRAFT] ${title}` : title}</h1>

					<ul className={classes.info}>
						<li>
							<Link to="/" title={`Written by ${author}`}>
								<GatsbyImage
									image={profile.childImageSharp.gatsbyImageData}
									alt="author profile picture"
									title={author}
								/>
								{author}
							</Link>
						</li>

						<li>
							・&nbsp;
							<DateComponent date={date} until={until} />
						</li>

						<li>
							・&nbsp;
							{Duration({ timeToRead, wordCount, timeToWatch })}
						</li>

						{github ? (
							<li>
								・&nbsp;
								<ExternalLink
									href={`https://github.com/${github}`}
									title="Browse source code on GitHub"
								>
									<FontAwesomeIcon width="16px" height="16px" icon={faGithub} />
									&nbsp; github
								</ExternalLink>
							</li>
						) : null}

						{youtube ? (
							<li>
								・&nbsp;
								<ExternalLink href={youtube} title="Watch on YouTube">
									<FontAwesomeIcon width="16px" height="16px" icon={faYoutube} />
									&nbsp; youtube
								</ExternalLink>
							</li>
						) : null}

						{website ? (
							<li>
								・&nbsp;
								<ExternalLink href={website} title="Open website">
									<FontAwesomeIcon width="16px" height="16px" icon={faFirefoxBrowser} />
									&nbsp; website
								</ExternalLink>
							</li>
						) : null}
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

					{figure}
				</header>

				<article
					className={classes.content}
					dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
				/>

				<aside>
					{attachments?.edges?.length > 0 ? (
						<section className={classes.attachments}>
							<HeadingWithAnchor Level="h1" id="attachments">
								Attachments
							</HeadingWithAnchor>

							<ul>
								{attachments.edges.map(({ node }) => (
									<ExternalLink
										href={node.publicURL}
										title={`Click to download (${node.fields.prettySize})`}
									>
										<li>
											<FontAwesomeIcon width="32px" height="32px" icon={faSave} />
											{`${node.fields.prettyName}.${node.extension}`}
										</li>
									</ExternalLink>
								))}
							</ul>
						</section>
					) : null}

					<section className={classes.newsletter}>
						<p>
							<ExternalLink href={newsletter}>Subscribe to the newsletter</ExternalLink> to not miss
							any future content.
						</p>
						<p>
							You can also follow me on <ExternalLink href={twitter}>Twitter</ExternalLink> or{' '}
							<ExternalLink href={linkedin}>LinkedIn</ExternalLink>.
						</p>
					</section>

					<section className={classes.comments}>
						<Utterances />

						{disqus ? (
							<LazyDisqus
								config={{
									url: `${siteUrl}/${slug}`,
									identifier: slug,
									title,
								}}
							/>
						) : null}
					</section>
				</aside>
			</section>
		</Layout>
	);
}

function HeadingWithAnchor({ Level, id, children }) {
	return (
		<Level id={id}>
			<a href={`#${id}`} aria-label={`${id} permalink`} className="anchor before">
				<svg
					aria-hidden="true"
					focusable="false"
					height="16"
					version="1.1"
					viewBox="0 0 16 16"
					width="16"
				>
					<path
						fillRule="evenodd"
						d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
					/>
				</svg>
			</a>
			{children}
		</Level>
	);
}
