---
title: 'Simple Command Expansion In Bash'
date: '2020-04-30'
publish: '2020-06-02'
tags: ['bash', 'command expansion', 'parameter expansion', 'simple command']
category: ['programming']
---

In the Terraform tutorials, the authors make use of a pattern I'd not seen before:

```shell
$ mkdir new-directory && cd $_
```

The end result is a new directory is created, and as might be expected, the directory is changed _to_ the `new-directory`.

How it works, however, is interesting.

Per [@PSkocik](https://stackoverflow.com/a/30154711/9888057) on a [Stack Overflow conversation](https://stackoverflow.com/questions/30154694/what-does-cd-mean/30154711#30154711) on the topic:

> `$_` expands to the last argument to the previous **simple command** or to previous command if it had no arguments.

For more on Command Expansion, see the [Bash manual](https://www.gnu.org/software/bash/manual/html_node/Simple-Command-Expansion.html).

Otherwise, this post on [parameter _and_ command expansion](http://www.compciv.org/topics/bash/variables-and-substitution/) from compciv.org is quite helpful for seeing other ways expansion can be used to great effect.
