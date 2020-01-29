import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Bio, Layout, PageNavigation, SEO, Title } from '../components'
import { useSiteMetadata } from '../hooks'

const Date = styled.p`
    color: #999;
    margin-bottom: 0;
  }`

const Entry = styled.div`
  #resources + ul > li,
  #footnotes + ul > li {
    list-style: none;
  }
`

function EntryTemplate(props) {
  const entry = props.data.markdownRemark
  const { title: siteTitle } = useSiteMetadata()
  const { previous, next } = props.pageContext
  const { date, publish, title } = entry.frontmatter

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={title} description={entry.excerpt} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Date>{publish ? publish : date}</Date>
        <Title>{title}</Title>
      </div>
      <Entry
        className={'entry'}
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
      <hr />
      <Bio />
      <PageNavigation previous={previous} next={next} />
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
