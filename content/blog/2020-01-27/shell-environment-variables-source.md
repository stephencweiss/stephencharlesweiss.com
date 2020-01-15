---
title: 'Locating The Source Of Environment Variables'
date: '2020-01-15'
publish: '2020-01-27'
category: ['programming']
tags: ['command line', 'terminal', 'zsh', 'env', 'environment variables']
---

Recently, I was working on a project when I realized that my username was being assigned to a variable that I wasn't expecting.

I wanted to understand _where_ my shell was sourcing the variable from, which led me to [this StackExchange conversation](https://unix.stackexchange.com/questions/813/how-to-determine-where-an-environment-variable-came-from).

[Stéphane Chazelas provided two solutions](https://unix.stackexchange.com/a/154971) depending on your shell:

- In bash: `PS4='+$BASH_SOURCE> ' BASH_XTRACEFD=7 bash -xl 7>&2`
- In zsh: `zsh -xl`

Running Zsh, I proceeded with that. As Stéphane mentions, this "simulates a login shell and show[s] everything that is done [...] along with the name of the file currently being interpreted."

The stream has a lot of very interesting information, however, I was not able to _exit_ or stop the process once started.

Therefor, if using it in the future, I will avoid invoking it within a session where I am actively working, and instead open a new session to see how my environment is being booted.

The stream of information that this produces is also quite a bit. To help wade through the deluge of information, another user suggested merging the `stderr` and `stdout` outputs with `zsh -xl 2>&1` to then grep as usual. This _sort of_ works. The way I made it work was, again in a new session, to search for what I was looking for immediately. For example:

```shell
$ zsh -xl 2>&1 | grep MY
+/Users/stephen/.bash_profile:117> export MY_DB_USER=sweiss
```

Here, I'm able to see that my environment is picking up the variable `MY_DB_USER` from my `.bash_profile` at line 117.

The way the `-xl` emulates a login is because the `-x` is the `XTRACE` and `-l` is `LOGIN`

> LOGIN (-l, ksh: -l)
> This is a login shell. If this option is not explicitly set, the shell becomes a login shell if the first character of the argv[0] passed to the shell is a ‘-’.

> XTRACE (-x, ksh: -x)
> Print commands and their arguments as they are executed. The output is preceded by the value of \$PS4, formatted as described in Prompt Expansion.

These definitions, and other options, can be found in the [ZSH docs](http://zsh.sourceforge.net/Doc/Release/Options.html).
