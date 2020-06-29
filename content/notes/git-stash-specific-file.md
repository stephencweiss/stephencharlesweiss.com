---
title: 'Git Stash A Specific File'
date: '2019-06-08'
publish: '2019-06-08'
category: ['programming']
tags: ['git', 'git stash', 'git stash push']
---

Sometimes you only want to stash a few files at a time.

Maybe in the course of your work, the files you were changing revealed a bigger, more urgent problem. You don’t want to lose your work, but you want to be able to cut a new branchy off of master to address the new problem.

Before you can go back to master, pull down the most recent files, however, you need to clear your git log. `git stash` is a great way to do that.

`git stash push <path/to/file>`

```bash
$ git status
On branch feature/doing-things
Your branch is up to date with 'origin/feature/doing-things'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   package-lock.json
	modified:   src/App/MyComponent.js

no changes added to commit (use "git add" and/or "git commit -a")
```

Okay, so I have changed files, but I want to only stash the `src/App/MyComponent.js`.

```bash
$ git stash push src
Saved working directory and index state WIP on feature/3207-tracks-to-favorites-map-changes: 7316117cf5 Removed consoles.

$ git stash show 0
 ...App/MyComponent.js | 6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)
```

# Things to note

1. There’s no options flag for `push`
2. The file does not need to be the _full_ path, just enough to distinguish what you’re looking to add (e.g., `git stash push src` was enough to distinguish that I didn’t want to stash my `package-lock.json` file)

# Relevant discussion

-   [How can I git stash a specific file? - Stack Overflow](https://stackoverflow.com/questions/5506339/how-can-i-git-stash-a-specific-file)
