import React from 'react'
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby'
import classes from './posts.module.scss'
import Duration from './duration'
import Popularity from './popularity'
import DateComponent from './date'
import Tag from './tag'

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
          <figure>
            <Img fluid={thumbnail.childImageSharp.fluid} alt={title} />
            <figcaption>
              {DateComponent({ date, until })}
              {Popularity({ githubStars }) ||
                Duration({ timeToRead, timeToWatch })}
            </figcaption>
          </figure>
          <h2>{title}</h2>
        </Link>
        <ul className={classes.tagsList}>
          {tags.map(tag => (
            <li className={classes.tag} key={tag}>
              <Tag tag={tag} />
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
