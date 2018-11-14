import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'
import urlFromTag from '../utils/urlFromTag'
import classes from './post.module.scss'
import formatDate from 'date-fns/format'
import Disqus from 'disqus-react'

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        baseUrl
        disqusShortname
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        slug
      }
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
    const {
      markdownRemark,
      site: { siteMetadata },
    } = data
    const { fields, frontmatter, html, timeToRead } = markdownRemark
    const { timeToWatch } = frontmatter
    const attachments = frontmatter.attachments || []
    const tags = frontmatter.tags || []

    const disqusConfig = {
      url: `${siteMetadata.baseUrl}${window.location.pathname.replace(
        /\/+$/,
        '',
      )}`,
      identifier: fields.slug,
      title: frontmatter.title,
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${frontmatter.title} - ${siteMetadata.title}`}</title>
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
          <article
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <article className={classes.comments}>
            {this.state.showComments ? (
              <Disqus.DiscussionEmbed
                shortname={siteMetadata.disqusShortname}
                config={disqusConfig}
              />
            ) : (
              <button
                className={classes.showComments}
                onClick={this.showComments}
              >
                Show{' '}
                <Disqus.CommentCount
                  shortname={siteMetadata.disqusShortname}
                  config={disqusConfig}
                >
                  comments
                </Disqus.CommentCount>
              </button>
            )}
          </article>
        </section>
      </Layout>
    )
  }
}
