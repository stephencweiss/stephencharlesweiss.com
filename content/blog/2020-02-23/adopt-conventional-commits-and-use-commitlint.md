---
title: 'Adopting Conventional Commits: Adding Commitlint'
date: '2020-02-04'
publish: '2020-02-23'
category: ['programming']
tags: ['conventional commit', 'commitlint', 'package discovery']
---

Today is another entry in my [Package Discovery](../../../tags/package-discovery/) series. The topic is conventional commits with `commitlint`.

Learning about [Conventional Commits](../../2020-02-22/semantic-versioning-and-conventional-commits) recently made me want to actually put it in practice.

As I mentioned at the end of that post, there are tools available to make it simpler to adhere to the rules.

Instead of remembering whether or not I need a space or if `fix:` or `FIX:` is correct (note: it's `fix:`), a linter will do all of those checks for me.

`commitlint` has two packages that are designed to help with exactly this: they have a cli and a config.

[Getting started](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#getting-started) is _almost_ as easy as:

```shell
$ npm install --save-dev @commitlint/config-conventional @commitlint/cli
$ echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

What isn't accounted for in these instructions is hooking it into your flow of actually committing changes.

That's where Husky comes in.

The [commitlint.js.org](https://commitlint.js.org/) page has a more robust set of steps in their guides - one for CI and one for local.

By installing Husky as another dev dependency, we're able to hook into `git hooks` (something I didn't know existed before today):

```shell
$ npm install --save-dev husky
```

Once installed, modify the `package.json` to include a `husky` field:

```json:title=./package.json
{
  "name": "my awesome library",
  //...
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

Per the guide:
> Using `commit-msg` gives us exactly what we want: It is executed whenever a new commit is created. Passing husky's `HUSKY_GIT_PARAMS` to `commitlint` via the `-E|--env` flag directs it to the relevant edit file. `-e` would default to `.git/COMMIT_EDITMSG`.<sup>[1](#footnotes)</sup><a id="fn1"></a>

## Test The Hook

While it would be nice to start this process at the _beginning_ of a new project. Sometimes, that's not possible.

One of my favorite sayings is: "The best time to start was yesterday. The second best is today."

With that in mind, let's focus on making sure _future_ commits adhere to the Conventional Commit standard.

Here's my first attempt in the format I _used_ to use:

```shell
$ git commit
husky > commit-msg (node v12.14.1)
⧗   input: Draft of adding-commitlint
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

Notice that my commit message was very simple. One line with just "Draft of adding-commitlint".

This was rejected by `commitlint` and the commit _exited_.

I can see this by looking at my commit log:

```shellcommit f4aac1ef08e0f6fd3328813681349fcad96e4139 (HEAD -> new-posts-weekof-2020-02-17)
Author: Stephen
Date:   Tue Feb 4 09:20:24 2020 -0600

    feat: husky hook for commitlint

    Adding husky allows a hook into commitlint.

    This means that every commit will run through the linter.

    Steps taken from here: https://commitlint.js.org/#/guides-local-setup

commit 8bb7711aea2dfeb1573d2c904932b314e3697325
Author: Stephen
Date:   Tue Feb 4 09:12:49 2020 -0600

    feat: add commitlint

    adds commitlint cli and config-conventional packages.

    These packages should make adopting conventional commits easier.
```





## Footnotes
- <sup>[1](#fn1)</sup> Of note, `commit-msg` is not a random string. It's a specific `git hook`.
> The hook is allowed to edit the message file in place, and can be used to normalize the message into some project standard format. It can also be used to refuse the commit after inspecting the message file.
For more, see the [Git manual page on `githooks`](https://git-scm.com/docs/githooks#_commit_msg).
