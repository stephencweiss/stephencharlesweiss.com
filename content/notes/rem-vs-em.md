---
title: 'REM vs EM'
date: '2019-09-14'
publish: '2019-09-14'
category: ['programming']
tags: ['css', 'rem', 'em']
---

Jeremy Church put together a nice little side by side comparison of REM and Em (and PX).<sup>1</sup>

Both REM and EM are relative units. The difference is in _what_ they’re relative _to_.

-   EM is relative to the parent.
-   REM is relative to the root (hence the R).

From Jeremy:

> While**em**is relative to the font size of its direct or nearest parent,**rem**is only relative to the `html` (root) `font-size`. I like to think of it as a reset. If a style sheet is built in a modular fashion, then**rem**shouldn’t be needed very often, but it can be handy at times.

Resources:

-   <sup>1</sup> [Confused About REM and EM? | Jeremy Church](https://j.eremy.net/confused-about-rem-and-em/)
