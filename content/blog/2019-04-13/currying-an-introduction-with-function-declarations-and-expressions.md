---
title: 'Currying - An Introduction With Function Declarations & Expressions'
date: '2019-04-13'
category: ['programming']
tags: ['javascript', 'functional programming', 'currying']
---

For a long time, I hated seeing functions like this: `const someFn = a => b => a + b;`. I thought this was just “code golf” (the idea of reducing a function to its _shortest_ incarnation) without concern for how it would be received by the _reader_ of the code later.

This can definitely be true and I’m still generally opposed to golf for the sake of itself. But, what I missed was that writing functions in this way, that is - using currying, can actually be really helpful.

Currying enables a greater control over _what_ a function is doing (by reducing each function’s scope) by leveraging the composability of functions.

Let’s start with an example of addition with function declarations. Later, we’ll move into ES6 and function expressions.

The function’s purpose is trivial, but it was this example that helped me see _how_ currying worked!

```javascript
function addOne(a) {
  return a + 1
}

function addNums(a, b) {
  return a + b
}

function addNumsCurried(a) {
  return function addBy(b) {
    return a + b
  }
}
```

If we know we always want to add by one, `addOne` is perfectly reasonable. If we are okay always setting two variables, we can use `addBy`. `addByCurried` seems to be fundamentally different, but it actually allows us to determine what we want to add by _separately_ from our base.

So, we could have the following

```javascript
const addByTwo = addNumsCurried(2)
const addByThree = addNumsCurried(3)
console.log(
  `The typeof addByTwo and addByThree --> `,
  typeof addByTwo,
  typeof addByThree
) // The typeof addByTwo and addByThree --> function function
```

It’s important to note that at the point of assignment, `addByTwo` and `addByThree` are _functions_.

This is great because it means that we invoke them! We can see this by hopping back into our console and testing it:

```javascript
console.log(addByTwo) //
// ƒ addBy(b) {
//    return a + b;
//  }
```

Specifically, they are the function `addBy` which takes a single parameter.

```javascript
addByTwo(3) // 5
addByThree(3) // 6
```

Okay, now let’s transition to function expressions and ES6 (for ease of comparison, I’m assuming we’re in a totally new global scope, so we won’t have any name collision issues or previously assigned `const` variables):

```javascript
const addOne = a => a + 1
const addNums = (a, b) => a + b
const addNumsCurried = a => b => a + b
```

Wait, what?

`AddNumsCurried` takes advantage of two syntactic sugar features that arrow functions provide:

1. If there is only one parameter, parentheses (`()`) are optional
2. If the return statement is only one line, there’s an implicit return and braces (`{}`) are not necessary

That means `addNumsCurried` could alternatively be written as:

```javascript
const addNumsCurriedAlt = (a) => {
  return (b) => {
    return { a + b }
  }
}
```

This looks pretty similar to how we had it with function declarations. That’s the point!

What if we take it one step further and use our new adding prowess to the elements of an array?

```javascript
const addOneToEachBasic = ar => ar.map(num => num + 1)
const addOneToEachCompartmentalized = ar => ar.map(num => addOne(num))
const addOneCurried = ar => ar.map(addOne)
```

Personally, the difference between `addOneToEachComparatmentalized` and `addOneCurried` is when the light bulb when off! I’d run into this issue a _ton_ with `.reduce` where I wanted to separate my reducer and define it separately, but I always ran into trouble!

It wasn’t until I saw these two side by side producing the same results that I got a better understanding of _what_ was happening.

Let’s throw in a wrinkle: Our array is full of numbers, but they can be represented as strings _or_ numbers (but always one or the other). To check we can use a ternary to check the type. We’ll assign the anonymous function to the variable `ensureNum`.

```javascript
// add type checking to make sure everything is a number
const ensureNum = val => (typeof val == 'string' ? Number(val) : val)
```

We want to do that _before_ we add:

```javascript
const addOneToEachWithType = ar => ar.map(ensureNum).map(num => num + 1)

const addOneToEachWithTypeAndCurry = ar => ar.map(ensureNum).map(addOne)
```

Last step: Let’s now say we want to not just add by one, but any number. We can use our same currying techniques from function declarations to write the function expression in the following way.

```javascript
const addByToEachWithType = (ar, by) =>
  ar.map(ensureNum).map(addNumsCurried(by))
```

H/t to Jacob Blakely and his great write up on [currying](http://codekirei.com/posts/currying-with-arrow-functions/) - which served as both the inspiration for this exercise and my guide.
