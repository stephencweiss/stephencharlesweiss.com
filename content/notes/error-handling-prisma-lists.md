---
title: 'Error Handling Lists In Prisma GraphQL Schemas'
date: '2020-04-20'
publish: '2020-05-17'
category: ['programming']
tags:
    [
        'graphql',
        'prisma',
        'schema',
        'data model',
        'scalarList',
        'error handling',
    ]
---

Recently, I wanted to introduce permissions to an app I was building.

Keeping things very simple to start, I decided to have two permissions: Admin or User.

I want to keep flexibility for the future, and compose permissions bottom-up - rather than have singular groups that can balloon in number that I need to manage.

To implement this then, I decided to:

1. Use an Enum to _enumerate_ the different permission classes,
2. Add an array of permissions to each user

The result looked a little like:

```diff:title=datamodel.graphql
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  password: String!
  salt: String!
+  permissions: [Permission]
}

+ enum Permission {
+   ADMIN
+   USER
+ }
```

## Deployment Error

While this data model reads nicely, Prisma will reject it as it's missing an `@scalarList` directive.

```shell
$ prisma deploy
Deploying service `xxx` to stage `dev` to server `prisma-us1` 171ms
Errors:

  User
    ✖ Valid values for the strategy argument of `@scalarList` are: RELATION.
```

The error message is quite explicit, if not clear.

From the [Prisma docs](https://v1.prisma.io/docs/1.34/datamodel-and-migrations/datamodel-MYSQL-knul/#@scalarlist):

> ### `@scalarList`
>
> This `@scalarList(strategy: STRATEGY!)` directive is required on any scalar list field. The only valid argument for the `strategy` argument is `RELATION`.
>
> ```graphql
> type Post {
>     tags: [String!]! @scalarList(strategy: RELATION)
> }
> ```

The fix is a one line change:

```diff:title=datamodel.graphql
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  password: String!
  salt: String!
-  permissions: [Permission]
+  permissions: [Permission] @scalarList(strategy: RELATION)
}

enum Permission {
  ADMIN
  USER
}
```

With that one change made, when we redeploy we see all green:

```shell
$ prisma deploy
Deploying service `xxx` to stage `dev` to server `prisma-us1` 194ms

Changes:

  User (Type)
  + Created field `permissions` of type `[Enum!]!`

  Permission (Enum)
  + Created enum Permission with values `ADMIN`, `USER`

Applying changes 1.4s
```

## Wrapping Up

Embedding enums directly into your data model can be great for managing lists of options. There are, however, some caveats to their use. In this case, the issue had to do with the use of the array (i.e. a list), and not so much with the fact that the type was an Enum. The same solution would have been required even if the list of permissions had been a string (as indicated by the example from the docs).
