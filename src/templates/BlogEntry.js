import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Bio, PostDetails, SEO, Title, PostNavigation } from '../components'

const Entry = styled.div`
    #resources + ul > li,
    #footnotes + ul > li {
        list-style: none;
    }
    padding: 0 0.5em;
`

function EntryTemplate(props) {
    const entry = props.data.markdownRemark
    const { previous, next } = props.pageContext
    const { title } = entry.frontmatter
    const { listDate, readingTime } = entry.fields
    const { text: estimate, words: wordCount } = readingTime
    return (
        <React.Fragment>
            <SEO title={title} description={entry.excerpt} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Title>{title}</Title>
                <PostDetails
                    date={listDate}
                    estimate={estimate}
                    wordCount={wordCount}
                />
            </div>
            <Entry
                className={'entry'}
                dangerouslySetInnerHTML={{ __html: entry.html }}
            />
            <hr />
            <Bio />
            <PostNavigation previous={previous} next={next} />
        </React.Fragment>
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
