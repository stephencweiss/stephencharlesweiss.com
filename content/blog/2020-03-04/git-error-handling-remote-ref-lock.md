---
title: 'Error Handling: Git Cannot Lock Ref: Is At X, But Expected Y'
date: '2020-02-13'
publish: ''
category: ['programming']
tags: ['git','git gc','git prune', 'stackoverflow','error handling','git ref']
---

Continuing my catalog of `git` errors (and how to resolve them), yesterday offered a brand new one for me.

I was trying to push some local changes up to a remote branch when I received the following error:

```shell
$ git push
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 666 bytes | 1024 bytes/s, done.
Total 6 (delta 4), reused 0 (delta 0)
remote: error: cannot lock ref 'refs/heads/pd-2750/unified-nav-bar': is at 7d4991604e851ad1c0b5ee85af7cd48b09425c16 but expected fc1af5b421553603f174a84ff4319a79945097e3
To xxx
 ! [remote rejected]       my-branch -> my-branch (failed to update ref)
error: failed to push some refs to 'xxx'
```

It's worth noting that I was the only person working on this branch. (Based on reading about how others handled this, it appears that can be a source of issue at times.)

In my case the _solution_ (though not the cause) was ultimately very simple: run `git gc`.

I went with the `gc` approch versus some more destructive approaches of wiping away the branch on the remote as a first step.

And, while many of the [suggestions a StackOverflow conversation related to a similar error](https://stackoverflow.com/questions/11796580/git-pull-error-error-remote-ref-is-at-but-expected) suggested more targeted pruning, e.g.:
```shell
$ git gc --prune=now
$ gitr remote prune origin
```

I just let `git` do its thing without any targeting or specific pruning and the issue resolved itself.
