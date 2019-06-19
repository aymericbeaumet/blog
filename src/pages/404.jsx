import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import classes from './404.module.scss'
import aymericBeaumetIndoorSkydiving from '../images/aymeric-beaumet-indoor-skydiving.jpg'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        title
      }
    }
  }
`

function NotFound({ data }) {
  const {
    site: {
      siteMetadata: { author, title },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{`Page not found - ${title}`}</title>
      </Helmet>
      <section className={classes.NotFound}>
        <h1>Oups...</h1>
        <p>It seems the page you are looking for does not exist!</p>
        <p>
          {'You can:'}
          <ul>
            <li>
              <Link to="/about-aymeric-beaumet">
                {`Learn more about ${author} (this blog author)`}
              </Link>
            </li>
            <li>
              <Link to="/">Browse this blog content</Link>
            </li>
          </ul>
        </p>
        <h2>Fun fact</h2>
        <p>
          {'I love '}
          <a href="https://en.wikipedia.org/wiki/Vertical_wind_tunnel">
            indoor skydiving
          </a>
          {'! Check '}
          <a href="https://www.tunnelflight.com/">tunnelflight.com</a>
          {' to find the closest indoor skydiving station from your location.'}
        </p>
        <figure>
          <img
            alt="Me having a lot of fun :)"
            src={aymericBeaumetIndoorSkydiving}
          />
          <figcaption>This is me flying for the first time :)</figcaption>
        </figure>
      </section>
    </Layout>
  )
}

export default NotFound
