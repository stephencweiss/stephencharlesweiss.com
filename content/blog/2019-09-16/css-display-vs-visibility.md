---
title: 'Display: None vs Visibility: Hidden'
date: '2019-09-16'
category: ['programming']
tags: ['css', 'display', 'visibility']
---

When hiding elements on the client, there are multiple options. Two of the most common are through the selective toggling ofCSS properties of `display` and `visibility`.

What’s the difference? From LearnLayout.com<sup>1</sup>

> This [`display`] is different from `visibility`. Setting `display` to `none` will render the page as though the element does not exist. `visibility: hidden;` will hide the element, but the element will still take up the space it would if it was fully visible.

As a result, if the element is positioned absolutely, the "space" consumed when displayed will not affect anything.

To ensure that the layout doesn’t shift, however, it makes sense to use the `visibility` property.

Options for `display`<sup>2</sup>:

- `block`
- `inline`
- `flex`
- `none`
- … and many more. See MDN has an exhaustive list:

Options fo `visibility`<sup>2</sup>:

- `visible`
- `hidden`
- `collapse`

## Footnotes

- <sup>1</sup> [CSS - the "display" property | LearnLayout](http://learnlayout.com/display.html)
- <sup>2</sup> [display | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- <sup>3</sup> [visibility | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
