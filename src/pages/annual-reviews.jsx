import React from 'react'
import { graphql } from 'gatsby'
import { Bio, ColumnLinkWrapper, Layout, SEO, ListedLink } from '../components'

function AnnualReviews(props) {
    const reviews = props.data.annualreviews.edges

    return (
        <Layout>
            <SEO title="annual reviews" keywords={['annual review', 'books']} />
            <h1>annual reviews</h1>
            <p>my annual reviews - I am a work in progress</p>
            <ColumnLinkWrapper>
                <ul>
                    {reviews.map(({ node }) => {
                        const { title, slug } = node.frontmatter
                        return (
                            <ListedLink key={slug} to={`/${slug}`}>
                                {title.toLowerCase()}
                            </ListedLink>
                        )
                    })}
                </ul>
            </ColumnLinkWrapper>
            <Bio />
        </Layout>
    )
}

export default AnnualReviews

export const pageQuery = graphql`
    query {
        annualreviews: allMarkdownRemark(
            sort: { fields: [fields___publishDate], order: DESC }
            filter: {
                frontmatter: {
                    category: { eq: "review" }
                    stage: { eq: "published" }
                    private: { ne: true }
                }
                fields: { sourceInstance: { eq: "notes" } }
            }
        ) {
            edges {
                node {
                    excerpt(format: PLAIN)
                    fields {
                        listDate
                        readingTime {
                            words
                            text
                        }
                    }
                    frontmatter {
                        slug
                        title
                    }
                }
            }
        }
    }
`
