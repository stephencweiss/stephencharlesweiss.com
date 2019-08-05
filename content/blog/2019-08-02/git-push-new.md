---
title: 'Git Push New'
date: '2019-08-02'
category: ['programming']
tags: ['shell','scripting','git']
---
Every time I cut a new branch in Git and am ready to submit a PR for review, I get an annoying error reminding me that I need to set the upstream destination.
```
stephen /Users/Stephen/_coding/app_name ➾ git push
fatal: The current branch feature/813/feature-description has no upstream branch.
To push the current branch and set the remote as upstream, use

  git push —set-upstream origin feature/813/feature-description
```

Taking a page from “Manual Work is a Bug” I decided that this time, I’d figure out how to fix it.¹

## Summarizing The Problem
Before I could figure out a solution, I needed to make sure I understood the problem. 

When I tell git to _push_ my branch to a remote, it needs to know where. And, if it doesn’t exist, I need to tell it to create an upstream branch in my remote repository.

Git kindly provides the command for this, which I’ve been copying and pasting every time I’ve ever gotten it. 

As someone who hates lifting their hands off the keyboard, each instance was a reminder of a potential optimization. 

## Create A Solution
Having previously found the power of shell aliases and function, I knew I had the tools to make this as easy as any other git command.²

What I didn’t know was how to put the pieces together. In pseudo code, you can imagine a solution like:

```
getCurrentBranch() => {/* … */}

pushNewBranch() => {
  curBranch = getCurrentBranch
  git push --set-upstream origin ${curBranch}
}
```

Fortunately, I’d recently come across _how_ to find my current branch: `git branch --show-current` (in v2.22.0+) or `git branch | grep \* | cut -d ‘ ‘ -f2` for lower versions.

At this point, I could pipe my answer into a git push function, or use a subroutine. I opted for the latter and I now have a new alias in my `~/.zshrc` file: 
```sh
alias gpnew='git push —-set-upstream origin $(git branch --show-current)’
```

This is a _really_ small thing, but it makes the developing experience slightly more enjoyable by eliminating one piece of redundancy. 

## Footnotes
* ¹ [Manual Work is a Bug | ACM Queue](https://queue.acm.org/detail.cfm?id=3197520)
* ² [Next Level Shell: Aliases And Functions](https://www.stephencharlesweiss.com/2019-02-13/next-level-shell-aliases-and-functions/)
