import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classes from './header.module.scss'
import Twitter from '../images/twitter-brands.svg'
import Mastodon from '../images/mastodon-brands.svg'
import Envelope from '../images/envelope-regular.svg'
import Logo from '../images/aymericbeaumet-logo.svg'

function getProps({ isPartiallyCurrent }) {
  return isPartiallyCurrent ? { className: classes.active } : null
}

function Header({ data }) {
  return (
    <header className={classes.Header}>
      <nav role="navigation">
        <ul>
          <li key="aymericbeaumet-logo">
            <Link to="/" activeClassName={classes.active}>
              <Logo />
            </Link>
          </li>
          {data.site.siteMetadata.menu.map(({ name, url }) => (
            <li key={name}>
              <Link to={url} getProps={getProps}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={classes.contact}>
        <ul>
          <li>
            <a
              onClick={function(event) {
                window.open(
                  `mailto:${data.site.siteMetadata.email}`,
                  data.site.siteMetadata.email,
                  'noopener',
                )
                event.preventDefault()
              }}
              href={`mailto:${data.site.siteMetadata.email}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Envelope className={`${classes.icon} ${classes.e}`} />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/aymericbeaumet"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Twitter className={`${classes.icon} ${classes.t}`} />
            </a>
          </li>
          <li>
            <a
              href="https://mastodon.social/@aymericbeaumet"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Mastodon className={`${classes.icon} ${classes.m}`} />
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
              email
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
