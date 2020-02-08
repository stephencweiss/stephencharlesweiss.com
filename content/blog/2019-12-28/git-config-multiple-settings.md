---
title: 'Managing Multiple Git Configurations'
date: '2019-12-11'
publish: '2019-12-28'
updated: ['2019-12-12']
category: ['programming']
tags: ['git', 'include', 'includeif', '.gitconfig']
---

I recently made a [small contribution to a VSCode extension on Github](https://github.com/microsoft/vscode-chrome-debug/pull/960). In addition to evaluating the code, the maintainer, [@roblourens](https://github.com/roblourens), went above and beyond to ensure that I was credited with the contribution.

It turns out I wouldn't have been because my git config on the machine I made the commit had a different email from the one attached to my Github account.

The easiest way to fix this (and what I did for the sake of expediency) is to simply add the missing email to my Github account so that those contributions are attached to my profile.

In the process of reading about [setting up your commit email address](https://help.github.com/en/github/setting-up-and-managing-your-github-user-account/setting-your-commit-email-address#setting-your-commit-email-address-in-git) and [adding emails to your Github account](https://help.github.com/en/github/setting-up-and-managing-your-github-user-account/adding-an-email-address-to-your-github-account), however, I also wondered if it was possible to have _different_ emails configured locally based on the repository I'm working in.

For example, if I'm working on a personal project, I want the commit to be from `stephen@personal.tld`, but if I'm working on a project at work, it should be `stephen@work.tld`.

Not only is it possible, there are multiple ways to achieve it:

1.  [Ad Hoc](#ad-hoc-local-configuration): Create a local `.gitconfig` in each directory with desired configuration
2.  [Group Approach](#group-approach-to-git-configuration): At a directory level, set a configuration to apply to all projects within it.

At the most basic level, these strategies work because of the specificity rules for Git. Similar to CSS, the "closest" configuration to the code is the one that will be applied.

## Setting The Baseline

What does all of this mean? To begin with, let's imagine a baseline configuration - a foundation on which we'll build for the remainder of the post. For purposes of simplicity, imagine. the following home directory:

```shell
.
├── personal
│   ├── personal-project-1
│   ├── ...
│   └── personal-project-n
├── work
│   ├── work-project-1
│   ├── ...
│   └── work-project-n
└── .gitconfig
```

There are two directories which house our personal and work projects and a `.gitconfig`. The `.gitconfig` will represent [the `--global` git config](https://git-scm.com/docs/git-config#Documentation/git-config.txt---global).

In our global `.gitconfig` we have:

```shell
    [user]
        name = Stephen
        email = stephen@personal.tld
```

That means that by default commits will look something like this by default:

```shell
$ git log

commit bbed084e8e9135deaa808613aab2a1fb2e21289f
Author: Stephen <stephen@personal.tld>
Date:   Fri Dec 6 11:37:23 2019 -0600

    <git commit message>
```

Okay, now that we have the basics out of the way, let's talk about the different strategies for specifying when a commit is work related so that instead of attributing it to `stephen@personal.tld`, commits are tied to `stephen@work.tld`.

## Ad Hoc Local Configuration

The easiest way to create an ad hoc change to your git config is to create a new `.gitconfig` for the project.

```shell
.
├── personal
│   ├── personal-project-1
│   ├── ...
│   └── personal-project-n
├── work
│   ├── work-project-1
│   │   └── .git
│   │       └── config
│   ├── ...
│   └── work-project-n
└── .gitconfig
```

Now, in the `~/work/work-project-1/.gitconfig` we can define a new user email:

```shell
    [user]
        email = stephen@work.tld
```

A prerequisite step si that the `work-project-1` has initialized git:

```shell
$ git init
```

This creates a `.git` directory with a `config` file within it.

### Set New Git Email

Now that that's done, we can add the new email:

```shell
    $ git config --add user.email "stephen@work.tld"
```

### Verify New Git Email

To verify that our new email is working as expected, first confirm that the setting was set correctly.

The easiest way is to list out the git config for that directory.

```shell
$ git config --list

user.name=Stephen
user.email=stephen@personal.com
...
user.email=stephen@work.tld
(END)
```

Notice two things:

1.  The list option will concatenate all of the configs that are applied to the repository. In our case, that's the global and local variant
2.  Duplicates can occur. In our case we have _two_ emails.

So, how are duplicates resolved? For a simple rule of thumb, I'm going with my specificity analogy to CSS, but for the specific answer (since there are more options than just global and local, [refer to the docs](https://git-scm.com/docs/git-config#FILES)).

How can we be confident that this works? Examples!

```shell
$ pwd
/Users/stephen/work/work-project-1
$ touch test.js
$ git add test.js
$ git commit -m "Initial Commit"
$ git log
commit c30cc8aafd6e824048406ab2bd771cebf99bef38 (HEAD -> master)
Author: Stephen <stephen@work.tld>
Date:   Thu Dec 12 10:20:12 2019 -0500

    Initial Commit
```

Perfect! Attribution is given to the _work_ email.

## Group Approach To Git Configuration

At this point, we've established how we can update the configuration for git at a project level, but what happens if we have _a lot_ of projects? It's pretty onerous to have to update the config for each new project.

This is where the [Conditional Includes](https://git-scm.com/docs/git-config#_conditional_includes) options of Git comes in!<sup>1</sup>

### Set The Directory Level Config

Since we're now going to set the config for _all_ projects within the work directory, we need to set that up.

Start by initializing git in the parent directory<sup>2</sup> and adding the new email to the config.

```shell
$ pwd
/Users/stephen/work/
$ git init
$ git config --add user.email "stephen-alt@work.tld"
$ git config --list

user.name=Stephen
user.email=stephen@personal.tld
...
user.email=stephen-alt@work.tld
```

Quick reminder - by initializing git in `~/work` we now have the following structure:

```shell
.
├── personal
│   ├── personal-project-1
│   ├── ...
│   └── personal-project-n
├── work
│   ├── work-project-1
│   │   └── .git
│   │       └── config
│   ├── ...
│   ├── work-project-n
│   └── .git
│       ├── ...
│       └── config
└── .gitconfig
```

Notice that at this point, if we tried to make a commit in `work-project-n`, it would _still_ be attributed to `stephen@personal.tld` (the email in the global config). This is because even though there's a "closer" config than the global one, it's unaware of it.

We need to tell git that for all directories within work, we should look at the file `~/work/.git/config`

For this step, I manually edited the `~/.gitconfig` to include the following section:

```shell
    [includeIf "gitdir:~/work/"]
        path = ~/work/.git/config
```

That should be it! Let's test to confirm.

### Seeing The Updated Config

By repeating our process from the [local config changes](#verify-new-git-email) we can see our changes in action.

First, we'll `cd` into `work-project-n` to see our config file:

```shell
$ pwd
/Users/stephen/work/work-project-n
$ git config --list

user.name=Stephen
user.email=stephen@remine.com
includeif.gitdir:~/work/.path=~/work/.git/config
```

There's only one email! This makes sense because we never set an email for the config in `work-project-n`, but, we also have the `includeif` line.

Let's repeat our test for `work-project-n` that we did with `work-project-1`:

```shell
$ pwd
/Users/stephen/work/work-project-n
$ touch test.js
$ git add test.js
$ git commit -m "Initial Commit"
$ git log
commit 390e985c22b07273ee92b9750b589f8a79db64ae (HEAD -> master)
Author: Stephen <stephen-alt@work.tld>
Date:   Thu Dec 12 10:20:12 2019 -0500

    Initial Commit
```

Et voilà!

## Conclusion

There are any number of settings that you may want to specify at a directory or project level. Hopefully this post demonstrated a few ways you might tacklet that from the ad hoc to the group and global level!

## Footnotes

-   <sup>1</sup> I found this option thanks to [this answer on Stack Overflow](https://stackoverflow.com/a/43654115/9888057) to answer the question of setting multiple users in .gitconfig, which coincidentally was my question and inspiration for this post.
-   <sup>2</sup> Alternatively, you can manually create a file manually named anything (though `.gitconfig` is a reasonable choice) and then reference it in the `includeIf` section of the global config file. The reason I used `.git/config` was simply because I wanted to use the `git` API to modify the user. When I repeated the process a second time, I opted out of initializing git for the parent repo since I didn't intend to actually track changes.