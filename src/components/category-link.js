import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

function CategoryLink({ activeClassName, categorySlug, data, ...props }) {
  return (
    <Link
      getProps={_props => {
        const isActive =
          _props.isCurrent ||
          _props.isPartiallyCurrent ||
          data.allMarkdownRemark.edges.some(
            edge =>
              edge.node.fields.categorySlug === categorySlug &&
              _props.location.pathname.includes(edge.node.fields.slug),
          )
        return isActive ? { className: activeClassName } : null
      }}
      {...props}
    />
  )
}

export default function(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                  categorySlug
                }
              }
            }
          }
        }
      `}
      render={data => <CategoryLink data={data} {...props} />}
    />
  )
}
