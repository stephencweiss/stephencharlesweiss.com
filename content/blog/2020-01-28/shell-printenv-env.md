---
title: 'Exploring The Terminal: Printenv and Env'
date: '2020-01-15'
publish: '2020-01-28'
category: ['programming']
tags:
  [
    'command line',
    'terminal',
    'echo',
    'printenv',
    'env',
    'environment variables',
  ]
---

Today, I'm diving a little further down the environment variables hole I started yesterday when looking into how [environment variables are sourced](../../2020-01-27/shell-environment-variables-source). As usual, this meant learning new things. Today it was about two commands `env` and `printenv`.

These utilities are quite useful for quickly visualizing your current environment and the variable assignment.

Without arguments, the output is _very_ similar.

[This Stackexchange.com answer](https://unix.stackexchange.com/a/284069) walks through the history of how we arrived at two utilities that perform similar functions.

Bottom line: These utilities provide a nice, ergonomic alternative to an `echo` command to see the value of an environment variable.

```shell
$ echo $MY_DB_USER
sweiss
$ env | grep USER
sweiss
$ printenv | grep USER
sweiss
```

By ergonomic, I mean that with `env` or `printenv`, you don't need to know the entire variable up front, making it easier to find what you're looking for.

Sometimes, it's these little things that make all the difference for the development experience.
