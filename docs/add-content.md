# Adding Content

The steps to add new content types to this site.

## Local Content

When adding a new type of local content (e.g., blogs, lists, books, etc.), the pattern to do so is the following:

1. Add the content as a directory in `./content`, e.g., `./content/blog`)
1. Add this to Gatsby in `./gatsby-config` using the `gatsby-source-filesystem` plugin, e.g.:

```js
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
```

3. Create a new section in the `.gatsby-node.js` query:

```graphql
blog: allMarkdownRemark(
    filter: {
    fields: {

        sourceInstance: { eq: "blog" }
    }
    }
) {
    # data you want to query
}
```
4. _Exclude_ this new `sourceInstance` from the final `other` section:
```graphql
other: allMarkdownRemark(
    filter: {
        fields: {
            sourceInstance: {
            nin: [..., "blog"]
            }
        }
    }
) {
    #...
}
```
5. Optional: Add a new top-level page
    If this type of data has it's own page, add it in `src/pages`
6. Optional: Add a new layout in `src/templates`