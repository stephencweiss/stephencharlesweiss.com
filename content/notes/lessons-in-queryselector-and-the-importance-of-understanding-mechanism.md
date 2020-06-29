---
title: Lessons In querySelector And The Importance Of Understanding Mechanism
date: '2018-12-27'
publish: '2018-12-27'
category: ['programming']
tags: ['css', 'fundamentals', 'html', 'javascript', 'mdn', 'querySelector']
---

**NB:** The below illustrations are inspired / adapted from MDN’s great page on [QuerySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll). I did not come up with these examples (though I modified them slightly for my understanding). That said, I hope to that conversation by contributing some additional context for how I think about `querySelector` now. Per MDN, the syntax for `querySelector` is:

> `elementList = parentNode.querySelectorAll(selectors);`

While I’d used `querySelector` from time to time, recently I realized how much more powerful it was than the simplistic way in which I’d been using it. That realization was a product of the fact that I finally recognized that the argument (`selectors`) were really just strings for how you apply style with CSS.

When people say it’s helpful to have a strong foundation in HTML and CSS to be a front end engineer, **this** is what they’re talking about.

Here's a short video I recorded touching on some of the basics and chaining I describe in more detail below.

https://www.youtube.com/watch?v=kMvdfn5GO3s

# Basics

Let’s take a quick step back and just think about some basics.

When I first started using `querySelector` it was to pick out individual tags in HTML and then go from there.

A basic example is to select the first or _all_ paragraph tags on a page. `let paragraphs = document.querySelectorAll("p")`.

# Adding Complexity

But, what if you wanted more specificity?

Recall that CSS class selectors use dot notation (e.g., `.intro` for elements with `class="intro"`). The querySelector method uses the same notation.

So, if you are comfortable with styling CSS like so …

```css
div.notes {
    font-family: sans-serif;
    background: #ffc600;
}
```

… Then you can select all of the elements to which that style is applied in the same way. For example: `let divNotes = document.querySelectorAll("div.notes")`.

This will return all `<div>` elements with a class name of `notes` while _not_ returning other tags (e.g., `<p>` ) with a class of `notes`.

## Combining Queries

Another way to use the query selector is to chain them together. Since `querySelector` returns a `NodeList`, which is the same thing we’re querying `javascript> let container = document.querySelector("#main")`; `javascript> let matches = container.querySelectorAll("div.highlighted > p")`.

This returns `paragraph` elements where the immediate parent is a `div` with the class name of `highlighted` and within the container defined by the id, `main`.

# Conclusion

Libraries like jQuery make DOM selection and manipulation significantly easier. But my issue was not that I didn’t know how to use jQuery, but that I didn’t know the range of options available to me because of a missing piece in _how_ these tools work.

When I realized that I could be much more specific in my queries and chain them together, a whole new world of possibilities opened up. Hopefully this helps you too.

Here’s to learning.
