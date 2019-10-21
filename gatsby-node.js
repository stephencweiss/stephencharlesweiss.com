const path = require(`path`)
const dayjs = require('dayjs')
const { createFilePath } = require(`gatsby-source-filesystem`)

const BUILD_TIME = dayjs()

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const unpublishedPost = path.resolve(`./src/templates/unpublished-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date
                publish
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next =
        index === 0
          ? null
          : posts[index - 1].node
          ? BUILD_TIME.isAfter(publish ? publish : date)
          ?  createPage({
              path: post.node.fields.slug,
              component: unpublishedPost,
              context: {
                slug: post.node.fields.slug,
                previous,
                next,
              },
            })
          : createPage({
              path: post.node.fields.slug,
              component: blogPost,
              context: {
                slug: post.node.fields.slug,
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
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
