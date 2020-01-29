---
title: 'Return To Previous Directory (Quickly) In Bash (Or Zsh)'
date: '2020-01-23'
publish: '2020-02-10'
category: ['programming']
tags: ['shell','command line','bash','zsh', 'cd']
---

If I can quickly change directories (`cd`) to _anywhere_ in my computer's file system, how can I go back if I mistakenly navigate away from somewhere I was working?

Turns out that Bash (and Zsh) allow a quick return by using `shell> $ cd -`.

[According to this response on StackOverflow](https://stackoverflow.com/a/10382370), this works within Bash by calling `cd $OLDPWD`.

This means that in Bash you can manually affect the results, however Zsh does not work that way:

```shell
$ printenv | grep OLD
OLDPWD=/Users/stephen/_coding/personal/onething
$ goHome
$ printenv | grep OLD
OLDPWD=/Users/stephen/_coding/personal/blog
$ cd -
~/_coding/personal/blog
$ printenv | grep OLD
OLDPWD=/Users/stephen
$ export OLDPWD=/Users/stephen/_coding/personal/blog
$ printenv | grep OLD
OLDPWD=/Users/stephen/_coding/personal/blog
$ cd -
~
$ cd -
~/_coding/personal/blog
```

Oh well, so I can't overwrite. I can still quickly navigate _back_ to the directory I was in if I mistakenly navigate away, which is really all I wanted in the first place.
