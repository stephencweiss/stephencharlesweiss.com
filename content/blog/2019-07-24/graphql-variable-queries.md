---
title: 'How To Use Variables GraphQL Queries'
date: '2019-07-24'
category: ['programming']
tags: ['gatsby', 'graphql', 'filesystem', 'configuration']
---
My dive into [Gatsby](../../2019-07-20/gatsby-source-filesystem) continues.

Today, I wanted to better understand how dynamic queries worked in GraphQL.

For example, my blog (which I bootstrapped with Gatsby's official Blog Starter<sup>1</sup>) auto generates a new post page for each post I publish.

How does it do that and how does GraphQL facilitate it? That's what I wanted to figure out and I started with understanding the GraphQL side.

First, let's look at how we might look up a specific post based on its slug. Here's an example from my blog for the very first post I wrote:
```graphql
query hardCodedQuery {
  markdownRemark(fields: {slug: {eq: "/2015-07-18/starting-with-a-question/"}}) {
    frontmatter {
      title
      category
      date
      tags
    }
  }
}
```

This is saying that I want to query my `markdownRemark` (note that this is not `allMarkdownRemark`, but just an individual record) where the field's slug is equal to `/2015-07-18/starting-with-a-question/`. Since my slug is unique, it returns only the information pertaining to that one post:
```json
{
  "data": {
    "markdownRemark": {
      "frontmatter": {
        "title": "Starting with a question",
        "category": [
          "musings"
        ],
        "date": "2015-07-18",
        "tags": null
      }
    }
  }
}
```

But instead of having a post page per post, how could I leverage GraphQL to yield the results dynamically? Variables!

This is nearly the same, except that I place the variable _before_ the first set of braces `{}`
```graphql
query variableBasedQuery($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
      category
      date
      tags
    }
  }
}
```

The `$` is used to differentiate a variable name from a query parameter (which is how GraphQL is able to parse `{slug: eq: $slug}}` appropriately.

`String` indicates the variable's Type. And the `!` means that it's not null.

## Footnotes
* <sup>1</sup> [Gatsby Starters](https://www.gatsbyjs.org/starters/?v=2)