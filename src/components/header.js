import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classes from './header.module.scss'
import twitter from '../images/twitter-brands.svg'
import mastodon from '../images/mastodon-brands.svg'
import envelope from '../images/envelope-regular.svg'

function Header({ data }) {
  return (
    <header className={classes.Header}>
      <nav role="navigation">
        <ul>
          {data.site.siteMetadata.menu.map(({ name, url }) => (
            <li key={name}>
              <Link to={url} activeClassName={classes.active}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav class={classes.contact}>
        <ul>
          <li>
            <a href="mailto:hi@aymericbeaumet.com">
              <img
                className={`${classes.icon} ${classes.e}`}
                src={envelope}
                alt="Email!"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/aymericbeaumet">
              <img
                className={`${classes.icon} ${classes.t}`}
                src={twitter}
                alt="Tweet!"
              />
            </a>
          </li>
          <li>
            <a href="https://mastodon.social/@aymericbeaumet">
              <img
                className={`${classes.icon} ${classes.m}`}
                src={mastodon}
                alt="Toot!"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default function() {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              menu {
                name
                url
              }
            }
          }
        }
      `}
      render={data => <Header data={data} />}
    />
  )
}
