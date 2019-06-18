import React from 'react'
import Timer from '../images/timer.svg'
import classes from './duration.module.scss'

export default function Duration({ timeToRead, timeToWatch } = {}) {
  if (timeToWatch) {
    return (
      <time className={classes.duration} dateTime={timeToWatch}>
        <Timer />
        {`${timeToWatch} min watch`}
      </time>
    )
  }
  if (timeToRead) {
    return (
      <time className={classes.duration} dateTime={timeToRead}>
        <Timer />
        {`${timeToRead} min read`}
      </time>
    )
  }
  return null
}
