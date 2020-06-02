---
title: 'Reasons To Prefer Maps Over POJOs* (i.e. Objects)'
date: '2020-05-31'
publish: '2020-07-16'
category: ['programming']
tags:
    [
        'hashmap',
        'object',
        'pojo',
        'map',
        'javascript',
        'performance',
        'iterators',
    ]
---

\*Note: A [POJO](https://en.wikipedia.org/wiki/Plain_old_Java_object) is actually a "Plain Old Java Object", but I'm talking about Javascript, so it'll be "Plain Old Java*script* Object" today

[Johannes Baum](https://medium.com/better-programming/stop-using-objects-as-hash-maps-in-javascript-9a272e85f6a8) wrote a nice article summarizing some of the benefits of using a Map over an Object for purposes of a HashMap (or Dictionary). While Johannes discussed six benefits (read his article for all six), the two most convincing to me were Key Types and Performance (into which I'll wrap "Size Determination" and "Direct Iteration")

## Key Types

Whereas a key for a POJO can only be a string, there's no such limitation on a Map. This is likely not a difference you'll notice that often, it's only because when you place a _non_ string into they keys of an object, Javascript will "stringify" them for you. This can lead to undesired results. For example:

```javascript:title=pojo-with-object-keys.js
let pojo = {}
let pojoKey = {}
let pojoKeyTwo = {}

pojo[pojoKey] = 1
pojo[pojoKeyTwo] = 2

console.log(Object.entries(pojo)) // ["[object Object]", 2]
```

There's only _one_ entry in the object because when Javascript stringified `pojoKey` and `pojoKeyTwo` they were both reduced to `"[object Object]"`!

Contrast this with a Map:

```javascript:title=map-with-object-keys.js
let map = new Map()
let pojoKey = {}
let pojoKeyTwo = {}

map.set(pojoKey, 1)
map.set(pojoKeyTwo, 2)
let keys = map.keys()
console.log(keys)
// MapIterator {{…}, {…}}
//  [[Entries]]
//    0: value: {}
//    1: value: {}
//  __proto__: Map Iterator
//  [[IteratorHasMore]]: true
//  [[IteratorIndex]]: 0
//  [[IteratorKind]]: "keys"
```

We can clearly see that there are _two_ entries in the keys, however, it's worth noting that this is _not_ an idiomatic way to access the keys in a Map.

`Map.keys()` (as well as `Map.entries()` and `Map.values()`) returns an `Iterator`.
In the case of the Map, think of it as an object that contains two keys: `value` and `done`. The former is what you're looking for, the latter divulges whether there are any more values.

## Performance

As Johannes pointed out, there are a few different areas where Maps are optimized relative to POJOs.

The first is understanding _how large_ it is (i.e. the size). Maps store this information on its prototype, so it can be accessed directly:

```javascript:title=comparing-size.js
let pojo = {}
pojo['one'] = 1
pojo['two'] = 2
//...
pojo['one-hundred'] = 100
let pojoKeys = Object.keys(pojo) // convert keys to array, linear operation: O(n)
console.log(pojoKeys.length) // 100 -- access _array_ property, length, directly: O(1)

let map = new Map()
map.set('one', 1)
map.set('two', 2)
//...
map.set('one-hundred', 100)
console.log(map.size) // access the map property, size, directly: O(1)
```

Another place where performance shows up is in iteration.

Iterating over every key, value, or entry in a POJO requires converting it to a _new_ data structure (namely an array) - a potentially costly (both from a time _and_ space) operation. Maps have no such requirement as each property can be accessed and iterated directly using the `Iterator` returned by their respective functions.

For example:

```javascript:title=iterating-comparison.js
let pojo = {}
pojo['one'] = 1
pojo['two'] = 2
//...
pojo['one-hundred'] = 100
let pojoEntries = Object.entries(pojo) // convert to array
pojoEntries.forEach(([key, value]) => console.log([key, value]))

let map = new Map()
map.set('one', 1)
map.set('two', 2)
//...
map.set('one-hundred', 100)
let entries = map.entries()
while (true) {
    const entry = entries.next()
    console.log(entry.value)
    if (entry.done) break
}
```

While slightly less terse (i.e. Map has a few extra lines because of the while loop), the time and space benefits gained are potentially significant and make the tradeoff worth it!

## Wrap Up

I'm grateful to Johannes for writing his original article and inspiring me to investigate some of the differences between the POJO and Map in Javascript as well as better familiarize myself with the API.

Programming is a tool in service of completing a job. We might as well pick the best one for it! The only way to know which one that is, however, is to continue exploring and learning what's available and understanding some of the tradeoffs (there are always tradeoffs!) involved.
