const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { defineRedirect } = require('./src/utils/defineRedirect')
const {
    isPublished,
    listDate,
    publishDate,
    publishMonth,
    publishYear,
} = require('./src/utils/dateFns')
const entryTemplate = path.resolve(`./src/templates/BlogEntry.js`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions

    return graphql(
        `
            query allBlogQuery {
                notes: allMarkdownRemark(
                    sort: { fields: [fields___publishDate], order: DESC }
                    filter: {
                        fields: {
                            isPublished: { eq: true }
                            sourceInstance: { eq: "notes" }
                        }
                    }
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                publish
                                date
                            }
                        }
                    }
                }
                oldContent: allMarkdownRemark(
                    filter: { fields: { sourceInstance: { ne: "notes" } } }
                ) {
                    edges {
                        node {
                            fields {
                                fromPath
                                toPath
                                slug
                            }
                            frontmatter {
                                title
                                publish
                                date
                            }
                        }
                    }
                }
            }
        `
    ).then((result) => {
        if (result.errors) {
            throw result.errors
        }

        // Notes ------------------------------------------->
        const notes = result.data.notes.edges

        // Create notes pages.
        notes.forEach((note, index) => {
            const previous =
                index === notes.length - 1 ? null : notes[index + 1].node
            const next = index === 0 ? null : notes[index - 1].node
            createPage({
                path: note.node.fields.slug,
                component: entryTemplate,
                context: {
                    slug: note.node.fields.slug,
                    previous,
                    next,
                },
            })
        })

        // OLD - Redirect ------------------------------------------>
        const oldContent = result.data.oldContent.edges
        // Create oldContent post pages.
        oldContent.forEach((post) => {
            const { fromPath, toPath } = post.node.fields

            // createPage({
            //     path: fromPath, // this is the path for the created page
            //     component: entryTemplate,
            //     context: {
            //         slug: post.node.fields.slug, // this is the context that's passed to the graphql query to _find_ the data
            //     },
            // })

            createRedirect({
                fromPath: fromPath,
                toPath: toPath,
                isPermanent: true,
                redirectInBrowser: true,
                statusCode: 301,
            })
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const sourceInstance = getNode(node.parent).sourceInstanceName
        const filePath = createFilePath({ node, getNode })
        const { toPath, fromPath } = defineRedirect(sourceInstance, filePath)

        createNodeField({
            name: 'sourceInstance',
            node,
            value: sourceInstance,
        })

        createNodeField({ name: `slug`, node, value: filePath })
        createNodeField({ name: `fromPath`, node, value: fromPath })
        createNodeField({ name: `toPath`, node, value: toPath })

        createNodeField({ name: 'isPublished', node, value: isPublished(node) })
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
