import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Bio, Layout, PostNavigation, SEO } from '../components'

const Date = styled.p`
    color: #999;
    float: left;
    clear: left;
    display: block;
`

const Title = styled.h1`
    display: block;
`
const Entry = styled.div`
    #resources + ul > li,
    #footnotes + ul > li {
        list-style: none;
    }
`
const ratings = {
    1: '1 - Read Now!',
    2: '2 - Read Soon.',
    3: '3 - Read Someday.',
    4: '4 - Read Maybe.',
    5: '5 - Pass.',
}

function Rankings(props) {
    const { rating } = props

    return (
        <React.Fragment>
            <h2>Rating</h2>
            {rating && (
                <p>
                    <b>My Rating:</b>&nbsp;{ratings[rating]}
                </p>
            )}
            <p>
                <b>Categories:</b>
                <ul>
                    {Object.values(ratings).map((rating) => (
                        <li key={rating}>{rating}</li>
                    ))}
                </ul>
            </p>
        </React.Fragment>
    )
}

function BookEntry(props) {
    const entry = props.data.markdownRemark
    const { previous, next } = props.pageContext
    const { date, publish, title, rating } = entry.frontmatter

    return (
        <Layout>
            <SEO title={title} description={entry.excerpt} />
            <Date>{publish ? publish : date}</Date>
            <Title>{title}</Title>
            <Entry
                className={'entry'}
                dangerouslySetInnerHTML={{ __html: entry.html }}
            />
            <Rankings rating={rating} />
            <hr />
            <Bio />
            <PostNavigation previous={previous} next={next} />
        </Layout>
    )
}

export default BookEntry

export const pageQuery = graphql`
    query BookReviewBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                author
                bookTitle
                date
                publish
                rating
            }
        }
    }
`
