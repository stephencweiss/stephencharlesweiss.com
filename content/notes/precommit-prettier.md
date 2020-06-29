---
title: 'Prettier Pre-Commit Hook Options'
date: '2020-05-30'
publish: '2020-07-14'
category: ['programming']
tags: ['prettier', 'pre-commit', 'git hooks']
---

I first learned about git hooks in the context of conventional commits.

Today, I did a little more exploring into the hooks available and found the pre-commit hook. This hook can be used for all sorts of things, but I'm using it for linting by running `pretty-quick` before I'm able to commit.

The [Prettier docs](https://prettier.io/docs/en/precommit.html) actually have an entire page on different ways and styles of using the pre-commit hook! Definitely worth a read.

In the mean time, my `package.json` now looks like this:

```json:title=package.json
{
    "": "...",
    "husky": {
        "hooks": {
            "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
            "pre-commit": "pretty-quick --staged"
        }
    }
}
```
