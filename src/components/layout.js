import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import './layout.scss'
import Header from './header'
import AlternativeMenu from './alternative-menu'

function Layout({ children, data }) {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link type="text/plain" rel="author" href="/humans.txt" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,400i,700"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <main>{children}</main>
      <AlternativeMenu />
    </React.Fragment>
  )
}

export default function({ ...props }) {
  return (
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
}
