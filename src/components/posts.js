import React from 'react'
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby'
import urlFromTag from '../utils/urlFromTag'
import classes from './posts.module.scss'

export const componentFragment = graphql`
  fragment PostsRequirements on MarkdownRemarkConnection {
    edges {
      node {
        fields {
          slug
          categorySlug
        }
        frontmatter {
          title
          tags
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
        fields: { slug, categorySlug },
        frontmatter: { title, tags, thumbnail },
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
        </Link>
        <ul className={classes.tagsList}>
          {tags.map(tag => (
            <li className={classes.tag} key={tag}>
              <Link to={urlFromTag(tag)}>#{tag}</Link>
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
