---
title: 'Git Add Variations'
date: '2020-05-02'
publish: '2020-06-09'
category: ['programming']
tags: ['git', 'git add', 'git add -A', 'git add -u']
---

When adding files to my git staging area, I tend to like to review specific files and do so interactively using the `-p` flag to patch.

This allows me to stage specific hunks and split my commits into logical pieces.

But, what if I want to add _multiple_ files at once? I have some options that all work slightly differently. Let's take a look.

Below, I'll explore these different options:

1. `git add -A` (or `git add --all`)
2. `git add -u` (or `git add --update`)
3. `git add .`
4. `git add *`

The example we'll be working with is:

```shell:title=current-status
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout --<file>..." to discard changes in working directory)
		deleted:	 deleted.txt
		modified:	 modified.txt
		deleted: 	 sub_dir/deleted.txt
		modified: 	 sub_dir/modified.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

		.gitignore
		sub_dir/new_file.txt
		new_file.txt

no changes added to commit (use "git add" and/or "git commit -a"
```

## git add -A

The first example, is `git add -A` (which is different than `-a`, which despite having references in the manual is now an unknown switch for `git add`):

```shell
$ git add -A
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .gitignore
	deleted:    deleted.txt
	modified:   modified.txt
	new file:   new_file.txt
	deleted:    sub_dir/deleted.txt
	modified:   sub_dir/modified.txt
	new file:   sub_dir/new_file.txt
```

Here, everything was added to staging - including untracked files, deleted files, and files in subdirectories.

## git add -u

Next up is `git add -u` which tracks updates. You can only update a tracked file, so:

```
$ git add -u
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	deleted:    deleted.txt
	modified:   modified.txt
	deleted:    sub_dir/deleted.txt
	modified:   sub_dir/modified.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	new_file.txt
	sub_dir/new_file.txt
```

`git add -u` adds all files in the entire working tree

## git add .

```shell
$ git add .
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .gitignore
	deleted:    deleted.txt
	modified:   modified.txt
	new file:   new_file.txt
	deleted:    sub_dir/deleted.txt
	modified:   sub_dir/modified.txt
	new file:   sub_dir/new_file.txt
```

In this case, `git add .` actually behaves exactly the same as `git add -A`. However, that's because I was in the root directory when I executed the command.

Notice how things change if I reset my working tree and then cd into the `sub_dir`:

```shell
$ cd sub_dir
$ git add .
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	deleted:    deleted.txt
	modified:   modified.txt
	new file:   new_file.txt

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	deleted:    ../deleted.txt
	modified:   ../modified.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	../.gitignore
	../new_file.txt
```

## git add \*

The star is actually a bash command, and it's the wildcard. As a result, it can lead to some unexpected results where _some_ deleted files get added to staging and others don't. It's not recommended.
