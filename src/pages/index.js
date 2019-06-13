import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import classes from './index.module.scss'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        position
        title
      }
    }
  }
`

export default function Index({ data }) {
  const {
    site: {
      siteMetadata: { author, position },
    },
  } = data
  return (
    <Layout>
      <section className={classes.Index}>
        <h1>Hey traveler,</h1>
        <h2>Welcome on my part of the internet</h2>

        <p>
          {`My name is ${author}. I am a `}
          <a
            href="https://www.linkedin.com/in/aymericbeaumet/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {position}
          </a>
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
          <a
            href="https://github.com/aymericbeaumet"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            maintain
          </a>
          {' some open-source projects, do my best to '}
          <a
            href="https://stackoverflow.com/users/1071486/aymericbeaumet?tab=profile"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            advise
          </a>
          {' people and '}
          <Link to="/articles">write</Link> or <Link to="/talks">speak</Link>
          {' about my experiences.'}
        </p>

        <p>Let’s get in touch! I am curious to hear from you.</p>
      </section>
    </Layout>
  )
}
