---
title: 'Sliding Window Technique'
date: '2020-02-22'
publish: '2020-03-11'
category: ['programming']
tags:
    [
        'algorithms',
        'optimization',
        'big o notation',
        'time complexity',
        'iterables',
        'cs fundamentals',
    ]
---

## What Is The Sliding Window Technique?

The sliding window technique refers to a way to solve a problem using dynamic programming. Specifically, the sliding window technique is useful in particular situations.

[According to this walkthrough on the approach](https://medium.com/outco/how-to-solve-sliding-window-problems-28d67601a66), good candidates for the sliding window approach can be identified due to:

1. The use of iterable data structures (e.g., arrays, strings, lists, etc.)
2. The problem evaluates a subrange for a longest, shortest, target value (e.g., the longest sequence of continuous values, or the maximum sum of a subrange)
3. There is an apparent (and sub-optimal) brute force approach that would require O(n<sup>2</sup>) or O(2n) complexity.

## Visualizing The Window

I found the [top answer](https://stackoverflow.com/a/8269948) to the StackOverflow question, [What is Sliding Window Algorithm? Examples](https://stackoverflow.com/questions/8269916/what-is-sliding-window-algorithm-examples#8269948), to provide a really nice visualization of the sliding window.

> Given an array
>
> ```
> [a b c d e f g h]
> ```
>
> a sliding window of size 3 would run over it like
>
> ```
> [a b c]
>   [b c d]
>     [c d e]
>       [d e f]
>         [e f g]
>          [f g h]
> ```
>
> This is useful if you for instance want to compute a running average, or if you want to create a set of all adjacent pairs etc.

Regardless of what you're looking for - the longest sequence, the target value, etc., seeing the window(s) in this way makes it clear how you can go from building extra arrays into a single pass over the array to find the sought value.

## Using The Sliding Window

To help solidify this practice, I played around with one of the quintessential examples of the Sliding Window in this [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) (it's right there in the name) problem on LeetCode. (The [walkthrough](https://medium.com/outco/how-to-solve-sliding-window-problems-28d67601a66) reference above included a number of example toy problems to try) My solution is on [Github](https://github.com/stephencweiss/code-katas/blob/master/src/32-minimum-window-substring/minimumWindowSubstring.js).

I was timing myself with this solution, so I know there's plenty of room for refactoring. One area that I would go back to first is improving how the windows are created.

The current approach increments the starting index by one, but it could be done much more efficiently if I tracked the index of the first "match". Then, I could jump to that position as the first starting point for the next window. While this wouldn't result in the same type of savings as using the sliding window in the first place, it could be really useful - particularly as the string gets longer.

## Conclusion

As is so often the case with algorithmic enhancements, half of the battle is knowing that the solution exists. I had never heard of the sliding window technique before today, but now I have a new strategy for optimizing a whole new class of problems.
