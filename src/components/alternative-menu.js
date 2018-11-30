import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classes from './alternative-menu.module.scss'
import Menu from '../images/menu.svg'
import Cross from '../images/cross.svg'
import Twitter from '../images/twitter-brands.svg'
import Mastodon from '../images/mastodon-brands.svg'
import Envelope from '../images/envelope-regular.svg'

class AlternativeMenu extends React.Component {
  static toggleId = 'alternative_menu_toggle'

  state = { isVisible: false }

  set isVisible(isVisible) {
    // Update React state
    this.setState({ isVisible })
    // Disable scrolling while the menu is visible (meh, dirty hack)
    document.body.style.overflow = isVisible ? 'hidden' : ''
  }

  _toggleOnChangeHandler = event => {
    if (event && event.target) {
      this.isVisible = !!event.target.checked
    }
  }

  _dismissHandler = (event = {}) => {
    const isClickEvent = event.type === 'click'
    const isEscapeEvent = event.type === 'keydown' && event.keyCode === 27
    if (isClickEvent || isEscapeEvent) {
      this.isVisible = false
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this._dismissHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._dismissHandler)
  }

  render() {
    const { data } = this.props
    return (
      <nav className={classes.AlternativeMenu}>
        <input
          type="checkbox"
          checked={this.state.isVisible}
          onChange={this._toggleOnChangeHandler}
          id={this.constructor.toggleId}
        />
        <label htmlFor={this.constructor.toggleId} className={classes.toggle}>
          <Menu />
          <Cross />
        </label>
        <div className={classes.menu} onClick={this._dismissHandler}>
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
            <li>
              <Link to="/" activeClassName={classes.active}>
                Home
              </Link>
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
