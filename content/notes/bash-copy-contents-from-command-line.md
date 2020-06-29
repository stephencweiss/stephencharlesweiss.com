---
title: 'Copy File Contents From The Command Line'
date: '2020-06-24'
publish: '2020-07-25'
draft: false
category: ['programming']
tags: ['bash', 'zsh', 'dotfiles', 'pbcopy', 'cli']
---

I have a [dotfiles](https://github.com/stephencweiss/dotfiles) repository where I store all of my settings for things like `zsh` and VS Code. Whenever I make a change to one of those files, I want to quickly copy them to update my repository.

There are a number of ways I can do this.

For example, I can use `pbcopy` to add the contents of a file to my clipboard and then paste them somewhere using `cmd + v` or `pbpaste` (assuming MacOS):

```shell
$ pbcopy < ~/.zshrc
$ pbpaste > ~/path/to/target/file.txt
```

(Note: The inverse, `~/.zshrc > pbcopy`, does not work)

Alternatively, I can merely redirect the contents from my `.zshrc` file to the respository's equivalent:

```shell
$ cat ~/.zshrc | ~/code/dotfiles/.zshrc
```

These are yet more uses of [redirection with the shell](angled-brackets-bash-scripting/) that I find very useful.
