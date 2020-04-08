---
title: 'Rapid Prototyping GraphQL: Using Memory To Quickly Test Queries And Mutations'
date: '2020-04-07'
publish: '2020-04'28'
category: ['programming']
tags: ['graphql','prototyping','queries','mutations','in memory']
---

Imagine the following GraphQL schema for retrieving data about dogs:
```graphql
type Dog {
  name: String!
  breed: String
}

type Mutation {
    createDog(name: String!, breed: String): Dog
}

type Query {
  dogs: [Dog]!
}
```

Highlights:
1. Dogs have a name (always) and a breed (sometimes).
2. Querying for dogs, returns an array (always) filled with any dogs that match the criteria
3. Creating a dog requires a name

But now let's imagine that we want to _test_ this quickly. So quickly that we can't be bothered to connect the resolvers to the data layer itself.

How could we do that? We can use the local memory of our server (i.e. our computer if we're developing locally).

Let's see how.

First, let's handle creating a new dog and making sure that it's available for querying.

```javascript:title="resolvers/mutation.js"
const Mutations = {
  createDog: function(parent, args, ctx, info) {
    global.dogs = global.dogs || []; // attaching our dogs array to the global object
    const dog = { name: args.name, breed: args.breed };
    global.dogs.push(dog); // this will later be replaced by our data layer, i.e. the insert function for our database
    return dog;
  }
};
module.exports = Mutations;
```

Instead of saving the new dog that we're creating to the database, we've pushed it into an array of dogs stored on our global object.

Then when we're fetching the data (with our Query), we look to the global object instead of the database:

```javascript:title="resolvers/query.js"
const Query = {
  dogs: function(parent, args, ctx, info) {
    return global.dogs || []; // in the future, this will be replaced with interfacing with our data layer
  }
};
module.exports = Query;
```

At this point, you should have the beginnings of a fully functional GraphQL server - though it's not connected to a data layer.

Here's a [CodeSandbox](https://codesandbox.io/s/graphql-in-memory-q8m32) demonstrating the point:

https://codesandbox.io/s/graphql-in-memory-q8m32

Some notes on how to use the CSB:
1. Open a new Terminal window and run `yarn dev`
2. Open a new browser window or navigate to `https://xxxx-4000.sse.codesandbox.io)`
![](Screen%20Shot%202020-04-07%20at%206.45.46%20PM.png)
3. Once that's open, you should see the GraphQL Playground, and you can start writing your queries.

![](Screen%20Shot%202020-04-07%20at%206.46.01%20PM.png)


## Conclusion
And just like that, we've stood up a GraphQL server using GraphQL Yoga and are writing queries _without_ a data layer.

Pretty nifty if all you need is some rapid prototyping!
