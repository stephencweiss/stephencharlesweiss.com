---
title: 'Git - Renaming A Branch: Locally & Remotely'
date: '2019-04-30'
category: ['programming']
tags: ['git', 'branch', 'remote']
---

To rename the name of a branch, there are four potential steps:

1. Checkout the existing branch (the one you want to rename): `git checkout <old_name>`
2. Rename the local branch by moving it: `git branch -m <new_name>`
3. If you’ve already pushed the `<old_name>` branch to the remote repository delete the `<old_name>` remote branch: `git push origin --delete <old_name>`
4. Finally push the `<new_name>` local branch and reset the upstream branch: `git push origin -u <new_name>`

That’s it. At this point you have successfully renamed your local and remote Git branch.

# A note about the `-m` flag:

Similar to the `mv` command in Bash, the `-m` flag is for moving. Since you’re on a branch, Git infers the branch that’s being moved, however, you can be explicit and consolidate steps 1 and 2 with `git branch -m <oldbranch> <newbranch>`.

# Additional Reading

- [How To Rename a Local and Remote Git Branch](https://linuxize.com/post/how-to-rename-local-and-remote-git-branch/)
- [10 insanely useful Git commands you wish existed – and their alternatives](https://dev.to/datreeio/10-insanely-useful-git-commands-you-wish-existed-and-their-alternatives-8e6)
