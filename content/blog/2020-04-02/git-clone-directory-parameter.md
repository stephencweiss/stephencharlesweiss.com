---
title: 'Git Clone Named Directory'
date: '2020-03-15'
publish: '2020-04-02'
category: ['programming']
tags: ['git','git clone']
---
Frequently, I find myself wanting to create a temporary clone of a repository. This often happens when something’s gone wrong and I want to isolate the issue with a fresh install.

My workflow for this _used_ to include creating a new temporary directory and then cloning the project into the new folder.

The result was something like this:
```shell
$ pwd
/Users/stephen/code
$ mkdir temp
$ cd temp
$ git clone <repository>
```

It turns out that `git clone` actually facilitates this operation much more simply with an optional `directory` parameter. 

```shell
$ git clone <repository> [<directory>]
```

The directory parameter works by allowing you to target a directory _instead_ of taking the repository name as the title.

This might look like:

```shell
$ git clone git@github.com:original-repository.git
$ git clone git@github.com:original-repository.git clean-install-of-repository
```

The result is a cleaner file structure and a few saved keystrokes.
```shell
$ pwd
/Users/stephen/code
$ tree -L 1
.
├── original-repository
└── clean-install-of-repository
```
