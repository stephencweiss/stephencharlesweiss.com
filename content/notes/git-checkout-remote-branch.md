---
title: 'Git - Checking Out Remote Branches'
date: '2019-04-27'
publish: '2019-04-27'
updated: ['2020-01-22']
category: ['programming']
tags: ['git', 'remotes', 'checkout']
---

> **Update:** I kept using this approach and recently found an even simpler way to checkout remote branches.
> `shell> $ git checkout -t $(git branch -a | grep <target-branch>)`
>
> I wrote more about it in [Git - Checking Out Remote Branches, Revisted](git-checkout-remote-revisited)

Earlier this week, I pulled down a colleague's work to test it locally. Unfortunately, the steps I followed ended up merging the new feature branch into my local master - unbeknownst to me. Then, when I pushed my work up for review, suddenly, I was carrying along all of his work too (since I merged my local master in to make sure I handled conflicts).

So, if you want to run a feature branch locally, how exactly _do_ you pull a branch from a remote repository _without_ merging it into an existing local branch?

StackOverflow to the rescue!<sup>[1](#footnotes)</sup><a id="fn1"></a>

# Git Commands

## With A Single Remote Repository

As of Git version ^1.6.6

```shell
$ git fetch
$ git checkout test
```

## Multiple Remote Repositories / Extra Explicit Approach

```shell
$ git checkout -b test <name of remote>/test
# or the shorthand
$ git checkout -t <name of remote>/test
```

## Examples:

```shell
$ git checkout -b feature/123-do-something-awesome origin/feature/123-do-something-awesome
$ git checkout -t origin/feature/123-do-something-awesome
```

## Manual Definitions

I often find it helpful to look up _what_ these flags and options are doing — in this particular case, we’re taking advantage of the `-b` and `-t` flags.

Before looking this process up, I wasn’t aware that `-b` took an optional second parameter, `<start point>` which in our case _is_ the `remote/branch-name`.

The `-t` option works similarly, but we _only_ specify the upstream and allowing Git to derive the branch name.

> If no -b option is given, the name of the new branch will be derived from the remote-tracking branch

```shell
git checkout -b|-B <new_branch> [<start point>]
           Specifying -b causes a new branch to be created as if git-branch(1)
           were called and then checked out. In this case you can use the
           --track or --no-track options, which will be passed to git branch.
           As a convenience, --track without -b implies branch creation; see
           the description of --track below.

           If -B is given, <new_branch> is created if it doesn't exist;
           otherwise, it is reset. This is the transactional equivalent of

               $ git branch -f <branch> [<start point>]
               $ git checkout <branch>

           that is to say, the branch is not reset/created unless "git
           checkout" is successful.
...
-t, --track
           When creating a new branch, set up "upstream" configuration. See
           "--track" in git-branch(1) for details.

           If no -b option is given, the name of the new branch will be
           derived from the remote-tracking branch, by looking at the local
           part of the refspec configured for the corresponding remote, and
           then stripping the initial part up to the "*". This would tell us
           to use "hack" as the local branch when branching off of
           "origin/hack" (or "remotes/origin/hack", or even
           "refs/remotes/origin/hack"). If the given name has no slash, or the
           above guessing results in an empty name, the guessing is aborted.
           You can explicitly give a name with -b in such a case.
```

## Footnotes

-   <sup>[1](#fn1)</sup> [git checkout - How do I check out a remote Git branch? - Stack Overflow](https://stackoverflow.com/a/1783426/9888057)
