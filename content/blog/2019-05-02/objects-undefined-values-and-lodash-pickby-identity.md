---
title: 'Objects, Undefined values, and Lodash’s `_.pickBy` and `_.identity`'
date: '2019-04-30'
category: ['programming']
tags: ['lodash','pickBy','identity','learning']
---

Let’s start with the basics. I was in an oh-so-common situation recently where I was building a component that would visualize the details of an object.

Before I three things onto the DOM, however, I wanted to make sure that the detail was present — if it wasn’t, I wanted to leave it out.

My first attempt looked a bit like this.
```javascript
function removeUndefined(object){
  const newCollection = {};
  const createTupleCollection = Object.entries(object);
  const strippedCollection = createTupleCollection.filter(item => item[1]);
  strippedCollection.forEach(item => newCollection[item[0]]= item[1])
  return newCollection;
}

var object = { 'a': 1, 'b': undefined, 'c': 3, 'd': 'alabama', 'e': 0 };
var dataToSend = removeUndefined(object);
console.log(dataToSend); // {a: 1, c: 3, d: "alabama"}*
```

The `Object.entries` creates a convenient tuple of `[key, value]` that I then use to in my filter to remove any where the second item (index 1) evaluates to false within the filter.

I then populate a *new* object, `newCollection` with the slimmed down array and return that. It works.

It’s also a lot of code and isn’t particularly clear in what / why it’s doing what it’s doing.

We use Lodash and a colleague refactored the code down to something much simpler - akin to
```javascript
var object = { 'a': 1, 'b': undefined, 'c': 3, 'd': 'alabama', 'e': 0 };
var dataToSend = _.pickBy(object, _.identity)
console.log(dataToSend); // {a: 1, c: 3, d: "alabama"}*
```

Progress! It’s certainly simpler and even semantically, it’s somewhat intuitive (even if I didn’t have all the details about *how* `pickBy` worked or what `identity` did). My `dataToSend` will be from picking the object by the identity.

So, the first thing I wanted to know was *why* did it work and I suspected it was the answer was `_.identity` . This was the predicate for `pickBy` and therefore the *way* `pickBy` decided what to include or not.

So, I started running some tests.

```javascript
var object = { 'a': 1, 'b': undefined, 'c': 3, 'd': 'alabama', 'e': 0 };

function myIdentity(x) {return x}
function returnUndefined(){return undefined}

var predicateIsNumber = _.pickBy(object, _.isNumber)
var predicateIdentity = _.pickBy(object, _.identity)
var predicateMyIdentity = _.pickBy(object, myIdentity)
var predicateDefault = _.pickBy(object) // _.identity is the default iteratee


console.log(`statement 1 --> `, {object, predicateIsNumber, predicateIdentity, predicateMyIdentity, predicateDefault})
    // statement 1 -->
    // object: {a: 1, b: undefined, c: 3, d: "alabama", e: 0}
    // predicateDefault: {a: 1, c: 3, d: "alabama"}
    // predicateIdentity: {a: 1, c: 3, d: "alabama"}
    // predicateMyIdentity: {a: 1, c: 3, d: "alabama"}
    // predicateIsNumber: {a: 1, c: 3}

console.log(`statement 2 --> `, _.identity(undefined) === undefined)
    // statement 2 -->  true

console.log(`statement 3 --> `, _.identity(undefined) , myIdentity(undefined))
    // statement 3 -->  undefined undefined

console.log(`statement 4 --> calling myIdentity without an argument...`, myIdentity())
    // statement 4 --> calling myIdentity without an argument... undefined

console.log(`statement 5 --> `,returnUndefined())
    // statement 5 --> undefined
```

I’ll be honest - not what I was expecting! It turns out `undefined` satisfies the identity principle! So does `null` by the way.

Okay - so if `identity` wasn’t *why* my `undefined` values were being dropped… it had to be `pickBy`.

And there it was, right there in the [docs](https://lodash.com/docs/4.17.11#pickBy) (my emphasis):
> Creates an object composed of the object properties predicate returns **truthy** for. The predicate is invoked with two arguments: *(value, key)*.

`undefined` is not truthy - so `’b'` gets dropped. It’s *also* the case then that any of the other falsey values would also get dropped (which is around the time I added `’e’:0` to the test).

Fortunately, all of my values are strings, since `’0'` is a valid answer that I would want to see!

# Summary
It’s possible to accomplish the goal by writing your own utility function, but it’s not always pretty or particularly legible.
Lodash can simplify your code base and improve readability - leading to faster development and better developer experience.
The `identity` method returns the first argument passed to it.
The `pickBy` passes each element of a collection to an `iteratee` and evaluates it for truthiness.