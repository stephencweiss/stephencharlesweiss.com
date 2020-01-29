import React from 'react'
import { graphql } from 'gatsby'
import {
  Bio,
  EntryCard,
  Layout,
  PageNavigation,
  SEO,
  Search,
} from '../components'
import { useSiteMetadata } from '../hooks'

function BlogList(props) {
  const { data } = props
  const { previousPage: previous, nextPage: next } = props.pageContext
  const { title: siteTitle } = useSiteMetadata()
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Search />
      {posts.map(({ node }) => (
        <EntryCard key={node.frontmatter.slug} node={node} />
      ))}

      <PageNavigation previous={previous} next={next} />
      <Bio />
    </Layout>
  )
}

export default BlogList

export const pageQuery = graphql`
  query getPaginatedBlogData($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: {
        fields: { isPublished: { eq: true }, sourceInstance: { eq: "blog" } }
      }
      sort: { order: [DESC], fields: [fields___listDate] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(format: PLAIN)
          fields {
            slug
            listDate
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
