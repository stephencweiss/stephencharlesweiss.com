---
title: 'Git - Checking Out Remote Branches, Revisited'
date: '2020-01-08'
publish: '2020-01-22'
category: ['git']
tags: ['shell','function','git branch','git checkout']
---
Previously, I wrote about how to [checkout branches from a remote when the branch is not present locally](../../2019-04-27/).

Recently, I found a new method that makes this even simpler by combining `git checkout`'s `-t` flag with `git branch`'s `-a` flag.

The generalalized command is:
```shell
$ git checkout -t $(git branch -a | grep <target-branch>)
```

By replacing the target branch, I'm able to pull down a branch and check it out immediately without having to know the whole name.

```shell
$ git branch
  chore/bump-typescript
  chore/update-profile-upload-icon
  m20-107/photo-notice
  master
$ git checkout -t $(gb -a | grep pd-831)
Branch 'pd-831/download-photos' set up to track remote branch 'pd-831/download-photos' from 'origin'.
Switched to a new branch 'pd-831/download-photos'
```

This is particularly useful if you have a convention of placing ticket identifiers in the branch name (e.g., `pd-831`).

As I mentioned to a friend when I shared this with him: the feeling of combining things in a novel way is glorious!
