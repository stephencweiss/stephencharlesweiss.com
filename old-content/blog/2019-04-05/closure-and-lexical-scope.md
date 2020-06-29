---
title: 'Closure & Lexical Scope'
date: '2019-04-05'
category: ['programming']
tags: ['javascript', 'closure', 'lexical scope']
---

When we say that JS is lexically scoped, what we mean is that a function will have access to the variables in the context of which it was _defined_ not in which it is _called_ (as far as those details are relevant — which is a garbage collection optimization).

Let’s imagine that we want to create an incrementing function to track how many times we’ve called it.

This works… but only if we track num in global memory

```javascript
num = 0
function increment(num) {
    return num + 1
}
increment(num)
increment(num)
console.log(num) // 2;
```

What if we use closure concepts instead?

```javascript
function count() {
    let currentCount = 0
    let random = 'primed for garbage collection'
    function increment() {
        currentCount += 1
        console.log(currentCount)
        return currentCount
    }
    return increment
}
```

If I now assign the result of `count` to a variable name `currentPlace`, I will be able to log at any point, how many times I’ve be called.

Let’s walk through this: `const currentPlace = count()` .

When we evaluate count, what is returned? A function `increment`. Note that that function has _not_ been invoked.

If you were to look at _what_ `currentPlace` is then, you’d find that it is a function - but if you invoke it, you can get the the current place.

But wait - when we returned `count`, didn’t we _only_ return the function `increment`? Not quite. With it, Javascript stored the local environment in which `increment` was defined.

That means that even though `count` has been popped off the call stack, we can still access the `currentCount` via the scope of `increment` that Javascript maintains.

What does all this mean?

```javascript
const currentPlace = count()
currentPlace() // 1
currentPlace() // 2
currentPlace() // 3
```

https://www.youtube.com/watch?v=Q54Y2PM86X4&feature=youtu.be

Here’s a video of it in practice and debugging with Chrome Dev Tools

[Will Sentance](http://willsentance.com/), a founder of CodeSmiths, refers to a lexical scope as a function’s backpack (rather than the more colloquial "closure").

I like this for two reasons:

1. Closure is the process through which the lexical scope becomes relevant, but is rather imprecise in terms of the data we’re discussing
2. Since the lexical scope comes along with the function when it’s defined, it’s easy to think about it as strapped to the back.

That said - if you watch the clip, you’ll notice that Chrome refers to the scope as `Closure`, so it’s whatever works for you.

One last point: I’ve been taking Will’s course, [Javascript: The Hard Parts](https://frontendmasters.com/courses/javascript-hard-parts/), on FrontendMasters and I have to say I’ve been very impressed. In particular, his explanations on closure and higher order functions have been noteworthy in how much better they are than most I’ve seen.
