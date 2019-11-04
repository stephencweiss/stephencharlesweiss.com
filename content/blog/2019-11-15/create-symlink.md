---
title: 'Creating Symlinks'
date: '2019-11-04'
publish: '2019-11-15'
category: ['programming']
tags: ['ubuntu','symlink','unix']
---

To create a symlink, you need only one command:
```shell
$ sudo ln -s /path/to/original /path/to/destination
```

For example, on Ubuntu, the package for Node.js is `nodejs` (not `node`).

Since typing `nodejs` to run node would get old, let’s create a symlink:
```shell
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
```

A quick summary of what’s happening:
* `ln` makes a link between files
* `-s` is the flag for a “symbolic” link

To read more, in your terminal, see the manual page for `ln` (`$ man ln`).
