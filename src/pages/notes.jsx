import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Notes from '../components/notes'
import Layout from '../components/layout'

export const query = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
    notes: allMarkdownRemark(
      filter: { fields: { categorySlug: { eq: "note" } } }
    ) {
      ...NotesRequirements
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
      <Notes allMarkdownRemark={notes} />
    </Layout>
  )
}
