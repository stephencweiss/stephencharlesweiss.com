import React from 'react'
import { Layout, SEO, ListedLink } from '../components'
import kebabCase from 'lodash/kebabCase'
import { graphql } from 'gatsby'

// TODO: Create groupings for the tags by letter (and have an internal link help jump between them)
// TODO: Allow a sort of the tags; a->z, z->a, and count ASC/DESC

const TagsPage = props => {
    const { group } = props.data.allMarkdownRemark

    return (
        <Layout>
            <SEO title="tags" />
            <div>
                <div>
                    <h1>tags</h1>
                    <ul>
                        {group.map(tag => (
                            <ListedLink
                                to={`/tags/${kebabCase(tag.fieldValue)}/`}
                                key={tag.fieldValue}
                            >
                                {tag.fieldValue} ({tag.totalCount})
                            </ListedLink>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default TagsPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`
