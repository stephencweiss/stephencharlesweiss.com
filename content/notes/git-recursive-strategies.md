---
title: 'Git Merge Strategies - Recursive - Theirs (and Ours)'
date: '2019-05-04'
publish: '2019-05-04'
category: ['programming']
tags: ['git', 'merge', 'recursive']
---

Often when I get a merge conflict, what I really want to do is defer to the master branch, so, if I’m on a branch and I want to merge in the master but suppress conflicts by deferring to the master branch, the way I could do that is:

```bash
$ git check out <branch>
$ git merge master -s recursive -X theirs
```

The `-s` is a flag for `strategies` and the `-X` is a "sub-flag" for the selected strategy (in the example above, that’s `recursive`). In our case, since I want to defer to `master`, I select `theirs`.

The inverse of `theirs` is `ours` and is also possible:

```bash
$ git check out <branch>
$ git merge master -s recursive -X ours
```

Related: if you aren’t sure _before_ hand (and I’m never confident enough to just go straight away with a recursive strategy of ours _or_ theirs — I look through the merge conflicts and then decide. To abort a merge, you can do `git merge --abort`.

[Git merge strategy options & examples | Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/using-branches/merge-strategy)
[Git - merge-strategies Documentation](https://git-scm.com/docs/merge-strategies)
