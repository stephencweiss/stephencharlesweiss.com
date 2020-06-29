---
title: 'Running Shell Scripts In The Background'
date: '2020-01-23'
publish: '2020-02-12'
category: ['programming']
tags: ['shell', 'bash', 'background']
---

Continuing my recent trend of finding useful tips and tricks in the command line. Today, it was how to run multiple processes in parallel within one terminal session (i.e. one tab) by running them in the background.

The easiest way to do this is to chain the commands together with a _single_ ampersand(`&`).

For example, imagine a project with a frontend and backend that are run via two scripts:

1. `npm run web`
2. `npm run server`

To run them _both_ within the same terminal session, run the command: `shell> $ npm run web & npm run server`. This will put the `web` in the background.

Once the processes are running, you can monitor them with [`top`](http://man7.org/linux/man-pages/man1/top.1.html) or [`htop`](http://man7.org/linux/man-pages/man1/htop.1.html).
