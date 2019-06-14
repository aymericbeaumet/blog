import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Posts from '../components/posts'
import Layout from '../components/layout'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { categorySlug: { eq: "project" } } }
    ) {
      ...PostsRequirements
    }
  }
`

export default function Articles({ data }) {
  const {
    articles,
    site: {
      siteMetadata: { author },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{`Projects by ${author}`}</title>
      </Helmet>
      <Posts allMarkdownRemark={articles} />
    </Layout>
  )
}
