import React from 'react'
import { graphql } from 'gatsby'
import {
  EntryCard,
  Bio,
  Layout,
  Search,
  SEO,
  PageNavigation,
} from '../components'
import useSiteMetadata from '../hooks/useSiteMetadata'

function MainIndex(props) {
  const { data } = props
  const { title } = useSiteMetadata()
  const posts = data.allMarkdownRemark.edges //.sort(sortPosts)

  return (
    <Layout location={props.location} title={title}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Search />
      {posts.map(({ node }) => (
        <EntryCard key={node.frontmatter.slug} node={node} />
      ))}
      <PageNavigation next={`/blog/1`} />
      <Bio />
    </Layout>
  )
}

export default MainIndex

export const pageQuery = graphql`
  query indexBlogQuery {
    allMarkdownRemark(
      filter: {
        fields: { isPublished: { eq: true }, sourceInstance: { eq: "blog" } }
      }
      limit: 6 # NOTE: value for limit is the same as ENTRIES_PER_PAGE; cannot string interpolate w/in graphql function
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
            date
            publish
            updated
          }
        }
      }
    }
  }
`
