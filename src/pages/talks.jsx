import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Posts from '../components/posts'
import Layout from '../components/layout'

export const query = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
    talks: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { categorySlug: { eq: "talk" } } }
    ) {
      ...PostsRequirements
    }
  }
`

export default function Talks({ data }) {
  const {
    site: {
      siteMetadata: { author },
    },
    talks,
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{`Talks by ${author}`}</title>
      </Helmet>
      <Posts allMarkdownRemark={talks} />
    </Layout>
  )
}
