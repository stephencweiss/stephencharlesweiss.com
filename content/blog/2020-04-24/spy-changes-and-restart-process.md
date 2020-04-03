---
title: 'Using Spy To Watch for Changes'
date: '2020-04-03'
publish: '2020-04-24'
category: ['programming']
tags: ['jaime pillora','peter hellberg','golang','spy', 'package discovery',]
---

Another entry in my [Package Discovery](../../../tags/package-discovery/) series. Today, I'm looking at `spy`.

[Jaime Pillora](https://github.com/jpillora) wrote a nifty little application called [Spy](https://github.com/jpillora/spy). Described as a file watcher that will restart a process whenever a file within the spied directory changes, it delivers!

I used it to great effect recently to monitor changes to a Go application I was writing and re-running the test suite on any detected changes, but it could be used generally.

If you're familiar with `nodemon`, Spy is similar, but can be used cross-platform.

## Examples
Spy is useful in a ton of contexts...

From anything like watching a go program for changes and re-running tests:
```shell
$ spy go test
```

To monitoring for changes to javascript files and restarting a node server (whose entry point is `server.js`):
```shell
$ spy --inc "**/*.js" node server.js
```

The key here is that you're telling spy what to do `go test` or `node server.js` by watching the _current working directory_.

## Conclusion
Spy is a boon for developers and one more arrow to place in their quiver.

Similar to how [Bunyan logs make finding relevant information easier](../../2020-02-27/easy-logging-bunyan), Spy makes developing easier by shortening the "Edit-Compile-Test loop", which as Joel Spolsky writes in [_Daily Builds Are Your Friend_](https://www.joelonsoftware.com/2001/01/27/daily-builds-are-your-friend/) is critical for productive engineering:

> A crucial observation here is that you have to run through the loop again and again to write a program, and so it follows that the faster the Edit-Compile-Test loop, the more productive you will be, down to a natural limit of instantaneous compiles.

Thank you to [Peter Hellberg](https://github.com/peterhellberg) for the pointer!
