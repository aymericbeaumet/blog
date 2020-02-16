import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import classes from './index.module.scss'
import ExternalLink from '../components/external-link'
import aymericBeaumetProfile from '../images/aymeric-beaumet-profile.jpg'

export const query = graphql`
  query {
    site {
      siteMetadata {
        author
        position
        title
        github
        stackoverflow
      }
    }
  }
`

export default function AboutAymericBeaumet({ data }) {
  const {
    site: {
      siteMetadata: { author, position, github, stackoverflow },
    },
  } = data
  return (
    <Layout>
      <Helmet>
        <title>{author} Blog</title>
      </Helmet>
      <section className={classes.About}>
        <img alt={author} src={aymericBeaumetProfile} />
        <h1>Hey traveler,</h1>
        <h2>Welcome to my part of the internet</h2>

        <p>
          {'My name is '}
          <strong>{author}</strong>
          {`. I am a versatile ${position} working on back-end systems with a focus on flexibility, resilience, and high availability.`}
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
          <ExternalLink href={`${github}?tab=repositories&type=source`}>
            maintain
          </ExternalLink>
          {' some open-source projects, do my best to '}
          <ExternalLink href={`${stackoverflow}?tab=anwsers`}>
            help
          </ExternalLink>
          {' people, but also '}
          <Link to="/posts">write</Link>
          {' and '}
          <Link to="/talks">speak</Link>
          {' about my experiences.'}
        </p>

        <p>
          {'I also publicly share '}
          <Link to="/notes">notes</Link>
          {' I take on various topics.'}
        </p>

        <p>
          Best,
          <br />
          Aymeric
        </p>
      </section>
    </Layout>
  )
}
