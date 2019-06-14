import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import classes from './layout.module.scss'
import Header from './header'
import Footer from './footer'
import AlternativeMenu from './alternative-menu'

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => <Layout {...props} data={data} />}
  />
)

function Layout({ children, data }) {
  const {
    site: {
      siteMetadata: { description, position, title },
    },
  } = data
  return (
    <div className={classes.Layout}>
      <Helmet>
        <html lang="en" />
        <title>{`${title} ${position}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link type="text/plain" rel="author" href="/humans.txt" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,400i,700"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* <AlternativeMenu /> */}
    </div>
  )
}
