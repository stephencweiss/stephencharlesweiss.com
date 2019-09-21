---
title: 'Scroll Events And Invoking Lodash’s `_.throttle` Or `_.debounce`'
date: '2019-05-06'
category: ['programming']
tags: ['scroll event', 'lodash', 'throttle', 'debounce', 'performance']
---

Recently, I was working on a project where I wanted the scroll event to invoke a function that would affect other elements on the page. For performance reasons, however, I wanted to throttle the function calls so as to not kill performance with costly calculations on every scroll event.

Getting the throttling to actually occur proved to be a challenge. Instead, it was as if my function was being swallowed up and never firing at all. It turns out, it wasn’t — I’d forgotten to call it.

(Side note: I chose to throttle vs debounce because I didn’t want to wait until someone stopped scrolling and restarted before calling it again, but just ensure that I wasn’t calling it _too_ often.<sup>1, 2</sup>)

Initially, my throttling function looked something like this:

```javascript
import * as _ from 'lodash'

const throttledScroll = e => {
  const { target } = e
  const scrollTop = target.scrollTop
  const offset = target.offsetHeight
  const scrollHeight = target.scrollHeight
  _.throttle(scrollTop => {
    if (scrollHeight - top - offset === 0) {
      // do something every 500 ms
    } else {
      // or do something else
    }
  }, 500)
}
```

Adding this function to a DOM element to listen for a Scroll event emissions will not work. Or rather, it won’t work as expected. The `throttledScroll` function _will_ be called on every scroll event, but the something I’m expecting to happen will never happen.

I was pulling my hair out trying to figure out why for much longer than I care tot admit. In fact, it took stepping away from the computer and grabbing dinner for me to realize what I’d missed — I had defined a function, but I never _called_ it.

Notice that this is actually a function definition — I’m describing to Lodash what I’ll will want to be throttled when it receives a parameter `scrollTop`.

```javascript
_.throttle(scrollTop => {
  if (scrollHeight - scrollTop - offset === 0) {
    // do something every 500 ms
  } else {
    // or do something else
  }
}, 500)
```

I was blinded by my use of shadowing (the re-use of variable names) `scrollTop`. I had assumed I’d have access to the `scrollTop` defined above the `_.throttle` - which of course, was not the case.

Once I realized the problem, I saw two possible solutions:

1. Use an Immediately Invoked Function Expression (IIFE)
2. Use a generic function expression

# The IIFE Approach

Turning this functional expression into an IIFE is as easy as wrapping it in parenthesis and then invoking it with a trailing set of `()`. In our case, we put `scrollTop` in that trailing parenthesis, because that’s the variable we want to call the throttle with.

```javascript
_.throttle(top => {
  if (scrollHeight - top - offset === 0) {
    // do something every 500 ms
  } else {
    // or do something else
  }
}, 500)(scrollTop)
```

_Note_: I changed the signature to `top` to differentiate our variable `scrollTop` defined above and the variable that the `_.throttle` actually needs in its calculation.

# The Generic Approach

This is very similar, however, I’m assigning the function to a _new_ variable, this time, simply, `throttle`. On the next line, once it’s been assigned, I call it by passing in the variable `scrollTop`.

```javascript
const throttle = _.throttle(top => {
  if (scrollHeight - top - offset === 0) {
    // do something every 500 ms
  } else {
    // or do something else
  }
}, 500)
throttle(scrollTop)
```

# Conclusion

Since both of these are function expressions, there are no performance benefits either way as far as I know, so it’s a matter of preference. Ultimately, I went with the generic approach because I felt it was more readable.

The key point is that in order for the throttling to actually occur, I needed to invoke the function!

Live and learn. Hopefully this serves as a good reminder for things to check when my operations are behaving as expected.

## Footnotes

- <sup>1</sup> [Difference Between Throttling and Debouncing a Function | StackOverflow](https://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function)
- <sup>2</sup> [Visualize the difference between Throttle and Debounce | Nimius](http://demo.nimius.net/debounce_throttle/)
