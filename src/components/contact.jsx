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
        <ExternalLink href={`mailto:${email}`}>
          <FontAwesomeIcon icon={faEnvelope} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={twitter}>
          <FontAwesomeIcon icon={faTwitter} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={linkedin}>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={github}>
          <FontAwesomeIcon icon={faGithub} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={stackoverflow}>
          <FontAwesomeIcon icon={faStackOverflow} />
        </ExternalLink>
      </li>
    </ul>
  )
}
