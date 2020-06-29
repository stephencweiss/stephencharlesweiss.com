---
title: 'Object-Fit For Images and Video'
date: '2020-04-19'
publish: '2020-05-15'
category: ['programming']
tags: ['css', 'object-fit', 'img']
---

`object-fit` is a CSS property that can be applied to images and video. It determines how the replaced element (i.e. the `img` or `video` tag) are resized to fit its container.

It has five options:

1. `fill` (default)
2. `contain`
3. `cover`
4. `none`
5. `scale-down`

[MDN has a nice demo](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to see how these can be used, but a quick trick is to use the `contain` option to maintain the aspect ratio of your content without cropping.

For example:

```css
.scaled-imaged {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
```
