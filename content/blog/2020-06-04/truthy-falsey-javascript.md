---
title: 'Truthy And Falsey: Javascript Edition'
date: '2020-04-30'
publish: '2020-06-04'
category: ['programming']
tags: ['javascript', 'truthy', 'falsey']
---

One of the most challenging things when getting started with Javascript is understanding comparisons.

To do so requires understanding a few things:

1. Javascript has the concept of truthy and falsey -- things that are "true-ish" and "false-ish".
2. There are different comparison rules that can lead to some confusing results, i.e. so called "loose equivalency", but actually called [Abstract Equality Comparison](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-abstract-equality-comparison), i.e. `==`, and [Strict Equality Comparison](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-strict-equality-comparison), i.e. `===`.

First, let's start with the falsey values. There are six and only six:

1. `false`
2. `null`
3. `undefined`
4. `0`
5. `NaN`
6. `""` (or `''` or \`\`)

Everything else is truthy.

```javascript
if (false || null || undefined || 0 || NaN || '') {
    console.log('something in the list is true')
} else {
    console.log('everything is false')
}
```

In the above example, you've probably guessed (correctly) that "everything is false" will print.

Now that that's out of the way, let's look at the differences between the comparison.

Despite the popular phrasing that `===` checks _both_ value and type whereas `==` only checks type, it's not quite right.

In fact, if you look at the spec, you'll see the big difference is that `==` allows coercion of types. This is why `1 == '1'` is true but not `1==='1'`.

![](https://res.cloudinary.com/scweiss1/image/upload/v1588301213/code-comments/2020-06-04-truthy-falsey-javascript/A5123B75-B0CC-48C7-990E-9F7DFA6722B2_zjyjva.png)
