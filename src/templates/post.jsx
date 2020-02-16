import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Disqus from 'disqus-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons'
import Layout from '../components/layout'
import 'prismjs/themes/prism-coy.css'
import classes from './post.module.scss'
import Duration from '../components/duration'
import DateComponent from '../components/date'
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
        title
        tags
        timeToWatch
        attachments {
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
      html,
      timeToRead,
      fields: { slug, fileRelativePath },
      frontmatter: {
        date,
        title,
        timeToWatch,
        tags = [],
        attachments = [],
      },
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
          <ul className={classes.info}>
            <li>
              <Link
                title="Learn more about Aymeric Beaumet"
                to="/about-aymeric-beaumet"
              >
                <img alt={author} src={aymericBeaumetProfile} />
                {author}
              </Link>
              &nbsp;・
            </li>
            <li>
              &nbsp;
              <DateComponent date={date} />
              &nbsp;・
            </li>
            <li>
              &nbsp;
              {Duration({ timeToRead, timeToWatch })}
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
          {tags && tags.length > 0 ? (
            <ul className={classes.tags}>
              {tags.map(tag => (
                <li key={tag}>
                  <Tag tag={tag} />
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
            <h1 id="attachments">Attachments</h1>
            <ul>
              {attachments.map(({ publicURL, name, extension }) => (
                <a className={classes.attachment} href={publicURL}>
                  <li>
                    <FontAwesomeIcon width="32px" height="32px" icon={faSave} />
                    {`${name}.${extension}`}
                  </li>
                </a>
              ))}
            </ul>
          </section>
        ) : null}
        <section className={classes.comments}>
          <h1 id="comments">Comments</h1>
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </section>
      </section>
    </Layout>
  )
}
