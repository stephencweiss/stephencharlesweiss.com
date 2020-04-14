---
title: 'Memoization: A Primer'
date: '2020-03-02'
publish: '2020-03-04'
category: ['programming']
tags:
  [
    'cs fundamentals',
    'complexity',
    'big o',
    'memoization',
    'dynamic programming',
    'recursion',
    'lru',
    'lfu',
  ]
---

## Preamble

I've been spending more time with them lately as a way to remind myself of some of the parts of programming I don't have a chance to interact with on a daily basis. As with most things, when I learn things, or want to remember them, I write them down.

I'll likely write a few all tagged with `CS Fundamentals` to make them easier to find.

Today's topic is memoization. In this post, we'll be looking at two classic problems to understand how to identify good candidates for a memoized approach. Later, we'll explore different memoization techniques to understand how they provide value.

## What Is Memoization?

Let's begin with a definition. From Wikipedia:

> In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again. Memoization has also been used in other contexts (and for purposes other than speed gains), such as in simple mutually recursive descent parsing.[1] Although related to caching, memoization refers to a specific case of this optimization, distinguishing it from forms of caching such as buffering or page replacement. In the context of some logic programming languages, memoization is also known as tabling.[2]

## When Is Memoization Useful?

So, to memoize is to remember. What are we remembering? When is it useful?

To memoize a function is to remember the output given a set of inputs. It's useful whenever we find ourselves doing the same calculation multiple times.<sup>[1](#footnotes)</sup><a id="fn1"></a>

It's an optimization strategy to reduce the time complexity ([described with Big O notation](https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/)) of an algorithm.

## Drawbacks Of Memoization

Memoization is the trade off of space for speed. When a computer "remembers" it does so by storing that value in memory.

At some point, that memory could grow unwieldly. Not discussed here is when or how to start cleaning up the cache though two common strategies are Least Recently Used (LRU) and Least Frequently Used (LFU). [This conversation on Stack Overflow provides a nice example of the differences between LRU and LFU](https://stackoverflow.com/a/29225598).

### Examples: Fibonacci And Factorials

For the rest of this post, we'll be exploring memoization by examining what is required to find the n<sup>th</sup> number in the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number) and calculating the n<sup>th</sup> [factorial](https://en.wikipedia.org/wiki/Factorial)

The Fibonacci sequence is defined as the value of the sum of the previous two numbers and the first two values in the sequence are 1. This can be written as:

```javascript:title=fibonacci.js
function fibonacci(num) {
  let previousLow = 1
  let previousHigh = 1

  for (let i = 2; i < num; i += 1) {
    const tempHigh = previousHigh
    previousHigh = previousHigh + previousLow
    previousLow = tempHigh
  }
  return previousHigh
}
```

Calculating a factorial is accomplished by multiplying all non-negative numbers less than or equal to the desired number.

```javascript:title=factorial.js
function factorial(num) {
  let result = 1
  while (num >= 0) {
    const value = num === 0 ? 1 : num // convention states that 0! is 1
    result *= value
    num -= 1
  }
  return result
}
```

These implementations actually have a lot going for them. They're fairly efficient (from a time complexity perspective, they're both O(n) and keep space requirements to a minimum by discarding past calculations).

Memoization, however, is a tactice of [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) - which, simply stated, is the practice of reducing a problem into sub-problems and solving them recursively.

Those sub-problems are: the sum of the two previous numbers for the Fibonacci sequence, and multiplying a number by one less than the number for factorials.<sup>[2](#footnotes)</sup><a id="fn2"></a>

Using Dynamic Programming, we can refactor these functions into their recrusive forms. That can look like the following:

```javascript:title=recursiveFibonacci.js
function fibonacci(num) {
  if (num === 0 || num === 1) return num
  return fibonacci(num - 1) + fibonacci(num - 2)
}
```

```javascript:title=recursiveFactorial.js
function factorial(num) {
  if (num === 0) return 1 // convention states that 0! is 1
  return num * factorial(num - 1)
}
```

In refactoring to a recursive solution, we traded simpler logic for potentially more function calls.

If we diagram the function calls to calculate the fifth number in the fibonacci sequence vs the fifth factorial, the differences will become apparent.

```shell:title=fifth-fibonacci
                                                    fibonacci(5)
                                       _____________/            \____________
                           fibonacci(4)                                       fibfibonacci(3)
                        __/            \__                                    /           \
            fibonacci(3)                  fibonacci(2)                 fibonacci(2)     fibonacci(1)
           /            \                  /         \                  /      \
    fibonacci(2)     fibonacci(1)   fibonacci(1)  fibonacci(0)  fibonacci(1)  fibonacci(0)
   /           \
fibonacci(1)   fibonacci(0)
```

Similaraly, calculating the fourth `factorial`, you might wind up with:

```shell:title=fifth-factorial
    factorial(5)
    /          \
   5            factorial(4)
               /          \
              4          factorial (3)
                        /          \
                       3          factorial (2)
                                 /          \
                                2          factorial (1)
                                          /          \
                                         1          factorial (0)
```

In calculating a fibonacci number, we make the same call multiple times.

| function | # of calls |
| -------- | ---------- |
| fib(5)   | 1          |
| fib(4)   | 1          |
| fib(3)   | 2          |
| fib(2)   | 3          |
| fib(1)   | 5          |
| fib(0)   | 3          |

Said another way, the time complexity of calculating a fibonacci number with this algorithm is exponential. Each additional step (approximately) _doubles_ the number of steps required to solve it. This would be written as O(2<sup>n</sup>) where `n` is the sequence we're seeking.<sup>[3](#footnotes)</sup><a id="fn3"></a>

Wouldn't it be nice if we could _remember_ the value of `fib(1)` so that we don't have to make the call again? Or even better, once we solve `fib(3)`, we could eliminate an entire branch of the call tree!

That's what memoization can offer. We'll get to this in a moment.

What about factorial? We don't have that same repetition and the time complexity reflects that too. It continues to grows _linearlly_ with the number we're seeking to calculate. That is, it's still O(n).

The value of memoization here won't be reducing calls the _first_ time, but _subsequent_ calls. Imagine calling `factorial(3)` or `factorial(6)` next? If the computer remembered its previous calculations, it could immediately retrieve the answer for `factorial(3)` (which was needed to calculate `factorial(5)`) and `factorial(6)` would be reduced to `6 * factorial(5)` (where it can look up `factorial(5)` immediately too).

Now that we've seen examples of refactoring a problem into a recursive solution and identified areas where momoization might be useful, let's talk about strategies!

## Strategies For Memoization

Practically, to memoize a function means that each time a calculation is performed, its result is stored in a persistent state that future calls can access. Let's call that state a cache.

We have options when it comes to creating the cache. Two we'll look at are:

1. Refactor to create a cache and an internal function for calculating as necessary
2. Use a generalized memoization function which creates a closure with a cache present

The problem itself can provide a suggestion about the appropriate approach, but both take advantage of storing previously calculated results in a cache.

### Aside On Cache Implementation

How you implement the cache is up to you, though its helpful to consider the characteristics of different data structures for picking. For example, dictionaries is a great choice because of the ability to look up values in constant time (as opposed to a list where you might have to iterate over each item).<sup>[4](#footnotes)</sup><a id="fn4"></a>

### Internal Recursion With Cache

By internal recursion, I mean create a new function that can be accessed by our `fibonacci` function. This "internal" function holds all of the recursive logic, but the signature is modified to receive a cache that we define in our enclosing function.

This would be useful in the case of the Fibonacci sequence where our recursive approach created multiple redundant calls. It might look like ([interactive repl here](https://repl.it/@stephencweiss/memoizedFib)):

```javascript:title=cachedFibonnaci.js
function fibonacci(num) {
  const cache = {}
  return calculateFibonacci(num, cache)
}

function calculateFibonacci(num, cache) {
  if (!cache[num]) {
    if (num === 0 || num === 1) {
      cache[num] = num
    } else {
      cache[num] =
        calculateFibonacci(num - 1, cache) + calculateFibonacci(num - 2, cache)
    }
  }
  return cache[num]
}
```

By creating the cache and passing it along to the new `calculateFibonacci` function, we can add a check _first_ on the cache. If it's present, we can skip right along to return the value.

Notice, however, that this provides no benefit for `factorial` because there's no redundancy in the calls. We'll need a different approach to gain benefits for that. Let's look at that now.

### Generalized Memoization Function

If the situation is such that we'll be making the same computationally expensive call over and over, another opportunity is to memoize the results of the call itself so that if you see it again, the computer won't need to crunch through it over and over.

```javascript:title=generalMemo.js
function memoization(fn) {
  const cache = {}
  return (...args) => {
    const key = [...args]
    if (!cache[key]) {
      cache[key] = fn(...args)
    }
    return cache[key]
  }
}
```

It's worth noting that this solution only helps us with the case where we're calling the _same_ function over and over.

For example. If we tweaked the factorial function to print each time it's called, like so:

```javascript:title=fibonacci.js
function factorial(num) {
  console.log(`factorial called with -->`, num)
  if (num === 0) return 1 // convention states that 0! is 1
  return num * factorial(num - 1)
}
```

And then calling it multiple times, such as:

```javascript
console.log(memoizedFactorial(5))
console.log(memoizedFactorial(6))
console.log(memoizedFactorial(3))
console.log(memoizedFactorial(5))
```

We'd see a series of calls for each invocation _except_ the final `memoizedFactorial` because we will have already stored the call of `factorial` with the argument(s) of `5` in the cache:

```javascript
// factorial called with --> 5
// factorial called with --> 4
// factorial called with --> 3
// factorial called with --> 2
// factorial called with --> 1
// factorial called with --> 0
// 120
// factorial called with --> 6
// factorial called with --> 5
// factorial called with --> 4
// factorial called with --> 3
// factorial called with --> 2
// factorial called with --> 1
// factorial called with --> 0
// 720
// factorial called with --> 3
// factorial called with --> 2
// factorial called with --> 1
// factorial called with --> 0
// 6
// 120
```

[Here's a repl if you'd like to play with it for yourself.](https://repl.it/@stephencweiss/generalMemoFactorial) Included in the repl is [Lodash's `memoize` function](https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L10540), which you'll see performs similarly, though, unsurprisingly, includes additional features and optimizations - more on these in the advanced usage section.<sup>[5](#footnotes)</sup><a id="fn5"></a>

### Combined Approach

These two approaches (the internal and the general) can be combined to create even greater savings, though it requires a slightly more bespoke approach.

Because the cache is generated _outside_ of the scope of the target function, we'll need to pass it in as an argument. And then we'll need to continue to forward it along all the way down.

Our generalized memoization function looks very similar to our previous one, though we're now passing along the cache into the bound function:<sup>[6](#footnotes)</sup><a id="fn6"></a>

```javascript:title=es5GeneralMemo.js
function memoize(fn) {
  const cache = {}
  return function() {
    const key = [...arguments]
    if (cache[key]) {
      return cache[key]
    } else {
      const val = fn.apply(this, [...arguments, cache])
      cache[key] = val
      return val
    }
  }
}
```

This allows us to memoize the internal calls and store them in the same cache - similarly to how we memoized the Fibonacci sequence earlier:

```javascript:title=cachedFactorial.js
function factorial(num, cache) {
  if (num === 0) cache[num] = 1 // convention states that 0! is 1
  if (!cache[num]) {
    cache[num] = num * factorial(num - 1, cache)
  }
  return cache[num]
}
```

Now, each call - both the initial call and every recursive invocation will be stored in the cache on its first appearance. ([repl for live testing](https://repl.it/@stephencweiss/memoizedFactorial).)

## Advanced Usage: Multiple Arguments

One potential trip up when it comes to memoization can occur when the function takes multiple arguments. Our generalized memoization solution actually handles this case, but our internal one doesn't.

Can you spot the difference?

It's how the keys are generated.

Imagine we weren't memoizing `factorial`, but `add`, where add is defined as:

```javascript:title=add.js
function add = (a,b) => a + b;
```

In this case, we can't just write:

```javascript:title=poorlyCachedAdd.js
function add = (a,b) => {
  if (!cache[a]) {
    cache[a] = a + b
  }
  return cache[a]
}
```

What happens when `b` changes but `a` stays the same? We'd retrieve the wrong result from the cache!

There are any number of ways to create a key, the only rule is that it needs to be unique to the given arguments of the function. If you're dealing with strings, numbers, etc. (i.e., [Primitive data types in Javascript](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) _other than a Symbol_), you might create a concatenated string:

```javascript:title=cachedAdd.js
function add = (a,b) => {
  const key = [a,b].join('-')
  if (!cache[key]) {
    cache[key] = a + b
  }
  return cache[key]
}
```

If the data types include objects, or arrays, however, you might need a more custom resolver to create the key.<sup>[5](#footnotes)</sup>

## Conclusion

That wraps up this primer on memoization. Hopefully you found it useful and learned a thing or two. If anything wasn't clear (or worse, I am mistaken on any detail) - please let me know!

## Resources

- [Memoization: Make Recursive Algorithms Efficient | DZone](https://dzone.com/articles/memoization-make-recursive-algorithms-efficient)
- [JavaScript Function Memoization | In Lehman's Terms](http://inlehmansterms.net/2015/03/01/javascript-memoization/)
- [What's the Difference Between Recursion, Memoization, and Dynamic Programming? | StackOverflow](https://stackoverflow.com/questions/12133754/whats-the-difference-between-recursion-memoization-dynamic-programming)
- [What's the Difference Between Bottom Up and Top Down? | StackOverflow](https://stackoverflow.com/questions/6164629/what-is-the-difference-between-bottom-up-and-top-down)
- [Is there a difference between top down and bottom up dynamic programming? | StackExchange](https://cs.stackexchange.com/questions/2644/is-there-a-difference-between-top-down-and-bottom-up-dynamic-programming)

## Footnotes

- <sup>[1](#fn1)</sup> This type of solution in which a larger problem is broken down into smaller pieces is called Dynamic Programming. Memoization is one tactic used to improve the performance of a solution using dynamic programming.
- <sup>[2](#fn2)</sup> Both of these sequences also have base cases which are important and which we'll get to in a moment.
- <sup>[3](#fn3)</sup> [A more precise Big O calculation would actually be O(1.6<sup>n</sup>)](https://stackoverflow.com/a/360773)
- <sup>[4](#fn4)</sup> A POJO (plain-old Javascript object) is an easily accessible implementation of a Dictionary with constant time lookup. For an implementation that's likely closer to other languages, look into [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which has the benefit of:
  1. being iterable,
  2. having guaranteed key order,
  3. built in getters/setters,
  4. can handle keys of any value (not just Strings or Symbols).
- <sup>[5](#fn5)</sup> In reviewing the Lodash implementation of memoize, I was most impressed by how [John-David Dalton](https://github.com/jdalton) and the community addressed the issue of multiple arguments with an optional second argument of a custom resolver. The documentation didn't offer an example of how it might be used, but fortunately [Justin Noel](https://justinnoel.dev/) already wrote a post detailing it [how to use a custom resolver with Lodash's memoize](https://justinnoel.dev/2019/06/06/lodash-memoize-with-a-resolver/). The crux is:

```javascript
const _ = require('lodash')
const add = (a, b) => a + b
const memoizedAdd = _.memoize(add, (...args) => args.join('-'))
```

The resolver creates a unique key for each combination of arguments (a and b in this case) by joining them together with a `-`.

- <sup>[6](#fn6)</sup> For demonstration purposes, this time I refactored slightly to use an anonymous function definition instead of an anonymous arrow function. Two differences emerge:
  1. Function definitions have an arguments array which can be used to collect any arguments passed to a function. Function declarations do not have this, however they have the rest operator, which is why we used `...args` in the previous example.
  2. We need to bind the context when using the function definition. This is because context of `this` is set at invocation for function definitions, whereas it's set at definition for arrow functions. The `.apply` in this example binds it to the context in which it's defined so that later, when it's invoked, it will still have access to the cache.
