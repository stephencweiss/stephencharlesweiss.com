---
title: 'Passing Test Variables To GraphiQL'
date: '2019-08-31'
publish: '2019-08-31'
category: ['programming']
tags: ['graphql', 'graphiql', 'gatsby']
---

Previously, I wrote about writing a GraphQL query that takes variables.

I was using this to programmatically create posts.

In returning to that post later, however, I noticed that I actually forgot a relevant detail: how to test it in GraphiQL, the playground Gatsby provides.

Continuing with the same example we used last time, you can see at the bottom left of the screen a "Query Variables" option.

Clicking on it exposes an input window.

![Example Query Variables](https://res.cloudinary.com/scweiss1/image/upload/v1593196353/code-comments/example-query-variables_wkdfhr.png)

In my case, my only variable is a string for the argument `$slug`. To pass an option, I create an object with `slug` as the key and whatever value I want.

For example:

```javascript
{"slug": "hello-world"}
```

Note: It’s important to put quotes around Slug or it will error.

![Error: Expected String](https://res.cloudinary.com/scweiss1/image/upload/v1593196352/code-comments/error-expected-string_gq7uos.png)

## Footnotes

-   <sup>1</sup> [How To Use Variables GraphQL Queries | /_ Code Comments _/](https://www.stephencharlesweiss.com/2019-07-24/graphql-variable-queries/)
