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
    const {
      data: {
        site: {
          siteMetadata: { baseUrl, disqusShortname, title: siteTitle },
        },
        markdownRemark: {
          fields: { slug },
          frontmatter: {
            date,
            title,
            timeToWatch,
            tags = [],
            attachments = [],
          },
          html,
          timeToRead,
        },
      },
    } = this.props
    const disqusConfig = {
      url: `${baseUrl}/${slug}`,
      identifier: slug,
      title,
    }
    return (
      <Layout>
        <Helmet>
          <title>{`${title} - ${siteTitle}`}</title>
        </Helmet>
        <section className={classes.Post}>
          <header>
            <h1>{title}</h1>
            <ul>
              <li>
                <time>{formatDate(date, 'YYYY MMM. Do')}</time>
              </li>
              <li>
                <time dateTime={`${timeToWatch || timeToRead}m`}>
                  {timeToWatch
                    ? `${timeToWatch}min. watch`
                    : `${timeToRead}min. read`}
                </time>
              </li>
              {tags && tags.length > 0 ? (
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
              {attachments && attachments.length > 0 ? (
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
                shortname={disqusShortname}
                config={disqusConfig}
              />
            ) : (
              <button
                className={classes.showComments}
                onClick={this.showComments}
              >
                Show{' '}
                <Disqus.CommentCount
                  shortname={disqusShortname}
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
