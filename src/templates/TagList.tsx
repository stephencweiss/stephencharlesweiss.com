import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { BlogExcerpt, Layout, SEO } from '../components'

const Tags = ({ data, pageContext }) => {
    const { tag } = pageContext
    const { edges: posts, totalCount } = data.allMarkdownRemark

    // TODO: Better pluralization practice
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`

    return (
        <Layout>
            <SEO
                title={tagHeader}
                description={`tags for ${tagHeader}`}
                keywords={[tagHeader, `tags`]}
            />
            <h1>{tagHeader}</h1>
            <ul>
                {posts.map(({ node }) => (
                    <BlogExcerpt key={node.frontmatter.slug} node={node} />
                ))}
            </ul>
            <Link to="/tags">Return to all tags</Link>
        </Layout>
    )
}

Tags.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        excerpt: PropTypes.string.isRequired,
                        frontmatter: PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                            title: PropTypes.string.isRequired,
                        }),
                        fields: PropTypes.shape({
                            listDate: PropTypes.string.isRequired,
                            readingTime: PropTypes.shape({
                                words: PropTypes.number.isRequired,
                                text: PropTypes.string.isRequired,
                            }),
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
}

export default Tags

export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: {
                fields: [fields___listDate, frontmatter___publish]
                order: [DESC, DESC]
            }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
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
                        title
                        slug
                    }
                }
            }
        }
    }
`
