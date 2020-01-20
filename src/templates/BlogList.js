import React from 'react'
import { graphql } from 'gatsby'

import {Bio, Layout, PostLink, PostNavigation, SEO, Search} from '../components'
import { useSiteMetadata } from '../hooks'
import { getBlurb } from '../utils'

function BlogList(props) {
  const { data } = props
  const { previousPage: previous, nextPage: next } = props.pageContext
  const { title: siteTitle } = useSiteMetadata()
  const posts = data.allMarkdownRemark.edges
  console.log(`Props --> `,{ props, previous, next, posts, siteTitle })
  console.log(`What's coming through ->`, {Bio, Layout, PostLink, PostNavigation, SEO})

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      {/* <Search /> */}
      {posts.map(({ node }) => {
        const { title } = node.frontmatter
        const { listDate, slug } = node.fields
        if (!title || !listDate || !slug) return <>missing info</>
        return (
          <div key={slug}>
            <PostLink slug={slug} title={title} />
            <small>{listDate}</small>
            {getBlurb({ content: node.excerpt, path: slug })}
          </div>
        )
      })}

      <PostNavigation previous={previous} next={next} />
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
      #sort: { order: [DESC] fields: [fields___listDate]}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(format: PLAIN)
          fields {
            slug
            # listDate(formatString: "MMMM DD, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
