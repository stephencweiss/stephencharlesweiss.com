---
title: 'Filter Git Commits By Author'
date: '2020-03-02'
publish: '2020-03-18'
category: ['programming']
tags: ['git', 'grep', 'author']
---

In the past, I've written about diving into the [git log with grep and the pickaxe](../../2020-02-25/git-commit-archeology).

Those do not search by the _author_ of a commit, however, which is somethign I often find the need to do after merging in master locally.

To search for authors of a commit, `git log` provides an `--author` flag.

It's worth noting that author will match on what's provided, even if it's only a partial name.

To find all of my commits, I can write:

```shell
$ git log --author="Stephen Weiss"
```

As long as I'm the only Stephen Weiss, this will work.

If I'm the only Stephen who has committed to the code base, I could save some key strokes and do:

```shell
$ git log --author=Stephen
```

However, if there's another Stephen, their commits would show up as well.

As [Adam Dymitruk](http://dymitruk.com/) points out in his answer [to this question on StackOverflow](https://stackoverflow.com/a/4262780/9888057), there are a few more things worth knowing:

1. By default, the `git log` will search only the current branch. If you want to search _all_ branches, use the `--all`
2. The author flag can accept regular expressions for more advanced searching.

```shell
$ git log --author="\(Stephen\)\|\(John\)"
```

Will search for commits where the author is Stephen _or_ John.

Similarly, you can exclude commits by those authors using a regular expression in combination with the `--perl-regexp` (to get negative lookaheads).

```shell
$ git log --author='^(?!Stephen|John).*$' --perl-regexp
```

(Note: the _single_ quotes matter with the perl syntax.)
