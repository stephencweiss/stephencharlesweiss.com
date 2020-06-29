---
title: 'Git Branch Naming Conventions'
date: '2019-07-25'
tags: ['git', 'error handling']
category: ['programming']
---

I have a habit of making longer git branch names. I use the branch name as a way to communicate what and why I’m working on something.

For example, beyond _just_ storing the ticket number, I add details like `feature` vs `bug`, the name of the section of the code, a terse summary of the problem I’m working on and then which part of that problem.

Here’s an example:`feature/826/add-edit/dynamic-inputs/config-file`

I’m working on a feature. It’s for ticket 826. It’s part of the add-edit app. The feature is adding dynamic inputs. I’m focusing on the config-file aspect.

One of the reasons I like this approach is that it lends itself to making multiple, _smaller_ feature branches that can be viewed in isolation and/or in a cascading fashion (by changing the target of the branches).

It turns out there’s a peculiar limitation of this approach — I can’t go _another_ level deep without changing the branch.

If I tried to create a new branch `feature/826/add-edit/dynamic-inputs/config-file/smaller-piece` for example, git would throw an error along the lines of: `fatal: cannot lock ref 'refs/heads/feature/826/.../config-file/smaller-piece': 'refs/heads/feature/826/.../config-file' exists; cannot create 'refs/heads/feature/826/.../config-file/smaller-piece'`

This is a known limitation of git — branches, despite my use of `/` are not directories — and git does not allow sub-branches in this way.<sup>1</sup>

Fortunately, I know how to rename a branch, so if it really mattered - I could have two branches: <sup>2</sup>

1. `feature/826/add-edit/dynamic-inputs/config-file/initial`
2. `feature/826/add-edit/dynamic-inputs/config-file/smaller-piece`

The more you know!

## Footnotes:

-   <sup>1</sup> [git push: refs/heads/my/subbranch exists, cannot create | Stack Overflow](https://stackoverflow.com/a/22630664/9888057)
-   <sup>2</sup> [Git - Renaming A Branch: Locally & Remotely | /_ Code Comments _/](https://www.stephencharlesweiss.com/2019-04-30/git-rename-branch-locally-and-remotely/)
