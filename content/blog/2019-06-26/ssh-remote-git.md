---
title: 'Error Handling: SSH & Git Remotes'
date: '2019-06-26'
category: ['programming']
tags: ['git', 'ssh', 'github', 'https']
---

Starting this morning, I was suddenly unable to update my repositories on Github.

As I’d written about in the past, I [prefer using SSH](../../2018-08-30/git-clone-pull-and-push/) over HTTPS to connect to my repositories (mostly because it means that I don’t have to type in my username and password every time when on a trusted machine).

But, suddenly, when I tried to push, I was being prompted to do _exactly_ that — submit my username and password. What’s worse — my combinations _weren’t_ accepted! I’d been locked out and I didn’t know why.

```bash
$ git push
Username for ‘https://github.com':
```

While I wasn’t able to figure out _why_ it suddenly changed, I was able to fix it (and now know how to identify it going forward).

The steps are:

1. Confirm you’re using SSH
2. Change your remote repository to SSH as necessary
3. Confirm your SSH key is set up correctly

## Are You Using SSH Or HTTPS?

The first big thing to understand is if you’re using SSH or HTTPS.

Particularly in my case, where I was expecting to be using SSH, this wasn’t the first question I had in mind, however, answering it proved to be the key to getting to a solution.

In my case, I should have noticed immediately that I was on HTTPS because I was being prompted to submit my username for `https://`… but I wasn’t thinking straight.

A cleaner way to confirm is to check where your remote repository is located:

```bash
$ git remote -v
origin	https://github.com/<username>/<repo name>.git (fetch)
origin	https://github.com/<username>/<repo name>.git (push)
```

## Change Your Remote To SSH

Changing your remotes is probably not something you do every day, so it’s easy to forget how.

The commands are actually straightforward and the key is that the URL is _different_ for SSH than HTTPS — again, this makes sense if you step back and think about it, but normally it _just works_ so we don’t spend any time thinking about it.

```bash
$ ➾ git remote set-url origin git@github.com:stephencweiss/personal-blog.git
stephen /Users/stephen/_coding/personal/blog ➾ git remote -v
origin	git@github.com:stephencweiss/personal-blog.git (fetch)
origin	git@github.com:stephencweiss/personal-blog.git (push)
```

## Confirm Your SSH Key Is Set Up Correctly

The quick and easy way to test your SSH connection is to use the terminal command: `ssh -T <domain>`.

[Testing your SSH on GitHub](https://help.github.com/en/articles/testing-your-ssh-connection) looks like:

```bash
$ ssh -T git@github.com
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```

If you get an error, it would be an indication that you would need to set it up ([instructions for setting SSH up on Github](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account)).

## Conclusion

In the heat of the moment, it’s easy to forget _what_ problem you’re trying to solve. If you’ve been using SSH for a long time and it suddenly changes, you’re probably not paying attention to the fact that you’re being asked for a username for an HTTPS site. You’re also unlikely to be in the habit of routinely checking your remotes.

In concert, this can make a sudden change in your workflow a disorienting experience. Hopefully these tips can avoid some of the pain for next time!
