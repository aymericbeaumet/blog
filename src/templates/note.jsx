import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import 'prismjs/themes/prism-coy.css'
import * as classes from './note.module.scss'

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        slug
        fileRelativePath
      }
    }
  }
`

export default function Note({ data }) {
  const {
    markdownRemark: {
      html,
      fields: { slug },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{`/notes/${slug}.md`}</title>
      </Helmet>
      <section className={classes.Note}>
        <header>
          <ul>
            <li className={classes.slash}>/</li>
            <li>
              <Link to="/notes">notes</Link>
            </li>
            <li className={classes.slash}>/</li>
            <li>
              <h1>{`${slug}.md`}</h1>
            </li>
          </ul>
        </header>
        <article
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
        />
      </section>
    </Layout>
  )
}
