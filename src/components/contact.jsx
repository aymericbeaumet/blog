import {
  faGithub,
  faLinkedin,
  faStackOverflow,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

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
							linkedin
							github
							stackoverflow
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
      siteMetadata: { email, twitter, linkedin, github, stackoverflow },
    },
  } = data;

  return (
    <ul>
      <li>
        <ExternalLink href={`mailto:${email}`} title="Email">
          <FontAwesomeIcon width="64px" height="64px" icon={faEnvelope} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={twitter} title="X.com">
          <FontAwesomeIcon width="64px" height="64px" icon={faXTwitter} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={linkedin} title="LinkedIn">
          <FontAwesomeIcon width="64px" height="64px" icon={faLinkedin} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={github} title="GitHub">
          <FontAwesomeIcon width="64px" height="64px" icon={faGithub} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={stackoverflow} title="Stack Overflow">
          <FontAwesomeIcon width="64px" height="64px" icon={faStackOverflow} />
        </ExternalLink>
      </li>
    </ul>
  );
}
