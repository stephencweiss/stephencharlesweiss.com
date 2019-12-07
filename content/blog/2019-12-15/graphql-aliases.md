---
title: 'GraphQL Aliases'
date: '2019-11-27'
publish: '2019-12-15'
category: ['graphql']
tags: ['gatsby', 'aliases']
---

For a long time, my site has been fueled by a single graphql query. The site is a single page that is a running list of all my blog posts.

The more I write, the more unweildly the site becomes. While adding search helped, I've got plans to add pagination and other pages in the future.

Before that could become a reality, I needed a way to pull back different data in different contexts.

That is, in order to create a page for each blog entry, I needed to retrieve the actual blog entry. However, to create a list of 10 blog entries, I needed the title and a slug.

The problem was that they were coming from the same place and without aliasing, that leads to errors. Fortunately, aliasing the query provided a solution.

Let's take a look.

To begin, I had this query in my `gatsby-node`.

```graphql
query BlogPosts {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fields: {isPublished: {eq: true}}}, limit: 1000) {
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
```

The results of this query are a series of edges, like so:

```json
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "fields": {
              "slug": "/2019-11-27/running-shell-scripts/"
            },
            "frontmatter": {
              "title": "Shell Scripts: How To Run Them"
            }
          }
        },
        {
          "node": {
            "fields": {
              "slug": "/2019-11-25/psql-tuples-only/"
            },
            "frontmatter": {
              "title": "Postgres Tuples Only"
            }
          }
        },
        ...
      ]
    }
  }
}
```

These were then passed into a `createPage` action which used my `blogPost` template to generate a post for each edge.

## Adding Pagination

The [Gatsby tutorial on pagination](https://www.gatsbyjs.org/docs/adding-pagination/) was my starting point for learning about pagination on Gatsby.

The result is a query that looks nearly identical to retrieving _all_ posts, but includes a limit (i.e. the maximum number of results to return), and a skip (i.e. how many of the results to skip initially).

```graphql
query PaginatedBlogPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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
  }
```

## Putting The Pieces Together

Okay, so I now have my paginated results, but I still need all of the results in order to create the pages for the blog posts.

Unfortunately, if I go ahead and and put these queries together, things break:

```graphql
query CombinedQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fields: {isPublished: {eq: true}}}, limit: 3) {
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
  allMarkdownRemark(filter: {fields: {isPublished: {eq: true}}}, sort: {fields: [frontmatter___date], order: DESC}, limit: $limit, skip: $skip) {
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
```

Fortunately, tools like GraphiQL will show you something's afoot.
![](/i/Screen%20Shot%202019-11-27%20at%202.18.05%20PM.png)

> Fields "allMarkdownRemark" conflict because they have different arguments. use different aliases on the fields to fetch both if this was intentional.

If I proceed without addressing this issue, I'll get an error in response:

```json
{
  "errors": [
    {
      "message": "Fields \"allMarkdownRemark\" conflict because they have differing arguments. Use different aliases on the fields to fetch both if this was intentional.",
      "locations": [
        {
          "line": 2,
          "column": 3
        },
        {
          "line": 14,
          "column": 3
        }
      ],
      "stack": [
        "GraphQLError: Fields \"allMarkdownRemark\" conflict because they have differing arguments. Use different aliases on the fields to fetch both if this was intentional.",
        "    at Object.SelectionSet (/Users/stephen/_coding/personal/blog/node_modules/graphql/validation/rules/OverlappingFieldsCanBeMerged.js:71:29)",
        "    at Object.enter (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:324:29)",
        "    at Object.enter (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:375:25)",
        "    at visit (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:242:26)",
        "    at validate (/Users/stephen/_coding/personal/blog/node_modules/graphql/validation/validate.js:73:24)",
        "    at /Users/stephen/_coding/personal/blog/node_modules/express-graphql/index.js:121:32",
        "    at processTicksAndRejections (internal/process/task_queues.js:93:5)"
      ]
    },
    {
      "message": "Variable \"$limit\" is not defined by operation \"BlogPosts\".",
      "locations": [
        {
          "line": 14,
          "column": 124
        },
        {
          "line": 1,
          "column": 1
        }
      ],
      "stack": [
        "GraphQLError: Variable \"$limit\" is not defined by operation \"BlogPosts\".",
        "    at Object.leave (/Users/stephen/_coding/personal/blog/node_modules/graphql/validation/rules/NoUndefinedVariables.js:38:33)",
        "    at Object.leave (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:345:29)",
        "    at Object.leave (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:395:21)",
        "    at visit (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:242:26)",
        "    at validate (/Users/stephen/_coding/personal/blog/node_modules/graphql/validation/validate.js:73:24)",
        "    at /Users/stephen/_coding/personal/blog/node_modules/express-graphql/index.js:121:32",
        "    at processTicksAndRejections (internal/process/task_queues.js:93:5)"
      ]
    },
    {
      "message": "Variable \"$skip\" is not defined by operation \"BlogPosts\".",
      "locations": [
        {
          "line": 14,
          "column": 138
        },
        {
          "line": 1,
          "column": 1
        }
      ],
      "stack": [
        "GraphQLError: Variable \"$skip\" is not defined by operation \"BlogPosts\".",
        "    at Object.leave (/Users/stephen/_coding/personal/blog/node_modules/graphql/validation/rules/NoUndefinedVariables.js:38:33)",
        "    at Object.leave (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:345:29)",
        "    at Object.leave (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:395:21)",
        "    at visit (/Users/stephen/_coding/personal/blog/node_modules/graphql/language/visitor.js:242:26)",
        "    at validate (/Users/stephen/_coding/personal/blog/node_modules/graphql/validation/validate.js:73:24)",
        "    at /Users/stephen/_coding/personal/blog/node_modules/express-graphql/index.js:121:32",
        "    at processTicksAndRejections (internal/process/task_queues.js:93:5)"
      ]
    }
  ]
}
```

## Aliases As The Solution

So, if both queries are needed, but running them together creates errors, what is the solution? Aliases!

```graphql
query combinedQuery($skip: Int!, $limit: Int!) {
  paginatedResults: allMarkdownRemark(filter: {fields: {isPublished: {eq: true}}}, sort: {fields: [frontmatter___date], order: DESC}, limit: $limit, skip: $skip) {
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
  publishedResults: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fields: {isPublished: {eq: true}}}) {
    edges {
      node {
        fields {
          slug
          isPublished
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
```

In this case, the first query of `allMarkdownRemark` is aliased to `paginatedResults` and the second to `publishedResults`.

```json
{
  "data": {
    "paginatedResults": {
      "edges": [
        {
          //  ...
        },
        // ...
      ]
    },
    "publishedResults": {
      "edges": [
        {
          // ...
        },
        // ...
      ]
    }
  }
}
```

Once aliased, it's important to remember that the data is no longer accessible through `data.allMarkdownRemark`, but `data.paginatedResults` and `data.publishedResults`.

## Wrap-Up

If you need data from the same field in two different ways, GraphQL will yell... unless you provide an alias. And since they're simple to use, might as well!

Learning GraphQL - one bite at a time!
