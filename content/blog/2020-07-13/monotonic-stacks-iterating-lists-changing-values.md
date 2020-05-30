---
title: 'Monotonic Stacks And Iterating Lists Of Changing Values'
date: '2020-05-30'
publish: '2020-07-13'
category: ['programming']
tags:
    [
        'arrays',
        'leetcode',
        'data structures',
        'algorithms',
        'histograms',
        'optimization',
        'big o notation',
        'time complexity',
        'iterables',
        'cs fundamentals',
    ]
---

When trying to determine the trend in a set of data, there are a number of different solutions that can work.

A naive approach often evaluates two loops. This can work with smaller data sets, but can quickly become unwieldy as things grow ("[Everything is fast For Small n](https://blog.codinghorror.com/everything-is-fast-for-small-n/)").

Sometimes, we can be greedy and use the [sliding window technique](../../2020-03-12/sliding-window-technique) -- this is particularly good if we're interested in evaluating subranges.

Another approach is the monotonic stack. In mathematics, [monotonic is defined as](https://www.lexico.com/en/definition/monotonic) "(of a function or quantity) varying in such a way that it either never decreases or never increases."

Imagine a histogram representing some data.

```title=histogram.txt
    x
    x x
    x x
    x x   x
x   x x x x
x x x x x x
-----------
2 1 6 5 2 3 - height
0 1 2 3 4 5 - position
```

We'll represent our heights as a list, `heights = [2,1,6,5,2,3]`.

If we want to find the largest _area_ under the curve in a rectangle, how might we do that?

Let's start with the brute-force approach to get a baseline:

```javascript:title=largestRectangleArea.js
var largestRectangleArea = function(heights) {
    let maxVal = 0
    for (let i = 0; i < heights.length; i += 1) {
        for (let j = i; j < heights.length; j += 1) {
            const width = j - i + 1
            const minHeight = Math.min(...heights.slice(i, j + 1))
            maxVal = Math.max(width * minHeight, maxVal)
        }
    }
    return maxVal
}
```

This works, but our dual loops are a giveaway that we're dealing with a time complexity of O(n<sup>2</sup>).

What about a sliding window? Well, it _can_ work, but what are our windows? Well, any change in direction should reset it! That sounds a bit monotonic! The twist is in _how_ we evaluate each window.

Let's see if we can't reason through this. The first thing to do is split up our histogram into monotonic lists:

```title=histogram.txt
    |   x | x     |
    |   x | x x   |
    |   x | x x   |
    |   x | x x   |   x
x   |   x | x x x | x x
x x | x x | x x x | x x
--- | ----| - ----| ---
2 1 | 1 6 | 6 5 2 | 2 3 - height
0 1 | 1 2 | 2 3 4 | 4 5 - position
```

So, in this case our windows are everywhere we change direction. Taking this approach, we can get pretty far, but we'll run into some edge cases where directions change that can throw the whole thing off. For example, let's start by finding direction changes:

```javascript:title=changeDirection.js
function changeDirection(currentIndex, list) {
    const previous = list[currentIndex - 1]
    const next = list[currentIndex + 1]
    const current = list[currentIndex]
    if (isNaN(previous) || isNaN(next)) return false
    return (
        current < Math.min(previous, next) || current > Math.max(previous, next)
    )
}
```

This is really nice for creating the monotonic "windows":

```javascript:title=createMonotonicWindows.js
function createMonotonicWindows(list) {
    const res = []
    let current = []
    let index = 0

    while (index < list.length) {
        current.push(index)
        if (current.length > 0 && changeDirection(index, list)) {
            res.push(current)
            current = [current[current.length - 1]]
        }
        index += 1
    }
    current.length > 0 && res.push(current)
    return res
}
```

Once we have these windows, we can start processing them one at a time

```javascript:title=findLargestRectangle.js
function largestRectangleArea(list) {
    if (!list.length) return 0
    const windows = createMonotonicWindows(list)
    let globalMax = 0
    let globalMin = Math.min(...list)
    globalMax = Math.max(globalMax, globalMin * list.length)
    windows.forEach(
        window =>
            (globalMax = Math.max(globalMax, findLocalMax({ window, list })))
    )
    return globalMax
}
```

Where a local max is calculated as:

```javascript:title=findLocalMax.js
function findLocalMax({ window, list }) {
    let localMax = 0
    if (list[window[0]] < list[window[window.length - 1]]) {
        // incrementing windows
        let index = window[0]
        const end = window[window.length - 1]
        while (index <= end) {
            const height = list[index]
            const width = !!(end - index) ? end - index + 1 : 1
            localMax = Math.max(localMax, width * height)
            index += 1
        }
    } else {
        // decreasing windows
        while (window.length > 0) {
            let top = window.pop()
            const height = list[top]
            const width = window.length + 1
            localMax = Math.max(localMax, width * height)
        }
    }
    return localMax
}
```

What we can already see is that the logic is split between whether or not the window's increasing or decreasing (a little odd) and things would be alright, if we didn't have situations where a change of direction was _actually_ the largest are -- for example:

```title=histogram.txt
          x
x         x
x     x   x
x x   + + +
x x   + + +
-----------
4 2 0 3 2 5 - height
0 1 2 3 4 5 - position
```

Okay - so pre-creating the windows is trickier than expected, but the intuition is there -- only look at trends going in the same direction.

What if we used a stack instead of the windows? Each If current value is greater than or equal to the top of stack, we could push it to the stack. If it's less than we would pop items off the stack until it _was_ greater than the top.

With psuedo code first (with a known bug, I'll get to that in a second):

```
// establish a stack, max, and index
// while there are items remaining in a list
  // if the stack is empty _or_ the top of the stack is less than the current val
		// push the current val to the stack
		// increment the index and continue
  // else we need to pop things off _until_ the above condition is true
		// when we pop off a value from the stack, use it to calculate an area and store the largest in the max
```

Toward the end there, I kind of waved my hands and said we'd be able to calculate an area, but _how_? Well, here's the insight that it took me a long while to understand: the stack stores _indices_ not values. This is important for understanding the current width of an area. Slight refinement of the logic before getting into the code:

```
// establish a stack, max, and index
// while there are items remaining in a list
  // if the stack is empty _or_ the top of the stack is less than the current val
		// push the current _index_ to the stack
		// increment the index and continue
  // else
		// take the top off the stack
		// look up the value in the list based on the top's value (which is an index)
		// the width is the difference between our index and last value remaining in the stack (minus an additional one) _or_ if the stack is empty, it means we're about to reach a new low, a nadir. so, using the current index as the width - we see the long, low rectangle to that point
		// repeat this process until the stack is empty or the next value is greater than that indicated by the index value at the top of the stack
```

Putting this into code, might look like:

```javascript:title=largestRectangle.js
var largestRectangleArea = function(heights) {
    let stack = [] // tracks _indices_
    let max = 0
    let index = 0
    while (index < heights.length) {
        const current = heights[index]
        const stackPeekVal = heights[stack[stack.length - 1]] // if the stack is empty, stackPeekVal is undefined
        if (stack.length == 0 || stackPeekVal <= current) {
            stack.push(index)
            index += 1
        } else {
            const top = stack.pop()
            const height = heights[top]
            const width = stack.length
                ? index - stack[stack.length - 1] - 1
                : index
            const area = height * width
            max = Math.max(max, area)
        }
    }
    return max
}
```

There's another bug here though. What if the stack _never_ decreases? Current will always be larger than our `stackPeekVal` and we'll just return 0 with a lot of unprocessed values in our stack!

One way to fix that is to do a check at the end to ensure that our stack is empty before returning, and if it's not, process it on the way down. For example:

```javascript:title=largestRectangle.js
var largestRectangle = function(heights) {
    //...
    while (stack.length) {
        const top = stack.pop()
        const height = heights[top]
        const width = stack.length ? index - stack[stack.length - 1] - 1 : index
        const area = height * width
        max = Math.max(max, area)
    }
    return max
}
```

Given the repetition, we can clean this up and add in a few checks for a final solution:

```javascript
var largestRectangleArea = function(heights) {
    if (!heights || !heights.length) return 0
    let stack = [] // tracks _indices_
    let max = 0
    let index = 0
    while (index < heights.length) {
        const current = heights[index]
        const stackPeekVal = heights[stack[stack.length - 1]] // if the stack is empty, stackPeekVal is undefined
        if (stack.length == 0 || stackPeekVal <= current) {
            // increase the index on the way _up_, a consequence of this, however, is that the index is one place ahead
            stack.push(index)
            index += 1
        } else {
            const top = stack.pop()
            const area = calculateArea({ stack, top, heights, index })
            max = Math.max(max, area)
        }
    }
    while (stack.length) {
        const top = stack.pop()
        const area = calculateArea({ stack, top, heights, index })
        max = Math.max(max, area)
    }
    return max
}

function calculateArea({ stack, top, heights, index }) {
    const height = heights[top]
    const width = stack.length ? index - stack[stack.length - 1] - 1 : index
    return height * width
}
```

## Wrap Up

Using a monotonic stack is a great way to keep track of the distance between elements for comparisons.

In our case it was to calculate the maximum area of a rectangle, but it can also be used for finding the "next largest number" (or a variant) such Labula Dong discussed with [heights](https://labuladong.gitbook.io/algo-en/ii.-data-structure/monotonicstack) or as Akhil wrote about on Dev.to [daily temperatures](https://dev.to/akhilpokle/daily-temperature-and-monotonic-stack-2223).

## Footnotes

-   <sup>1</sup>
