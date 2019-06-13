import Posts from '../components/posts'
import React from 'react'
import Layout from '../components/layout'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

export const pageQuery = graphql`
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
