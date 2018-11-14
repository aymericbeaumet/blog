import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'
import urlFromTag from '../utils/urlFromTag'
import classes from './post.module.scss'
import formatDate from 'date-fns/format'

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

export default class Post extends React.Component {
  state = {
    showComments: false,
  }

  showComments = () => this.setState({ showComments: true })

  render() {
    const { data } = this.props
    const { markdownRemark } = data
    const { frontmatter, html, timeToRead } = markdownRemark
    const { timeToWatch } = frontmatter
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
          <header>
            <h1>{frontmatter.title}</h1>
            <ul>
              <li>
                <time>{formatDate(frontmatter.date, 'YYYY MMM. Do')}</time>
              </li>
              <li>
                <time dateTime={`${timeToWatch || timeToRead}m`}>
                  {timeToWatch
                    ? `${timeToWatch}min. watch`
                    : `${timeToRead}min. read`}
                </time>
              </li>
              {tags.length > 0 ? (
                <li className={classes.tags}>
                  <ul>
                    {tags.map(tag => (
                      <li key={tag}>
                        <Link to={urlFromTag(tag)}>#{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : null}
              {attachments.length > 0 ? (
                <li className={classes.files}>
                  <ul>
                    {attachments.map(({ id, publicURL, name, extension }) => (
                      <li key={id}>
                        <a href={publicURL}>
                          @{name}.{extension}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : null}
            </ul>
          </header>
          <section
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      </Layout>
    )
  }
}
