---
title: 'Hover Events & Different Cursors With CSS'
date: '2019-05-08'
category: ['programming']
tags: ['css', 'cursor', 'hover event']
---

More CSS fun today!

One way to visually indicate that an element is clickable is by changing the cursor to a

If a data element is supposed to be clickable, you may want to change the cursor to indicate that the behavior is available. You can do this with pseudo-selectors in your CSS and the attribute "cursor".

```css
.my-class-name {
    :hover * {
        cursor: pointer;
    }
`;
```

In this case, I am using the `*` to only apply to the _children_ of the element where `class= "my-class-name"`

While I wanted to use a `pointer`, there are a number of different cursor options. I found this list to be helpful in considering all of my options.

```css
.auto {
    cursor: auto;
}
.default {
    cursor: default;
}
.none {
    cursor: none;
}
.context-menu {
    cursor: context-menu;
}
.help {
    cursor: help;
}
.pointer {
    cursor: pointer;
}
.progress {
    cursor: progress;
}
.wait {
    cursor: wait;
}
.cell {
    cursor: cell;
}
.crosshair {
    cursor: crosshair;
}
.text {
    cursor: text;
}
.vertical-text {
    cursor: vertical-text;
}
.alias {
    cursor: alias;
}
.copy {
    cursor: copy;
}
.move {
    cursor: move;
}
.no-drop {
    cursor: no-drop;
}
.not-allowed {
    cursor: not-allowed;
}
.all-scroll {
    cursor: all-scroll;
}
.col-resize {
    cursor: col-resize;
}
.row-resize {
    cursor: row-resize;
}
.n-resize {
    cursor: n-resize;
}
.e-resize {
    cursor: e-resize;
}
.s-resize {
    cursor: s-resize;
}
.w-resize {
    cursor: w-resize;
}
.ns-resize {
    cursor: ns-resize;
}
.ew-resize {
    cursor: ew-resize;
}
.ne-resize {
    cursor: ne-resize;
}
.nw-resize {
    cursor: nw-resize;
}
.se-resize {
    cursor: se-resize;
}
.sw-resize {
    cursor: sw-resize;
}
.nesw-resize {
    cursor: nesw-resize;
}
.nwse-resize {
    cursor: nwse-resize;
}
.grab {
    cursor: -webkit-grab;
    cursor: grab;
}
.grabbing {
    cursor: -webkit-grabbing;
    cursor: grabbing;
}
.zoom-in {
    cursor: -webkit-zoom-in;
    cursor: zoom-in;
}
.zoom-out {
    cursor: -webkit-zoom-out;
    cursor: zoom-out;
}
```
