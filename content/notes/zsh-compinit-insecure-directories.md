---
title: 'Fix For zsh compinit Insecure Directories Error'
date: '2020-03-12'
publish: '2020-03-28'
category: ['programming']
tags: ['zsh', 'compinit', 'error handling', 'macos']
---

With [macOS Catalina, Apple made zsh the default shell](https://www.theverge.com/2019/6/4/18651872/apple-macos-catalina-zsh-bash-shell-replacement-features). That’s all well and good since I have been using zsh for a while now.

However, in getting a new machine setup, I started getting an error every time I opened a new terminal:

```shell
zsh compinit: insecure directories, run compaudit for list.
Ignore insecure directories and continue [y] or abort compinit [n]?
```

Pressing `y` isn’t hard, but it certainly didn’t feel _right_ that I should have to. So, I started looking around the internet to find an answer.

## Background

[Plenty of others have had this issue before](https://stackoverflow.com/questions/13762280/zsh-compinit-insecure-directories), though the _reason_ for it surprised me: write privileges for the directories in question.

Wesley Moore beat me to the investigation and has a [good write up of the on his blog](https://www.wezm.net/technical/2008/09/zsh-cygwin-and-insecure-directories/).

Searching for `compinit`, I found it in the `compsys` part of the [manual](http://zsh.sourceforge.net/Doc/Release/Completion-System.html). As the name suggests (in retrospect, this is clearer), `compinit` is the standard way that the shell is initialized.

The error has to do with a security check (emphasis mine):

> **For security reasons `compinit` also checks if the completion system would use files not owned by root or by the current user, or files in directories that are world- or group-writable or that are not owned by root or by the current user. If such files or directories are found, `compinit` will ask if the completion system should really be used.** To avoid these tests and make all files found be used without asking, use the option `-u`, and to make `compinit` silently ignore all insecure files and directories use the option `-i`. This security check is skipped entirely when the `-C` option is given.
>
> The security check can be retried at any time by running the function `compaudit`. This is the same check used by `compinit`, but when it is executed directly any changes to `fpath` are made local to the function so they do not persist. The directories to be checked may be passed as arguments; if none are given, `compaudit` uses `fpath` and `_compdir` to find completion system directories, adding missing ones to fpath as necessary. To force a check of exactly the directories currently named in `fpath`, set `_compdir` to an empty string before calling `compaudit` or `compinit`.

That seems to describe the error I’m getting, which begs the question - which directories are _owned_ by the root / current user but _are_ world- or group-**writable**?

## Investigating My Case

Running the audit:

```shell
$ compaudit
There are insecure directories:
/usr/local/share/zsh/site-functions
/usr/local/share/zsh
```

Investigating those directories in particular:

```shell
$ ls -la /usr/local/share
total 0
drwxrwxr-x   9 stephen  admin  288 Mar 12 09:31 .
drwxr-xr-x  14 root     wheel  448 Mar 11 17:40 ..
-rw-r--r--   1 stephen  admin    0 Mar 12 09:27 .keepme
drwxr-xr-x   5 stephen  admin  160 Mar 12 09:31 doc
drwxr-xr-x   3 stephen  admin   96 Mar 11 17:43 fish
drwxr-xr-x   6 stephen  admin  192 Mar 12 09:31 man
drwxr-xr-x  19 stephen  admin  608 Mar 12 09:28 postgresql
lrwxr-xr-x   1 stephen  admin   38 Mar 12 09:31 systemtap -> ../Cellar/node/13.10.1/share/systemtap
drwxrwxr-x   3 stephen  admin   96 Mar 11 17:40 zsh

$ ls -la /usr/local/share/zsh
total 0
drwxrwxr-x  3 stephen  admin   96 Mar 11 17:40 .
drwxrwxr-x  9 stephen  admin  288 Mar 12 09:31 ..
drwxrwxr-x  4 stephen  admin  128 Mar 11 17:43 site-functions
```

Only the directories listed in the audit were writable in the user group. (For a quick refresher on file permissions in Unix systems, [check out my previous post](unix-file-permissions).)

## Pulling Together The Tools

At this point, we know that the permissions of the directories are problematic - a perfect fit for the `chmod` utility.

the manual entry for `chmod` states the following in the `Modes` section:

> Modes may be absolute or symbolic.
> […]
> The symbolic mode is described by the following grammar:
>
>            mode         ::= clause [, clause ...]
>            clause       ::= [who ...] [action ...] action
>            action       ::= op [perm ...]
>            who          ::= a | u | g | o
>            op           ::= + | - | =
>            perm         ::= r | s | t | w | x | X | u | g | o
>
>      The who symbols ‘’u’’, ‘’g’’, and ‘’o’’ specify the user, group, and
>      other parts of the mode bits, respectively.  The who symbol ‘’a’’ is
>      equivalent to ‘’ugo''.
>
>      The perm symbols represent the portions of the mode bits as follows:
>
>            r       The read bits.
>            s       The set-user-ID-on-execution and set-group-ID-on-execution
>                    bits.
>            t       The sticky bit.
>            w       The write bits.
>            x       The execute/search bits.
>            X       The execute/search bits if the file is a directory or any
>                    of the execute/search bits are set in the original (unmodi-
>                    fied) mode.  Operations with the perm symbol ``X'' are only
>                    meaningful in conjunction with the op symbol ``+'', and are
>                    ignored in all other cases.
>            u       The user permission bits in the original mode of the file.
>            g       The group permission bits in the original mode of the file.
>            o       The other permission bits in the original mode of the file.

If you’ve ever seen `chmod 755`, that’s using the absolute to change file modes and access.

Wesley’s ultimate suggestion was a more expressive approach - describing intent instead of relying on magic numbers. He used the symbolic mode to describe his desired output:

```shell
$ chmod g-w <target file or directory> […other targets]
```

That is, for the group (`g`) section of the permissions, use the remove operation (`-`) for the write (`w`) permission.

This was further simplified into a one line command by piping the output into an `xargs` command.

As a reminder (from the manual):

> The `xargs` utility works by reading “space, tab, newline and end-of-file delimited strings from the standard input” and executing a utility with the strings as arguments.

```shell
$ compaudit | xargs chmod g-w
```

## Conclusion

Minor annoyance resolved and I learned more about the `chmod` utility in the process!
