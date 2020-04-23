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
    StyledLink,
} from '../components'

// TODO: figure out if this is used/helpful - think it conflicts with the <layout>
const Content = styled.div`
    margin: 0 auto;
    max-width: 860px;
    padding: 1.45rem 1.0875rem;
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
            <Content>
                <h1><StyledLink to={"/blog"}>/*Code-Comments*/</StyledLink></h1>
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
