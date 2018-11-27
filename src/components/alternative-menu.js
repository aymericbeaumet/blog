import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classes from './alternative-menu.module.scss'
import Menu from '../images/menu.svg'
import Cross from '../images/cross.svg'
import Twitter from '../images/twitter-brands.svg'
import Mastodon from '../images/mastodon-brands.svg'
import Envelope from '../images/envelope-regular.svg'

function AlternativeMenu({ data }) {
  return (
    <nav className={classes.AlternativeMenu}>
      <input type="checkbox" id="toggle" />
      <label htmlFor="toggle" className={classes.toggle}>
        <Menu />
        <Cross />
      </label>
      <div className={classes.menu}>
        <ul className={classes.entries}>
          <li>
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
          </li>
          {data.site.siteMetadata.menu.map(({ name, url }) => (
            <li key={name}>
              <Link to={url} activeClassName={classes.active}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
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
                categorySlug
              }
            }
          }
        }
      `}
      render={data => <AlternativeMenu data={data} />}
    />
  )
}
