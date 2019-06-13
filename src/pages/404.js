import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

function NotFound({ data: { site } }) {
  return (
    <Layout>
      <Helmet>
        <title>{`Page not found - ${title}`}</title>
      </Helmet>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <p>
        <Link to="/">Go home</Link>
      </p>
    </Layout>
  )
}

export default NotFound
