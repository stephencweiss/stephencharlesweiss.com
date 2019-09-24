---
title: 'Multiple Post Types With Gatsby'
date: '2019-08-05'
category: ['programming']
tags: ['gatsby', 'graphql','multiple layouts', 'setup']
---

When I set up my `gatsby-filesystem` previously, I noted that if there were multiple file systems that I wanted access to, all I need to do was to duplicate that post.

## Why is that important?
As a website grows, it's possible that its scope will expand. What might start as a simple text blog can evolve to have many different types of content. Imagine a site that has
* Blog posts,
* Videos,
* Recipes,
* etc.

To accommodate the different types of content, I want a site that looks different _based_ on the type of content. I want to apply a different layout for each type.

## Steps To Accommodate Multiple Content Types With A Gatsby Site

1. Update `gatsby-config` to have multiple resolvers based on the content type.
2. Update the GraphQL query to accommodate multiple types of content
3. Update the `createPage` action to differentiate based on the type of content

Next, I'll demo stepping through these three steps for two types of content: blogs and videos.

### Updating Config
For example, in a project with the following structure:
``` shell
.
├── content
│   ├── blog
│   └── video
├── public
├── src
└── static
```

I could configure my resolvers to have access the video and the blogs respectively:
``` javascript
module.exports = {
  plugins: [
    ...
    {
        resolve: ‘gatsby-source-filesystem',
        options: {
            name: ‘blog',
            path: ‘content/blog'
        }
    },
    {
        resolve: ‘gatsby-source-filesystem',
        options: {
            name: ‘video',
            path: ‘content/video'
        }
    },
  ],
}
```


### Updating Queries
Whereas previously, I asked for all of my MDX files (since that's all I had), now I want to be a little more verbose:
```graphql
query {
  blog: allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
    nodes {
      childMdx {
        frontmatter {
          title
        }
      }
    }
  }
  video: allFile(filter: { sourceInstanceName: { eq: "video" } }) {
    nodes {
      childMdx {
        frontmatter {
          title
        }
      }
    }
  }
}
```
The key here is that since the queries are _identical_, we need to alias them so that GraphQL knows which is which.<sup>1</sup>

Also notice that I'm now going through the instance name of -- this is what is configured as the `name` attribute in the filesystem resolver.

### Updating  Create Page
``` javascript
exports.createPages = async ({ actions, graphql, reporter }) => {
  // In node (which this is), graphql is a function that takes a string.
  const result = await graphql(`
    query {
      blog: allFile(filter: { sourceInstanceName: { eq: “blog” } }) {
        nodes {
          childMdx {
            frontmatter {
              slug
            }
          }
        }
      }
      video: allFile(filter: { sourceInstanceName: { eq: “video” } }) {
        nodes {
          childMdx {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic(‘failed to create posts', result.errors);
  }

  const blogNodes = result.data.blog.nodes;
  const videoNodes = result.data.video.nodes;

  blogNode.forEach(post => {
    const path = post.childMdx.frontmatter.slug;
    actions.createPage({
      path,
      component: require.resolve(‘./src/templates/post.js'),
      context: {
        slug: post.childMdx.frontmatter.slug,
      },
    });
  })

  videoNodes.forEach(post => {
    const path = post.childMdx.frontmatter.slug;
    actions.createPage({
      path,
      component: require.resolve(‘./src/templates/video.js'),
      context: {
        slug: post.childMdx.frontmatter.slug,
      },
    });
  })
  ;
};
```

Now that my query has bene updated to differentiate between posts and videos, I can create pages programmatically for each based on _different_ layouts!

## Conclusion
Refactoring a site to accommodate multiple types of content is three steps:
1. Make sure the resolvers are in place
2. Make sure the queries are returning the right data
3. Sending the data to the right components for layouts

There were two stumbling blocks for me in exploring this space. Though they weren't major, it's worth calling out in case it can help someone else in the future (aka me when I come back to look how this is done):
1. The alias replaces the `allFile` key in the results. So, for blogs, I go to `blog` and videos to `video`. After doing this once, it makes sense intuitively — after all, that's exactly how I'd expect an alias to work.
2. The other thing that tripped me up was that `nodes` _is_ an array itself. So, I had to start iterating at that level rather than lower down as I had when it was just a single file type and I was querying based on `allMdx` (rather than `allFiles`).

Overall, however the conversion was straightforward and I'm now positioned to have multiple types of content on my site!

## Footnotes
* <sup>1</sup> [Queries and Mutations | GraphQL](https://graphql.org/learn/queries/#aliases)


