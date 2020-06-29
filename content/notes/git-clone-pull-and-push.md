---
title: 'Git clone, pull, and push'
date: '2018-08-30'
publish: '2018-08-30'
category: ['programming']
tags: ['git', 'github', 'learning to code', 'tutorial', 'version control']
---

# Git Clone, Pull, and Push

Continuing my learnings re: [Git](learning-git-from-the-ground-up-another-git-tutorial). I wanted to better understand the use cases for three Git commands:
1\. Clone
2\. Pull (or Fetch and Merge)
3\. Push

Thinking in terms of use cases helped me separate these different commands.

# Scenario 1

## You have a Git repo on GitHub that you want to bring down locally to work on

This is a case for `$ git clone`.

Before you clone the repository, you’ll want to be in the desired directory. For example, if you want to store the repo locally in your documents folder, you’ll want to verify that your path is `~/Users/[Your User Name]/Documents`.

Now that you’re where you want to be, pull down a repository to create a local copy. To do this, use the command `$ git clone [ssh]` or `$ git clone [https]`.

I prefer the `[ssh]` because then I only have to put in my RSA password instead of my username and password, though it does mean managing a key and a second password, so YMMV.

(Note: I found the Github tutorial [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) to be really easy to follow for this step of generating an SSH key.)

This is typically done once at the beginning of a project to provide a local copy.

# Scenario 2

## You want to sync up your work with what your collaborators have pushed to the shared Repo.

This is a case for `$ git pull` (or `$ git fetch` and `$ git merge`). These commands will update your local copy with the new commits from the remote repository. Again, you’ll be pulling from the shared repo, but instead of a blank slate, you’ll be merging into the directory where you already have your work. This means that if your branch and the origin have diverged, they will be merged (though _how_ is still up to you as there are a number of merge options available).

# Scenario 3

## You have been working on a Git repo locally and now you want to push the changes you’ve made and committed to GitHub

This is a case for `$ git push`.

Now that you’ve done your work, you want to push it back to the shared Repo for others to be able to collaborate.

Here’s where `$ git push` comes in handy.

> 1.  Navigate to the directory in terminal.
> 2.  Use the command `$ git push`
> 3.  Again, you’ll need to validate your credentials - login/password and/or your RSA passphrase.

# Further reading:

-   [git-clone Documentation | Git](https://git-scm.com/docs/git-clone)
-   [git-pull Documentation | Git](https://git-scm.com/docs/git-pull)
    -   [Merge Strategies for Git Pull | Git](https://git-scm.com/docs/git-pull#_merge_strategies)
-   [git-push Documentation | Git](https://git-scm.com/docs/git-push)
-   [What is the difference between pull and clone in git? | Stack Overflow](https://stackoverflow.com/questions/3620633/what-is-the-difference-between-pull-and-clone-in-git)
