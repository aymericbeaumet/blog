import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import classes from './about-aymeric-beaumet.module.scss'
import ExternalLink from '../components/external-link'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        position
        title
        linkedin
        github
        stackoverflow
      }
    }
  }
`

export default function AboutAymericBeaumet({ data }) {
  const {
    site: {
      siteMetadata: { author, position, linkedin, github, stackoverflow },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{author}</title>
      </Helmet>
      <section className={classes.About}>
        <img alt="Aymeric Beaumet" src="/aymericbeaumet.jpg" />
        <h1>Hey traveler,</h1>
        <h2>Welcome to my part of the internet</h2>

        <p>
          {'My name is '}
          <strong>{author}</strong>
          {'. I am a '}
          <ExternalLink href={linkedin}>{position}</ExternalLink>
          {
            ' working on back-end systems with a focus on flexibility, resilience, and high availability.'
          }
        </p>

        <p>
          {'I am '}
          <strong>passionate about computer science</strong>
          {
            ', and it has been so since I was 13. I am now lucky enough to live from that passion.'
          }
        </p>

        <p>
          {'I am '}
          <strong>an enthusiast learner.</strong>
          {
            ' I firmly believe that struggling is the best way to progress. The more complex the problem is, the more I enjoy working it out.'
          }
        </p>

        <p>
          {'I am '}
          <strong>modestly trying to make the world a better place.</strong>
          {' I '}
          <ExternalLink href={github}>maintain</ExternalLink>
          {' some open-source projects, do my best to '}
          <ExternalLink href={stackoverflow}>advise</ExternalLink>
          {' people and '}
          <Link to="/articles">write</Link>
          {' or '}
          <Link to="/talks">speak</Link>
          {' about my experiences.'}
        </p>

        <p>Let’s get in touch! I am curious to hear from you.</p>

        <p>
          Best,
          <br />
          Aymeric
        </p>
      </section>
    </Layout>
  )
}
