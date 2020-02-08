---
title: 'Calculating The Average Of An Array With Reduce'
date: '2020-01-28'
publish: '2020-02-15'
category: ['programming']
tags: ['javascript','reduce']
---

I had to find the average of a set with potentially undefined values.

If a value was undefined, I wanted to skip it all together. For example: `js> const arr = [1,2,null,4]` has _three_ elements. So any average would be over _three_, not the native `js> Array.prototype.length` value (which would return four).

My first pass included two loops: one for the sum of all values, and one for the total count.

I wanted to see if I could eliminate one of those loops altogether and count both at the same time.

Defining a custom reducer allowed me to do just that:

```javascript
const arr = [1,4,21,2,null,4, 14, 18];

function reducer(accumulator, currentValue) {
  if(currentValue){
    accumulator[0] += currentValue;
    accumulator[1] += 1;
  }
  return accumulator
}

const reduced = arr.reduce(reducer, [0,0])
const avg = reduced[0]/reduced[1] || 0
console.log({reduced, avg})
```

This is a bit imperative however. Coming back to this code in a month, I might forget _what_ the elements of the tuple actually meant.

A second attempt refined that by reducing the array down into an object with more explicit properties:

```javascript
function namedReducer(accumulator, currentValue) {
  if(currentValue){
    accumulator.sum += currentValue;
    accumulator.count += 1;
  }
  return accumulator
}
const semanticReduced = arr.reduce(namedReducer, {sum: 0, count: 0})
const semanticAvg = semanticReduced.sum / semanticReduced.count || 0;
console.log({semanticReduced, semanticAvg})

```

In both cases, however, the goal was achieved. I was able to reduce my set with only one loop and do so in a way that made finding the average relatively trivial.

Besides being able to solve this problem, it was noteworthy because it _wasn't_ particularly challenging. It used to be though. It was a fun reminder of how I continue to refine my understanding on the hard becomes easy, making way for _new_ challenging problems.

Here's a live [repl.it](https://repl.it/@stephencweiss/reduce-to-tuple) to play around yourself.