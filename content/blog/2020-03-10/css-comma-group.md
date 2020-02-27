---
title: 'Commas in CSS: Grouping Selectors'
date: '2020-02-21'
publish: '2020-03-10'
category: ['programming']
tags: ['css', 'selectors', 'comma']
---

The number of times I've had to look up what the _comma_ means in CSS is astounding.

As usual, if I find myself doing something multiple times, it's a reminder that it's worth writing down _how_.

Today, that's commas. Specifically, it's how to use a comma in CSS.

Since I don't use CSS syntax every day, it's been a slow journey to mastering it. The number of different types of selectors doesn't help either. But then there's the comma. It just seems to appear some times and I'm left wondering, what exactly it does!

In fact, while MDN's CSS [First Steps](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) and [Building Blocks](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks) series reference the _use_ of commas (e.g., in the section [Create logical sections in your stylesheet](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing)), I couldn't find a good definition anywhere of what it means.

Take for example these two style definitions:

```css
body p {
  color: blue;
}
```

vs.

```css
body,
p {
  color: blue;
}
```

The former is an example of a child selector and applies a color of blue to all `paragraph` tags that are children of the `body`. The latter applies a color of blue to `body` tags _or_ `paragraph` tags.

The latter then, is simply a terser (though equivalent) way to write the following:

```css
body {
  color: blue;
}
p {
  color: blue;
}
```

I still don't know if the comma has an official name, but I'm thinking of it as a "grouper". It's a way to say "or" in CSS. The comma isn't a selector, but a way to _group_ selectors<sup>[1](#footnotes)</sup><a id="fn1"></a>.
## Footnotes

- <sup>[1](#fn1)</sup> The idea of "grouping" as a way to describe the comma coms from this [Lifewire article "Grouping Multiple CSS Selectors"](https://www.lifewire.com/grouping-multiple-css-selectors-3467065).
