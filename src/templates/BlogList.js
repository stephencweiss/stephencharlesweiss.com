import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import {
    Bio,
    BlogExcerpt,
    Layout,
    PageNavigation,
    SEO,
    Search,
} from '../components'
import { useSiteMetadata } from '../hooks'

// TODO: figure out if this is used/helpful - think it conflicts with the <layout>
const Content = styled.div`
    margin: 0 auto;
    max-width: 860px;
    padding: 1.45rem 1.0875rem;
`

function BlogList(props) {
    const { data } = props
    const { previousPage, nextPage, currentPage } = props.pageContext
    const { title: siteTitle } = useSiteMetadata()
    const posts = data.allMarkdownRemark.edges

    return (
        <Layout location={props.location} title={siteTitle}>
            <SEO
                title="All posts"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <Content>
                <h1>Blog, page: {currentPage + 1}</h1>

                <Search />
                {posts.map(({ node }) => (
                    <BlogExcerpt key={node.fields.slug} node={node} />
                ))}
                <PageNavigation previous={previousPage} next={nextPage} />
            </Content>
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
