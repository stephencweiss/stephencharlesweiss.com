const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
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
    const { createPage } = actions

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
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
                blog: allMarkdownRemark(
                    sort: { fields: [fields___publishDate], order: DESC }
                    filter: {
                        fields: {
                            isPublished: { eq: true }
                            sourceInstance: { eq: "blog" }
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
                            fields {
                                slug
                            }
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
    ).then(result => {
        if (result.errors) {
            throw result.errors
        } else if (result.data.other.edges.length > 0) {
            throw new Error(
                'posts included in "other" category - check to make sure all sources are accounted for'
            )
        }

        // Blog ------------------------------------------->
        const posts = result.data.blog.edges

        // Create blog list pages
        const BLOG_PAGE_TOTAL = Math.ceil(posts.length / ENTRIES_PER_PAGE) - 1 // minus one because we start @ 0.
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

        // Create blog posts pages.
        posts.forEach((post, index) => {
            const previous =
                index === posts.length - 1 ? null : posts[index + 1].node
            const next = index === 0 ? null : posts[index - 1].node
            createPage({
                path: post.node.fields.slug,
                component: entryTemplate,
                context: {
                    slug: post.node.fields.slug,
                    previous,
                    next,
                },
            })
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
        siteStats.forEach(stats => {
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
        tags.forEach(tag => {
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
        const slug = sourceInstance + filePath

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
