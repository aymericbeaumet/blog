import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classes from './footer.module.scss'
import ExternalLink from './external-link'

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            author
            sourceUrl
          }
        }
      }
    `}
    render={data => <Footer data={data} />}
  />
)

function Footer({ data }) {
  const {
    site: {
      siteMetadata: { author, sourceUrl },
    },
  } = data
  return (
    <footer className={classes.Footer}>
      <ul>
        <li>
          <Link to="/about-aymeric-beaumet">{`About ${author}`}</Link>
          &nbsp;—
        </li>
        <li>
          <ExternalLink href={sourceUrl}>This blog is Open-Source</ExternalLink>
          &nbsp;—
        </li>
        <li>
          &nbsp;
          <ExternalLink
            href="https://creativecommons.org/licenses/by/4.0"
            license
          >
            CC BY 4.0
          </ExternalLink>
        </li>
      </ul>
    </footer>
  )
}
