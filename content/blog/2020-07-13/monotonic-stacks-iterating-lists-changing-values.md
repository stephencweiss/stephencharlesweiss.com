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
// Establish a stack, max, and index
// While there are items remaining in a list
  // If the stack is empty _or_ the top of the stack is less than the current val
        // Push the current val to the stack
        // Increment the index and continue
  // Else we need to pop things off _until_ the above condition is true
        // When we pop off a value from the stack, use it to calculate an area and store the largest in the max
```

Toward the end there, I kind of waved my hands and said we'd be able to calculate an area, but _how_? Well, here's the insight that it took me a long while to understand: the stack stores _indices_ not values. This is important for understanding the current width of an area. Slight refinement of the logic before getting into the code:

```
// Establish a stack, max, and index
// While there are items remaining in a list
    // If the stack is empty _or_ the top of the stack is less than the current val
        // Push the current _index_ to the stack
        // Increment the index and continue
    // Else
        // Take the top off the stack
        // Look up the value in the list based on the top's value (which is an index)
        // The width is the difference between our index and last value remaining in the stack (minus an additional one because we want to exclude this position) _or_ if the stack is empty, it means we're about to reach a new low, a nadir. Using the current index as the width - we see the long, low rectangle to that point
        // Repeat this process until the stack is empty or the next value is greater than that indicated by the index value at the top of the stack
```

The intuition here took me a while to understand, but once it hit, it was like a lightning bolt. In this problem, we only care about rectangles that we can create - which means that if the heights continue to increase, we _cannot_ create a rectangle looking backwards (our current height is _above_ the previous peak), so we need to wait until there's a decline to evaluate the area. Further more, once we find a height, we know that the width is based on our current position (which is less than the top) _and_ the previous position in the stack which is necessarily lower.

Let's look at a contrived example in some detail.

```title=histogram.txt
        x
        x x   x
    x   x x x x
    x   x x x x
    x   x x x x
  x x x x x x x
x x x x x x x x   x
-------------------
1 2 5 2 7 6 5 6 0 1 - height
0 1 2 3 4 5 6 7 8 9 - position
```

Jumping ahead to our first descent (position 3), our stack is `[0,1,2]`. Since we're descending, we know we can find a rectangle's area. Our height is the height we saw at the top of the stack (at position 2 our height is 5) by a width of 1. The width is found by the space between our current position (3) less the _new_ top of the stack - we popped position two off the stack to get its height - position 1, minus 1. The extra minus one accounts for the fact that the position on the top of the stack is _below_ our current height and so should be excluded. So, we find an area of 5x1.

Now that position 2 is no longer on the stack, we compare position 3's height (2) to the top of the stack (position 1), and note that it's not less, so we add position 3 to the stack, now `[0,1,3]`, and move on. (notice that we have not looked at the 2x2 or 2x3 rectangles available between positions 1 and 3. we _never_ will. This is because by definition, if the next value is _larger_ than position 3, we will ultimately be able to find an even larger rectangle -- this is the _key_ to the monotonic stack.)

On the note of _when_ we will actually look at the 2x7 rectangle formed between positions 1 and 7, which is the _largest_ of the 2x rectangles: it will be at position 8, the nadir, when we pop _everything_ off the stack. Before we get there though, let's look at our _largest_ rectangle (which is also found when we get to position 8).

When we first arrive at position 8, we have a stack of `[0,1,3,6,7]`. Position 8's height, 0, is clearly less than that of position 7 (6), so we find the area available (6x1) and pop position 7 off the stack (now `[0,1,3,6]`). Still at position 8, the next comparison is with position 6, the actual peak of our largest rectangle (which we can tell by visually inspecting the diagram).

Our height is defined by the height at position 6 (5). Our width is the difference of the _new_ top of the stack (3) from our current position (8), less one (4). This gives us a total of 20.

We continue along like this, popping off the remaining elements in our stack (3, 1, and 0 respectively) until we have an empty stack. Once we get there, we're able to add pieces back to the stack, beginning with position 8 (height 0).

We end with a stack of `[8,9]`.

Putting this into code, might look like:

```javascript:title=largestRectangle.js
var largestRectangleArea = function(heights) {
    let stack = [] // tracks _indices_
    let max = 0
    let currentPosition = 0
    while (currentPosition < heights.length) {
        const currentHeight = heights[currentPosition]
        const stackPeekHeight = heights[stack[stack.length - 1]] // if the stack is empty, stackPeekHeight is undefined
        if (stack.length == 0 || stackPeekHeight <= currentHeight) {
            stack.push(currentPosition)
            currentPosition += 1
        } else {
            const top = stack.pop()
            const height = heights[top]
            const width = stack.length
                ? currentPosition - stack[stack.length - 1] - 1
                : currentPosition
            const area = height * width
            max = Math.max(max, area)
        }
    }
    return max
}
```

Note that we don't _want_ any remaining values in our stack. In fact, while we got away with it in the above example, it could lead to wrong answers. For example, what if the stack _never_ decreases? The current position will always be larger than our `stackPeekHeight` and we'll just return 0 with a lot of unprocessed values in our stack!

One way to fix that is to do a check at the end to ensure that our stack is empty before returning, and if it's not, process it on the way down. For example:

```javascript:title=largestRectangle.js
var largestRectangle = function(heights) {
    //...
    while (stack.length) {
        const top = stack.pop()
        const height = heights[top]
        const width = stack.length
            ? currentPosition - stack[stack.length - 1] - 1
            : currentPosition
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
    let currentPosition = 0
    while (currentPosition < heights.length) {
        const currentHeight = heights[currentPosition]
        const stackPeekHeight = heights[stack[stack.length - 1]] // if the stack is empty, stackPeekHeight is undefined
        if (stack.length == 0 || stackPeekHeight <= currentHeight) {
            stack.push(currentPosition)
            currentPosition += 1
        } else {
            const top = stack.pop()
            const area = calculateArea({ stack, top, heights, currentPosition })
            max = Math.max(max, area)
        }
    }
    while (stack.length) {
        const top = stack.pop()
        const area = calculateArea({ stack, top, heights, currentPosition })
        max = Math.max(max, area)
    }
    return max
}

function calculateArea({ stack, top, heights, currentPosition }) {
    const height = heights[top]
    const width = stack.length
        ? currentPosition - stack[stack.length - 1] - 1
        : currentPosition
    return height * width
}
```

## Wrap Up

Using a monotonic stack is a great way to keep track of the distance between elements for comparisons. Typically these are used to find the next neighbor that meets a condition. In our case, it was the next neighbor who was less than our current height (on the way up). When we got there, we found the area.

Some other examples from around the internet that I found helpful in understanding these stacks include Labula Dong's discussion on [heights](https://labuladong.gitbook.io/algo-en/ii.-data-structure/monotonicstack) and Akhil's Dev.to post on [daily temperatures](https://dev.to/akhilpokle/daily-temperature-and-monotonic-stack-2223).
