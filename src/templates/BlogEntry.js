import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import {
    Bio,
    Layout,
    PostDetails,
    PostNavigation,
    SEO,
    PostTitle,
} from '../components'

const Entry = styled.div`
    padding: 0 0.5em;

    & > p:first-of-type::first-letter {
        color: #c69c6d;
        float: left;
        font-family: Georgia;
        font-size: 5em;
        margin: 0 0.2em 0 0;
        line-height: 0.5;
        text-transform: lowercase;
    }
`

const PostHeaderBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 2rem 0;
    padding: 0;
`

function EntryTemplate(props) {
    const entry = props.data.markdownRemark
    const { previous, next } = props.pageContext
    const { title } = entry.frontmatter
    const { listDate, readingTime } = entry.fields
    const { text: estimate, words: wordCount } = readingTime
    return (
        <Layout>
            <SEO title={title} description={entry.excerpt} />
            <PostHeaderBlock>
                <PostTitle title={title} />
                <PostDetails
                    date={listDate}
                    estimate={estimate}
                    wordCount={wordCount}
                />
            </PostHeaderBlock>
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
