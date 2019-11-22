---
title: 'Git Cherry Pick'
date: '2019-11-20'
publish: '2019-12-08'
tags: ['git','cherry-pick','reflog']
category: ['programming']
---
Yesterday, I wrote about [how to pull a specific files from another branch into your branch](../../2019-12-07/git-copy-files-between-branches).

But what if you want to pull in all of the changes from a commit? That's what happened to me today!

Instead of checking out all of the files I was interested in - and therefore bringing over not just what changed in the latest commit, but also everything else that happened before, we can use the [cherry pick](https://git-scm.com/docs/git-cherry-pick) option.

Cherry picking is like a mini-merge. Instead of trying to merge an entire branch into your current branch, it picks a single commit and attempts to bring that over.

And just like merges, cherry picking can end up in conflicts, which requires resolution.

Example time!

Let’s say I want to make a detour based on work I was doing on a feature branch, I’ll call it `feature-a`. I don’t want to just cut another branch _from_ `feature-a`, because then I’d be carrying all of the previous commits I’d made on that branch with me.

Instead, I want to start fresh-ish. That is, I want to work on master, but to bring over the last commit I made on `feature-a` to `detour-b`.

Steps to do this
1. Switch to a new branch based on master
2. Get the latest commit hash
3. Cherry pick the commit

Creating the new branch can happen based on master, no matter which branch we’re currently on, by setting its target:
```shell
$ git checkout -b detour-b master
```

Then, we can use `git reflow` to see the latest actions and their respective hashes within `git`:
```shell
$ git reflog
17114a0e (HEAD -> master, tag: v4.0.49, origin/master, origin/HEAD) HEAD@{1}: checkout: moving from feature-a to detour-b
481ad9a8 (origin/feature-a, feature-a) HEAD@{14}: commit: Fixing build time errors
```

Now, to cherry pick that latest commit, I can do:
```shell
$ git cherry-pick -x 481ad9a8
```

While I used the `-x` option, it’s one of several. Another good one would be the `-e`.

In the case of the `-x`, git automatically appends a commit message indicating that the commit is a cherry pick and notes the hash.
With `-e`, I would have an opportunity to write my own commit message.

> `-e, --edit`
>           With this option, git cherry-pick will let you edit the commit message prior to committing.
> `-x`
>            When recording the commit, append a line that says "(cherry picked from commit ...)" to the original commit message in order to indicate which commit this change was cherry-picked from. This is done only for cherry picks without conflicts. Do not use this option if you are cherry-picking from your private branch because the information is useless to the recipient. If on the other hand you are cherry-picking between two publicly visible branches (e.g. backporting a fix to a maintenance branch for an older release from a development branch), adding this information can be useful.

That’s it!

I’ve now cut a new branch and am ready to keep pursuing my new train of thought without polluting the `feature-a` branch!