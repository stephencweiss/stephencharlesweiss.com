---
title: 'Running VSCode On Linux: Hitting My Watcher Limit'
date: '2019-09-26'
updated: ['2020-02-21']
category: ['programming']
tags: ['vscode', 'linux', 'watchers', 'inotify']
---

> **Update**: Typescript 3.8 was released today and includes "Better Directory Watching on Linux and `watchOptions`. (Here's the [release annoucement here](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/).)
>
> This change should make hitting the watcher limit less likely - or at least allow greater control over _when_ it happens - by having Typescript "wait slightly before installing directory watchers to give these highly volatile directories some time to stabilize."
>
> Included in 3.8 are four new `watchOptions`. From the release annoucement:
> > `watchOptions` contains 4 new options that can be configured:
> > - `watchFile`: the strategy for how individual files are watched. This can be set to
> >     - `fixedPollingInterval`: Check every file for changes several times a second at a fixed interval.
> >     - `priorityPollingInterval`: Check every file for changes several times a second, but use heuristics to check certain types of files less frequently than others.
> >     - `dynamicPriorityPolling`: Use a dynamic queue where less-frequently modified files will be checked less often.
> >     - `useFsEvents` (the default): Attempt to use the operating system/file system’s native events for file changes.
> >     - `useFsEventsOnParentDirectory`: Attempt to use the operating system/file system’s native events to listen for changes on a file’s containing directories. This can use fewer file watchers, but might be less accurate.
> > - `watchDirectory`: the strategy for how entire directory trees are watched under systems that lack recursive file-watching functionality. This can be set to:
> >     - `fixedPollingInterval`: Check every directory for changes several times a second at a fixed interval.
> >     - `dynamicPriorityPolling`: Use a dynamic queue where less-frequently modified directories will be checked less often.
> >     - `useFsEvents` (the default): Attempt to use the operating system/file system’s native events for directory changes.
> > - `fallbackPolling`: when using file system events, this option specifies the polling strategy that gets used when the system runs out of native file watchers and/or doesn’t support native file watchers. This can be set to
> >     - `fixedPollingInterval`: (See above.)
> >     - `priorityPollingInterval`: (See above.)
> >     - `dynamicPriorityPolling`: (See above.)
> > - `synchronousWatchDirectory`: Disable deferred watching on directories. Deferred watching is useful when lots of file changes might occur at once (e.g. a change in node_modules from running npm install), but you might want to disable it with this flag for some less-common setups.


I have been working on a Linux VM more recently, and one particularly annoying thing about it (there are a lot of little quirks that are frustrating) was that VSCode couldn’t monitor for changes because it was out of watchers.

Watchers are part of the `inotify` Linux kernel subsystem<sup>[1](#footnotes)</sup><a id="fn1"></a> that extend the filesystem to notice changes and report on those changes to applications listening for them.<sup>[2](#footnotes)</sup><a id="fn2"></a>

There are, however, a fixed number of watchers, and evidently, my machine’s default (8192) was insufficient to the task.

The fix was relatively straightforward: increase the number of watchers. The `guard/listen` repo has an informative post on the process. Quoting below<sup>[3](#footnotes)</sup><a id="fn3"></a>:

> **The technical details**
> Listen uses inotify by default on Linux to monitor directories for changes. It’s not uncommon to encounter a system limit on the number of files you can monitor. For example, Ubuntu Lucid’s (64bit) inotify limit is set to 8192.
>
> You can get your current inotify file watch limit by executing:
>
> ```shell
> $ cat /proc/sys/fs/inotify/max_user_watches
> ```
>
> When this limit is not enough to monitor all files inside a directory, the limit must be increased for Listen to work properly.
>
> You can set a new limit temporary with:
>
> ```shell
> $ sudo sysctl fs.inotify.max_user_watches=524288
> $ sudo sysctl -p
> ```
>
> If you like to make your limit permanent, use:
>
> ```shell
> $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf`
> $ sudo sysctl -p
> ```
>
> You may also need to pay attention to the values of max_queued_events and max_user_instances if Listen keeps on complaining

After making those changes, my VSCode was once again able to track my changes, which in turn, meant that the source control features were actually helpful and I didn’t have to use the terminal to see my diffs.

## Footnotes

<sup>[1](#fn1)</sup> Words, they’re hard and I’m not sure I know exactly what they all mean.
<sup>[2](#fn2)</sup> [inotify - Wikipedia](https://en.wikipedia.org/wiki/Inotify)
<sup>[3](#fn3)</sup> [Increasing the amount of inotify watchers · guard/listen Wiki · GitHub](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details)
