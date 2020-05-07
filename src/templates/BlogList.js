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
import { useSiteMetadata } from '../hooks'

const BlogHeader = styled.div`
    display: flex;
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
    const { title } = useSiteMetadata()
    const posts = data.allMarkdownRemark.edges

    return (
        <Layout>
            <SEO
                title="All posts"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <BlogHeader>
                <h1>{title}</h1>
                <LinkWrapper style={{ paddingLeft: 0 }}>
                    <SearchLink to="/blog-search">Search The Blog</SearchLink>
                </LinkWrapper>
            </BlogHeader>
            <PageNavigation previous={previousPage} next={nextPage} />
            {posts.map(({ node }) => (
                <BlogExcerpt key={node.fields.slug} node={node} />
            ))}
            <PageNavigation previous={previousPage} next={nextPage} />

            <Bio />
        </Layout>
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
