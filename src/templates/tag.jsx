import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Posts from '../components/posts'

export const pageQuery = graphql`
  query($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      ...PostsRequirements
    }
  }
`

export default function Tag({ pageContext, data }) {
  const {
    site: {
      siteMetadata: { title },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{`${pageContext.tag} - ${title}`}</title>
      </Helmet>
      <Posts allMarkdownRemark={data.allMarkdownRemark} />
    </Layout>
  )
}
