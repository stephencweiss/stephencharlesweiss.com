---
title: 'Passing Test Variables To GraphiQL'
date: '2019-08-31'
category: ['programming']
tags: ['graphql', 'graphiql', 'gatsby']
---

Previously, I wrote about writing a GraphQL query that takes variables.

I was using this to programmatically create posts.

In returning to that post later, however, I noticed that I actually forgot a relevant detail: how to test it in GraphiQL, the playground Gatsby provides.

Continuing with the same example we used last time, you can see at the bottom left of the screen a “Query Variables” option.

Clicking on it exposes an input window.

![](./example-query-variables.png)

In my case, my only variable is a string for the argument `$slug`. To pass an option, I create an object with `slug` as the key and whatever value I want.

For example:
```javascript
{“slug”: “hello-world”
```

Note: It’s important to put quotes around Slug or it will error.

![](./error-expected-string.png)

## Footnotes
* <sup>1</sup> [How To Use Variables GraphQL Queries | /* Code Comments */](https://www.stephencharlesweiss.com/2019-07-24/graphql-variable-queries/)
