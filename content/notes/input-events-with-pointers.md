---
title: 'Replacing MouseEvents with PointerEvents'
date: '2019-08-14'
publish: '2019-08-14'
category: ['programming']
tags: ['w3', 'event handlers', 'mouse events', 'pointer events']
---

How can the necessity of handling different types of inputs (e.g., mouse, touch, and pen) by duplicating event handler logic? The Pointer Event makes a compelling case that it's a solid solution.

|                                               ![](https://res.cloudinary.com/scweiss1/image/upload/v1593195843/code-comments/pointer_kelpy4.png)                                                |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| _Figure1A pointer is a hardware agnostic representation of input devices that can target a specific coordinate (or set of coordinates) on a screen._ <sup>[1](#Footnotes)</sup><a id="fn1"></a> |

> Pointer Events provide all the usual properties present in Mouse Events (client coordinates, target element, button states, etc.) in addition to new properties for other forms of input: pressure, contact geometry, tilt, etc. <sup>[2](#Footnotes)</sup><a id="fn2"></a>

While Pointer Events are not yet supported by all browsers, there is wide adoption among major modern browsers (Safari being the major exception, though support is coming in v13).<sup>[3](#Footnotes)</sup><a id="fn3"></a>

![Can I Use Pointer Events](https://res.cloudinary.com/scweiss1/image/upload/v1593195843/code-comments/can-i-use-pointer-events_rrp2dy.png)

This is a boon as pointer events will make the act of dealing with different input events much simpler.

## Footnotes:

-   <sup>[1](#fn1)</sup> [Pointer Events | W3](https://www.w3.org/TR/pointerevents/)
-   <sup>[2](#fn2)</sup> [_ibid._](https://www.w3.org/TR/pointerevents/)
-   <sup>[3](#fn3)</sup> [Pointer Events | Can I use…](https://caniuse.com/#search=pointerdown)
