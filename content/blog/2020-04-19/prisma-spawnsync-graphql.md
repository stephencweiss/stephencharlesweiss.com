---
title: "Error Handling Prisma's Post-Deploy Hook"
date: '2020-03-30'
publish: '2020-04-19'
category: ['programming']
tags: ['graphql', 'prisma','error handling', '.yml', 'post-deploy', 'deployment hook']
---

I was running through a few different tutorials of Prisma recently when I ran into an error when trying to use a `post-deploy` hook.

After initializing my project (`prisma init`) and following the prompts on the CLI, I got to work with configuring my `.yml` file that was generated to be slightly more robust.

Namely, I wanted to use the `post-deploy` hook:

```yml:title=prisma.yml
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
secret: ${env:PRISMA_SECRET}
hooks:
    post-deploy:
        - graphql get-schema -p prisma
```

When I ran `prisma deploy`, however, I got an error:

```shell
$ prisma deploy
Deploying service `my-service` to stage `dev` to server `prisma-us1` 493ms
Service is already up to date.

post-deploy:
spawnSync graphql ENOENT//highlight-line
Running graphql get-schema -p prisma ✖
```

The issue, it seems is that `prisma` couldn't _find_ `graphql` and so it failed to launch the process.

Looking at my dependencies, however, raised some questions:

```json:title=package.json
{
    "scripts": {
        "start": "nodemon -e js,graphql -x node src/index.js"
    },
    "dependencies": {
        "//": "...",
        "graphql": "^0.13.2",
        "graphql-cli": "^2.16.7", //highlight-line
        "prisma": "1.17.1", //highlight-line
        "prisma-binding": "2.1.6"
    }
}
```

There are two fixes to this problem:

1. Install `graphql-cli` globally (`yarn add graphql-cli --global`), or
2. Add a script to be sure to use the locally executable `prisma` package which would be able to reference the `graphql-cli` also installed locally.

The former is described by [Ashik Nesin on his blog](https://ashiknesin.com/blog/how-to-fix-spawnsync-graphql-enoent-in-prisma/). Doing my best to [refrain from installing packages globally](https://stephencharlesweiss.com/blog/2020-02-26/global-node-packages-revisited/), I pursued the latter and added a `deploy` script to the `package.json`:

```json:title=package.json
{
  "scripts": {
    "start": "nodemon -e js,graphql -x node src/index.js",
    "deploy": "prisma deploy"//highlight-line
  },
  "dependencies": {
	  ...
    "graphql": "^0.13.2",
    "graphql-cli": "^2.16.7",
    "prisma": "1.17.1",
    "prisma-binding": "2.1.6",
  },
}
```

And just like that, my errors evaporated!

```shell
$ yarn deploy
yarn run v1.22.4
$ prisma deploy
Deploying service `my-service` to stage `dev` to server `prisma-us1` 197ms
Service is already up to date.

post-deploy:
project prisma - No changes

Running graphql get-schema -p prisma ✔//highlight-line
✨  Done in 10.51s.
```
