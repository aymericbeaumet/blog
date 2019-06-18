import React from 'react'
import format from 'date-fns/format'
import classes from './date.module.scss'

export default function DateComponent({ date, until } = {}) {
  if (date && until) {
    const dateYear = new Date(date).getFullYear()
    const untilYear = new Date(until).getFullYear()
    const duration = Math.max(untilYear - dateYear, 1)
    return (
      <time
        className={classes.DateComponent}
        dateTime={date}
        title={`${duration} ${duration !== 1 ? 'years' : 'year'}`}
      >
        {`${format(date, 'YYYY')}–${format(until, 'YYYY')}`}
      </time>
    )
  }
  if (date) {
    return (
      <time
        className={classes.DateComponent}
        dateTime={date}
        title={format(date, 'dddd, MMMM DD, YYYY, HH:mm:ss A')}
      >
        {format(date, 'YYYY MMM Do')}
      </time>
    )
  }
  return null
}
