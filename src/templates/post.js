import React from 'react'
import { Link, graphql, } from 'gatsby'
import Layout from '../components/layout'
import { Helmet, } from 'react-helmet'
import urlFromTag from '../utils/urlFromTag'
import classes from './post.module.scss'
import LeftArrow from '../images/left-arrow.svg'

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        timeToWatch
        attachments {
          id
          publicURL
          name
          extension
        }
      }
    }
  }
`

export default function Post({ data, }) {
  const { markdownRemark, } = data
  const { frontmatter, html, timeToRead, } = markdownRemark
  const { timeToWatch, } = frontmatter
  const attachments = frontmatter.attachments || []
  const tags = frontmatter.tags || []
  return (
    <Layout>
      <Helmet>
        <title>{`${frontmatter.title} - ${
          data.site.siteMetadata.title
        }`}</title>
      </Helmet>
      <section className={classes.Post}>
        <LeftArrow onClick={() => window.history.back()} />
        <h1>{frontmatter.title}</h1>
        <time>{frontmatter.date}</time>
        {timeToWatch ? (
          <p>
            {timeToWatch}
            min. watch
          </p>
        ) : (
          <p>
            {timeToRead}
            min. read
          </p>
        )}
        {tags.length > 0 ? (
          <React.Fragment>
            <p>Tags</p>
            <ul>
              {tags.map(tag => (
                <li key={tag}>
                  <Link to={urlFromTag(tag)}>{tag}</Link>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ) : null}
        {attachments.length > 0 ? (
          <React.Fragment>
            <p>Attachments</p>
            <ul>
              {attachments.map(({ id, publicURL, name, extension, }) => (
                <li key={id}>
                  <a href={publicURL}>
                    {name}.{extension}
                  </a>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ) : null}
        <section
          className="post-content"
          dangerouslySetInnerHTML={{ __html: html, }}
        />
      </section>
    </Layout>
  )
}
