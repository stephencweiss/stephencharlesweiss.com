---
title: 'Quickly Retreive Environment Information'
date: '2019-12-19'
publish: '2020-01-05'
category: ['programming']
tags:
    [
        'bash',
        'shell',
        'environment',
        'npm',
        'nvm',
        'node',
        'versions',
        'envinfo',
    ]
---

I find myself frequently looking up which version of Node and npm I'm running.

Today, a colleague showed me how to get it and lots of additional useful infromation with a single command:

```shell
$ npx envinfo --binaries --languages --system --utilities
```

This will print out all of the information in an easy to read and digest format like so:

```shell
$ npx envinfo --binaries --languages --system --utilities
npx: installed 1 in 1.792s

  System:
    OS: macOS 10.15.2
    CPU: (8) x64 Intel(R) Core(TM) i5-8259U CPU @ 2.30GHz
    Memory: 34.86 MB / 8.00 GB
    Shell: 5.7.1 - /usr/local/bin/zsh
  Binaries:
    Node: 12.13.0 - ~/.nvm/versions/node/v12.13.0/bin/node
    Yarn: 1.19.1 - /usr/local/bin/yarn
    npm: 6.13.0 - ~/.nvm/versions/node/v12.13.0/bin/npm
  Utilities:
    Make: 3.81 - /usr/bin/make
    GCC: 4.2.1 - /usr/bin/gcc
    Git: 2.24.0 - /usr/local/bin/git
    Clang: 1100.0.33.16 - /usr/bin/clang
    Subversion: 1.10.4 - /usr/bin/svn
  Languages:
    Bash: 3.2.57 - /bin/bash
    Go: 1.13.4 - /usr/local/go/bin/go
    Java: 11.0.2 - /usr/bin/javac
    Perl: 5.18.4 - /usr/bin/perl
    PHP: 7.3.9 - /usr/bin/php
    Python: 2.7.17 - /usr/local/bin/python
    Python3: 3.7.5 - /usr/local/bin/python3
    Ruby: 2.6.3 - /usr/bin/ruby
```

It is a nice alternative to typing out each command separately like so:

```shell
$ zsh --version
zsh --version
zsh 5.7.1 (x86_64-apple-darwin18.2.0)
$ node --version
node --version
v13.1.0
$ npm --version
npm --version
6.12.1
```

As of this writing the options for [Envinfo CLI API](https://www.npmjs.com/package/envinfo#cli-options) are:

> ```shell
> --system               Print general system info such as OS, CPU, Memory and Shell
> --browsers             Get version numbers of installed web browsers
> --SDKs                 Get platforms, build tools and SDKs of iOS and Android
> --IDEs                 Get version numbers of installed IDEs
> --languages            Get version numbers of installed languages such as Java, Python, PHP, etc
> --binaries             Get version numbers of node, npm, watchman, etc
> --npmPackages          Get version numbers of locally installed npm packages - glob, string, or comma delimited list
> --npmGlobalPackages    Get version numbers of globally installed npm packages
> --duplicates           Mark duplicate npm packages inside parentheses eg. (2.1.4)
> --fullTree             Traverse entire node_modules dependency tree, not just top level
> --markdown             Print output in markdown format
> --json                 Print output in JSON format
> --console              Print to console (defaults to on for CLI usage, off for programmatic usage)
> ```
