import React from 'react'
import format from 'date-fns/format'
import classes from './date.module.scss'

export default function DateComponent({ date, until } = {}) {
  if (date && until) {
    return (
      <time className={classes.DateComponent} dateTime={date}>
        {`${format(date, 'YYYY')}–${format(until, 'YYYY')}`}
      </time>
    )
  }
  if (date) {
    return (
      <time className={classes.DateComponent} dateTime={date}>
        {format(date, 'YYYY MMM Do')}
      </time>
    )
  }
  return null
}
