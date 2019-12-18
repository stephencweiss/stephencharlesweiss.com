---
title: 'GraphQL Resolvers: Resolving Types All The Way Down'
date: '2019-12-18'
publish: '2019-01-03'
category: ['graphql']
tags: ['resolvers']
---

Last month I wrote about how to [compose GraphQL schemas with Apollo](../../2019-12-16/apollo-graphql-composable-schemas).

Today, I'll be extending that example to investigate resolvers. Specifically, writing resolvers that resolve additional nested types.

For simplicity, I'll use the same `Product` type.

As a reminder, the type definition of `Product` is:

```graphql
type Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}
```

I also have several queries that enable retriving product data:

```graphql
extend type Query {
  products: [Product]!
  product(id: ID!): Product!
}
```

Simple resolvers to retrieve the data could be written as:

```javascript
import { Product } from './product.model'

const product = (_, args) => {
  return Product.findById(args.id).exec()
}
const products = () => {
  return Product.find().exec()
}

export default = {
  Query: {
    product,
    products
  },
}
```

In this case, my `Product` is a mongoose model and consequently comes with all of the methods I need to query the database for the data I'm looking for.

Note, however, that each of the Product attribute's types are _not_ scalar. `type` is `ProductType`, `bikeType` is `BikeType`, and `createdBy` is a `User`.

`ProductType` and `BikeType` are actually enums. So, they resolve down to strings and are no problem. The `createdBy` field, however, isn't a string, it's another object.

The type definition of `User` is:

```graphql
type User {
  _id: ID!
  email: String!
  apiKey: String!
  role: String!
}
```

As a result, if I want to be able to know who created the product, I will need to specify it in the resolver for the `Product`.

```javascript
import { Product } from './product.model'
import { User } from '../user/user.model'

const product = (_, args) => {
  return Product.findById(args.id).exec()
}
const products = () => {
  return Product.find().exec()
}

const createdBy = (product) => {
    return User.findById( product.createdBy).lean().exec()
}

export default = {
  Query: {
    product,
    products
  },
  Product: {
    __resolveType(product) {},
    createdBy
  }
}
```

This is a good example of when it makes sense to use the _first_ argument in the resolver.<sup>[1](#footnotes)</sup><a id="fn1"></a>

Per Apollo, the first argument in the resolver is:

> The object that contains the result returned from the resolver on the parent field, or, in the case of a top-level Query field, the rootValue passed from the server configuration. This argument enables the nested nature of GraphQL queries.

Whereas the resolver for `product`, which has a placeholder `_` in the first position, resolving `createdBy` actually uses a value.

That's because `product` is a top level query and so receives the `rootValue` in the first position of the resolver. The `rootValue`, however, is not helpful in finding a product by an ID. The `createdBy` resolver, however, receives the `Product` as the returned result which _is_ useful in resolving the `createdBy`'s `User` object.

## Conclusion

In most circumstances, the first argument of a resolver is not going to be very useful - particularly if it's a top-level resolver and receives the `rootValue`. However, once you get past that initial tier and you need to resolve the object all the way down, the received result becomes much more useful as this example demonstrates.

## Footnotes

<sup>[1](#fn1)</sup> The GraphQL resolver function signature has four possible arguments. For more information, see the [Apollo docs](https://www.apollographql.com/docs/graphql-tools/resolvers/#resolver-function-signature).
