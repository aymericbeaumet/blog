import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import './layout.scss'
import Header from './header'

function Layout({ children, data }) {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link type="text/plain" rel="author" href="/humans.txt" />
      </Helmet>
      <Header />
      <main>{children}</main>
    </React.Fragment>
  )
}

export default function({ children }) {
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
      render={data => <Layout children={children} data={data} />}
    />
  )
}
