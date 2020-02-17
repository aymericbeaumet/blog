import React from 'react'
import { graphql, Link } from 'gatsby'
import classes from './notes.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'

export const componentFragment = graphql`
  fragment NotesRequirements on MarkdownRemarkConnection {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
`

export default function Notes({ allMarkdownRemark }) {
  const posts = allMarkdownRemark.edges.map(
    ({
      node: {
        fields: { slug },
      },
    }) => (
      <li className={classes.note} key={slug}>
        <Link to={slug}>
          <FontAwesomeIcon
            width="32px"
            height="32px"
            icon={faFileAlt}
          />
          {slug}.md
        </Link>
      </li>
    ),
  )
  return (
    <section className={classes.Notes}>
      <ul className={classes.notesList}>{posts}</ul>
    </section>
  )
}
