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
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      ...PostsRequirements
    }
  }
`

export default function Index({ data }) {
  const {
    posts,
    site: {
      siteMetadata: { title },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Posts allMarkdownRemark={posts} />
    </Layout>
  )
}
