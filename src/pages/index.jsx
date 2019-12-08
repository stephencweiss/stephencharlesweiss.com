import React from 'react'
import { graphql, Link } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Header from '../components/Header'
import PostLink from '../components/PostLink'
import sortPosts from '../utils/sortPosts'
import getBlurb from '../utils/getBlurb'

import useSiteMetadata from '../hooks/useSiteMetadata'

function BlogIndex(props) {
  const { data } = props
  const { title } = useSiteMetadata()

  const posts = data.allMarkdownRemark.edges.sort(sortPosts)
  return (
    <Layout location={props.location} title={title}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Header />
      {posts.map(({ node }) => {
        const { date, publish, title } = node.frontmatter
        const { slug } = node.fields
        return (
          <div key={slug}>
            <PostLink slug={slug} title={title} />
            <small>{publish ? publish : date}</small>
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
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            publish(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
