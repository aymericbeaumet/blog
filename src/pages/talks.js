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
    talks: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { categorySlug: { eq: "talk" } } }
    ) {
      ...PostsRequirements
    }
  }
`

export default function Talks({ data }) {
  return (
    <Layout>
      <Helmet>
        <title>{`Talks by ${data.site.siteMetadata.title}`}</title>
      </Helmet>
      <Title>Talks</Title>
      <Posts allMarkdownRemark={data.talks} />
    </Layout>
  )
}
