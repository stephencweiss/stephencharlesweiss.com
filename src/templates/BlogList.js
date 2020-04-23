import React from 'react'
import { graphql } from 'gatsby'

import {
    Bio,
    BlogExcerpt,
    PageNavigation,
    SEO,
    Search,
    StyledLink,
} from '../components'

function BlogList(props) {
    const { data } = props
    const { previousPage, nextPage } = props.pageContext
    const posts = data.allMarkdownRemark.edges
    return (
        <>
            <SEO
                title="All posts"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <h1>
                <StyledLink to={'/blog'}>/*Code-Comments*/</StyledLink>
            </h1>
            <PageNavigation previous={previousPage} next={nextPage} />
            <Search />
            {posts.map(({ node }) => (
                <BlogExcerpt key={node.fields.slug} node={node} />
            ))}
            <PageNavigation previous={previousPage} next={nextPage} />

            <Bio />
        </>
    )
}

export default BlogList

export const pageQuery = graphql`
    query getPaginatedBlogData($limit: Int!, $skip: Int!) {
        allMarkdownRemark(
            filter: {
                fields: {
                    isPublished: { eq: true }
                    sourceInstance: { eq: "blog" }
                }
            }
            sort: { order: [DESC], fields: [fields___listDate] }
            limit: $limit
            skip: $skip
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
