---
title: 'HTML: Ordered Lists Properties'
date: '2020-03-21'
publish: '2020-04-08'
category: ['programming']
tags: ['html', 'ordered lists', 'nicolas marcora']
---

The `<ol>` HTML tag has several useful properties to be aware of:

1. `type` - which provides an easier styling of included `<li>` tags, though this can also be achieved with CSS.
2. `start` - the starting value for the list can be defined. Regardless of `Type`, this is always a number (whether `2` or `’2’`)
3. `reversed` - Works to reverse the count of the ordered list. Instead of incrementing from the starting value, this will decrement.

```html
<div class="container">
    <p>Standard</p>
    <ol>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ol>
</div>

<div class="container">
    <p>Type. Values include 'a','A','i','I', and '1' (default)</p>
    <ol type="a">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ol>
</div>

<div class="container">
    <p>Start. Takes a number to start the list.</p>
    <ol start="11">
        <li>Eleven</li>
        <li>Twelve</li>
        <li>Thirteen</li>
    </ol>
</div>

<div class="container">
    <p>
        Reversed. Starts at the max value and counts backwards. Can be paired
        with `start`
    </p>
    <ol reversed start="6">
        <li>Three</li>
        <li>Two</li>
        <li>One</li>
    </ol>
</div>
```

I put together a very small Codepen to see these properties in action..

https://codepen.io/stephenweiss/pen/WNvgrzE

The [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) is also worth visiting to see more examples.

H/t to Nicolas Marcora for turning me onto this!
