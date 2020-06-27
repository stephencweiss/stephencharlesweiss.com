import React from 'react'
import { graphql } from 'gatsby'
import {
    Bio,
    BlogExcerpt,
    Layout,
    LinkWrapper,
    NavLink,
    PageNavigation,
    SEO,
} from '../components'

import { BlogHeader } from '../templates/BlogList'

function Archive(props) {
    const { data } = props
    // Create blog archive page
    const posts = data.blog.edges
    console.log({ data })
    const postsByYearByMonth = {}
    posts.forEach((post) => {
        console.log({ fields: post.node.fields })
        const { publishYear: year, publishMonthLong: month } = post.node.fields
        if (!postsByYearByMonth[year]) {
            postsByYearByMonth[year] = {}
        }
        if (!postsByYearByMonth[year][month]) {
            postsByYearByMonth[year][month] = []
        }
        postsByYearByMonth[year][month] = [
            ...(postsByYearByMonth[year][month] || []),
            post,
        ]
    })
    console.log({ postsByYearByMonth })

    return (
        <Layout>
            <SEO title="Archive" keywords={['posts', 'books']} />
            <h1>archive</h1>
            <p>everything I've written (so far)</p>
            <SEO
                title="All posts"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <BlogHeader>
                {/* <h1>{title}</h1>
                <LinkWrapper style={{ paddingLeft: 0 }}>
                    <SearchLink to="/blog-search">Search The Blog</SearchLink>
                </LinkWrapper> */}
            </BlogHeader>
            {/* <PageNavigation previous={previousPage} next={nextPage} />
            {posts.map(({ node }) => (
                <BlogExcerpt key={node.fields.slug} node={node} />
            ))}
            <PageNavigation previous={previousPage} next={nextPage} /> */}
            <Bio />
        </Layout>
    )
}

export default Archive

export const pageQuery = graphql`
    query {
        blog: allMarkdownRemark(
            sort: {
                fields: [fields___publishDate, fields___listDate]
                order: DESC
            }
            filter: {
                fields: { listDate: { ne: "Invalid Date" } }
                frontmatter: { publish: {} }
            }
        ) {
            edges {
                node {
                    fields {
                        slug
                        publishDate
                        publishMonthLong
                        publishYear
                        publishDay
                        listDate
                        listDay
                        listMonthLong
                        listYear
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`
