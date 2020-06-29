---
title: '_.pickBy Removes Falsey Values By Default'
date: '2020-02-05'
publish: '2020-02-24'
category: ['programming']
tags: ['lodash', 'pickBy']
---

Recently found myself constructing an object with spread operators and using Lodash's `PickBy` utility function when I noticed that it was stripping out any falsey values.

For example:

```javascript
const _ = require('lodash')

const defaultValues = { name: 'Stephen', d: 4 }

var myValues = { a: 1, b: '2', c: 3, d: undefined, e: null, f: 0 }

const constructedValues = { ...defaultValues, ..._.pickBy(myValues) }
console.log(constructedValues) // { name: 'Stephen', d: 4, a: 1, b: '2', c: 3 }
```

This is great! If a value is defined in the `defaultValues` but is _not_ (or is `null`) in the `myValues` object, we can still see it! This handles a common problem with spreading - that of precedence. The objects or arrays that come later win in the case of conflict and so order matters.

```javascript
const obj1 = { a: 1, b: 3 }
const obj2 = { a: 4, c: 5 }
const construct1 = { ...obj1, ...obj2 } // { a: 4, b: 3, c: 5 }
const construct2 = { ...obj2, ...obj1 } // { a: 1, c: 5, b: 3 }
```

Okay, so `pickBy` can defend against this situation nicely. But what about cases where you actually want the _full_ object, falsey values and all, but don't want to overwrite any values in the _first_ object if it's not defined later? That is, how do we get this object?

```javascript
console.log(constructedValues) // { name: 'Stephen', d: 4, a: 1, b: '2', c: 3, e: null, f: 0}
```

Well, `pickBy` won't work in this case because we need to compare the evaluated value against the other object.

For this, I came up with two approaches: the first using `Object.entries` and the second a `for...in` loop.

## Object.entries Approach

The `Object.entries` method is like the `Object.keys` and `Object.values`, except it returns a tuple.

We can see how these relate with a simple example:

```javascript
const obj = { a: 1, b: 3 }
const keys = Object.keys(obj) // [a, b]
const values = Object.values(obj) // [1, 3]
const entries = Object.entries(obj) // [[a,1],[b,3]]
```

Taking advantage of this, we can construct an array and then selectively (or conditionally) apply the values we want to our newly constructed object.

```javascript
const defaultValuesClone = { ...defaultValues }
const myValuesEntries = Object.entries(myValues)
myValuesEntries.forEach((entry) => {
    const [key, value] = entry
    if (!defaultValuesClone[key] || value) {
        defaultValuesClone[key] = value
    }
})
console.log(defaultValuesClone) // { name: 'Stephen', d: 4, a: 1, b: '2', c: 3, e: null, f: 0 }
```

Wonderful! We have all of our keys present and nothing's unnecessarily overwritten (i.e. the `d` is `4`, not `undefined`).

## For...In Loop

Like a `for...of` loop, the `for...in` loop iterates over a list. The difference is in what's returned.<sup>[1](#footnotes)</sup><a id="fn1"></a>

-   `for...in` returns a list of _keys_
-   `for...of` returns a list of _values_

```javascript
const secondValuesClone = { ...defaultValues }
for (const key in myValues) {
    if (!secondValuesClone[key] || myValues[key]) {
        secondValuesClone[key] = myValues[key]
    }
}

console.log(secondValuesClone) // { name: 'Stephen', d: 4, a: 1, b: '2', c: 3, e: null, f: 0 }
```

Here too, we're able to get our object with all of the values we expect and refrain from overwriting values where no new one exists.

## Conclusion

Fortunately, in my case, I only had to compare two objects. I could see how it might be useful to extract this type of logic into a helper function if I were to repeat this comparison (or make the comparison logic more complex).

I've also pulled together a [repl](https://repl.it/@stephencweiss/lodash-pickby-default) for all of this code if you want to play with it.

## Footnotes

-   <sup>[1](#fn1)</sup> [Typescript's documentation on the differences between the loop types](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#forof-vs-forin-statements) is hlepful to visualize this.
