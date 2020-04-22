import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import {
    Bio,
    Layout,
    PostDetails,
    SEO,
    Title,
    PostNavigation,
} from '../components'
import { useSiteMetadata } from '../hooks'

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
    const { title } = entry.frontmatter
    const { listDate, readingTime } = entry.fields
    const { text:estimate, words:wordCount } = readingTime
    return (
        <Layout location={props.location} title={siteTitle}>
            <SEO title={title} description={entry.excerpt} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Title>{title}</Title>
                <PostDetails date={listDate} estimate={estimate} wordCount={wordCount}/>
            </div>
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
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                publish(formatString: "MMMM DD, YYYY")
            }
            fields {
                listDate
                readingTime {
                    text
                    words
                }
            }
        }
    }
`
