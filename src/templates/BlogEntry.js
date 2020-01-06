import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import useSiteMetadata from '../hooks/useSiteMetadata'
import PostNavigation from '../components/PostNavigation'

const Date = styled.p`
    color: #999;
    float: left;
    clear: left;
    display: block;
  }`

const Title = styled.h1`
  display: block;
`
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
      <Date>{publish ? publish : date}</Date>
      <Title>{title}</Title>
      <Entry
        className={'entry'}
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
      <hr />
      <Bio />
      <PostNavigation previous={previous} next={next} />
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
