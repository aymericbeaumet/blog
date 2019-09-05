import React from 'react'
import format from 'date-fns/format'
import classes from './date.module.scss'

export default function DateComponent({ date, until } = {}) {
  const ddate = date ? new Date(date) : null
  const duntil = until ? new Date(until) : null
  if (ddate && duntil) {
    const dateYear = ddate.getFullYear()
    const untilYear = duntil.getFullYear()
    const duration = Math.max(untilYear - dateYear, 1)
    return (
      <time
        className={classes.DateComponent}
        dateTime={ddate}
        title={`${duration} ${duration !== 1 ? 'years' : 'year'}`}
      >
        {`${format(ddate, 'yyyy')}–${format(duntil, 'yyyy')}`}
      </time>
    )
  }
  if (ddate) {
    return (
      <time
        className={classes.DateComponent}
        dateTime={ddate}
        title={format(ddate, 'PPPP, pp')}
      >
        {format(ddate, 'yyyy MMM do')}
      </time>
    )
  }
  return null
}
