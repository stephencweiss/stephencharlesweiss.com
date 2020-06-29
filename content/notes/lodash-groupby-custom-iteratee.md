---
title: 'More Uses Of `_.groupBy`'
date: '2019-06-20'
publish: '2019-06-20'
category: ['programming']
tags: ['lodash', 'groupby', 'learning', 'iteratee']
---

As I [wrote previously](lodash-groupby-vs-custom-helpers), the `_.groupBy` method of Lodash can be really useful.

My original use case for `_.groupBy` was for one big object, but of course, those principles extend into the case where it’s an array of objects (or object of objects).

For example - imagine an array like so:

```javascript
let objArr = [
    { id: 'a', val: 1, age: 20 },
    { id: 'b', val: 2, age: 10 },
    { id: 'c', val: 3, age: 40 },
    { id: 'a', val: 4, age: 80 },
]

let grouped = _.groupBy(objArr, (el) => el.id)

console.log({ grouped })
```

Now, imagine that the goal is to group by the `id` within object. Since `id` isn’t key of the `objArr` (i.e. the index of the array), I needed to specify more precisely _what_ I wanted to group by. `groupBy` allows this through its iteratee parameter. In this case, it meant evaluating the `id` key of the element, but it could also be an evaluation.

Imagine we wanted to group by folks by age and sort them into buckets. For demonstration purposes, we’ll look at above / below 30.

```javascript
function evaluateAge(person) {
    let groupLabel = ''
    if (person.age < 30) {
        groupLabel = 'Young-ish'
    } else {
        groupLabel = 'Old-ish'
    }
    return groupLabel
}

let groupedAge = _.groupBy(objArr, evaluateAge)
console.log({ groupedAge })
```

_NB_: I could also have done `el => evaluateAge(el)`, however, [currying](currying-an-introduction-with-function-declarations-and-expressions) means that’s not necessary.

This should have been obvious, but actually took me a bit to wrap my head around.
