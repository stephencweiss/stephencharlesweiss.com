---
title: 'pyenv - A Python Equivalent To nvm And rbenv'
date: '2020-02-18'
publish: '2020-03-08'
category: ['programming']
tags:
    [
        'python',
        'pyenv',
        'shell alias',
        'bash_profile',
        'nvm',
        'rbenv',
        'homebrew',
    ]
---

I recently had to run an application built with Python 3.6. Unfortunately, when I looked at the installed version of python on my OS, it was 2.7

```shell
$ python --version
Python 2.7.17
```

In Node-land, this is where something like `nvm` comes in handy for having different versions of node installed to easily move between them based on the project requirements.

(Side note: I got sick of using the wrong version to build my node projects, so [I now check for a `.nvmrc` file every time I change directories](nvm-node-version-management-automatic).)

It turns out Python has a very similar tool called `pyenv` (and Ruby does too - `rbenv`).

[Chris J Mendez has a great write-up on how use it to install multiple versions of python](https://www.chrisjmendez.com/2017/08/03/installing-multiple-versions-of-python-on-your-mac-using-homebrew/) which was the main reference document I used to get up to speed.

The basic steps (using Homebrew) as Chris outlines them:

1. Update homebrew

```shell
$ brew update
```

2. Install pyenv

```shell
$ brew install pyenv
```

3. Configure bash to _use_ `pyenv`

If you want `pyenv` to run every time you boot up your terminal, you can add it to your `bash_profile` like so:

```shell
$ echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
```

Alternatively, you can add it as an alias:

```shell:title=.bash_profile
$ alias runpyenv='eval "\$(pyenv init -)"'
```

To have these changes take effect, you'll need to [refresh your terminal](https://stephencharlesweiss.com/blog/2018-09-05/aliases-and-the-bash_profile/#command-shortcuts).

```shell
$ source ~/.bash_profile
```

4. Use `pyenv` to install the version you need
    1. List available versions
    ```shell
    $ pyenv install --list
    ```
    2. Install the desired version
    ```shell
    $ pyenv install 3.8.0
    ```
5. Set your version of python
    1. Review which versions are installed
    ```shell
    $ pyenv versions
    ```
    1. locally
    ```shell
    $ pyenv local 3.8.0
    ```
    2. globally
    ```shell
    $ pyenv global 2.7.0
    ```
6. Confirm your version is what you expect

```shell
$ python --version
```

You may need to reload your terminal again to see the changes take effect.

## Resources

-   [Chris J Mendez's post on `pyenv`](https://www.chrisjmendez.com/2017/08/03/installing-multiple-versions-of-python-on-your-mac-using-homebrew/)
-   [pyenv | github](https://github.com/pyenv/pyenv)
