---
title: 'Cleaning Up Your Local Git Repository: AKA How To Remove Stale Branches'
date: '2019-05-26'
category: ['programming']
tags: ['git', 'stale', 'branch', 'cleanup']
---

Unless your git workflow is pushing straight to master (because YOLO), it’s likely that your local repository will grow unwieldy in time.

Here are three strategies, that when combined will combat the bloat:

1. `git gc` to perform housekeeping
2. `git fetch --prune` to remove stale references
3. `git branch -vv | grep '[origin/.*: gone]' | awk '{print $1}' | xargs git branch -d` to remove stale local branches

Before copying these into your terminal, however, let’s set some context and then discuss what they’re doing.

(Before continuing, a huge thank you to Erik Aybar for his post on the topic.<sup>1</sup> Of the more than a dozen that I referenced in learning about how to clean up my stale branches, his was the cleanest. He inspired most of what follows.)

# Background

I’ve only been working on this project for a few weeks, but I’ve already cut 20+ branches and am carrying around 200+ references to branches from my colleagues.

While I try to help myself by naming branches in an intelligent way (.e.g., `feature/ticket#/name-goes-here` and `bug/ticket#/description-of-bug`), even this has its limits - particularly when I try to split up a ticket into multiple tickets.

So, here’s where I was when I started the house cleaning today:

```bash
$ git branch | wc - l
  26
$ git branch -a | wc -l
  208
```

That’s 26 local branches and 208 total (local and remote) branches tracked in my repository.

For reference, my definition of stale here is that a branch that’s been merged and/or a local reference to a remote branch that no longer exists.

# Step One: Initial Clean Up

The `git-gc` utility within git is all about clean-up. From the manual:

> Runs a number of housekeeping tasks within the current repository, such as compressing file revisions (to reduce disk space and increase performance), removing unreachable objects which may have been created from prior invocations of*git add*, packing refs, pruning reflog, rerere metadata or stale working trees. May also update ancillary indexes such as the commit-graph.
>
> Users are encouraged to run this task on a regular basis within each repository to maintain good disk space utilization and good operating performance.

```bash
$ git gc
Enumerating objects: 32360, done.
Counting objects: 100% (32360/32360), done.
Delta compression using up to 8 threads
Compressing objects: 100% (15108/15108), done.
Writing objects: 100% (32360/32360), done.
Total 32360 (delta 20663), reused 26595 (delta 16106)
```

While this does optimize the repository’s storage, it doesn’t address the branch bloat.

# Step Two: Pruning Dead References

I’d heard a lot about "pruning", so that was where I started. However, the manual page for "git prune" begins with the following note:

> In most cases, users should run `git gc`, which calls `git prune`

Having started with `git gc` then, you can appreciate my confusion that. I still had all of my branches.

Beginning to despair and believe that "pruning" meant something fundamentally different in `git` from gardening. The branches didn’t get cut! Turns out I was just hasty. The idea behind pruning _is_ what we’re looking for aftterall - it’s just where we prune that matters.

Instead of `git prune`, we want to remove the references we have locally that no longer exist on the remote branch. To do that, we use `git fetch --prune <name>`

Caveat from the manual:

> The pruning feature doesn’t actually care about branches, instead it’ll prune local↔︎remote-references as a function of the refspec of the remote (see `<refspec>` and [CONFIGURED REMOTE-TRACKING BRANCHES](https://git-scm.com/docs/git-fetch#CRTB) above).
>
> Therefore if the refspec for the remote includes e.g. `refs/tags/*:refs/tags/*`, or you manually run e.g. `git> git fetch —prune <name> "refs/tags/*:refs/tags/*"` it won’t be stale remote tracking branches that are deleted, but any local tag that doesn’t exist on the remote.
>
> This might not be what you expect, i.e. you want to prune remote `<name>`, but also explicitly fetch tags from it, so when you fetch from it you delete all your local tags, most of which may not have come from the `<name>` remote in the first place.

This wasn’t a concern for me… so _snip snip_.

```shell
$ git fetch --prune
From git.gitlab.com:org/project
 - [deleted]           (none)     -> origin/16-stuff
 - [deleted]           (none)     -> origin/57-other-stuff
...
$ gb -a | wc -l
  89
$ gb | wc -l
  26
```

119 references gone.

As the manual notes in the Pruning section for `git fetch`:

> Git has a default disposition of keeping data unless it’s explicitly thrown away; this extends to holding onto local references to branches on remotes that have themselves deleted those branches

That’s what we removed with `git fetch --prune`. But, that still leaves all of the local branches that have been merged and no longer have an upstream reference - not even a stale one. Let’s tackle those next.

# Step Three: Delete Orphaned Local Branches

There are two potential hurdles to deleting branches then:

1. Research: Which branches _should_ be deleted
2. Deletion: Actually deleting them

Combining a few different commands, we can greatly speed this process up.

The commands we’ll combining for this are: `git branch -vv | grep '[origin/.*: gone]' | awk '{print $1}' | xargs git branch -d`.

## Review Which Branches To Delete

The verbose flag has two levels within `git branch`. If you repeat it (i.e., `git branch -vv`) , git will print the name of the upstream branch in addition to the the SHA hash and the commit message for the branch HEAD.

This is extra helpful because of a few pieces of information that comes along for the ride - notably "gone" and "behind".

```shell
$ gb -vv
  bug/jump-to-menu-stepper-index                          c881290e [origin/bug/jump-to-menu-stepper-index: gone] Label is optional now
  ...
  chore/styled-system/grid                                6f36f205 [origin/chore/styled-system/grid] grid style from size to flex
  master                                                  62386e36 [origin/master: behind 28] Merge branch 'chore/styled-system/div' into 'master'
```

In the above, my local branch for `bug/jump-to-menu-stepper-index` was associated with `origin/bug/jump-to-menu-stepper-index`, but that branch had been deleted. (We delete all of our branches upon merge.)

Similarly, we can see that while my `/grid` branch is up to date, my `master` is behind by 28 commits.

In our case, we want to delete those that don’t have an upstream reference. We can use the `grep` program to filter the results from `git branch -vv` to get only those that are "gone" with a pipe.

If you’re following along at home, we’re now at `git branch -vv | grep '[origin/.*: gone]'`. The `grep` utility "searches any given input files, selecting lines that match one or more patterns." Therefore, the output of the `grep` is only the branches where the output matches the pattern `[origin/.*: gone]`. (It’s worth that the pattern does not need to be the beginning or end, just that it exist. The `*` is a wildcard.)

Next up is the `awk '{print $1}'` which prints the first field for each line passed to it.

```bash
$ gb -vv | awk '{print $1}'
  bug/jump-to-menu-stepper-index
  ...
  chore/styled-system/grid
  master
```

(If we wanted the hashes, we could have done `$ gb -vv | awk '{print $2}'`.)

At this point, we have a full list of local branches that we would want to delete because their upstream references have already been merged, which brings us to actually deleting branches.

## Deleting The Branches: Automatically

Within `git branch` there are two ways to delete branches. There’s `-d, --delete` and `-D, --delete --force`. As the latter indicates, it will delete a branch even if the branch has not been completely merged into master.

Each approach can take a series of arguments that are space separated. For example, `git branch -d branch-one branch-two branch-three` will attempt tot delete three branches (`branch-one`, `branch-two`, and `branch-three`).

Now, that we have a list of branches we want to delete from the `awk` printout, we can pass those into `git branch -d`. Even better, by piping, we can do it automatically.

This is our final command in `git branch -vv | grep '[origin/.*: gone]' | awk '{print $1}' | xargs git branch -d`.

The `xargs` utility works by reading "space, tab, newline and end-of-file delimited strings from the standard input" and executing a utility with the strings as arguments.

In our case that means it reads the newline delimited branch names that are piped from the `awk` utility and passes them as arguments to `git branch -d`, our utility.

## Gotchas

The longer you allow branches to remain stale locally, the greater the chance that your branches will have conflicts with `master`. This is important to remember, because even if you’ve merged the branch into master, git may tell you that your branch hasn’t been fully merged and so will reject the deletion request unless forced.

```bash
$ git branch -vv | grep '[origin/.*: gone]' | awk '{print $1}' | xargs git branch -d
error: The branch 'bug/jump-to-menu-stepper-index' is not fully merged.
If you are sure you want to delete it, run 'git branch -D bug/jump-to-menu-stepper-index'.
```

# Other Fun

A second useful option for `git branch` that I learned about through this process was the `-a` option (which combines the default with the `-r`). `git branch -a` will print out all of the branches for a repository - local and remote. This can be helpful to understand what is being worked on - particularly if you want to [check out a remote branch](https://www.stephencharlesweiss.com/2019-04-30/git-rename-branch-locally-and-remotely/) to review or continue the development of on your own.

# Conclusion

Adding these three arrows to my quiver won't revolutionize anything, but they will make me more productive by keeping my git repostiory clean and reducing the mental overhead necessary to figure out what to work on next.

# Further Reading

## Spec

- [git-prune | Git](https://git-scm.com/docs/git-prune)
- [git-fsck | Git](https://git-scm.com/docs/git-fsck)
- [git-branch | Git](https://git-scm.com/docs/git-branch)
- [git-gc | Git](https://git-scm.com/docs/git-gc)
- [wc | Linux](https://linux.die.net/man/1/wc)

## Tutorials

- <sup>1</sup> [Git Tip: Deleting Old Local Branches | Erik Aybar](https://erikaybar.name/git-deleting-old-local-branches)
- [Clean up your local branches after merge and delete in GitHub | Fizer Khan](http://www.fizerkhan.com/blog/posts/Clean-up-your-local-branches-after-merge-and-delete-in-GitHub.html)
- [A simple way to clean up your git project branches | Florent Destremau](https://medium.com/@FlorentDestrema/a-simple-way-to-clean-up-your-git-project-branches-283b87478fbc)
- [What Is A Stale Branch | StackOverflow](https://stackoverflow.com/questions/29112156/what-is-a-stale-git-branch)
- [Git HouseKeeping Tutorial | Railsware](https://railsware.com/blog/git-housekeeping-tutorial-clean-up-outdated-branches-in-local-and-remote-repositories/)
