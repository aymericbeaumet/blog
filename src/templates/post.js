import React from 'react'
import { Link, graphql, } from 'gatsby'
import Layout from '../components/layout'
import { Helmet, } from 'react-helmet'
import urlFromTag from '../utils/urlFromTag'
import './post.scss'
import Title from '../components/title'

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
      <div className="post">
        <Title>{frontmatter.title}</Title>
        <time>{frontmatter.date}</time>
        {timeToWatch ? (
          <p>{timeToWatch} minutes (watch)</p>
        ) : (
          <p>{timeToRead} minutes (read)</p>
        )}
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
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: html, }}
        />
      </div>
    </Layout>
  )
}
