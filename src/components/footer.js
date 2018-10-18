import classes from './footer.module.scss'
import React from 'react'

function Footer() {
  return (
    <footer className={classes.Footer}>
      <p>
        <strong>Aymeric Beaumet</strong>
        {', Software Engineer, Currently living in Paris'}
      </p>
    </footer>
  )
}

export default Footer
