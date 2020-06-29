---
title: 'Resolving GraphQL Queries Against A Data Layer'
date: '2020-04-08'
publish: '2020-05-02'
category: ['programming']
tags: ['graphql', 'query', 'mutation', 'data layer', 'prisma']
---

Recently, I wrote about [prototyping graphql queries _without_ connecting to a data layer](prototyping-graphql-in-memory).

At some point, however, the goal is to actually be able to resolve requests to read, write, update, and delete data from our data layer and possibly dispatch actions based on those requests.

Let's look at what's involved:

1. GraphQL Schema - this is where you define the mutations and queries available to the client
2. The API for the datalayer - in my case, I'm using Prisma, which generates a full CRUD API
3. Access to the data layer API within our resolvers - there are various strategies here: they can be imported directly or attached to the context

## Step 1: Defining our client facing API.

```javascript:title=src/schema.graphql
# import * from './generated/prisma.graphql'

"""
This document houses client-facing types, queries, and mutations
"""

type Mutation {
  createItem(title: String, description: String, price: Int,
  image: String, largeImage: String): Item!
}

type Query {
  items: [Item]!
}
```

`graphql-import` is a dependency of `graphql-binding`, itself a dependency of `prisma-binding` which enables imports in a graphql file with the `# import` syntax. This eliminates a need for defining types that will be used throughout our code in multiple places (e.g., `Item`).

## Step 2: Generating The API For The Data Layer

One of the major advantages of using a library like Prisma is that when you deploy your datamodel, it will generate a full API for you automatically. This can be saved automatically using a post-deploy hook (which [I wrote about previously](prisma-spawnsync-graphql)).

## Step 3: Making The Data Layer API Accessible

As I noted above, there are different ways to do this, but I'll demonstrate making the database's API accessible within a request's context.

First, I'll need to establish a connection to the database:

```javascript:title=src/db.js
const { Prisma } = require('prisma-binding')

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false,
})

module.exports = db
```

Using `prisma-binding`, I'm generating a new connection to my Prisma database and then exporting that connection.

Next, when I start my GraphQL Yoga server, I'll pass along the database:

```javascript:title=src/createServer.js
const { GraphQLServer } = require('graphql-yoga')
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
const db = require('./db')

// Create the GraphQL Yoga Server

function createServer() {
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: { Mutation, Query },
        resolverValidationOptions: {
            requireResolversForResolveType: false,
        },
        context: (req) => ({ ...req, db }), //highlight-line
    })
}

module.exports = createServer
```

Now, when our server's running, every time we get a request, we'll attach the database to the context.

## Putting This To Use

Now that we have all of our set up out of the way, we're able to actually _use_ the database API within our resolvers to get (in a Query) and post (in a Mutation) directly to our database.

```javascript:title=src/resolvers/Mutation.js
const Mutations = {
  createItem(parent, args, ctx, info){
    // TODO: Auth check
    resolve ctx.db.mutation.createItem({
      data: {...args}
    }, info)
  }
};

module.exports = Mutations;
```

I know this is what our data layer's expecting by looking at `prisma.graphql` - the CRUD API Prisma generated based on my data model:

```graphql:title=src/generated/prisma.graphql
type ItemSubscriptionPayload {
  mutation: MutationType!
  node: Item
  updatedFields: [String!]
  previousValues: ItemPreviousValues
}


type Mutation {
  ...
  createItem(data: ItemCreateInput!): Item!
  ...
}

input ItemCreateInput {
  id: ID
  title: String!
  description: String!
  image: String
  largeImage: String
  price: Int!
  createAt: DateTime
}

```

The spread args in our resolver (defined earlier in the `schema.graphql`) match what our data layer's expecting in the `ItemCreateInput` type.

If all goes well, mutations are now available in the playground. Running them I see a new item is created:

![successfully creating an item](https://res.cloudinary.com/scweiss1/image/upload/v1593197279/code-comments/success_b192ic.png)

Further verifying that this actually reached our data layer, I can check my database directly:

![record is present on db](https://res.cloudinary.com/scweiss1/image/upload/v1593197279/code-comments/on-db_f3t8mn.png)
