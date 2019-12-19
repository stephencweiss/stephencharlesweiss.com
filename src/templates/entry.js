import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import useSiteMetadata from '../hooks/useSiteMetadata'
// import { rhythm, scale } from '../utils/typography'
// TODO: Style
function EntryTemplate(props) {

  const entry = props.data.markdownRemark
  const { title: siteTitle } = useSiteMetadata()
  const { previous, next } = props.pageContext
  const { date, publish, title } = entry.frontmatter

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={title} description={entry.excerpt} />
      <h1>{title}</h1>
      <p
        style={{
        //   ...scale(-1 / 5),
          display: `block`,
        //   marginBottom: rhythm(1),
        //   marginTop: rhythm(0),
        }}
      >
        {publish ? publish : date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: entry.html }} />
      <hr
        style={{
        //   marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              &lArr; {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} &rArr;
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default EntryTemplate

export const pageQuery = graphql`
  query EntryBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        publish(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
