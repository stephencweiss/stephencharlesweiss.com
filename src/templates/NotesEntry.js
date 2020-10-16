import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import {
    Bio,
    Layout,
    PostDetails,
    PostNavigation,
    SEO,
    PostTitle,
} from '../components'

const classicFirstLetterStyle = css`
    float: left;
    font-size: 3.5em;
    font-weight: bold;
    margin: 0 0.2em 0 0;
    line-height: 0.75;
`

const modernFirstLetterStyle = css`
    initial-letter: 3 2;
`

const Entry = styled.div`
    padding: 0 0.5em;

    & > p:first-of-type::first-letter {
        color: rgb(70, 70, 70);
        font-family: Georgia, serif;
        text-transform: lowercase;
        @supports not (initial-letter: 1 and -webkit-initial-letter: 1) {
            ${classicFirstLetterStyle}
        }

        @supports (initial-letter: 1) or (-webkit-initial-letter: 1) {
            ${modernFirstLetterStyle}
        }
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
    const { title, publish } = entry.frontmatter
    const { readingTime } = entry.fields
    const { text: estimate, words: wordCount } = readingTime
    return (
        <Layout>
            <SEO title={title} description={entry.excerpt} />
            <PostHeaderBlock>
                <PostTitle title={title} />
                <PostDetails
                    date={publish}
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
    query NoteEntryBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                date
                publish
                tags
                category
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
