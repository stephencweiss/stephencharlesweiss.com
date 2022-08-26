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
const { redirectNoteManually } = require('./src/utils/redirectNoteManually')
const entryTemplate = path.resolve(`./src/templates/BlogEntry.js`)
const notesTemplate = path.resolve(`./src/templates/NotesEntry.js`)
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
                                slug
                                filePath
                                redirectTarget
                            }
                            frontmatter {
                                title
                                slug
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
                                slug
                                filePath
                                redirectTarget
                            }
                            frontmatter {
                                title
                                slug
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
                                filePath
                                redirectTarget
                            }
                            frontmatter {
                                title
                                slug
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
                                filePath
                                redirectTarget
                            }
                            frontmatter {
                                title
                                slug
                            }
                        }
                    }
                }
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
                            fields {
                                slug
                            }
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
                                slug
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
                        fields: {
                            sourceInstance: {
                                nin: [
                                    "annual-review"
                                    "blog"
                                    "books"
                                    "list"
                                    "notes"
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
        } else if (result.data.other.edges.length > 0) {
            throw new Error(
                'posts included in "other" category - check to make sure all sources are accounted for'
            )
        }

        // Blog ------------------------------------------->
        const posts = result.data.blog.edges

        // Create blog posts pages.
        posts.forEach((post, index) => {
            const { redirectTarget, slug } = post.node.fields
            const { slug: frontmatterSlug } = post.node.frontmatter
            createRedirect({
                fromPath: `/${slug}`,
                toPath: frontmatterSlug || redirectTarget,
                isPermanent: true,
                redirectInBrowser: true,
                statusCode: 301,
            })

            const previous =
                index === posts.length - 1 ? null : posts[index + 1].node
            const next = index === 0 ? null : posts[index - 1].node
            createPage({
                path: frontmatterSlug || redirectTarget,
                component: entryTemplate,
                context: {
                    slug,
                    previous,
                    next,
                },
            })
        })

        // Notes------------------------------------------->
        const notes = result.data.notes.edges

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
        notes.forEach((note, index) => {
            const { slug, title } = note.node.frontmatter
            // ! TODO: fix the template re: previous/next
            // const previous = index === notes.length - 1 && Boolean(note[index + 1]) ? null : note[index + 1].node
            // const next = index === 0 && Boolean(note[index - 1]) ? null : note[index - 1].node

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
                    previous: null,
                    next: null,
                },
            })
        })

        // Others------------------------------------------>
        // Lists------------------------------------------->
        const lists = result.data.list.edges
        // Create list pages.
        lists.forEach((list, index) => {
            const { redirectTarget, slug } = list.node.fields
            const { slug: fmSlug } = list.node.frontmatter
            createRedirect({
                fromPath: `/${slug}`,
                toPath: fmSlug || redirectTarget,
                isPermanent: true,
                redirectInBrowser: true,
                statusCode: 301,
            })

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
            const { redirectTarget, slug } = review.node.fields
            const { slug: fmSlug } = review.node.frontmatter
            createRedirect({
                fromPath: `/${slug}`,
                toPath: fmSlug || redirectTarget,
                isPermanent: true,
                redirectInBrowser: true,
                statusCode: 301,
            })

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
            const { redirectTarget, slug } = book.node.fields
            const { slug: fmSlug } = book.node.frontmatter
            createRedirect({
                fromPath: `/${slug}`,
                toPath: fmSlug || redirectTarget,
                isPermanent: true,
                redirectInBrowser: true,
                statusCode: 301,
            })

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

        // Manual Redirects
        redirectNoteManually({
            sourceInstance: 'notes',
            fromPath: 'reading-list',
            toPath: 'antilibrary',
            template: notesTemplate,
            createPage,
            createRedirect,
        })
        redirectNoteManually({
            sourceInstance: 'notes',
            fromPath: 'adding-prettier-to-a-project',
            toPath: 'prettier-getting-started',
            template: notesTemplate,
            createPage,
            createRedirect,
        })
        redirectNoteManually({
            sourceInstance: 'notes',
            fromPath: 'es-lint-prettier-and-vs-code-when-they-stop-cooperating',
            toPath: 'eslint-prettier-and-vs-code-when-they-stop-cooperating',
            template: notesTemplate,
            createPage,
            createRedirect,
        })
        redirectNoteManually({
            sourceInstance: 'notes',
            fromPath: 'es-lint-prettier-together',
            toPath: 'eslint-prettier-together',
            template: notesTemplate,
            createPage,
            createRedirect,
        })
        redirectNoteManually({
            sourceInstance: 'notes',
            fromPath: 'anatomy-eslintrc',
            toPath: 'eslintrc-anatomy',
            template: notesTemplate,
            createPage,
            createRedirect,
        })
        redirectNoteManually({
            sourceInstance: 'notes',
            fromPath: 'back-to-the-basics-html-head-tag',
            toPath: 'html-basics-head-tag',
            template: notesTemplate,
            createPage,
            createRedirect,
        })
        redirectNoteManually({
            sourceInstance: 'notes',
            fromPath: 'modifying-head-tags-as-side-effects-with-next-js',
            toPath: 'head-tag-update-side-effect-nextjs',
            template: notesTemplate,
            createPage,
            createRedirect,
        })
        redirectNoteManually({
            sourceInstance: 'notes',
            fromPath:
                'automating-linting-using-husky-to-lint-with-prettier-on-commit-and-before',
            toPath: 'automating-linting-husky-lintstaged',
            template: notesTemplate,
            createPage,
            createRedirect,
        })
    })
}

/**
 *
 * @param {string} filePath - the original file path
 * @returns {string} - the filename only
 * @example
 * * findRedirect(/list/2020-08-01/something) // /something/
 * * findRedirect(/list/second/2020-08-01/something) // /something/
 * * findRedirect(/2020-08-01/something) // /something/
 * * findRedirect(/something) // /something/
 * * findRedirect(/list/something) // /something/
 * * findRedirect(/list/second/something) // /something/
 */
function findRedirect(filePath) {
    const cleanFilePath = trimTrailingSlash(filePath)
    const pattern = /\/((\w+\/)+)?([0-9]{4}-[0-9]{2}-[0-9]{2}\/)?/gi
    const toPath = `${cleanFilePath.replace(pattern, '/')}/`
    return toPath
}

/**
 *
 * @param {string} str
 * @returns {boolean} True if the last character of the string is a slash
 */
function hasTrailingSlash(str) {
    return str.length && str.charAt(str.length - 1) === '/'
}

function trimTrailingSlash(str) {
    if (hasTrailingSlash(str)) {
        return str.slice(0, str.length - 1)
    }
    return str
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
        const originalSlug = sourceInstance + filePath

        createNodeField({
            name: 'filePath',
            node,
            value: filePath,
        })

        createNodeField({
            name: 'redirectTarget',
            node,
            value: findRedirect(filePath),
        })

        createNodeField({
            name: 'sourceInstance',
            node,
            value: sourceInstance,
        })

        createNodeField({
            name: `slug`,
            node,
            value: originalSlug,
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
