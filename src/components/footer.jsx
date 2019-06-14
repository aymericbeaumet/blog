import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classes from './footer.module.scss'

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
      <p>
        <Link to="/about-aymeric-beaumet">{author}</Link>
        {' — '}
        <a rel="nofollow noopener noreferrer" href={sourceUrl} target="_blank">
          This blog is Open-Source
        </a>
        {' — '}
        <a
          rel="license nofollow noopener noreferrer"
          href="https://creativecommons.org/licenses/by/4.0"
          target="_blank"
        >
          CC BY 4.0
        </a>
      </p>
    </footer>
  )
}
