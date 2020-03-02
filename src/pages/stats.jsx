import React from 'react'
import { graphql } from 'gatsby'
import PostLink from '../components/PostLink'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import useSiteMetadata from '../hooks/useSiteMetadata'

function Stats(props) {
  const { data } = props
  const { title: siteTitle } = useSiteMetadata()
  const stats = data.stats.edges
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Stats Page" keywords={['stats','analytics']} />
      {stats.map(({ node }) => {
        const { title } = node.frontmatter
        const { slug } = node.fields
        return (
          <div key={slug}>
            <PostLink slug={slug} title={title || slug} />
          </div>
        )
      })}

      <Bio />
    </Layout>
  )
}

export default Stats

export const pageQuery = graphql`
  query {
    stats: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "stats" } } }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
