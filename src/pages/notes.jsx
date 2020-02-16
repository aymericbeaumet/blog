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
    notes: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { categorySlug: { eq: "note" } } }
    ) {
      ...PostsRequirements
    }
  }
`

export default function NotesPage({ data }) {
  const {
    site: {
      siteMetadata: { author },
    },
    notes,
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{`Notes by ${author}`}</title>
      </Helmet>
      <Posts allMarkdownRemark={notes} />
    </Layout>
  )
}
