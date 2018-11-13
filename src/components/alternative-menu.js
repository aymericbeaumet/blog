import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classes from './alternative-menu.module.scss'
import Menu from '../images/menu.svg'
import Cross from '../images/cross.svg'

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
            <ul className={classes.contact}>
              <li>Email</li>
              <li>Twitter</li>
              <li>Mastodon</li>
            </ul>
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
              menu {
                name
                url
              }
            }
          }
        }
      `}
      render={data => <AlternativeMenu data={data} />}
    />
  )
}
