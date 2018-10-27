import React from 'react'
import Layout from '../components/layout'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Title from '../components/title'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default function Links({ data }) {
  return (
    <Layout>
      <Helmet>
        <title>{`Notes by ${data.site.siteMetadata.title}`}</title>
      </Helmet>
      <Title>Notes</Title>
    </Layout>
  )
}
