import React from 'react'
import { Link, graphql } from 'gatsby'
import { Bio, Layout, ColumnLinkWrapper, ListedLink, SEO } from '../components'

import useSiteMetadata from '../hooks/useSiteMetadata'

function Books(props) {
    const { data } = props
    const books = data.books.edges

    return (
        <Layout>
            <SEO title="Books" keywords={['reading', 'notes', 'books']} />
            <h1>Books</h1>
            <p>Some books I've read and written about.</p>
            <ColumnLinkWrapper>
                <ul>
                    {books.map(({ node }) => {
                        const { author, bookTitle } = node.frontmatter
                        const { slug } = node.fields
                        return (
                            <ListedLink key={slug} to={slug}>
                                {`${bookTitle} by ${author}`}
                            </ListedLink>
                        )
                    })}
                </ul>
            </ColumnLinkWrapper>
            <p>
                See other books I've read (or plan on reading) in my <Link to="/list/reading-list">reading list</Link>.
            </p>
            <Bio />
        </Layout>
    )
}

export default Books

export const pageQuery = graphql`
    query {
        books: allMarkdownRemark(
            filter: { fields: { sourceInstance: { eq: "books" } } }
            sort: {
                order: ASC
                fields: [
                    frontmatter___authorLast
                    frontmatter___author
                    frontmatter___bookTitle
                ]
            }
        ) {
            edges {
                node {
                    id
                    html
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        author
                        bookTitle
                    }
                }
            }
        }
    }
`
