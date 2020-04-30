---
title: 'Constants To The Left'
date: '2020-04-08'
publish: '2020-05-01'
category: ['programming']
tags: ['tips', 'evaluating', 'variable assignment', 'rules of thumb']
---

By royal decree:

> When evaluating, put constants on the left

Okay, so this isn't actually a decree and shouldn't be followed dogmatically, but having been burned before due to an accidental assignment (where a comparison was intended), following this rule seems sensible.

What it looks like:

```javascript
0 == x // do this
x == 0 // not this
```

Now, if you were to mistype and put:

```javascript
0 = x
```

You get an error message immediately instead of a silent bug:

```
Uncaught SyntaxError: Invalid left-hand side in assignment
```

Filing this under other practical advice I've found for avoiding the avoidable, like not using the [greater than symbol](../../2020-01-06/stop-using-greater-than-in-code).
