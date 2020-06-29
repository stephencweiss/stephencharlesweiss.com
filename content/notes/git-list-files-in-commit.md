---
title: 'List Files In Git Commit'
date: '2019-11-20'
publish: '2019-12-09'
category: ['programming']
tags: ['git', 'reflog', 'diff-tree', 'gitk']
---

In pulling together my recent post on Git Cherry Pick, I wanted to show all of the files included in a single commit.

As is often the case, Stack Overflow had a great discussion.

Though there were several good options, my favorite is:

```shell
$ git diff-tree --no-commit-id --name-status -r <commit-hash>
```

I like this approach for the balance it strikes between cleanly delivering information while not being _too_ spartan with the facts.

To get the commit hash, I use `git reflog`

The results are something like this:

```shell
$ git reflog
eef38bab (HEAD -> detour-b, origin/detour-b) HEAD@{0}: checkout: moving from feature-a to detour-b
17114a0e (HEAD -> master, tag: v4.0.49, origin/master, origin/HEAD) HEAD@{1}: checkout: moving from feature-a to detour-b
481ad9a8 (origin/feature-a, feature-a) HEAD@{14}: commit: Fixing build time errors
…
$ git diff-tree --no-commit-id --name-status -r eef38bab
M       src/components/Layout/PanelLayout/PanelLayout.stories.tsx
M       src/components/Loader/SkeletonLoader/SkeletonLoader.stories.tsx
M       src/components/Menu/HorizontalMenu/HorizontalMenu.stories.tsx
M       src/components/Menu/PopupMenu/PopupMenu.stories.tsx
M       src/components/Nav/FormNavBar/FormNavBar.stories.tsx
A       src/components/Slider/SliderWithBar/SliderWithBar.stories.js
D       src/components/Slider/SliderWithBar/SliderWithBar.stories.tsx
M       src/composites/DiscoverPropertyCard/DiscoverPropertyCard.stories.tsx
M       src/composites/Listing/ListingImageContainer/ListingImageContainer.stories.tsx
M       src/composites/Listing/ListingStatusPill/ListingStatusPill.stories.tsx
```

This is a really clean way of seeing which files were in a commit and some high level information about what happened. That is, whether they were **A**dded, **M**odified, or **D**eleted.

If you are looking for more information, check out:

```
$ git show <commit-hash>
```

This command prints out the actual diffs.

Or, if you’d like a GUI, you can use [gitk, Git’s built-in browser](https://git-scm.com/docs/gitk).
