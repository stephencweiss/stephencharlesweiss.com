import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import {
    Bio,
    BlogExcerpt,
    Layout,
    LinkWrapper,
    NavLink,
    PageNavigation,
    SEO,
} from '../components'

const BlogHeader = styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    padding: 0;
`

const SearchLink = styled(NavLink)`
    &:before {
        content: '🔍 ';
    }
    :hover {
        &:before {
            content: '🔎 ';
        }
    }
`

function BlogList(props) {
    const { data } = props
    const { previousPage, nextPage } = props.pageContext
    const posts = data.allMarkdownRemark.edges
    return (
        <Layout>
            <SEO
                title="All posts"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <BlogHeader>
                <LinkWrapper>
                    <SearchLink to="/blog-search">search</SearchLink>
                </LinkWrapper>
            </BlogHeader>
            <PageNavigation previous={previousPage} next={nextPage} />
            {posts.map(({ node }) => (
                <BlogExcerpt key={node.frontmatter.slug} node={node} />
            ))}
            <PageNavigation previous={previousPage} next={nextPage} />

            <Bio />
        </Layout>
    )
}

export default BlogList

export const pageQuery = graphql`
    query PaginatedBlogData($limit: Int!, $skip: Int!) {
        allMarkdownRemark(
            filter: {
                fields: {
                    sourceInstance: { eq: "notes" }
                    isPrivate: { ne: true }
                    stage: { eq: "published" }
                }
                frontmatter: { private: { ne: true } }
            }
            sort: { fields: [fields___publishDate], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    excerpt(format: PLAIN)
                    fields {
                        isPublished
                        readingTime {
                            words
                            text
                        }
                    }
                    frontmatter {
                        title
                        slug
                        publish
                    }
                }
            }
        }
    }
`
