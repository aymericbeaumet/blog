import React from 'react'
import { graphql, } from 'gatsby'
import Layout from '../components/layout'
import { Helmet, } from 'react-helmet'
import Posts from '../components/posts'
import Title from '../components/title'

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

export default function Tag({ pageContext, data, }) {
  return (
    <Layout>
      <Helmet>
        <title>
          {`${pageContext.tag} articles and talks by ${
            data.site.siteMetadata.title
          }`}
        </title>
      </Helmet>
      <Title>Tagged {pageContext.tag}</Title>
      <Posts allMarkdownRemark={data.allMarkdownRemark} />
    </Layout>
  )
}
