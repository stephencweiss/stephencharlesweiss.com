---
title: 'Creating Empty Arrays And Matrices In Javascript'
date: '2020-06-07'
publish: '2020-07-21'
category: ['programming']
tags:
    [
        'javascript',
        'arrays',
        'array.from',
        'matrix',
        'empty array',
        'pointer by reference',
    ]
---

Imagine we want to create an `n x m` matrix with Javascript. Javascript provides a number of different options for this, but it's one of those problems that, if done incorrectly, can lead to a pointer by reference and undesirable results (i.e. when you want to update the 0th row and the 0th column, but you end up updating _all_ 0th columns).

The easiest way to reason through this problem is with for-loops:

```javascript:title=createArrays.js
const rows = 5
const columns = 4
const matrix = []
for (let row = 0; row < rows; row += 1) {
    const row = []
    for (let column = 0; column < columns; column += 1) {
        row.push(0)
    }
    matrix.push(row)
}
matrix[0][1] = 1
console.log({ matrix })
/*
[
  [0, 1, 0, 0],   [0, 0, 0, 0],   [0, 0, 0, 0],   [0, 0, 0, 0],   [0, 0, 0, 0],
] */
```

This works! We only update the _first_ row. It is rather heavy handed and imperative, however. Could we offload some of the _how_ to Javascript and more describe what we'd like? Here's one approach of a more declarative approach.

```javascript:title=improvedCreateArrays.js
const rows = 5
const columns = 4

const matrix = Array(rows)
    .fill(0)
    .map((row) => (row = Array(columns).fill(0)))
```

We can actually make this even cleaner by using the `Array.from`. `Array.from` takes an Array-like / iterable first argument and then has an optional second argument, a map function.

```javascript:title=declarativelyCreateArray.js
const rows = 5
const columns = 4

const matrix = Array.from(Array(rows), (row) => Array(columns).fill(0))
```

The interesting thing about this is that the map function is fully function (meaning it has the index and access to the whole array too). So, what if we wanted to have have the rows increment?

```javascript:title=declarativelyCreateArray.js
const rows = 5
const columns = 4

const matrix = Array.from(Array(rows), (row, index) =>
    Array(columns).fill(index)
)
console.log(matrix) /*
[
  [0, 0, 0, 0],   [1, 1, 1, 1],   [2, 2, 2, 2],   [3, 3, 3, 3],   [4, 4, 4, 4],
]
*/
```

Even cooler, we can do an incrementing matrix. In our case, we have 20 cells (5 x 4), so let's see howe we can get each cell to mark its position:

```javascript:title=fancyCreateArray.js
const rows = 5
const columns = 4

const matrix = Array.from(Array(rows), (row, rIndex) =>
    Array.from(Array(columns), (col, cIndex) => rIndex * columns + cIndex)
)

console.log({ matrix }) /*
[
  [0, 1, 2, 3],   [4, 5, 6, 7],   [8, 9, 10, 11],   [12, 13, 14, 15],   [16, 17, 18, 19],
]
*/
```

## Conclusion

When creating arrays, there are a lot of good options! It just depends what you're trying to do. Just be sure to have a _different_ array defined for each row or things are unlikely to turn out as expected.

For example, the following does _NOT_ work the way you are likely looking for:

```javascript:title=doNotCreateArraysLikeThis.js
const rows = 5
const columns = 4
const messedUpMatrix = [...Array(rows)].fill([...Array(columns)].fill(0))

messedUpMatrix[0][1] = 1
console.log({ messedUpMatrix })
/*
[
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
] */
```
