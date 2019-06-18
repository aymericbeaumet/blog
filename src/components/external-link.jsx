import React from 'react'

export default function ExternalLink(props) {
  const {
    children,
    license = false,
    target = '_blank',
    rel = 'nofollow noopener noreferrer',
    ...rest
  } = props
  const relWithLicense = license ? `${rel} license` : rel
  return (
    <a target={target} rel={relWithLicense} {...rest}>
      {children}
    </a>
  )
}
