import Posts from '../components/posts'
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
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { categorySlug: { eq: "article" } } }
    ) {
      ...PostsRequirements
    }
  }
`

export default function Articles({ data }) {
  const {
    articles,
    site: {
      siteMetadata: { title },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{`Articles by ${title}`}</title>
      </Helmet>
      <Title>Articles</Title>
      <Posts allMarkdownRemark={articles} />
    </Layout>
  )
}
