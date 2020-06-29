---
title: 'Getting Started With Gatsby-Source-Filesystem'
date: '2019-07-20'
publish: '2019-07-20'
category: ['programming']
tags: ['gatsby', 'graphql', 'filesystem', 'configuration']
---

Continuing my learnings in Gatsby and today I found out a few new pieces about the filesystem plugin, `gatsby-source-filesystem`.<sup>1</sup> The filesystem plugin is from Gatsby and allows local files to be used within the Graphql data layer.

## Configuring Gatsby

The first thing to do (after installing it with `npm i gatsby-source-filesystem` is to add the plugin within our `gatsby-config.js`:

```javascript
// gatsby-config.js
module.exports = {
...
  plugins: [
    {
       resolve: 'gatsby-source-filesystem',
       options: {
         name: 'posts',
         path: 'posts'
       }
    },
  ],
...
}
```

Notice that the configuration gives it a name (optional) and a path. The path is just `posts` in this case because I’m only trying to resolve the directory in the root _also_ named `posts`.

```shell
.
├── LICENSE
├── README.md
├── gatsby-config.js
├── gatsby-node.js
├── node_modules
├── package.json
├── posts
├── public
├── src
├── static
└── yarn.lock
```

## Using The Filesystem

Now that the filesystem is linked up, let’s see what it looks like by exploring the graphql data layer.

Run the Gatsby in development (`npm run develop` ). Assuming the build goes well, you should have a GraphQL Playground at `http://localhost:8000/___graphql`.

Suddenly, the files in my `posts` directory are available for querying.

![Gatsby Graphql Playground Files](https://res.cloudinary.com/scweiss1/image/upload/v1593195538/code-comments/gatsby-graphql-playground-files_jgbsmz.png)

The files returned match those that I currently have in my posts directory.

![gatsby project directory](https://res.cloudinary.com/scweiss1/image/upload/v1593195538/code-comments/gatsby-project-directory_uoi3oo.png)

## Multiple Paths

One of the immediate questions I had when I learned about the filesystem plugin was what to do in the event of multiple directories. The configuration didn’t immediately shout out how I’d be able to set up more than one path for access by the graphql data layer.

Fortunately, it’s both very simple, and one of the first questions the docs answer for us: add another entry in your plugins with the new path desired. Repeat as necessary. For example:

```javascript
// gatsby-config.js
module.exports = {
...
  plugins: [
    {
       resolve: 'gatsby-source-filesystem',
       options: {
         name: 'posts',
         path: 'posts'
       }
    },
    {
       resolve: 'gatsby-source-filesystem',
       options: {
         name: 'static',
         path: 'static'
       }
    },
  ],
...
}
```

## Footnotes

-   <sup>1</sup> [Gatsby Source Filesystem | Gatsby](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#how-to-use)
