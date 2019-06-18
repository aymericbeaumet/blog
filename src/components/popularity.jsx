import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import classes from './popularity.module.scss'
import ExternalLink from './external-link'

export default function Popularity({ github, githubStars } = {}) {
  if (githubStars) {
    const children = (
      <>
        <FontAwesomeIcon icon={faStar} />
        {githubStars}
      </>
    )
    if (github) {
      return <ExternalLink href={github}>{children}</ExternalLink>
    }
    return <div className={classes.Popularity}>{children}</div>
  }
  return null
}
