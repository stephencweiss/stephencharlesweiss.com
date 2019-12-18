import React from 'react'
import { graphql } from 'gatsby'
import PostLink from '../components/PostLink'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Header from '../components/Header'

function ReadingList(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const list = data.readingList.edges

  console.log({ list })

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
    site {
      siteMetadata {
        title
      }
    }
    readingList: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "list" } } }
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
