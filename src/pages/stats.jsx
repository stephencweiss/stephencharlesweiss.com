import React from 'react'
import { graphql } from 'gatsby'
import { Bio, PostTitleLink, SEO } from '../components'

function Stats(props) {
    const { data } = props
    const stats = data.stats.edges
    return (
        <>
            <SEO title="Stats Page" keywords={['stats', 'analytics']} />
            {stats.map(({ node }) => {
                const { title } = node.frontmatter
                const { slug } = node.fields
                return (
                    <div key={slug}>
                        <PostTitleLink slug={slug} title={title || slug} />
                    </div>
                )
            })}

            <Bio />
        </>
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
