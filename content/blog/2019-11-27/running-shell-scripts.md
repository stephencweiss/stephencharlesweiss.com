---
title: 'Shell Scripts: How To Run Them'
date: '2019-11-12'
publish: '2019-11-27'
category: ['programming']
tags: ['bash','zsh','shell script','bash scripting']
---

I am constantly striving to improve my understanding and comfort interacting with my terminal. I remember how excited I was when I first started to understand how to [change my shell from bash to zsh](https://www.stephencharlesweiss.com/2019-09-02/change-default-shell-zsh/), [create persistent aliases](https://www.stephencharlesweiss.com/2018-12-22/oh-my-zsh-and-persistent-aliases/), and even begin [writing my own functions](https://www.stephencharlesweiss.com/2019-02-13/next-level-shell-aliases-and-functions/).

More recently, I’ve been experimenting writing shell scripts when it dawned on me - I didn’t actually know _how_ to run the script. If it were an `.html` file, I could open it in a web browser. If it were a node application, I could run it from the command line:
```shell
$ node my-file.js
```
But what about a `.sh` file?

This is one of those questions that once you know how, you forget that you once didn’t. But until you know - it’s not really clear what you’d do.

Imagine you have a directory with a `setup` script in it:
```shell
.
├── node_modules
├── package-lock.json
├── package.json
├── setup.sh
└── src
```

To execute the setup script, you simply call it:
```shell
$ ./setup.sh
```

In this example, I’m already in the directory where setup lives - but you can imagine if I was up a directory, and it was saved in a directory `scripts`, I could also call it:
```shell
$ ./scripts/setup.sh
```

You don’t need to preface it with anything (as in the `node` example) because the shell knows how to execute the shell script!

