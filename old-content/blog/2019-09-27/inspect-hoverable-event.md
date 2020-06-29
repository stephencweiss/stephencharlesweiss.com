---
title: 'Inspect A Hoverable Event'
date: '2019-09-27'
category: ['programming']
tags: ['dev tools', 'inspect', 'onhover']
---

Some effects only appear when you hover over them with your mouse. The problem is that in order to see the details and ensure they’re what you inspect, you have to move your mouse … and oops! There goes the effect!

Interestingly, at least for some effects, using pseudo selectors in the DevToos _doesn’t_ fix this problem. That is, I can’t find the element that has the `onHover` effect, mark it as in an `hover` state and then go about my business.

So what to do? _Freeze_ the DOM by using the Debugger to pause the site.

Normally, breakpoints like this occur when they’re tripped by the code, but you can also use your keyboard.

The steps are pretty straightforward too:

1. Open DevTools > Sources (this is where the debugger tools live)
2. Press `F8` (or `Fn`+`F8` if you’re on a Mac)

You should now see a “Paused in debugger” banner.
