import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import Layout from '../components/layout'
import 'prismjs/themes/prism-coy.css'
import classes from './note.module.scss'
import Duration from '../components/duration'
import Tag from '../components/tag'
import aymericBeaumetProfile from '../images/aymeric-beaumet-profile.jpg'
import ExternalLink from '../components/external-link'

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        author
        sourceMasterUrl
      }
    }
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
    site: {
      siteMetadata: { author, sourceMasterUrl },
    },
    markdownRemark: {
      html,
      timeToRead,
      fields: { slug, fileRelativePath },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>slug</title>
      </Helmet>
      <section className={classes.Note}>
        <header>
          <h1>./{slug}.md</h1>
          <ul className={classes.info}>
            <li>
              &nbsp;
              {Duration({ timeToRead })}
              &nbsp;・
            </li>
            <li>
              &nbsp;
              <ExternalLink
                title="Edit this page"
                href={`${sourceMasterUrl}/${fileRelativePath}`}
              >
                <FontAwesomeIcon
                  width="32px"
                  height="32px"
                  className={classes.edit}
                  icon={faEdit}
                />
                &nbsp;edit
              </ExternalLink>
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
