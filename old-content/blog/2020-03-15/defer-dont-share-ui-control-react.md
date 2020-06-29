---
title: 'Learn To Defer, Not Share: Revisiting Shared UI Control With React'
date: '2020-02-26'
publish: '2020-03-15'
category: ['programming']
tags: ['react', 'design', 'life cycles']
---

In yesterday's [Shared Control Of UI In React Components](../../2020-03-14/share-ui-control-react-components) I wrote about how it can often be useful to want to share control over a component's UI.

Unfortunately, the best way I could come up with at the time was convoluted at best.

Because control was shared, the parent component simply signaled to the main component when it wanted an action taken.

The signal itself was by incrementing a counter - hardly intuitive.

During code review, we tossed out a few ideas. One that resonated was: have the component control itself _unless_ a controller assumed control itself.

I ran with it and put together a prototype with [CodeSandbox](https://codesandbox.io/s/defer-control-ui-internally-and-externally-w0vhl?fontsize=14&hidenavigation=1&theme=dark).

While this approach doesn't meet my initial goal of mine of _sharing_ control - it has the benefit of being much more idiomatic and in that way no longer violates the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment)

-   The initial solution got it working.
-   This refactor made it better.

Gone is the `useEffect` that needs to be hamstrung to not run when it expects to.

Gone is the use of a counter to communicate something other than a count.

As the lead on my team reminded me: the difference between an engineer and "someone who codes" is going past the first step.
