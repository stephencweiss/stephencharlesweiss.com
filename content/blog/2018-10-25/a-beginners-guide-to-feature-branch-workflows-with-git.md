---
title: "A Beginner's Guide to Feature Branch Workflows with Git"
date: '2018-10-25'
category: ['programming']
tags: ['feature branch workflow', 'git']
---

The Feature Branch Workflow for git is a graduation from the Centralized workflow where all changes are made directly to the master branch.<sup>1</sup>

Though this is a beginner's guide to the Feature Branch workflow, it does assume some familiarity with git basics. If you need a refresher, check out my notes from learning git<sup>2</sup>.

# Pros of the Git Feature Branch Workflow:

- Multiple features can be simultaneously developed
- Main branch is _never_ broken
- Pull requests to the main branch initiate discussion and create visibility into changes
- Can be paired well with other workflows

# Cons

- Merge conflicts - mitigate this potential problem by keeping your branches small and focused.

# How to use the Git Feature Branch Workflow:

A few rules and guidelines to keep in mind:

1. Never commit changes directly to the master
2. Create highly focused branches (e.g., a single animated menu or addressing a single issue/ticket)
3. Since features are isolated on branches, they can be committed to a central repository as a backup without creating conflicts with the main branch.

# High level steps

There are seven (give or take) steps to the Feature Branch workflow, though steps 3-6 can be repeated multiple times for any given branch.

1. Start with the master branch
2. Create a new branch
3. Update, add, and commit changes
4. Push feature branch to remote
5. Create pull request
6. Resolve feedback
7. Merge branch

## Start with master branch

Get the most up to date master branch.

```bash
git checkout master
git fetch origin
git reset --hard origin/master
```

Before cutting a branch, you will want to make sure you're working on the most up to date information.

You could get to the same place faster with `git pull`, however this approach is generally considered safer (despite my [previous claim](/2018/08/30/git-clone-pull-and-push/)). For more information, see this discussion on [Stack Overflow](https://stackoverflow.com/questions/292357/what-is-the-difference-between-git-pull-and-git-fetch).

## Create a new branch

`git checkout -b my-new-feature`

In this case the `-b` flag tells git to create a new branch ("my-new-feature") if it doesn't already exist when you check it out.

## Update, add, commit, and push changes

Work on your code as you would to build out the new feature.

## Push feature branch to remote

Because you’re working in a branch, you can push your code to a centralized repository without worry of conflict.

`git push -u origin my-new-feature`

You only have to do this the first time. Every time after that you want to push a change to a centralized repository for your feature, you can use the more concise `git push`.

## Create pull request

Pull requests are a great opportunity for you to initiate discussion with your colleagues and collaborators.

Use them to get feedback on your feature.

## Resolve feedback

If you receive feedback, you can edit your code locally (returning to step 3. and proceeding as normal).

## Merge your pull request

Once all feedback has been resolved, you’re ready to merge your feature into the main branch.

During this process, you may have to resolve merge conflicts with the master branch. Since the goal is to always have a functioning master branch, this step is crucial to the continuity of the application.

# Closing Remarks

The Git Feature Branch workflow isn't for every project, but it encourages collaboration and conversation through code review and pull requests. Those are benefits I can get behind.<sup>3</sup>

## Footnotes

- <sup>1</sup> This post was inspired by Atlassian's Tutorial of the [Git Feature Branch](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).
- <sup>2</sup> I've written about a number of times previously, for example [working with pull and push](/2018/08/30/git-clone-pull-and-push/), but, I also highly recommend the [official documentation](https://git-scm.com/).
- <sup>3</sup> For additional workflows and comparison, check out [CodingBlocks' episode 90](https://www.codingblocks.net/podcast/comparing-git-workflows/).
