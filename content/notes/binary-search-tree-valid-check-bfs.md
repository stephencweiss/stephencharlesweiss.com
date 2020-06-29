---
title: 'Checking For Validity Of A Binary Search Tree: Breadth First'
date: '2020-04-14'
publish: '2020-05-09'
category: ['programming']
tags: ['algorithms', 'binary search tree', 'bfs', 'breadth-first search']
---

Yesterday, I wrote about determining whether a [Binary Search Tree was valid using a depth-first approach](binary-search-tree-valid-check-dfs). I made an off-hand comment about how I found it challenging to keep track of the appropriate bounds.

I spent some time afterwards figuring out _why_ I'd missed the breadth-first approach. Fundamentally, it's easier for me to envision calling a function with the arguments I need to ascertain the result. Those arguments are then locked within the function's scope.

Sure, Javascript allows you to reach outside (which I took advantage of for setting the `isValid` variable -- though it wasn't strictly necessary because I returned immediately), but for the most part, when I write functions, I try to make sure that I have all of the information I need.

Breadth first searches necessitate the _same_ preparation, but demand you go about it in a different way.

Okay, that's a mouthful, what do I mean? I mean that instead of getting a nice clean scope by adding a new function on the stack, we need to store the entire context within the queue!

This is the step I always mess up / don't see the first time: you can store more than one thing in the queue!

```javascript:title=isValidBST-DFS.js
function isValidBST(node) {
    const queue = []
    //highlight-start
    queue.push({
        node,
        lowerBound: Number.NEGATIVE_INFINITY,
        upperBound: Number.POSITIVE_INFINITY,
    })
    //highlight-end
    while (queue.length) {
        const { node, upperBound, lowerBound } = queue.shift()
        if (!isValidDescendant(node.value, lowerBound, upperBound)) {
            return false
        }
        node.left &&
            queue.push({ node: node.left, lowerBound, upperBound: node.value })
        node.right &&
            queue.push({ node: node.right, lowerBound: node.value, upperBound })
    }
    return true
}
```

By storing a node alongside _its_ upper and lower bound, I create the equivalent of a function's scope. When dequeuing the node, I also bring out its bounds - with which I can evaluate whether it's a valid descendant. If it's not, its easy to return early!

## Conclusion

I fluctuate between finding depth first or breadth first searches more intuitive. "Discovering" that the queue can store much more than just one value by wrapping up the details in a nice little package like this plain-old Javascript object makes Breadth First searches really attractive and malleable.

They already had the advantage of avoiding stack overflows since they don't require putting new functions on the call stack. Now, I can make use of them in much more dynamic scenarios!
