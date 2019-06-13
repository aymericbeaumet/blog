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
        <title>{`Project by ${author}`}</title>
      </Helmet>
      <Posts allMarkdownRemark={articles} />
    </Layout>
  )
}
