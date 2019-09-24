---
title: 'Git Stash With A Message'
date: '2019-06-09'
category: ['programming']
tags: ['git', 'git stash', 'git stash push']
---

Adding a message to a stash is a great way to easily identify _what's_ included in a stash.

This can be particularly helpful if you're only [stashing specific files](../../2019-06-08/git-stash-specific-file).

# How to add a message to a git stash:

Use the flag `--message` (or `-ml`) that's available for the `git stash push` command.
As always, use the `git stash --help` to see the manual and get more ideas for how to use it.

# Here's what that _might_ look like

```bash
$ git stash push --message "backend tweak"  api
Saved working directory and index state On master: backend-tweak
$ git stash list
stash@{0}: On master: backend tweak
```

# A few things to note

1. Notice the order here - `git stash push` says what you're going to do.
2. `--message "a string goes here"` says what you'd like to label the stash as
3. `api` means anything with a path starting with `api` (this is optional)
