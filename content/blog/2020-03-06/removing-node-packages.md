---
title: 'Removing Node Packages'
date: '2020-02-12'
publish: '2020-03-06'
category: ['programming']
tags: ['npm','yarn','uninstall','remove','package management']
---

Apparently I've been doing this wrong the whole time and I didn't know until I started using `yarn`.

In the past when I wanted to remove a package, I simply deleted it from my `package.lock` and then ran install again. Poof. It's gone!

But... maybe not. Doing it this way means that the package or its dependencies might remain in the lock file.

My first hint that something might be wrong was when I tried this same approach with `yarn`.

When I ran `yarn add` _without_ targeting a package, _nothing happened_.

```shell
$ yarn add
yarn add v1.21.1
error Missing list of packages to add to your project.
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```

So, I did some digging and found out that I'd never done this right!

The proper way to remove a package with `npm` is [uninstall command](https://docs.npmjs.com/uninstalling-packages-and-dependencies):
```shell
$ npm uninstall <package_name>
```

With `yarn`, it's the [remove command](https://classic.yarnpkg.com/en/docs/cli/remove/):
```
$ yarn remove <package_name>
```
