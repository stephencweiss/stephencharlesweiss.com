---
title: 'What Is HEAD In Git?'
date: '2020-01-08'
publish: '2020-01-21'
category: ['git']
tags: ['git','head']
---
From this [StackOverflow answer](https://stackoverflow.com/a/46350644):

> I always thought HEAD~5 means GO to 5 commits before. But it doesn't carry the GO part of the command. It only carries the reference/'where to' part of the command.
>
> In layman terms it's used to answer the question of: WHERE should I go? To which commit?
>
> - `HEAD` means (the reference to the) current commit
> - `HEAD~1` means (the reference to) 1 commit before
> - `HEAD~` ALSO means (the reference to) 1 commit before
> - `HEAD~87` means (the reference to) 87 commits before
>
> **Usage:**
>
> `git checkout HEAD~1` will actually GO/checkout to that reference/commit
>
> `git reset HEAD~3` will uncommit your last 3 commits — without removing the changes, ie you can see all the changes made in the last 3 commits together, remove anything you don't like or add onto it and then commit them all again.
>
> `git diff HEAD~3` for checking changes in the last 3 commits

HEAD, then, is a pointer to the tip of the commit history. It can be used to generate a new reference to navigate the history.
