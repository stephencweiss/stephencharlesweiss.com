const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const {
  isPublished,
  listDate,
  publishDate,
  publishMonth,
  publishYear,
} = require('./src/utils/dateFns')
const entryTemplate = path.resolve(`./src/templates/BlogEntry.js`)
const bookTemplate = path.resolve(`./src/templates/BookReview.js`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
    query allBlogQuery {
        annualreviews: allMarkdownRemark(sort: {fields: [fields___publishDate], order: DESC}, filter: {fields: {sourceInstance: {eq: "annual-review"}}}) {
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
        blog: allMarkdownRemark(sort: {fields: [fields___publishDate], order: DESC}, filter: {fields: {isPublished: {eq: true}, sourceInstance: {eq: "blog"}}}) {
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
        books: allMarkdownRemark(sort: {fields: [fields___publishDate], order: DESC}, filter: {fields: {sourceInstance: {eq: "books"}}}) {
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
        list: allMarkdownRemark(sort: {fields: [fields___publishDate], order: DESC}, filter: {fields: {sourceInstance: {eq: "list"}}}) {
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
        other: allMarkdownRemark( filter: {fields: {sourceInstance: {nin: ["annual-review","blog","books", "list"]}}}) {
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
      }
    `
  ).then(result => {
    if (result.errors ) {
      throw result.errors
    } else if ( result.data.other.edges.length > 0) {
        throw new Error('posts included in "other" category - check to make sure all sources are accounted for')
    }

    // Create blog posts pages.
    const posts = result.data.blog.edges
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
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

    // Create list pages.
    const lists = result.data.list.edges
    lists.forEach((list, index) => {
      const previous = index === lists.length - 1 ? null : lists[index + 1].node
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

    // Create annual review pages.
    const annualReviews = result.data.annualreviews.edges
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

    // Create book pages.
    const books = result.data.books.edges
    books.forEach((book, index) => {
      const previous = index === books.length - 1 ? null : books[index + 1].node
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
    createNodeField({ name: 'publishMonth', node, value: publishMonth(node) })
    createNodeField({ name: 'publishYear', node, value: publishYear(node) })
  }
}
