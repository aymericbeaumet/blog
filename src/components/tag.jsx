import React from 'react'
import { Link } from 'gatsby'
import urlFromTag from '../utils/urlFromTag'
import slugFromTag from '../utils/slugFromTag'

export default function Tag({ tag }) {
  const tagSlug = slugFromTag(tag)
  return <Link to={urlFromTag(tag)}>{`#${tagSlug}`}</Link>
}
