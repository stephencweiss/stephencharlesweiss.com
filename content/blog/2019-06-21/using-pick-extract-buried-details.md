---
title: 'Using `_.pick` To Extract Relevant Details From Objects'
date: '2019-06-21'
category: ['programming']
tags: ['lodash', 'pick', 'iteratee', 'learning']
---

Building on lessons from yesterday's dive into `groupBy`, I found an opportunity to explore `pick`. This time it was because I wanted to send data from the client to my server for processing and committing to the database.

My APIs are written in Typescript and expect a particular shape of data. Since, I wanted to get the benefits of Typescript, my goal was not to rely on typing it as `any`. Which, of course, means that I needed to shape the data _before_ sending it over.

In my case, I was sending an array of objects. Each object on the client side, however, was carrying around _way too much_.

Imagine an object like:

```javascript
const exampleElement = {
  id: "abc123",
  keyProp: "yippee",
  otherProp: 1,
	otherProp2: ...,
  ...
  otherProp100: "done?",
  ...
  otherProp200: "not quite!",
  ...
	otherProp289: "finally!"
}
```

But, all we really needed to send across the wire was the `id` and the `keyProp` . So, at a high level we need to do the following:

1. Iterate over the array
2. Look at the element (an object)
3. Return a _new_ object (or mutate the original, though that won’t be our approach) with _just_ the `id` and `keyProp`

Using vanilla Javascript, we could do this with a `.map` and custom function to construct the new object (since `.map` returns a new array, we would use the value to construct a new object).

For example:

```javascript

const myArrOfObj = [{id:"abc123", keyProp: "yippee", ...}, ... ]

const newObjArr = myArrOfObj.map(el => {
    let newEl = {}
    newEl.id = el.id;
    newEl.val = el.val;
    return newEl;
})
```

While this works, it’s a bit cumbersome.

Lodash offers a method in `pick` to do this with relative ease. We still need the map (since we’re picking from the objects elements of the array, not the array itself.

Pick, however, has a very declarative API indicating exactly what you’re trying to do - whereas with the example above, you need to read the code to see what’s happening.

```javascript
const myArrOfObj = [{id:"abc123", keyProp: "yippee", ...}, ... ]
const picked = myArrOfObj.map(val => _.pick(val, ["id", "val"]))
```

Two comparable ways to do the same thing. The benefit of the Lodash method in this case is that it makes it clear what is being accomplished. Reaching for a library is not always helpful - particularly if there’s a native way to achieve the same objective (as I did here), however, I gladly do it when it means that the program is more readable / declarative.

Note: Thank you Kyle Simpson for giving me the language to speak about this (imperative vs declarative code).
