---
title: 'Uncommon HTML Tags: Insertion, Deletion, Citation'
date: '2020-05-08'
publish: '2020-06-17'
category: ['programming']
tags: ['html', 'ins', 'del', 'cite']
---

Yesterday, I wrote about the use of the `<del>` tag to effect a strike through in a Markdown document rendered to HTML.

Well, that took me down a bit of a rabbit hole and I learned about two new HTML tags I'd never previously come across:

1. `<ins>`, [the insertion element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins), is `<del>`, the [deleted text element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del)'s opposite number,
2. `<cite>` the [Citation element for citing reference to a creative work](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite).

As a big fan of diffs, the `<ins>` and `<dels>` make it really easy to write diffs with just a little bit of CSS. For example:

```css:title=styling-diffs.css
del,
ins {
    display: inline-block;
    text-decoration: none;
    position: relative;
}

del {
    background-color: #fbb;
}

ins {
    background-color: #d4fcbc;
}

del::before,
ins::before {
    position: absolute;
    left: 0.5rem;
    font-family: monospace;
}

del::before {
    content: '−';
}

ins::before {
    content: '+';
}
```

If this CSS were added to a style sheet, you'd get green highlighted text preceded by a `+` for insertions and red for deletions preceded by a `-` for deletions.

The citation element is interesting in a number of ways. One - it's one of the attributes that insertions can receive. For example, if an insertion has a URL where the change was made as reference, it can be cited as a property on the `<ins>` tag.

See the following example, taken [from MDN](/Users/stephen/code/blog/content/blog/2020-06-17/ins-cite-html.md):

```html:title=wizards-tardiness.html
<p>"You're late!"</p>
<del>
    <p>"I apologize for the delay."</p>
</del>
<ins cite="../howtobeawizard.html" datetime="2018-05">
    <p>"A wizard is never late ..."</p>
</ins>
```
