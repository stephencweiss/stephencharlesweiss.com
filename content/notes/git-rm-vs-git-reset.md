---
title: 'Git Rm Vs. Git Reset'
date: '2020-03-14'
publish: '2020-03-30'
category: ['programming']
tags: ['git', 'git reset', 'git rm', '--cached', 'working tree', 'git index']
---

Today, I had an interesting experience with Git. I was working on a new project and when I was ready to make my initial commit, I noticed that the suggestion Git was providing was different than what I normally see.

Instead of the suggestion to use `git reset --hard <file>` to unstage, Git suggested using `git rm --cached <file>...`

```shell
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   .env
  ...
	new file:   yarn.lock
```

My first question was: what’s the _difference_ between `git rm` and `git reset`? As usual, [Stack Overflow](https://stackoverflow.com/questions/5798930/git-rm-cached-x-vs-git-reset-head-x) has a great conversation on the topic. [Yurkis’s answer was one of the clearest](https://stackoverflow.com/a/5798963):

> `git rm —cached` file will **remove** the file from the stage. That is, when you commit the file will be removed. `git reset HEAD — file` will simply reset file in the staging area to the state where it was on the HEAD commit, i.e. will undo any changes you did to it since last commiting. If that change happens to be newly adding the file, then they will be equivalent.

In the conversation following this answer, however, there’s a bit of a discussion based on a claim in another answer that `git rm --cached` is the "exact opposite" of `git add <file>`.

I read that claim _before_ getting to Yurkis’ answer thought that was all I needed to know! Spoiler alert, it’s not and believing it to be the case can result in some unfortunate situations.

[De Novo](https://stackoverflow.com/users/7936744/de-novo) jumped in to remind everyone that `git rm --cached` is _not_ the same and, while doing so, provided an argument for why I was seeing the `git rm --cached` suggestion in the first place.

> @rbatt just to put the comment here as well, and clarify, **git rm —cached file\*\***is not the opposite of\***\*git add file**. The behavior happens to be the opposite of git add file in the specific case where you have added a new, previously untracked file. In every other case the opposite of git add file is git reset HEAD file. **git reset HEAD file\*\***also reverses\***\*git add file\*\***in the first case (adding an untracked file), and in every case, which is why it’s what git suggests to do if you want to reverse a git add.\*\* – [De Novo](https://stackoverflow.com/users/7936744/de-novo)

If you’ll recall, I was working with an _initial_ commit. There _were_ no previous commits and as such _all_ files were previously untracked.

This meant that I just so happened to find the one use case where `git rm —cached <file> ...` happens to be the opposite of `git add <file>`.

Sure enough, after making a few more changes and staging them, the message had reverted back to the more typical `git reset HEAD`:

```shell
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   index.html
	modified:   src/index.js
```

## Example

To help me see how `git rm` worked _outside_ of this special case, I ran the following experiment:

```shell
$ touch first.js second.js
```

After writing a simple function in each, I committed them:

```shell
$ git add first.js second.js
$ git commit -m "adding to git log"
[master (root-commit) 2ded8d5] initial commit
 2 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 first.js
 create mode 100644 second.js
stephen@Stephens-MBP-2 git-test % gs
On branch master
nothing to commit, working tree clean
```

Now, I wanted to see what would happen if I used the `git rm --cached`:

```shell
$ git rm --cached first.js
rm 'first.js'
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	deleted:    first.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	first.js
```

Very interesting! The file’s been "deleted" — though, it’s still available for me to edit. Unlike `git reset HEAD <file>` which would have brought my file back to the state it was in at the HEAD (erasing any changes I’d made), the working file is unaffected.

## Conclusion

`git rm` "[r]emove[s] files from the working tree and from the index."<sup>[1](#footnotes)</sup><a id="fn1"></a>

The `—cached` option however: “unstage[s] and remove[s] paths only from the index. Working tree files, whether modified or not, will be left alone.”

This is why it’s a convenient option when a file is untracked. It will unstage the file _without_ modifying the working tree file.

This is quite similar to the `git reset` with the `--mixed` flag (the default).<sup>[2](#footnotes)</sup><a id="fn2"></a> which "[r]esets the index but not the working tree (i.e., the changed files are preserved but not marked for commit) and reports what has not been updated. This is the default action."

## Footnotes

-   <sup>[1](#fn1)</sup> [Git - git-rm Documentation](https://git-scm.com/docs/git-rm)
-   <sup>[2](#fn2)</sup> [Git - git-reset Documentation](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt-emgitresetemltmodegtltcommitgt)
