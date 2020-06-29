---
title: 'GraphQL Query Forwarding'
date: '2020-04-08'
publish: '2020-05-03'
category: ['programming']
tags: ['graphql', 'query forwarding', 'prisma-binding']
---

In GraphQL if your queries are the same going from the client to the GraphQL server and the GraphQL server to the backend (e.g., React -> GraphQL Yoga and then GraphQL Yoga -> Prisma), instead of writing a custom resolver duplicating the logic, it's possible to simply forward the request.

For example:

```javascript:title=src/resolvers/query.js
const Query = {
    async items(parent, args, ctx, info) {
        const items = await ctx.db.query.items()
        return items
    },
}

module.exports = Query
```

Can be converted to:

```javascript:title=src/resolvers/query.js
const { forwardTo } = require('prisma-binding')

const Query = {
    items: forwardTo('db'),
}
```

This is useful if you want to get up and running, testing a live connection to the data layer _without_ customizing the resolvers.

It won't work if the resolver needs some additional business logic, e.g., authentication.

Until then, however, this provides a nice way to expose the functionality provided by the data layer, quickly.
