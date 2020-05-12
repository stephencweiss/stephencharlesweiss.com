import React from 'react'
import { graphql } from 'gatsby'
import { Bio, ColumnLinkWrapper, Layout, SEO, ListedLink } from '../components'

function AnnualReviews(props) {
    console.log({props})
    const reviews = props.data.annualreviews.edges

    return (
        <Layout>
            <SEO title="Annual Reviews" keywords={['annual review', 'books']} />
            <h1>annual reviews</h1>
            <p>my annual reviews - I am a work in progress</p>
            <ColumnLinkWrapper>
                <ul>
                    {reviews.map(({ node }) => {
                        const { title } = node.frontmatter
                        const { slug } = node.fields
                        return (
                            <ListedLink key={slug} to={slug}>
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
            filter: { fields: { sourceInstance: { eq: "annual-review" } } }
        ) {
            edges {
                node {
                    excerpt(format: PLAIN)
                    fields {
                        slug
                        listDate
                        readingTime {
                            words
                            text
                        }
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`
