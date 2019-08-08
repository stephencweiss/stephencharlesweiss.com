---
title: 'Error: “Field “image” must not have a selection since type “String” has no subfields."'
date: '2019-08-08'
category: ['programming']
tags: ['gatsby', 'error handling', 'sharp', 'gatsby-config']
---

I was trying to query an image I’d placed in the frontmatter of a post, when I got the error:
> Field ‘image’ must not have a selection since type “String” has no subfields  

The query _should_ have worked because `image` in my case, was being transformed by Sharp and so _did_ have children. It would turn out that I was right in theory, but in practice needed to reconfigure a few things to get it to work.

How I debugged this error:
1. Reconfigure the `gatsby-config` so that `plugin-sharp` and `transformer-sharp` are first. This should be all you need to do, but if you're still having issues after rebuilding, keep going.
2. Delete `.cache`, `public` and `node_modules`
3. Re-install (`npm i`) all dependencies
4. Re-build (`npm run develop` if you’re using a Gatsby starter)

After completing all of these steps, my query worked like a charm and I now had access to children properties of my transformed image.

This is what my config file looks like at the moment:
``` javascript
module.exports = {
  siteMetadata: {
    title: ‘My site’,
    description: ‘A test site’,
  },
  plugins: [
    'gatsby-plugin-sharp’,
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    ‘gatsby-plugin-react-helmet’,
    {
      resolve: ‘gatsby-plugin-mdx’,
      options: {
        extensions: [“.mdx”,”.md”],
        defaultLayouts: {
          default: require.resolve(‘./src/components/layout.js’),
        },
        gatsbyRemarkPlugins: [{ resolve: 'gatsby-remark-images' }],
        plugins: [{ resolve: 'gatsby-remark-images' }],
      },
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'posts',
            path: 'content/posts'
        }
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'blog',
            path: 'content/blog'
        }
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'images',
            path: 'content/images'
        }
    },
  ],
};

```


## Resources
These are two resources I found particularly helpful in debugging this error:
1. [“Field “image” must not have a selection since type “String” has no subfields.”  · Issue #13469 · gatsbyjs/gatsby · GitHub](https://github.com/gatsbyjs/gatsby/issues/13469)
2. [Problems with Gatsby Image and their workarounds](https://theleakycauldronblog.com/blog/problems-with-gatsby-image-and-their-workarounds/)
