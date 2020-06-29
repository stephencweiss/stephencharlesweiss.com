---
title: 'Stringifying Sets'
date: '2019-10-25'
publish: '2019-11-01'
category: ['programming']
tags: ['javascript', 'set']
---

In Javascript, Sets are Objects with a few special attributes. Notably, they’re _iterable_ collections of _unique_ elements.

One of the consequences of how Sets are constructed, however, is that they’re not stringify-able.<sup>[1](#footnotes)</sup><a id="fn1"></a>

There are some simple solutions to this is to create an array before trying to stringify the elements.

For example:

```javascript
const mySet = new Set([1,2,3,4,5,6,1]) // the duplicative 1 will be removed
console.log(JSON.stringify(mySet)) // “{}”
console.log(JSON.stringify([...mySet]) // “[1, 2, 3, 4, 5, 6]”
```

## Footnotes

-   <sup>[1](#fn1)</sup> [javascript - JSON stringify a Set | Stack Overflow](https://stackoverflow.com/questions/31190885/json-stringify-a-set)
