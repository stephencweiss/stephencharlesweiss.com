import React from 'react'
import { graphql } from 'gatsby'
import {Bio, Layout, PostTitleLink, SEO} from '../components'
import useSiteMetadata from '../hooks/useSiteMetadata'

function Lists(props) {
  const { data } = props
  const { title: siteTitle } = useSiteMetadata()
  const list = data.lists.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Lists" keywords={['reading', 'books']} />
      {list.map(({ node }) => {
        const { title } = node.frontmatter
        const { slug } = node.fields
        return (
          <div key={slug}>
            <PostTitleLink slug={slug} title={title} />
          </div>
        )
      })}

      <Bio />
    </Layout>
  )
}

export default Lists

export const pageQuery = graphql`
  query {
    lists: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "list" } } }
      sort: { fields: frontmatter___title }
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
