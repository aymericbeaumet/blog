import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import classes from './popularity.module.scss'
import ExternalLink from './external-link'

export default function Popularity({ github, githubStars } = {}) {
  if (githubStars) {
    const title = `${githubStars} ${
      githubStars !== 1 ? 'stars' : 'star'
    } on GitHub`
    const children = (
      <>
        <FontAwesomeIcon width="32px" height="32px" icon={faStar} />
        {githubStars}
      </>
    )
    if (github) {
      return (
        <ExternalLink
          title={title}
          className={classes.Popularity}
          href={github}
        >
          {children}
        </ExternalLink>
      )
    }
    return (
      <span title={title} className={classes.Popularity}>
        {children}
      </span>
    )
  }
  return null
}
