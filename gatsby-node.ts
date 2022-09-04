import type { GatsbyNode } from 'gatsby'
import path from 'path'
import _ from 'lodash'
import { createFilePath } from 'gatsby-source-filesystem'
import {
    isPublished,
    listDate,
    publishDate,
    publishMonth,
    publishYear,
} from './src/utils/dateFns'
import { ENTRIES_PER_PAGE } from './src/constants'

const notesTemplate = path.resolve(`./src/templates/NotesEntry.tsx`)
const entryList = path.resolve(`./src/templates/BlogList.tsx`)
const tagTemplate = path.resolve(`./src/templates/TagList.tsx`)

export const createPages: GatsbyNode['createPages'] = ({
    graphql,
    actions,
}) => {
    const { createPage } = actions

    return graphql(
        `
            query AllBlog {
                notes: allMarkdownRemark(
                    sort: { fields: [fields___publishDate], order: DESC }
                    filter: {
                        fields: {
                            sourceInstance: { eq: "notes" }
                            stage: { eq: "published" }
                            isPrivate: { ne: true }
                        }
                    }
                ) {
                    edges {
                        node {
                            frontmatter {
                                title
                                slug
                            }
                        }
                    }
                }
                stats: allMarkdownRemark(
                    sort: { fields: [fields___publishDate], order: DESC }
                    filter: { fields: { sourceInstance: { eq: "stats" } } }
                ) {
                    edges {
                        node {
                            fields {
                                filePath
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
                other: allMarkdownRemark(
                    filter: {
                        fields: { sourceInstance: { nin: ["notes", "stats"] } }
                    }
                ) {
                    edges {
                        node {
                            frontmatter {
                                title
                                slug
                            }
                        }
                    }
                }
                tagsGroup: allMarkdownRemark(
                    filter: {
                        fields: {
                            isPrivate: { ne: true }
                            sourceInstance: { eq: "notes" }
                            stage: { eq: "published" }
                        }
                    }
                ) {
                    group(field: frontmatter___tags) {
                        fieldValue
                        totalCount
                        edges {
                            node {
                                frontmatter {
                                    title
                                }
                            }
                        }
                    }
                }
            }
        `
    ).then((result) => {
        if (result.errors) {
            throw result.errors
        } else if ((result as any).data.other.edges.length > 0) {
            const others = (result as any).data.other
            console.log(`Unexpected others -->`, JSON.stringify({ others }))

            throw new Error(
                'posts included in "other" category - check to make sure all sources are accounted for'
            )
        }

        // Notes------------------------------------------->
        const notes = (result as any).data.notes.edges

        // Create blog list pages
        const BLOG_PAGE_TOTAL = Math.ceil(notes.length / ENTRIES_PER_PAGE) - 1 // minus one because we start @ 0.
        let currentPage = BLOG_PAGE_TOTAL
        while (currentPage >= 0) {
            const path =
                currentPage === 0 ? `/blog` : `/blog/page/${currentPage}`
            const previousPage =
                currentPage === 0
                    ? null
                    : currentPage === 1
                    ? `/blog`
                    : `/blog/page/${currentPage - 1}`
            const nextPage =
                currentPage === BLOG_PAGE_TOTAL
                    ? null
                    : `/blog/page/${currentPage + 1}`

            createPage({
                path,
                component: entryList,
                context: {
                    limit: ENTRIES_PER_PAGE,
                    skip: currentPage * ENTRIES_PER_PAGE,
                    numPages: BLOG_PAGE_TOTAL,
                    currentPage: currentPage,
                    previousPage: previousPage,
                    nextPage: nextPage,
                },
            })

            currentPage -= 1
        }

        const lastNoteIdx = notes.length - 1
        notes.forEach((note: any, index: number) => {
            const { slug, title } = note.node.frontmatter
            const previous =
                index === lastNoteIdx ? null : notes[index + 1].node

            const next = index === 0 ? null : notes[index - 1].node

            if (!slug) {
                throw new Error(
                    `Published note does not have a slug - fix this in content\n${title}`
                )
            }
            createPage({
                path: slug,
                component: notesTemplate,
                context: {
                    slug: slug,
                    previous,
                    next,
                },
            })
        })

        // Tags ------------------------------------------->
        const tags = (result as any).data.tagsGroup.group
        // Create tags pages.
        tags.forEach((tag: any) => {
            createPage({
                path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
                component: tagTemplate,
                context: {
                    tag: tag.fieldValue,
                },
            })
        })
    })
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type MarkdownRemark implements Node {
        frontmatter: Frontmatter
      }
      type Frontmatter {
        tags: [String!]
        category: [String!]
      }
    `
    createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const sourceInstance = getNode(node.parent).sourceInstanceName
        const filePath = createFilePath({ node, getNode })

        createNodeField({
            name: 'filePath',
            node,
            value: filePath,
        })

        createNodeField({
            name: 'sourceInstance',
            node,
            value: sourceInstance,
        })

        createNodeField({
            name: `slug`,
            node,
            value: filePath,
        })

        createNodeField({ name: 'isPublished', node, value: isPublished(node) })
        createNodeField({
            name: 'isPrivate',
            node,
            value: node.frontmatter.private,
        })
        createNodeField({ name: 'stage', node, value: node.frontmatter.stage })
        createNodeField({ name: 'listDate', node, value: listDate(node) })
        createNodeField({ name: 'publishDate', node, value: publishDate(node) })
        createNodeField({
            name: 'publishMonth',
            node,
            value: publishMonth(node),
        })
        createNodeField({ name: 'publishYear', node, value: publishYear(node) })
    }
}
