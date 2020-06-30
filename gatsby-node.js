const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { buildPaths } = require('./src/utils/buildPaths')
const {
    isPublished,
    listDate,
    publishDate,
    publishMonth,
    publishYear,
} = require('./src/utils/dateFns')
const entryTemplate = path.resolve(`./src/templates/BlogEntry.js`)
const entryList = path.resolve(`./src/templates/BlogList.js`)
const bookTemplate = path.resolve(`./src/templates/BookReview.js`)
const tagTemplate = path.resolve(`./src/templates/TagList.js`)
const statsTemplate = path.resolve(`./src/templates/Stats.js`)
const { ENTRIES_PER_PAGE } = require('./src/constants')

exports.createPages = ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions

    return graphql(
        `
            query allBlogQuery {
                annualreviews: allMarkdownRemark(
                    sort: { fields: [fields___publishDate], order: DESC }
                    filter: {
                        fields: { sourceInstance: { eq: "annual-review" } }
                    }
                ) {
                    edges {
                        node {
                            fields {
                                oldSlug
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
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
                                oldSlug
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
                blog: allMarkdownRemark(
                    sort: { fields: [fields___publishDate], order: DESC }
                    filter: { fields: { sourceInstance: { eq: "blog" } } }
                ) {
                    edges {
                        node {
                            fields {
                                oldSlug
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
                books: allMarkdownRemark(
                    sort: { fields: [fields___publishDate], order: DESC }
                    filter: { fields: { sourceInstance: { eq: "books" } } }
                ) {
                    edges {
                        node {
                            fields {
                                oldSlug
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
                list: allMarkdownRemark(
                    sort: { fields: [fields___publishDate], order: DESC }
                    filter: { fields: { sourceInstance: { eq: "list" } } }
                ) {
                    edges {
                        node {
                            fields {
                                oldSlug
                                slug
                            }
                            frontmatter {
                                title
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
                                oldSlug
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
                other: allMarkdownRemark(
                    filter: {
                        fields: {
                            sourceInstance: {
                                nin: [
                                    "annual-review"
                                    "blog"
                                    "notes"
                                    "books"
                                    "list"
                                    "stats"
                                ]
                            }
                        }
                    }
                ) {
                    edges {
                        node {
                            frontmatter {
                                title
                            }
                        }
                    }
                }
                tagsGroup: allMarkdownRemark(limit: 2000) {
                    group(field: frontmatter___tags) {
                        fieldValue
                    }
                }
            }
        `
    ).then((result) => {
        if (result.errors) {
            throw result.errors
        } else if (result.data.other.edges.length > 0) {
            throw new Error(
                `GraphQL was non-exhaustive\nCategories included in "other" category\nFound "Other" Edges -> ${JSON.stringify(
                    { other: result.data.other.edges }
                )}`
            )
        }

        // Notes ------------------------------------------->
        const notes = result.data.notes.edges

        // Create notes pages.
        notes.forEach((note, index) => {
            const previous =
                index === notes.length - 1 ? null : notes[index + 1].node
            const next = index === 0 ? null : notes[index - 1].node
            console.log({ slug: note.node.fields.slug })
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

        // OLD - Blog Redirect ------------------------------------------>
        const blog = result.data.blog.edges
        // Create blog post pages.
        blog.forEach((post, index) => {
            const { oldSlug, slug } = post.node.fields
            createRedirect({
                fromPath: oldSlug,
                toPath: slug,
                isPermanent: true,
                redirectInBrowser: true,
                statusCode: 301,
            })
            console.lo
        })

        // Others------------------------------------------>
        // Lists------------------------------------------->
        const lists = result.data.list.edges
        // Create list pages.
        lists.forEach((list, index) => {
            const previous =
                index === lists.length - 1 ? null : lists[index + 1].node
            const next = index === 0 ? null : lists[index - 1].node

            createPage({
                path: list.node.fields.slug,
                component: entryTemplate,
                context: {
                    slug: list.node.fields.slug,
                    previous,
                    next,
                },
            })
        })

        // Annual Reviews ------------------------------------------->
        const annualReviews = result.data.annualreviews.edges
        // Create annual review pages.
        annualReviews.forEach((review, index) => {
            const previous =
                index === annualReviews.length - 1
                    ? null
                    : annualReviews[index + 1].node
            const next = index === 0 ? null : annualReviews[index - 1].node

            createPage({
                path: review.node.fields.slug,
                component: entryTemplate,
                context: {
                    slug: review.node.fields.slug,
                    previous,
                    next,
                },
            })
        })

        // Site Stats ------------------------------------------->
        const siteStats = result.data.stats.edges
        // Create site Stats page(s).
        siteStats.forEach((stats) => {
            createPage({
                path: stats.node.fields.slug,
                component: statsTemplate,
                context: {
                    slug: stats.node.fields.slug,
                },
            })
        })

        // Books ------------------------------------------->
        const books = result.data.books.edges
        // Create book pages.
        books.forEach((book, index) => {
            const previous =
                index === books.length - 1 ? null : books[index + 1].node
            const next = index === 0 ? null : books[index - 1].node

            createPage({
                path: book.node.fields.slug,
                component: bookTemplate,
                context: {
                    slug: book.node.fields.slug,
                    previous,
                    next,
                },
            })
        })

        // Tags ------------------------------------------->
        const tags = result.data.tagsGroup.group
        // Create tags pages.
        tags.forEach((tag) => {
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

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const sourceInstance = getNode(node.parent).sourceInstanceName
        const filePath = createFilePath({ node, getNode })
        const { slug, oldSlug } = buildPaths(sourceInstance, filePath)

        createNodeField({
            name: 'sourceInstance',
            node,
            value: sourceInstance,
        })

        createNodeField({
            name: `slug`,
            node,
            value: slug,
        })

        createNodeField({
            name: `oldSlug`,
            node,
            value: oldSlug,
        })

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
