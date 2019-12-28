import React from 'react'
import { graphql } from 'gatsby'
import PostLink from '../components/PostLink'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import sortTitles from '../utils/sortTitles'
import useSiteMetadata from '../hooks/useSiteMetadata'

function Books(props) {
  const { data } = props
  const { title: siteTitle } = useSiteMetadata()
    console.log({data})
  const books = data.books.edges.sort(sortTitles)
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Books" keywords={['reading', 'notes', 'books']} />
      {books.map(({ node }) => {
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

export default Books

export const pageQuery = graphql`
  query {
    books: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "books" } } }
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
