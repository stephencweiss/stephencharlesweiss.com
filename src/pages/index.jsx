import React from 'react'
import { graphql, Link } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Blog  from './blog'

class MainIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Code Comments"
          description={data.site.siteMetadata.description}
          keywords={data.site.siteMetadata.keywords}
        />
        <Link to={'/blog'}>Blog</Link>
        <Bio />
      </Layout>
    )
  }
}

export default MainIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
    allMarkdownRemark(filter: { fields: { isPublished: { eq: true } } }) {
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
