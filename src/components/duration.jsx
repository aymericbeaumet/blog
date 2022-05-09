import React from 'react'
import Timer from '../images/timer.svg'
import * as classes from './duration.module.scss'

export default function Duration({ timeToRead, timeToWatch } = {}) {
  if (typeof timeToWatch === 'number') {
    return (
      <time
        className={classes.Duration}
        dateTime={`${timeToWatch}m`}
        title={`Estimated watch of ${timeToWatch} ${
          timeToWatch !== 1 ? 'minutes' : 'minute'
        }`}
      >
        <Timer />
        {`${timeToWatch} min watch`}
      </time>
    )
  }
  if (typeof timeToRead === 'number') {
    return (
      <time
        className={classes.Duration}
        dateTime={`${timeToRead}m`}
        title={`Estimated read of ${timeToRead} ${
          timeToRead !== 1 ? 'minutes' : 'minute'
        }`}
      >
        <Timer />
        {`${timeToRead} min read`}
      </time>
    )
  }
  return null
}
