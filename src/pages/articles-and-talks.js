import Posts from '../components/posts'
import React from 'react'
import Layout from '../components/layout'
import Helmet from 'react-helmet'
import { graphql, } from 'gatsby'
import classes from './articles-and-talks.module.scss'
import Title from '../components/title'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { categorySlug: { eq: "article" } } }
    ) {
      ...PostsRequirements
    }
    talks: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { categorySlug: { eq: "talk" } } }
    ) {
      ...PostsRequirements
    }
  }
`

export default function ArticlesAndTalks({ data, }) {
  return (
    <Layout>
      <Helmet>
        <title>{`Articles & Talks by ${data.site.siteMetadata.title}`}</title>
      </Helmet>
      <section className={classes.ArticlesAndTalks}>
        <Title>Articles</Title>
        <Posts allMarkdownRemark={data.articles} />
        <Title>Talks</Title>
        <Posts allMarkdownRemark={data.talks} />
      </section>
    </Layout>
  )
}
