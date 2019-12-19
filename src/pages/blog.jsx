import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Search } from '../components/Search'
import PostLink from '../components/PostLink'
import useSiteMetadata from '../hooks/useSiteMetadata'
import sortPosts from '../utils/sortPosts'
import getBlurb from '../utils/getBlurb'

function BlogIndex(props) {
  const { data } = props
  const { title: siteTitle } = useSiteMetadata()
  const posts = data.allMarkdownRemark.edges.sort(sortPosts)

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Search />
      {posts.map(({ node }) => {
        const { title } = node.frontmatter
        const { listDate, slug } = node.fields
        return (
          <div key={slug}>
            <PostLink slug={slug} title={title} />
            <small>{listDate}</small>
            {getBlurb({ content: node.excerpt, path: slug })}
          </div>
        )
      })}
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query getBlogData {
    allMarkdownRemark(
      filter: {
        fields: { isPublished: { eq: true }, sourceInstance: { eq: "blog" } }
      }
    ) {
      edges {
        node {
          excerpt(format: MARKDOWN)
          fields {
            slug
            listDate(formatString: "MMMM DD, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
