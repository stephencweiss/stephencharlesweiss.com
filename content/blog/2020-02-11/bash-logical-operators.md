---
title: 'Logical Operators In Bash'
date: '2020-01-23'
publish: '2020-02-11'
tags: ['command line','bash','logical operators','pipe','stdout','stderr']
category: ['programming']
---

When I'm working in bash, it's common that I'll want to sequence operations together so that one naturally follows another.

For example: `shell> $ cd web && ./setup.sh`

Most commonly, I only want to run the latter _if_ the former does not exit with an error (as in the example above). That need _not_ always be the case, however. Fortunately, Bash makes it easy to handle several other common situations.

Maxim Egorushkin provided a nice summary on [StackOverflow](https://stackoverflow.com/a/5130889) for other options:

> To summarize (non-exhaustively) bash's command operators/separators:
> - `|` pipes (pipelines) the standard output (`stdout`) of one command into the standard input of another one. Note that `stderr` still goes into its default destination, whatever that happen (sic) to be.
> - `|&` pipes both `stdout` and `stderr` of one command into the standard input of another one. Very useful, available in bash version 4 and above.
> - `&&` executes the right-hand command of `&&` only if the previous one succeeded.
> - `||` executes the right-hand command of `||` only it the previous one failed.
> - `;` executes the right-hand command of `;` always regardless whether the previous command succeeded or failed. Unless `set -e` was previously invoked, which causes bash to fail on an error.

