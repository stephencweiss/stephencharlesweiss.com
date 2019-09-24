---
title: 'Running VSCode On Linux: Hitting My Watcher Limit'
date: '2019-09-26'
category: ['programming']
tags: ['vscode', 'linux', 'watchers', 'inotify']
---

I have been working on a Linux VM more recently, and one particularly annoying thing about it (there are a lot of little quirks that are frustrating) was that VSCode couldn’t monitor for changes because it was out of watchers.

Watchers are part of the `inotify` Linux kernel subsystem<sup>1</sup> that extend the filesystem to notice changes and report on those changes to applications listening for them.<sup>2</sup>

There are, however, a fixed number of watchers, and evidently, my machine’s default (8192) was insufficient to the task.

The fix was relatively straightforward: increase the number of watchers. The `guard/listen` repo has an informative post on the process. Quoting below<sup>3</sup>:

> **The technical details**
> Listen uses inotify by default on Linux to monitor directories for changes. It’s not uncommon to encounter a system limit on the number of files you can monitor. For example, Ubuntu Lucid’s (64bit) inotify limit is set to 8192.
>
> You can get your current inotify file watch limit by executing:
> `$ cat /proc/sys/fs/inotify/max_user_watches`
>
> When this limit is not enough to monitor all files inside a directory, the limit must be increased for Listen to work properly.
>
> You can set a new limit temporary with:
> `$ sudo sysctl fs.inotify.max_user_watches=524288` > `$ sudo sysctl -p`
>
> If you like to make your limit permanent, use:
> `$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf` > `$ sudo sysctl -p`
>
> You may also need to pay attention to the values of max_queued_events and max_user_instances if Listen keeps on complaining

After making those changes, my VSCode was once again able to track my changes, which in turn, meant that the source control features were actually helpful and I didn’t have to use the terminal to see my diffs.

## Footnotes

<sup>1</sup> Words, they’re hard and I’m not sure I know exactly what they all mean.
<sup>2</sup> [inotify - Wikipedia](https://en.wikipedia.org/wiki/Inotify)
<sup>3</sup> [Increasing the amount of inotify watchers · guard/listen Wiki · GitHub](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details)
