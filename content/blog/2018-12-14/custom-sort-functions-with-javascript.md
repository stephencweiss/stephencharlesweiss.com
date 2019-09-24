---
title: Custom Sort Functions with Javascript
date: '2018-12-14'
category: ['programming']
tags: ['algorithms','javascript','sort']
---
Javascript's built-in sort is powerful and fast. However, there are many times when you will want to sort in a custom fashion.

Whenever I wanted to create a custom sort, I kept referring back to MDN's great page on the [.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.

This post is intended as a complement to that and one that pulls out some of the critical points I needed in order to grok *how* custom sorts worked in my most common use cases.

# The Basics
Underpinning all of the sorting methods in Javascript are a few simple rules:
1. The built-in sort function is a three-way comparison between two values `a` and `b`
2. A return value `> 0` means that the `a` is greater than `b` and will come *after* it
3. A return value `== 0` means the values are equal and it does not matter which comes first
4. A return value of `< 0` means that `a` is less than `b` and will come *before* it

```javascript
const arr = [4,1,2,5,3,2];

function ascendingSort(a, b) {
  if (a < b) { return -1 }
  return 1
};

function descendingSort(a, b) {
  if (a < b) { return 1 }
  return -1
};

console.log(`Native --> `, arr.sort()); // [ 1, 2, 2, 3, 4, 5 ]
console.log(`Ascending -> `, arr.sort(ascendingSort)); // [ 1, 2, 2, 3, 4, 5 ]
console.log(`Descending -> `, arr.sort(descendingSort)); // [ 5, 4, 3, 2, 2, 1 ]
```

# Multi-Condition Sort
These same rules apply for a more complicated scenario. For example, let's think about sorting an array where each element is itself an array.

The elements take the shape of `[char, number]`, e.g., `[a,2]`

We want to sort in the following way:
1. Sort the element's first by the number in descending fashion (e.g., 9 before 8)
2. If there's a tie, sort the elements by the character in *ascending* order (e.g., a before b)

```javascript
const nestedArray = [ [ 'm', 1 ], [ 'i', 4 ], [ 's', 4 ], [ 'p', 2 ] ];

function descNumbersAscChar(arrA, arrB) {
  if (arrA[1] > arrB[1]) { return -1 }
  else if (arrA[1] === arrB[1]) {
    if (arrA[0] < arrB[0]) { return -1 }
    else if (arrA[0] > arrB[0]) { return 1}
  }
  else if (arrA[1] < arrB[1]) { return 1 }
  else {
    console.log('Uncaught situation!')
    return 1
  }
};

console.log(nestedArray.sort(descNumbersAscChar)); // [ [ 'i', 4 ], [ 's', 4 ], [ 'p', 2 ], [ 'm', 1 ] ]
```

# Boolean Logic

One of the reasons that this took a while for things to click is that I was thinking in terms of boolean comparisons.

This is actually what Javascript is doing, but because it doesn't want to look at the conditional (that is `a < b`), it relies on you to tell it what to do with a `1` and `-1`.

If you still want to use Boolean logic, however, it's fairly straightforward.

Refactoring the `ascendingSort` function from earlier:

```javascript
/**
* Boolean overview
* if (a < b) {
*   // do this because it's true
* } else {
*   // do this because it's false
* }
*/

const arr = [4,1,2,5,3,2];

function ascendingSortBool(a,b) {
  return +(a > b) || -(a < b)
}
console.log(`Ascending -> `, .sort(ascendingSortBool)) // [ 1, 2, 2, 3, 4, 5 ]
```
This works because function returns `1` _if_ `a > b` and `-1` _if_ `b < a`. This avoids the issue of a false returning `0` which the `.sort()` wouldn't do anything with.

# Additional Resources

  * [Stackoverflow: Sorting in Javascript](https://stackoverflow.com/questions/24080785/sorting-in-javascript-shouldnt-returning-a-boolean-be-enough-for-a-comparison/24080786#24080786) \- credit to [Bergi](https://stackoverflow.com/users/1048572/bergi) for the answer that really helped clarify my understanding on the topic

  * [MDN Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)