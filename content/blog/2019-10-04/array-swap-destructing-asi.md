---
title: 'Swapping Array Elements In Place, Destructuring, and Automatic Semicolon Insertion'
date: '2019-10-04'
category: ['programming']
tags:
  [
    'javascript',
    'ecmascript',
    'automatic semicolon insertion',
    'asi',
    'swap',
    'arrays',
  ]
---

About a year ago, I learned about [bitwise operators and using them to swap elements of a list](../../2018-10-21/swapping-and-bitwise-operators/) in place.

With Array Destructuring, Javascript now allows you to do this without relying on bitwise operators.

For example to swap the first and fourth element, you might do the following:

```javascript
const arr = ([1, 2, 3, 4, 5][(arr[0], arr[3])] = [arr[3], arr[0]])
```

Did you catch the error?

…

There’s no `;` to end the definition of the array. This is _not_ a case where Javascript’s Automatic Semicolon Insertion (ASI) will add one either.<sup>1</sup> Instead, if you tried to run this code, you’d get an error similar to:

> ```shell
> ~/Users/Stephen/Desktop/scratch.js:15~
>   [arr[0], arr[3]] = [arr[3], arr[0]];
>    ^
>
> ReferenceError: arr is not defined
>     at anon (~/Users/Stephen/Desktop/scratch.js:15:4~)
>     at Object.<anonymous> (~/Users/Stephen/Desktop/scratch.js:18:1~)
>     at Module._compile (internal/modules/cjs/loader.js:685:14)
>     at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)
>     at Module.load (internal/modules/cjs/loader.js:598:32)
>     at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
>     at Function.Module._load (internal/modules/cjs/loader.js:529:3)
>     at Function.Module.runMain (internal/modules/cjs/loader.js:741:12)
>     at startup (internal/bootstrap/node.js:285:19)
>     at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)
> ```

```javascript
const arr = ([1, 2, 3, 4, 5]
[(arr[0], arr[3])] = [arr[3], arr[0]])
console.log(arr) // [4, 2, 3, 1, 5]
```

Tracking down the error was a fun reminder about the costs of being clever. Sometimes using a simple swap function really is just the right way to go:

```javascript
function swap(list, x, y) {
  const tmp = list[x]
  list[x] = list[y]
  list[y] = tmp
  return list
}
```

## Footnotes

- <sup>1</sup> [ASI | EcmaScript](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-rules-of-automatic-semicolon-insertion) The EcmaScript official spec as it relates to ASI.
