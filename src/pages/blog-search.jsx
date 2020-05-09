import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Bio, Layout, ListedLink, SEO, Search } from '../components'
import kebabCase from 'lodash/kebabCase'

function blogSearch() {
    const data = useStaticQuery(graphql`
        {
            allMarkdownRemark(limit: 2000) {
                group(field: frontmatter___tags) {
                    fieldValue
                    totalCount
                }
            }
        }
    `)

    return (
        <Layout>
            <SEO
                title="All posts"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <h1>search blog posts</h1>
            <Search />
            <div>
                <h2>tags</h2>
                <ul>
                    {data.allMarkdownRemark.group.map(tag => {
                        return (
                            <ListedLink
                                to={`/tags/${kebabCase(tag.fieldValue)}/`}
                                key={tag.fieldValue}
                            >
                                {tag.fieldValue} ({tag.totalCount})
                            </ListedLink>
                        )
                    })}
                </ul>
            </div>
            <Bio />
        </Layout>
    )
}

export default blogSearch
