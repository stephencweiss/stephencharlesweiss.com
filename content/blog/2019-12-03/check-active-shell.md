---
title: 'Determine Which Shell Is Currently Running'
date: '2019-11-15'
publish: '2019-12-03'
category: ['programming']
tags: ['zsh','bash','shell','ps','unix','active shell']
---

If you [switch between shells](../../2019-09-02/change-default-shell-zsh), it might be handy to determine which one is currently running.

One way to do that is to check your process status (`ps` utility).

To find the process id (PID) of the current instance of your shell, use:
```shell
$ echo "$$"
```

You can then pass this into the `ps` utility to find a specific PID with the `-p` flag:
```shell
$ ps -p "$$"
  PID TTY           TIME CMD
21373 ttys001    0:00.69 -zsh
```
