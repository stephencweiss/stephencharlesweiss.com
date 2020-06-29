---
title: 'The PATH Variable And Modifying It'
date: '2020-03-26'
publish: '2020-04-15'
category: ['programming']
tags: ['bash', 'path', 'colon', 'rust']
---

I decided to start exploring Rust and one of the first things you do when you install Rust, if you don't want to have to source it every time you launch a terminal is add it to your PATH variable.

In the past, this is the kind of complexity that I've allowed to pass by me without diving in. Today, however, I wanted to learn what exactly was happening.

So, for starters: what _is_ `PATH`? Let's start by looking at it directly:

```shell
$ echo $PATH
/Users/stephen/.nvm/versions/node/v12.16.1/bin:/Users/stephen/.cargo/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

Here we can see I have several "paths" concatenated together.

When launching a terminal, these are all available. In my case they include `nvm` for Node version management, and `cargo` for Rust. The others, if I'm not mistaken, are the standard paths that ship with MacOS - inferring from their names they're the regular and secure (?) bins.<sup>[1](#footnotes)</sup><a id="fn1"></a>

So, the `PATH` lists directories that the operating system will look in for programs. It's a short hand.

How do we add to this list? [Natalie Weizenbaum (nex3)](https://gist.github.com/nex3) put together a useful [Gist](https://gist.github.com/nex3/c395b2f8fd4b02068be37c961301caa7) on how to add new programs to the `PATH` for different operating systems.

For Mac, her recommended approach was:

```vim
# ~/.bash_profile
export PATH="your-dir:$PATH"
```

This mirrors the recommended approach from ["the Book" on Rust](https://doc.rust-lang.org/stable/book/ch01-01-installation.html):

```vim
# ~/.bash_profile
$ export PATH="$HOME/.cargo/bin:$PATH"
```

Problem solved, right?

Almost.

I wanted to understand what the _colon_ was doing there. It's sitting right there between the path to our new director (e.g., `$HOME/.cargo/bin`) and the existing _expanded_ `PATH` (i.e., it's `$PATH`, not just `PATH`).

What does the colon do?

I started with some web searches that seemed promising. For example, I learned that in [Bash](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Bourne-Shell-Builtins), a colon separating arguments will "do nothing beyond expanding _arguments_ and performing redirections. The return status is zero." A colon \_within a [shell parameter expansion](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Shell-Parameter-Expansion), however, behaves differently - acting more as a fallback.

But that's actually _not_ what we're doing here.

Let's take a look:

```shell
$ export TEST="123"
$ export TEST="456:$TEST"
$ echo $TEST
456:123
```

It's just a character that we're placing between the _new_ path and the existing path(s). Why? Because the [colon is simply _how_ paths are delimited](https://unix.stackexchange.com/questions/311339/why-was-colon-chosen-as-path-separator).

A final point: Ordering.

Among the comments on Natalie's Gist was one from FTheodore:

> I would just like to say that you should consider using `export PATH="$PATH:your-dir"` instead. This will append the new path to the variable. Adding the absolute path to the beginning of the file will make the system search that directory first every time. This is not recommended as it can cause problems with system programs and it adds unnecessary delay.

Now that we know that the `:` is acting as a separator between our new path and the existing paths, FTheodore's comment makes sense. He's arguing that we should _not_ be burying the system defaults beneath the programs we add, but allow those to be searched _first_ and then continue on to the new program.

Makes sense to me.

So, with a slight tweak, the final solution for adding to our `PATH` variable is:

```shell
# ~/.bash_profile
export PATH="$PATH:your-dir"
```

## Footnotes

-   <sup>[1](#fn1)</sup> The definition of a `bin` was another topic I hadn't really explored either. It appears that when it's a directory, it refers to a location of binary executables and when it's a file extension, it's the binary itself. (Source: [What is Bin?](https://www.computerhope.com/jargon/b/bin.htm))
