import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Disqus from 'disqus-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons'
import Layout from '../components/layout'
import urlFromTag from '../utils/urlFromTag'
import 'prismjs/themes/prism-coy.css'
import classes from './post.module.scss'
import Popularity from '../components/popularity'
import Duration from '../components/duration'
import DateComponent from '../components/date'
import ExternalLink from '../components/external-link'

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        author
        sourceMasterUrl
        disqusShortname
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        slug
        fileRelativePath
      }
      frontmatter {
        date
        until
        title
        tags
        timeToWatch
        github
        githubStars
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

export default function Post({ data }) {
  const {
    site: {
      siteMetadata: { siteUrl, author, sourceMasterUrl, disqusShortname },
    },
    markdownRemark: {
      fields: { slug, fileRelativePath },
      frontmatter: {
        date,
        until,
        title,
        timeToWatch,
        tags = [],
        attachments = [],
        github,
        githubStars,
      },
      html,
      timeToRead,
    },
  } = data
  const disqusConfig = {
    url: `${siteUrl}/${slug}`,
    identifier: slug,
    title,
  }
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className={classes.Post}>
        <header>
          <h1>{title}</h1>
          <p className={classes.info}>
            <Link to="/about-aymeric-beaumet">
              <img alt={author} src="/aymericbeaumet.jpg" />
              {author}
            </Link>
            {DateComponent({ date, until })}
            {` ・ ${Popularity({ github, githubStars }) ||
              Duration({ timeToRead, timeToWatch })}`}
            {' ・ '}
            <ExternalLink href={`${sourceMasterUrl}/${fileRelativePath}`}>
              <FontAwesomeIcon icon={faEdit} />
            </ExternalLink>
          </p>
          {tags && tags.length > 0 ? (
            <ul className={classes.tags}>
              {tags.map(tag => (
                <li key={tag}>
                  <Link to={urlFromTag(tag)}>{`#${tag}`}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </header>
        <article
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
        />
        {attachments && attachments.length > 0 ? (
          <section className={classes.attachments}>
            <h1>Attachments</h1>
            <ul>
              {attachments.map(({ publicURL, name, extension }) => (
                <a className={classes.attachment} href={publicURL}>
                  <li>
                    <FontAwesomeIcon icon={faSave} />
                    {`${name}.${extension}`}
                  </li>
                </a>
              ))}
            </ul>
          </section>
        ) : null}
        <section className={classes.comments}>
          <h1>Comments</h1>
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </section>
      </section>
    </Layout>
  )
}
