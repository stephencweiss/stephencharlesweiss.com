---
title: Git Submodules
date: 2020-06-27
draft: true
category: ['programming']
tags: ['git', 'submodule', 'dependency']
---

I was having a discussion with some friends recently when they mentioned that were using [Git's Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to manage the content for their blog. My site has historically had a relatively simple architecture, so I was intrigued. Digging in, I found that submodules solve some problems, create others, and are a great alternative depending on the goals of the project.

In this post I'll cover:

1. [What Are Submodules](#what-are-submodules)
1. [How To Use Submodules](#using-submodules)
    1. [Authoring Submodules](#authoring-submodules)
    1. [Consuming Submodules](#consuming-submodules)
1. [When To Use Submodules](#when-to-use-submodules)
1. [Wrapping Up](#wrapping-up)

## What Are Submodules

Before getting too much further, it's worth discussing what submodules are and how they're useful. Git promotes submodules as a solution to the situation where a project has a dependency on another (sub) project for which changes should be tracked separately, but which need to be usable jointly:

> Here’s an example. Suppose you’re developing a website and creating Atom feeds. Instead of writing your own Atom-generating code, you decide to use a library. You’re likely to have to either include this code from a shared library like a CPAN install or Ruby gem, or copy the source code into your own project tree. The issue with including the library is that it’s difficult to customize the library in any way and often more difficult to deploy it, because you need to make sure every client has that library available. The issue with copying the code into your own project is that any custom changes you make are difficult to merge when upstream changes become available.
>
> Git addresses this issue using submodules. Submodules allow you to keep a Git repository as a subdirectory of another Git repository. This lets you clone another repository into your project and keep your commits separate.

## Using Submodules

Let's start with a review some of the basics for using submodules. When thinking about submodule use - I find it useful to consider the authoring of the submodule and consumption separately.

By authoring submodules, I mean the task of setting up a new submodule, getting it tracked in the `.gitmodules` file and making it available for collaborators to use.

### Authoring Submodules

The first step to _authoring_ a submodule is adding it. The only thing that is _required_ is the repository:

```shell
$ cd superproject
$ git submodule add git@github.com:stephencweiss/my-submodule.git
```

Here, I've added the `master` branch (which is the default) of the repository `my-submodule` to the _root_ of the project, `superproject`.<sup>[1](#footnotes)</sup><a id='fn1'></a>

Let's say we were interested in tracking only the `stable` branch and wanted to place it at a specific location in our `superproject`, for example `a/brand/new/directory`, we could do that as follows:

Instead of the previous `git submodule add` command, we would use:

```shell
$ git submodule add -b stable git@github.com:stephencweiss/my-submodule.git a/brand/new/directory
```

The contents of `my-submodule` would be deposited into the directory `./a/brand/new/directory` where the `.` represents the root or `superproject`.

At this point, we're able to author changes in the submodule -- though if we run `git status` in the root, we'll see something like:

```shell
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
  (commit or discard the untracked or modified content in submodules)
        modified:   a/new/directory (untracked content)
```

Note: `a/new/directory` is the directory which houses our submodule.We don't want to track these files within our `superproject` (which is _why_ we have a submodule in the first place), but Git is alerting us that there _are_ changes. To track and commit these changes requires navigating to the directory which will provide access the correct git log. Once there, we can make the commit as usual.

One thing to note is that submodules are managed in a `.gitmodules` file:

```shell:title=.gitmodules
[submodule "a/new/directory"]
    path = new/directory
    url = git@github.com:stephencweiss/my-submodule.git
    branch = stable
```

Before moving on to talk about how to _consume_ these submodules, two more quick points:

1. Changing tracked branches
2. Deleting / removing submodules

#### Change The Submodule's Tracked Branch

Let's say that while tracking the `stable` branch was good - we now want to track `super-stable` (or perhaps more likely, we move from the default `master` to something else, like `stable`).

There are two ways to do that - change it _just for you_ or update the `.gitmodules` so that all consumers will track the same branch:

```shell
$ git config -f .gitmodules submodule.a/new/directory.branch super-stable
```

(Note: In most cases it makes sense to track it for everyone, so that's what I've shown, though you could update just yours by dropping the `-f .gitmodules`.<sup>[2](#footnotes)</sup><a id='fn2'></a>)

If we look at the `.gitmodules` now, we'll see the change has been made:

```shell:title=.gitmodules
[submodule "a/new/directory"]
    path = new/directory
    url = git@github.com:stephencweiss/my-submodule.git
    branch = super-stable
```

#### Deleting / Removing Submodules

Deleting a submodule is a potentially confusing aspect of working with them. This is because while they can be removed from _some_ branches, it's possible that other branches will still expect them to be there -- which results in "Git yelling at you."

One approach I found was to deinitialize the submodule first, remove it from the `.git/modules` in the `superproject` and _then_ delete the directory.

```
$ git submodule deinit -f — a/new/directory
$ rm -rf .git/modules/a/new/directory
$ git rm -f a/new/directory
```

### Consuming Submodules

When you're cloning in a project that uses submodules there are two ways to ensure that you get all of the submodules - an easy one and a hard one. (The easy one was added _later_ which is why the hard way exists, however since it does, I'm going to focus on it.)

Imagine you've got a new colleague starting who needs to access the project. Typically, they could just `git clone` the repository and everything would be hunky-dory. However, because there are submodules in this repository, the directory would be present... and empty.

To solve this - we can use `git clone --recurse-submodules` (since v2.14).

Additionally with v2.15, Git added the ability to _always_ recurse the submodules by setting the `submodule.recurse` option to true in `.gitconfig`:

```shell
$ git config --global submodule.recurse true
```

After the initial clone of the submodules, keeping them in sync means that every time a new commit has been made to the submodule, it needs to be pulled (just like any other dependency that's managed elsewhere). So, if you've set `submodule.recurse` to true, there's nothing to do, but if not, you'll either need:

```shell
$ git pull
$ git submodule update --init --recursive
# -- or --
$ git pull --recurse-submodules
```

## When To Use Submodules

So, given all of this - and the suite of tools that have come around _since_ submodules (specifically language specific package managers, etc.), why would you choose to use submodules?

As I mentioned at the start of this post, my friends are using it to manage their blogs - specifically separating out the content from the site itself. This is an additional headache they've assumed because folks are copying their websites whole cloth and trying to pass them off as their own.

This creates a nice separation of concerns - the site is managed in one repository, the content in another. The content can be private (though again, this creates additional configuration overhead).

Why would you want to use a submodule instead of a different approach though? Well, for one - they're language agnostic. If you're using git as a version control system, then you can use submodules. Conversely, only Javascript will have a private node package, Go will have its own solution, Python its own, etc. Secondly, it's easier to keep submodules totally private than other solutions. Most (if not all) package registries charge to host private packages (this makes sense - someone has to pay for the storage). Github, however, makes private repositories free - which means submodules can be a more economic choice.

Ultimately, I suspect the use of submodules to be limited to a pretty narrow set of use cases these days (though I'm happy to be convinced otherwise!). This is thanks to the evolving landscape and suite of tools available since the debut of submodules.

As Joshua Wehner writes for the [Github Blog](https://github.blog/2016-02-01-working-with-submodules/#advice-on-using-submodules-or-not):

> Before you add a repository as a submodule, first check to see if you have a better alternative available. Git submodules work well enough for simple cases, but these days there are often better tools available for managing dependencies than what Git submodules can offer. Modern languages like Go have friendly, Git-aware dependency management systems built-in from the start. Others, like Ruby’s rubygems, Node.js’ npm, or Cocoa’s CocoaPods and Carthage, have been added by the programming community. Even front-end developers have tools like Bower to manage libraries and frameworks for client-side JavaScript and CSS.

That was in 2016. A lot's changed in just four years too and the reason to add the complexity of submodules is less and less. My friends' desire to protect their writings may be a good one - but I'm struggling to come up with many others.

## Wrapping Up

I may not be jumping to use submodules soon (though I've toyed around with the idea of separating out all of my content at some point), I'm glad I know about them now! The time spent experimenting with them was enjoyable and educational!

## Further Reading

-   [Working with submodules | Joshua Wehner](https://github.blog/2016-02-01-working-with-submodules/)
-   [Using submodules in Git - Tutorial | Vogella](https://www.vogella.com/tutorials/GitSubmodules/article.html)

## Footnotes

-   <sup>[1](#fn1)</sup> The path is slightly more nuanced than this. Per the manual:

    ```shell:title=submodules-manual
    The optional argument <path> is the relative location for the cloned submodule to exist in the superproject. If <path> is not given, the canonical part of the source repository is
        used ("repo" for "/path/to/repo.git" and "foo" for "host.xz:foo/.git"). If <path> exists and is already a valid Git repository, then it is staged for commit without cloning. The
        <path> is also used as the submodule's logical name in its configuration entries unless --name is used to specify a logical name.
    ```

-   <sup>[2](#fn2)</sup> This example comes from the [Git documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules), but the reason that it works is that the `-f` flag is short for the `--file` option which allows specifying a specific file rather than using the one specified in `GIT_CONFIG`:

    ```shell:title=git-config-manual
    [...]
    -f config-file, --file config-file
        Use the given config file instead of the one specified by GIT_CONFIG
    ```

// notes

```
add [-b <branch>] [-f|--force] [--name <name>] [--reference <repository>] [--depth <depth>] [--] <repository> [<path>]
    Add the given repository as a submodule at the given path to the changeset to be committed next to the current project: the current project is termed the "superproject".

    <repository> is the URL of the new submodule's origin repository. This may be either an absolute URL, or (if it begins with ./ or ../), the location relative to the superproject's
    default remote repository (Please note that to specify a repository foo.git which is located right next to a superproject bar.git, you'll have to use ../foo.git instead of
    ./foo.git - as one might expect when following the rules for relative URLs - because the evaluation of relative URLs in Git is identical to that of relative directories).

    The default remote is the remote of the remote-tracking branch of the current branch. If no such remote-tracking branch exists or the HEAD is detached, "origin" is assumed to be
    the default remote. If the superproject doesn't have a default remote configured the superproject is its own authoritative upstream and the current working directory is used
    instead.



    The given URL is recorded into .gitmodules for use by subsequent users cloning the superproject. If the URL is given relative to the superproject's repository, the presumption is
    the superproject and submodule repositories will be kept together in the same relative location, and only the superproject's URL needs to be provided. git-submodule will correctly
    locate the submodule using the relative URL in .gitmodules.
```

Aleksandr Hovhannisyan 9:35 AM
TL;DR private submodules are basically separate GitHub repositories that can be linked to/included in another GitHub repo (git submodule add). So you can set up your posts to be in a private submodule and included in a public GitHub repo for your site. On the public repo, the folder name for the submodule will end up having the hash of the latest commit in the private submodule repo. So if someone visits your public repo, they won't actually be able to access the submodule's contents if they're private. With hosting providers like Netlify, you put an access token under your GitHub so that it can access the submodules and build them recursively before publishing your main site.

Stephen Weiss 9:36 AM
so - it's a totally separate repo from GitHub's perspective, but locally, it's within the directory structure, right?
9:37
(and thank you :slightly_smiling_face: )

Aleksandr Hovhannisyan 9:44 AM
Yup, submodules basically allow you to use another Git repo as a subdirectory in your chosen repo; you can think of them as a sort of "dependency"
You can also set up pulls so that they recursively pull the submodule as well (or maybe that's the default behavior? idr)
If you wanna give it a try, it's as easy as `git submodule add git@github.com:Username/repo.git` (or `git submodule add https://github.com/Username/repo.git`suidfeat: )

Tania: You can think of it as a git dependency,
