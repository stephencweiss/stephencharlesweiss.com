---
title: 'Why Sets Are Always Unique: Hashing'
date: '2020-03-26'
publish: '2020-04-14'
category: ['programming']
tags: ['javascript', 'set', 'hashing']
---

I was doing a little reading on Sets this morning and had a bit of an 'a ha' moment about _why_ Sets are always unique.

Let's say we have an array that potentially has duplicates, but we only want to deal with unique values. We can use a Set to help with this:

```javascript
const myArray = ['test', 'other', 'new', 'new']
const mySet = new Set(myArray)
console.log(mySet) // {"test", "other", "new"}
const dedupedArray = [...mySet]
console.log(dedupedArray) // ["test","other","new"]
```

But why is this?

One way to think about a Set is as a hash table that only stores the key.

The implication is that when you see a value a _second_ time, the insert operation that hashes the value to find its new location results in the _same value as before_ -- consequently, the new value will be placed on top of the old one. Since they're the same value, you can't really tell which is which either way, but the result is that a duplicate takes up no additional space.

If we step through building a set, we can see it as well:

```javascript
const mySet = new Set(['test', 'other'])
console.log(mySet) // {"test", "other"}
mySet.add('new')
console.log(mySet) // {"test", "other", "new"}
mySet.has('new') // true
mySet.add('new')
console.log(mySet) // {"test", "other", "new"}
```

Again, we added 'new' twice (or tried) to our set. In the end, however, there's only one remaining. No error was thrown. From the perspective of the set, it was handled just fine.

This is not groundbreaking stuff, but it's always fun when I can make new connections between concepts - and understanding that Sets enforce uniqueness as a result of hashing is exactly the kind of thing that brings a smile to my face.
