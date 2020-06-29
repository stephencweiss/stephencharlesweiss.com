---
title: 'Animating On Hover'
date: '2020-03-30'
publish: '2020-04-18'
category: ['programming']
tags: ['animation', 'button', 'wes bos', 'anchor', ':after', 'pseudo-element']
---

The navigation of Sick Fits, the fake storefront from Wes Bos's [Advanced React](https://advancedreact.com/) Course, is pretty ... _sick_.

Specifically, I liked two things:

1. The skewed lines dividing each element of the nav bar
2. The animating red underline

To understand both better, I pull together a [CodePen](https://codepen.io/stephenweiss/pen/RwPvMMK) to explore the ideas further.

https://codepen.io/stephenweiss/pen/RwPvMMK

(Note: The embedded version appears to have some significant lag / styling problems. For the best experience, look at it on CodePen itself.)

For a relatively simple demo, there's was quite a bit of CSS involved (at least for me).

The key CSS for adding the animation is:

```css
li:after {
    height: 2px;
    content: '';
    background: red;
    width: 0;
    position: absolute;
    transform: translateX(-50%);
    transition: width 0.7s;
    transition-timing-function: cubic-bezier(1, 0.65, 0, 2.31);
    left: 50%;
    margin-top: 1.25rem;
}

li:hover:after,
li:focus:after {
    width: calc(100% - 70px);
}
```

What's going on / some lessons learned:

1. An `:after` creates a pseudo-element that will be the "last child" of the selected element - in this case, each of the `li`s.
2. In this pseudo-element which has no associated markup, I start to define a shape, but since I want the border to be _beneath_ the `li` and not appended to it's right like a normal flow, I use `position: absolute`
3. I also don't want it to be visible to begin with, so `content:''` is important.
4. I'm mocking a bottom border here of 2px, so `height: 2px`
5. When it's painted, I want it to have a transition - the first argument says _what_ to transition, and the second says how long it should take.
6. The first part appends css to the the `li` tags (that's the `:after`'s function). But, we start with _no_ content - though setting it to empty _is_ necessary.
7. We trigger the after's transform/transition by associating it with a hover or focus event ([Stack Overflow on the topic](https://stackoverflow.com/questions/5777210/how-to-write-hover-condition-for-abefore-and-aafter)).
8. Notice, however, that it's in the `:hover:after` and `:focus:after` that the width is reset from 0 to a new dynamically calculated range. This was another gotcha as the [CSS calc function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) is rather particular, i.e. the spaces are not optional.

Handling the skewed outline was similarly achieved, though instead of `:after`, I used a `:before`.

```css
li:before {
    content: '';
    width: 2px;
    background: grey;
    height: 100%;
    left: 0;
    position: absolute;
    transform: skew(-20deg);
    top: 0;
    bottom: 0;
}

li:first-child:before {
    background: transparent;
}
```

The one part slightly new piece here is using the `:first-child:before` to remove the divider on the very first `li`. I did this as it wasn't going to appear on the _last_ one anyway.

Also worth noting: because I'm using both `:before` _and_ `:after`, I could just put the same style in the `:last-child:after` - since that would override the other `:after` I set _or_ be overridden by it. Hooray for the _cascading_ part of CSS.

## Wrapping Up

This was a fun detour to learn some new CSS tricks and I'm particularly pleased in how performant it is - particularly relative to some of the other approaches I found for [animating borders](https://css-tricks.com/animating-border/).
