---
title: 'Extending GraphQL-Yoga Server With Express Middleware'
date: '2020-04-20'
publish: '2020-05-18'
category: ['programming']
tags: ['express', 'graphql-yoga', 'middleware']
---

One of the benefits of using GraphQL-Yoga's Server is its extensibility via Express middleware. Despite this being listed as one of the [features](https://github.com/prisma-labs/graphql-yoga#features), I didn't really appreciate it until I had a need to use it.

For example, if you have a standard Express server and you want to add some middleware (need a refresher on middleware? I wrote some basics [here](https://stephencharlesweiss.com/blog/2019-11-21/basic-middleware-node/)), you might do something like:

```javascript:title=server/index.js
const express = require('express')
const cookieParser = require('cookie-parser')
const customMiddleware = require('./customMiddleware')
const PORT = 3000;

const server = express()
server.use(cookieParser())
server.use(customMiddleware())
...
server.listen(PORT, () => console.log(`We're live on port: ${PORT}`)
```

With GraphQL-Yoga, it's actually not that different thanks to the Prisma team's [implementation](https://github.com/prisma-labs/graphql-yoga/blob/master/src/index.ts#L68):

```javascript:title=graphql-yoga/src/index.ts
export class GraphQLServer {
    express: express.Application //highlight-line
    //...
}
```

The result is - if you want to use the same middleware we used above, but in the context of a GraphQL server, you could implement it as follows:

```javascript:title=src/index.js
const { GraphQLServer } = require("graphql-yoga");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const customMiddleware = require('./customMiddleware')
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

// Create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: { Mutation, Query },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}
const server = createServer()
server.express.use(cookieParser()) //highlight-line
server.express.use(customMiddleware()) //highlight-line
...
server.start(res => console.log(`We're live on port ${res.port})
```

(For more on configuring the GraphQL Server itself, see [here](resolving-graphql-queries-against-data-layer).)

(NB: The use of `dotenv` brings into scope any environment variables for use by [the server](https://github.com/prisma-labs/graphql-yoga#startoptions-options-callback-options-options--void----null-promisevoid). In this case, it's presumed that a port number is included in the `.env` file)

And just like that, our GraphQL server (powered by GraphQL-Yoga) is using Express middleware! Nice!
