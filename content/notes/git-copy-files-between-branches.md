---
title: 'Easily Copy Files Between Branches'
category: ['programming']
tags: ['git', 'checkout', 'copy files', 'branch', 'remote']
date: '2019-11-19'
publish: '2019-12-07'
---

Frequently, I want to pull in just a single file from another git branch. I always need to look up the specifics, so I’m documenting it to hopefully make finding it easier in the future.

Imagine the following situation:

-   You’re working on a feature branch `feature/awesome-feature`
-   A teammate, working on `feature/also-awesome` just pushed changes to the index file in the `src` directory that you want to merge in.

To pull in those changes:

1. [Confirm your remote repository is configured](git-adding-remotes). Alternatively, if you’ve got a local copy of `feature/also-awesome` you can use that too.

```shell
$ git remote -v
origin	git@git.remine.com:app-v2/repaint.git (fetch)
origin	git@git.remine.com:app-v2/repaint.git (push)
```

2. Checkout the file from the target branch

```shell
$ git checkout origin/feature/also-awesome src/package-lock.json
```

More generically, that’s:

```shell
$ git checkout [target-branch] [path/to/file]
```

Normally, when we use checkout, we’re checking out the entire branch, but what we’re doing here is taking advantage of the following options:

> `git checkout [<tree-ish>] [--] <pathspec>…`
> Overwrite paths in the working tree by replacing with the contents in the index or in the `<tree-ish>` (most often a commit). When a `<tree-ish>` is given, the paths that match the `<pathspec>` are updated both in the index and in the working tree.
>
> The index may contain unmerged entries because of a previous failed merge. By default, if you try to check out such an entry from the index, the checkout operation will fail and nothing will be checked out.
> Using -f will ignore these unmerged entries. The contents from a specific side of the merge can be checked out of the index by using --ours or --theirs. With -m, changes made to the working tree file can be discarded to re-create the original conflicted merge result.
>
> `git checkout (-p|--patch) [<tree-ish>] [--] [<pathspec>…]`
> This is similar to the "check out paths to the working tree from either the index or from a tree-ish" mode described above, but lets you use the interactive interface to show the "diff" output and choose which hunks to use in the result. See below for the description of --patch option.

While I’m only checkout a single file, as the manual describes, the checkout command is capable of pulling in multiple. It just requires a separate path for each.
