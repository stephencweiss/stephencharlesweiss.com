import React from 'react'
import { graphql } from 'gatsby'
import PostLink from '../components/PostLink'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import sortTitles from '../utils/sortTitles'
import useSiteMetadata from '../hooks/useSiteMetadata'

function ReadingList(props) {
  const { data } = props
  const { title: siteTitle } = useSiteMetadata()

  const list = data.readingList.edges.sort(sortTitles)
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Lists" keywords={['reading', 'books']} />
      {list.map(({ node }) => {
        const { title } = node.frontmatter
        const { slug } = node.fields
        return (
          <div key={slug}>
            <PostLink slug={slug} title={title} />
          </div>
        )
      })}

      <Bio />
    </Layout>
  )
}

export default ReadingList

export const pageQuery = graphql`
  query {
    readingList: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "list" } } }
    ) {
      edges {
        node {
          excerpt(format: MARKDOWN)
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
