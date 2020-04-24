import React from 'react'
import { graphql } from 'gatsby'
import { Bio, Layout, PostTitleLink, SEO } from '../components'

function Stats(props) {
    const { data } = props
    const stats = data.stats.edges
    return (
        <Layout>
            <SEO title="stats" keywords={['stats', 'analytics']} />
            {stats.map(({ node }) => {
                const { title } = node.frontmatter
                const { slug } = node.fields
                return (
                    <div key={slug}>
                        <PostTitleLink slug={slug} title={(title || slug).toLowerCase()} />
                    </div>
                )
            })}

            <Bio />
        </Layout>
    )
}

export default Stats

export const pageQuery = graphql`
    query {
        stats: allMarkdownRemark(
            filter: { fields: { sourceInstance: { eq: "stats" } } }
        ) {
            edges {
                node {
                    id
                    html
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`
