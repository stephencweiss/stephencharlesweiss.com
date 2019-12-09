const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { isPublished } = require('./src/utils/isPublished')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  return graphql(
    `
    {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fields: {isPublished: {eq: true}}}) {
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
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
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
    const isPublishedVal = isPublished(node)

    const sourceInstance = getNode(node.parent).sourceInstanceName
    const filePath = createFilePath({ node, getNode })
    const slug = sourceInstance+filePath

    createNodeField({
      name: 'sourceInstance',
      node,
      value: sourceInstance
    })

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({name: 'isPublished', node, value: isPublishedVal})
  }
}
