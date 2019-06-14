import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classes from './alternative-menu.module.scss'
import Menu from '../images/menu.svg'
import Cross from '../images/cross.svg'
import Contact from './contact'

export default () => (
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

class AlternativeMenu extends React.Component {
  static toggleId = 'alternative_menu_toggle'

  state = { isVisible: false }

  componentDidMount() {
    window.addEventListener('keydown', this.dismissHandler) // eslint-disable-line no-undef
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.dismissHandler) // eslint-disable-line no-undef
  }

  set isVisible(isVisible) {
    // Update React state
    this.setState({ isVisible })
    // Disable scrolling while the menu is visible (meh, dirty hack)
    document.body.style.overflow = isVisible ? 'hidden' : '' // eslint-disable-line no-undef
  }

  toggleOnChangeHandler = event => {
    if (event && event.target) {
      this.isVisible = !!event.target.checked
    }
  }

  dismissHandler = (event = {}) => {
    const isClickEvent = event.type === 'click'
    const isEscapeEvent = event.type === 'keydown' && event.keyCode === 27
    if (isClickEvent || isEscapeEvent) {
      this.isVisible = false
    }
  }

  render() {
    const {
      constructor: { toggleId },
      dismissHandler,
      props: {
        data: {
          site: {
            siteMetadata: { menu },
          },
        },
      },
      state: { isVisible },
    } = this
    return (
      <nav className={classes.AlternativeMenu}>
        <input
          type="checkbox"
          checked={isVisible}
          onChange={this.toggleOnChangeHandler}
          id={this.constructor.toggleId}
        />
        <label htmlFor={toggleId} className={classes.toggle}>
          <Menu />
          <Cross />
        </label>
        <div className={classes.menu} onClick={dismissHandler}>
          <ul className={classes.entries}>
            <li>
              <nav className={classes.contact}>
                <Contact />
              </nav>
            </li>
            <li>
              <Link to="/" activeClassName={classes.active}>
                Home
              </Link>
            </li>
            {menu.map(({ name, url }) => (
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
