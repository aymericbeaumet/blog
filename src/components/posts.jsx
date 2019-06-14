import React from 'react'
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import formatDate from 'date-fns/format'
import urlFromTag from '../utils/urlFromTag'
import classes from './posts.module.scss'
import Timer from '../images/timer.svg'

export const componentFragment = graphql`
  fragment PostsRequirements on MarkdownRemarkConnection {
    edges {
      node {
        fields {
          slug
        }
        timeToRead
        frontmatter {
          title
          tags
          timeToWatch
          githubStars
          date
          until
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 255) {
                base64
                src
                srcSet
                sizes
              }
            }
          }
        }
      }
    }
  }
`

export default function Posts({ allMarkdownRemark }) {
  const posts = allMarkdownRemark.edges.map(
    ({
      node: {
        fields: { slug },
        frontmatter: {
          title,
          tags,
          thumbnail,
          timeToWatch,
          githubStars,
          date,
          until,
        },
        timeToRead,
      },
    }) => (
      <li className={classes.post} key={slug}>
        <Link to={slug}>
          {thumbnail ? (
            <div className={classes.thumbnail}>
              <Img fluid={thumbnail.childImageSharp.fluid} alt={title} />
            </div>
          ) : null}
          <h2>{title}</h2>
          {date && until ? (
            <time className={classes.date} dateTime={date}>
              {`${formatDate(date, 'YYYY')}–${formatDate(until, 'YYYY')}`}
            </time>
          ) : date ? (
            <time className={classes.date} dateTime={date}>
              {formatDate(date, 'YYYY MMM Do')}
            </time>
          ) : null}
          {githubStars ? (
            <div className={classes.stars}>
              <FontAwesomeIcon icon={faStar} />
              {githubStars}
            </div>
          ) : timeToWatch ? (
            <time className={classes.duration} dateTime={timeToWatch}>
              <Timer />
              {`${timeToWatch} min watch`}
            </time>
          ) : timeToRead ? (
            <time className={classes.duration} dateTime={timeToRead}>
              <Timer />
              {`${timeToRead} min read`}
            </time>
          ) : null}
        </Link>
        <ul className={classes.tagsList}>
          {tags.map(tag => (
            <li className={classes.tag} key={tag}>
              <Link to={urlFromTag(tag)}>{`#${tag}`}</Link>
            </li>
          ))}
        </ul>
      </li>
    ),
  )
  return (
    <section className={classes.Posts}>
      <ul className={classes.postsList}>{posts}</ul>
    </section>
  )
}
