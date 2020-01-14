---
title: 'Capitalize the first letter of a string in Javascript'
date: '2020-01-14'
publish: '2020-01-27'
category: ['javascript']
tags: ['capitalize', 'string manipulation', 'lodash']
---

I wanted to capitalize _just_ the first letter of a string in Javascript.

As usual, there a number of ways to do this. Below I walk through three:

1. Lodash's `capitalize` method
2. Using `substring` to split the string and `toUpperCase` to capitalize only a portion
3. Using array destructuring to split the string and `toUpperCase` to capitalize only a portion

## Lodash's Capitalize

If you're already using Lodash in your project, it has a very handy utility, `_.capitalize` that does exactly this. If you're worried about importing the entire package, just for this this one utility, you can also tree-shake and only import `capitalize`. For example:

```javascript
import capitalize from 'lodash/capitalize'
// or...
const capitalize = require('lodash/capitalize')

const str = 'something I want to capitalize'
capitalize(str)
console.log(str) // Something I want to capitalize
```

## Javascript Built-Ins

On the other hand, if you are averse to Lodash, you can do this natively with Javascript built-in string methods:

```javascript
const str = 'something I want to capitalize'
const start = str.substring(0, 1).toUppercase()
const rest = str.substring(1)
console.log({ start, rest, together: start + rest }) // Object { start: 'S', rest: 'omething I want to capitalize', together: 'Something I want to capitalize'}
```

## Javascript Built-Ins With Array Destructuring

I also found [this site with a few other methods](https://www.arungudelli.com/tutorial/javascript/capitalize-the-first-letter-in-a-string-in-javascript-to-uppercase/). My favorite was using array destructuring and template literals:

```javascript
const str = 'something I want to capitalize'
const [first, ...rest] = str
const capitalized = `${first.toUpperCase()}${rest.join('')}`
console.log({ first, rest, capitalized }) // Object { first: "s", rest: Array ["o", "m", "e", "t", "h", "i", "n", "g", " ", "I", " ", "w", "a", "n", "t", " ", "t", "o", " ", "c", "a", "p", "i", "t", "a", "l", "i", "z", "e"], capitalized: "Something I want to capitalize" }
```

## Conclusion

As with most things, there are multiple ways to get to your destination. When it comes to capitalizing the first letter of a string with Javascript, these are just three. The one thing I would note is that while `capitalize` coerces its input into a string _before_ any mutation, the other two solutions here do _not_. If you are not certain that `str` is a string type, it's worth checking / coercing _before_ getting a runtime error that `str.toUpperCase is not a function` because `str` isn't actually a string.
