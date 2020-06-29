---
title: 'Git Tips: Undo & Clean'
tags: ['git', 'tips', 'clean', 'reset', 'coding blocks']
category: ['git']
date: '2020-01-08'
publish: '2020-01-19'
updated: ['2020-04-29']
---

Commonly used Git commands that are worth remembering (or having a quick reference like this one for):

1. Undo your last commit: `git reset HEAD~`<sup>1</sup> ([Stack Overflow](https://stackoverflow.com/a/927386))
1. Undo your last commit, but leave changes staged: `git reset --soft HEAD~`
1. Undo your last commit, but leave it in history: `git revert HEAD~`
1. Undo all current changes _and_ reset the environment to the last commit: `git reset --hard HEAD`
1. Remove all untracked files: `git clean -f`<sup>2</sup>
1. Remove untracked directories, too: `git clean -f -d`

## Resources

-   <sup>1</sup> [Git Handbook on `reset`](https://git-scm.com/docs/git-reset). For more on the differences between `reset` and `revert` check out my previous post [Learning Git From The Ground Up](learning-git-from-the-ground-up-another-git-tutorial/#revert-vs-reset).
-   <sup>2</sup> [Git Handbook on `clean`](https://git-scm.com/docs/git-clean)
