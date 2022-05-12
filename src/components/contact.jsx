import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faStackOverflow,
	faGithub,
	faTwitter,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ExternalLink from './external-link';

export default function ContactStaticQuery() {
	return (
		<StaticQuery
			query={graphql`
				query {
					site {
						siteMetadata {
							email
							twitter
							github
							stackoverflow
							linkedin
						}
					}
				}
			`}
			render={(data) => <Contact data={data} />}
		/>
	);
}

function Contact({ data }) {
	const {
		site: {
			siteMetadata: { email, github, stackoverflow, linkedin, twitter },
		},
	} = data;
	return (
		<ul>
			<li>
				<a href={`mailto:${email}`}>
					<FontAwesomeIcon width="64px" height="64px" icon={faEnvelope} />
				</a>
			</li>
			<li>
				<ExternalLink href={twitter}>
					<FontAwesomeIcon width="64px" height="64px" icon={faTwitter} />
				</ExternalLink>
			</li>
			<li>
				<ExternalLink href={github}>
					<FontAwesomeIcon width="64px" height="64px" icon={faGithub} />
				</ExternalLink>
			</li>
			<li>
				<ExternalLink href={stackoverflow}>
					<FontAwesomeIcon width="64px" height="64px" icon={faStackOverflow} />
				</ExternalLink>
			</li>
			<li>
				<ExternalLink href={linkedin}>
					<FontAwesomeIcon width="64px" height="64px" icon={faLinkedin} />
				</ExternalLink>
			</li>
		</ul>
	);
}
