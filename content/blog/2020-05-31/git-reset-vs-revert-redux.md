---
title: 'Git Reset Vs. Revert...Redux'
date: '2020-04-29'
publish: '2020-05-31'
category: ['programming']
tags: ['git', 'git reset','git revert','git undo']
---

I've written about [git reset vs. git revert](../../2018-08-22/learning-git-from-the-ground-up-another-git-tutorial#revert-vs-reset) before. I've even looked at some [patterns for "undoing" in git](../../2020-01-19/git-undo-and-clean).

This is a closer look at git reset vs revert.

Specifically, when, why, and how you might use them. Details I feel like my previous posts touched on, but not comprehensively.

First, from the git revert manual:
> git revert is used to record some new commits to reverse the effect of some earlier commits (often only a faulty one). If you want to throw away all uncommitted changes in your working directory, you should see git-reset(1), particularly the --hard option. If you want to extract specific files as they were in another commit, you should see git-restore(1), specifically the --source option. Take care with these alternatives as both will discard uncommitted changes in your working directory.

Let's break that down:
1. Git revert adds to history. Git reset does not. Since git is all about diffs, git revert is a _new_ diff that is a mirror to the specified commit.

Here's a contrived example:
```shell
$ git log --pretty=format:'\''%h %ad | %s%d [%an]'\'' --graph --date=short
* f9d8d05 2020-04-29 | commit 3 (HEAD -> master) [Stephen]
* f6830e2 2020-04-29 | commit 2 [Stephen]
* 5240e0c 2020-04-29 | commit 1 [Stephen]
$ git revert f9d8d05 f6830e2 //highlight-line
[master f92d8f5] Revert "commit 3"
 1 file changed, 1 insertion(+), 1 deletion(-)
[master 223a377] Revert "commit 2"
 1 file changed, 1 deletion(-)
$ git log --pretty=format:'\''%h %ad | %s%d [%an]'\'' --graph --date=short
* 223a377 2020-04-29 | Revert "commit 2" (HEAD -> master) [Stephen]
* f92d8f5 2020-04-29 | Revert "commit 3" [Stephen]
* f9d8d05 2020-04-29 | commit 3 [Stephen]
* f6830e2 2020-04-29 | commit 2 [Stephen]
* 5240e0c 2020-04-29 | commit 1 [Stephen]
```
Notice that even if you revert multiple commits simultaenously (space separated hashes), each is handled in it's _own_ commit.

If you want to avoid that, you can by passing a `--no-commit` flag and then manually committing the changes.

```shell
$ git revert --no-commit cf0b31d 3c53d36
$ git commit
[master b09aa1d] Revert Multiple Commits
 1 file changed, 1 deletion(-)
$ git log --pretty=format:'\''%h %ad | %s%d [%an]'\'' --graph --date=short
* b09aa1d 2020-04-29 | Revert Multiple Commits (HEAD -> master) [Stephen]
* cf0b31d 2020-04-29 | commit 3' [Stephen]
* 3c53d36 2020-04-29 | commit 2' [Stephen]
* 223a377 2020-04-29 | Revert "commit 2" [Stephen]
```

2. If you did work that you want to discard and erase from history, use `git reset`.

Here, you can reset _multiple_ commits in the same way: listing them.

You can also make a reference from the HEAD, e.g., `git reset HEAD~3` will reset all changes made in the last three commits.

Here's a new contrived example.

Imagine we're writing a new file, `file.txt`.

Each line is a new number. Each number is also a commit.
```txt:title=file.txt
one
two
three
four
```
So, "one" was added in commit1, "two" in commit2, so on.

But then we realize that's pretty silly and doesn't take advantage of git, so we decide to start over with just the first line. We'd only gotten to four, so we want to _"undo"_ the last _three_ commits.

```shell
stephen@Stephens-MBP-2 git-test % gl
* 6855bf5 2020-04-29 | commit4 (HEAD -> master) [Stephen]
* 3b68dbc 2020-04-29 | commit3 [Stephen]
* 2d33acf 2020-04-29 | commit2 [Stephen]
* b09ads1 2020-04-29 | commit1 [Stephen]
stephen@Stephens-MBP-2 git-test % git reset HEAD~3//highlight-line
Unstaged changes after reset:
M	file.txt
stephen@Stephens-MBP-2 git-test % gl
* b09ads1 2020-04-29 | commit1 [Stephen]
```

And if we look at what's staged:
```shell
$ git diff
diff --git a/file.txt b/file.txt
index e69de29..4cb29ea 100644
--- a/file.txt
+++ b/file.txt
@@ -0,0 +1,3 @@
+two
+three
+four
```
This is because we did the default reset. If we'd passed `--hard` all of these changes would be gone.

Okay - last step, when do we _need_ to use revert instead of reset even if we'd really rather not? If we've already pushed the changes to a remote repository and there's a non-zero chance that any colleague/collaborator has pulled down a copy that they're working on.

In that case, we want to avoid rewriting history. I've never run into this personally, but I hear it's painful for all involved, so I'd like to keep it that way.
