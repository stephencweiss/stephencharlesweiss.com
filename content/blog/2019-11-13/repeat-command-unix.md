---
title: 'Repeat A Terminal Command In UNIX'
date: '2019-11-03'
publish: '2019-11-13'
category: ['programming']
tags: ['unix', 'linux', 'sudo', 'keyboard shortcuts']
---

The `!!` is a quick way to repeat a command in a UNIX environment.

For example, here I’m looking at a directory’s contents, then invoking it again through the use of the double bang (`!!`).
![](./ls-repeat.png)

While `ls` is probably not a great exampel of a command that needs this shortcut, you can imagine if the command is long and you don’t want to type it all out again, how it can come in handy.

## Repeat As Super User

Another place where the `!!` can come in handy is when repeating a command as the super user.

Since we’re probably not running around as the `root` user most of the time, if we want to do something that requires those permissions, we need to be explicit and prefix the command with `sudo`.

Then, if the user is part of the `sudo` group, the command will execute.

For example, imagine printing the auth logs on a server:

```shell
$ cat /var/log/auth.log
cat: /var/log/auth.log: Permission denied
```

Since my user actually is part of the super user group, I do have permission to view the file, I just need to be explicit.

I can `sudo` the command…

```shell
$ sudo cat /var/log/auth.log
[sudo] password for stephen:
```

That is, I prefix the command with `sudo` and then type out the whole command again (and risk a typo), or, I could just use the `!!`:

```shell
$ sudo !!
[sudo] password for Stephen:
```
