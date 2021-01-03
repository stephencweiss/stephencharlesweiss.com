import React from 'react'
import { graphql } from 'gatsby'
import { Bio, ColumnLinkWrapper, Layout, SEO, ListedLink } from '../components'

function Resources(props) {
    const reviews = props.data.resources.edges

    return (
        <Layout>
            <SEO title="templates" keywords={['resources', 'templates']} />
            <h1>resources & templates</h1>
            <p>some resources and templates I've collected over the years</p>
            <ColumnLinkWrapper>
                <ul>
                    {reviews.map(({ node }) => {
                        const { title, slug } = node.frontmatter
                        console.log({ slug })
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

export default Resources

export const pageQuery = graphql`
    query {
        resources: allMarkdownRemark(
            sort: { fields: [fields___publishDate], order: DESC }
            filter: {
                frontmatter: {
                    category: { eq: "resources" }
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
