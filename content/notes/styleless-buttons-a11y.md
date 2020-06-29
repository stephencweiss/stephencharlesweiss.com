---
title: 'Buttons Without Style'
date: '2019-06-05'
publish: '2019-06-05'
category: ['programming']
tags: ['css', 'a11y', 'web accessibility', 'buttons']
---

When it comes to accessibility (a11y) on the web, one of the best / easiest things you can do is to use _semantic_ HTML.

> Structural, semantic HTML is the key starting point toward good accessibility practices.<sup>1</sup>

That means, when you want to have something be clickable, use a `<button>`. If it's the top header, use `<h1>`. The next header should be `<h2>`, not `<h3>`, etc.

Buttons, however, often pose a problem. They’re the best way to indicate interactivity, but they come with a lot of built-in styling that may not be aligned with the style of your website.

One easy solution is to simply make a `<div role="button">` with an `onClick` event handler.

A better solution is create a base button that is "styleless".

While not a _perfect_ solution (see CSS Tricks for some caveats<sup>2</sup>), the following is a good start:

```css
.stylelessButton {
    font-size: 100%;
    font-family: inherit;
    border: 0;
    padding: 0;
    background: transparent; // Firefox
}
```

This will strip out the majority of the CSS that makes a button look different than what it’s around and can serve as a nice base on which to build.

## Footnotes

<sup>1</sup> [Web Accessibility Guidelines - Semantic HTML | Carnegie Museums](http://web-accessibility.carnegiemuseums.org/foundations/semantic/)
<sup>2</sup> [Overriding Default Button Styles | CSS-Tricks](https://css-tricks.com/overriding-default-button-styles/)
