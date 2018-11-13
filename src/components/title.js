import classes from './title.module.scss'
import React from 'react'

export default function Title({ children }) {
  return (
    <div className={classes.Title}>
      <h1>{children}</h1>
    </div>
  )
}
