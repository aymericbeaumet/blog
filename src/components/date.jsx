import React from 'react'
import formatDate from 'date-fns/format'
import classes from './date.module.scss'

export default function DateComponent({ date, until } = {}) {
  if (date && until) {
    return (
      <time className={classes.DateComponent} dateTime={date}>
        {`${formatDate(date, 'YYYY')}–${formatDate(until, 'YYYY')}`}
      </time>
    )
  }
  if (date) {
    return (
      <time className={classes.DateComponent} dateTime={date}>
        {formatDate(date, 'YYYY MMM Do')}
      </time>
    )
  }
  return null
}
