import classes from './title.module.scss'
import React from 'react'

export default function Title({ children, }) {
  return <h1 className={classes.Title}>{children}</h1>
}
