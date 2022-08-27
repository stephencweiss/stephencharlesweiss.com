import React from 'react'
import { Link, graphql } from 'gatsby'
import { Bio, ColumnLinkWrapper, Layout, ListedLink, SEO } from '../components'

function Books(props) {
    const { data } = props
    const books = data.books.edges

    return (
        <Layout>
            <SEO title="books" keywords={['reading', 'notes', 'books']} />
            <h1>books</h1>
            <p>
                some books I've read and written about. see other books I've
                read in my&nbsp;
                <Link to="/list/bookshelf">bookshelf</Link> and those I'm
                planning to read on my&nbsp;
                <Link to="/list/reading-list">reading list</Link>.
            </p>
            <ColumnLinkWrapper>
                <ul>
                    {books.map(({ node }) => {
                        const { author, bookTitle, slug } = node.frontmatter

                        return (
                            <ListedLink key={slug} to={`/${slug}`}>
                                {`${bookTitle} by ${author}`}
                            </ListedLink>
                        )
                    })}
                </ul>
            </ColumnLinkWrapper>
            <Bio />
        </Layout>
    )
}

export default Books

export const pageQuery = graphql`
    query {
        books: allMarkdownRemark(
            filter: {
                frontmatter: {
                    category: { in: ["reading notes"] }
                    private: { ne: true }
                    stage: { eq: "published" }
                }
                fields: { sourceInstance: { eq: "notes" } }
            }

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
                    frontmatter {
                        title
                        slug
                        author
                        bookTitle
                    }
                }
            }
        }
    }
`
