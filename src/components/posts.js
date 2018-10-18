import React from 'react'
import { graphql, Link, } from 'gatsby'
import urlFromTag from '../utils/urlFromTag'
import classes from './posts.module.scss'

export const componentFragment = graphql`
  fragment PostsRequirements on MarkdownRemarkConnection {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          tags
        }
      }
    }
  }
`

export default function Posts({ allMarkdownRemark, }) {
  const posts = [
    ...allMarkdownRemark.edges,
    ...allMarkdownRemark.edges,
    ...allMarkdownRemark.edges,
  ].map(({ node: { fields: { slug, }, frontmatter: { title, tags, }, }, }) => (
    <li className={classes.post} key={slug}>
      <Link to={slug}>
        <img src="https://cdn.pixabay.com/photo/2016/12/05/11/39/fox-1883658_1280.jpg" />
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
  ))
  return (
    <section className={classes.Posts}>
      <ul className={classes.postsList}>{posts}</ul>
    </section>
  )
}
