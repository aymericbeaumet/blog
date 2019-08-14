import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faStackOverflow,
  faGithub,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ExternalLink from './external-link'

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            email
            github
            linkedin
            stackoverflow
            twitter
          }
        }
      }
    `}
    render={data => <Contact data={data} />}
  />
)

function Contact({ data }) {
  const {
    site: {
      siteMetadata: { email, github, linkedin, stackoverflow, twitter },
    },
  } = data
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
        <ExternalLink href={linkedin}>
          <FontAwesomeIcon width="64px" height="64px" icon={faLinkedinIn} />
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
    </ul>
  )
}
