import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { useSiteMetadata } from '../hooks'
import { EntryCard, Layout } from '../components'

const Tags = ({ data, location, pageContext }) => {
  const { tag } = pageContext
  const { edges: posts, totalCount } = data.allMarkdownRemark
  const { title: siteTitle } = useSiteMetadata()

  // TODO: Better pluralization practice
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout title={siteTitle} location={location}>
      <h1>{tagHeader}</h1>
      <ul>
        {posts.map(({ node }) => (
          <EntryCard key={node.frontmatter.slug} node={node} />
        ))}
      </ul>
      <Link to="/tags">Return to all tags</Link>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: {
        fields: [fields___listDate, frontmatter___publish]
        order: [DESC, DESC]
      }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
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
