---
title: 'Preserving Logs To Help Debug Multiple Hops'
date: '2020-02-12'
publish: '2020-03-05'
category: ['programming']
tags: ['chrome', 'dev tools', 'preserve log']
---

Recently, I was working on a project where I needed to connect one web app to another.

I added a button on `AppA` that, on click, gathered up some useful information (e.g., username, session, etc.), and then opened a new window for `AppB` with that information included as a [query parameter in the URL]().

From there, `AppB` validated the session information against its database to authenticate and authorize the user.

As I was developing this, however, I had a tough time debugging one stage where `AppB` would bounce from one path to another. Each hop meant that I lost all of my network information, so I couldn't verify that I was sending the right information, or, if I was, where it was getting mangled.

This is when a colleague turned me onto the "Preserve log" option in the network tab - as long as you didn't open a _new_ window along the way, all of the logs would be preserved.

![preserve logs](./preserve-log-toggle.png 'preserve logs')

While this didn't _solve_ my problem, it made it possible to debug! I was well on my way.
