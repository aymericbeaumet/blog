import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import * as classes from './footer.module.scss'
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
    render={(data) => <Footer data={data} />}
  />
)

function Footer({ data }) {
  const {
    site: {
      siteMetadata: { author },
    },
  } = data
  return (
    <footer className={classes.Footer}>
      <ul>
        <li>
          <Link to="/">{`About ${author}`}</Link>
        </li>
      </ul>
    </footer>
  )
}
