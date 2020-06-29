---
title: 'Constants To The Left'
date: '2020-04-08'
publish: '2020-05-01'
updated: ['2020-05-08']
category: ['programming']
tags: ['tips', 'evaluating', 'variable assignment', 'rules of thumb']
---

Hear ye, hear ye, by royal decree, I hereby declare: when evaluating, put constants on the left

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

Filing this under other practical advice I've found for avoiding the avoidable, like not using the [greater than symbol](stop-using-greater-than-in-code).

> **Update**: Interestingly, during a code review, my use of this was actually called out as non-idiomatic. While I was able to defend my reasoning for placing the constants on the left, it's worth remembering that it may require a bit of education.
