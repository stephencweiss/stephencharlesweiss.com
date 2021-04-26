import React from 'react'
import { Layout, SEO, ListedLink } from '../components'
import kebabCase from 'lodash/kebabCase'
import { graphql } from 'gatsby'

// TODO: Create groupings for the tags by letter (and have an internal link help jump between them)
// TODO: Allow a sort of the tags; a->z, z->a, and count ASC/DESC

const NotesByYear = (props) => {
    const { totalCount, edges } = props.data.allMarkdownRemark
    const groupedPosts = edges.reduce(
        (acc, cur) => {
            const { publishMonth, publishYear } = cur.node.fields
            const { frontmatter } = cur.node

            if (acc.months[publishMonth]) {
                acc.months[publishMonth].push(frontmatter)
            } else {
                acc.months[publishMonth] = [frontmatter]
            }
            if (acc.years[publishYear]) {
                acc.years[publishYear].push(frontmatter)
            } else {
                acc.years[publishYear] = [frontmatter]
            }

            return acc
        },
        { years: {}, months: {} }
    )

    // const postsByMonth = postsByYear.reduce((acc, cur) => {
    //     return acc
    // }, {})

    console.log({ groupedPosts })
    return (
        <Layout>
            <SEO title="notes-by-year" />
            <div>
                <div>
                    <h1>notes by year</h1>
                    <ul>
                        {/* {group.map((tag) => (
                            <ListedLink
                                to={`/tags/${kebabCase(tag.fieldValue)}/`}
                                key={tag.fieldValue}
                            >
                                {tag.fieldValue} ({tag.totalCount})
                            </ListedLink>
                        ))} */}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default NotesByYear

export const pageQuery = graphql`
    query notesByYear {
        allMarkdownRemark(
            filter: {
                fields: {
                    isPrivate: { ne: true }
                    sourceInstance: { eq: "notes" }
                    stage: { eq: "published" }
                }
            }
            sort: { fields: frontmatter___publish }
        ) {
            totalCount
            edges {
                node {
                    fileAbsolutePath
                    frontmatter {
                        title
                        slug
                    }
                    fields {
                        publishYear
                        publishMonth
                        publishDate
                    }
                }
            }
        }
    }
`
