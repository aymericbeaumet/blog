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
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </li>
      <li>
        <a href={twitter} target="_blank" rel="nofollow noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </li>
      <li>
        <a href={linkedin} target="_blank" rel="nofollow noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </li>
      <li>
        <a href={github} target="_blank" rel="nofollow noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </li>
      <li>
        <a
          href={stackoverflow}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon icon={faStackOverflow} />
        </a>
      </li>
    </ul>
  )
}
