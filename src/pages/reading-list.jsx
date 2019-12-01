import React from 'react'
import { graphql } from 'gatsby'
import PostLink from '../components/PostLink'
import Bio from '../components/Bio'
import Layout from '../components/Layout'

function ReadingList (props) {
    const { data } = props
    const siteTitle = data.site.siteMetadata.title
    const list = data.readingList.edges

    return (
      <Layout location={props.location} title={siteTitle}>
        {list.map(({ node }) => {
          const { title } = node.frontmatter
          const { slug } = node.fields
          return (
            <div key={slug}>
              <PostLink slug={slug} title={title} />
              <p dangerouslySetInnerHTML={{ __html: node.html }} />
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
    readingList: allMarkdownRemark (filter: { frontmatter: { category: {eq: "reading list"}}}) {
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
