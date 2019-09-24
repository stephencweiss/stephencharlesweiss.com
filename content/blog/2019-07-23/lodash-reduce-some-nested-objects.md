---
title: 'Using Lodash Reduce And Some To Accomplish Complex Filtering'
date: '2019-07-23'
category: ['programming']
tags: ['lodash', 'filter', 'reduce','iteratee', 'predicate']
---

I came across a situation where I had a collection of collections. Some of the internal collections, however, I didn't want to keep around because of the values it held. If _all_ of the values resolved to `false`, I would throw it out - but if even a single one was truthy, I'd keep it around.

I needed a way to economically filter them out. If I was dealing with arrays, I'd use `.reduce` and `.some`. Faced with objects, however, I looked to Lodash's methods for both — which conveniently handle not only arrays, but all collections (which includes objects).

**NB**: The following example is contrived, but illustrative of the kind of situation I was facing.
```javascript
const init = {
    first: {
        title: "first",
        names: {
            a: true,
            b: false,
            c: true,
        }
    },
    second: {
        title: "second",
        names: {
            d: false,
            e: false,
            f: false,
        }
    }
}
```

So, passing the `init` through a function, we'll call it `clean`, I want to see the following object:
```javascript
const output = {
    first: {
        title: "first",
        names: {
            a: true,
            b: false,
            c: true,
        }
    },
}
```

Lodash's `some` method fit my use case well. I wanted an escape hatch as quickly as possible if I found a true value

My first step was understanding how to use the `_.some`. The documentation paints the picture:
> Checks if `predicate` returns truthy for**any**element of `collection`. Iteration is stopped once `predicate` returns truthy. The predicate is invoked with three arguments: _(value, index|key, collection)_.

Unfortunately, while it's clear that this is possible, the examples don't show how it's used, focusing more on the magic that Lodash enables.

Here's a simple example of `_.some` in practice given our `init` object:
```javascript
function checkSome (collection) {
  return _.some(collection.names, (val, key, collection) => {
    return val;
  })
}
console.log(checkSome(init.first)); // true
console.log(checkSome(init.school)); // false
```

Okay, so that's the second step — but, how do I actually get to it? With the `_.reduce`.

A reminder on how the `_.reduce` works:
> Reduces `collection` to a value which is the accumulated result of running each element in `collection` thru `iteratee`, where each successive invocation is supplied the return value of the previous. If `accumulator` is not given, the first element of `collection` is used as the initial value. The iteratee is invoked with four arguments: _(accumulator, value, index|key, collection)_.

```javascript
function reducer(accumulator, value, key, collection) {
  // if some of the values return true when passed into checkSome
  if (checkSome(value)){
	  // add them to the accumulator
    accumulator[key]=value;
  }
  return accumulator;
}

function clean(collection) {
  return _.reduce(collection, reducer, {})
}
const reducedInit = clean(init)
```

Voila! My `reducedInit` returns only the desired values.

