---
title: 'Checking For Validity Of A Binary Search Tree: Depth First'
date: '2020-04-14'
publish: '2020-05-08'
category: ['programming']
tags: ['algorithms','binary search tree','dfs','depth-first search']
---

A Binary Search Tree is a pretty ingenious data structure. One simple rule can help organize data in such a way as to make it rapidly searchable. The rules of a Binary Search Tree are:
1. A node has no more than two child nodes
2. The left subtree of a node contains only nodes with keys **less than** the node's key.
3. The right subtree of a node contains only nodes with keys **greater than** the node's key.
4. Both the left and right subtrees must also be binary search trees.

## A Quick Aside: Searching Binary Search Trees
How rapidly can we search a Binary Search Tree?

When searching for a value, we can get one of three results:
- The node's value is our target value, i.e. we found what we're looking for
- The node's value is _greater than_ our target value
- The node's value is _less than_ our target value.

Each subsequent search (i.e. until we find our target) will only be concerned with half as much of the tree as its preceding search.

Take this tree for example:
```
               8
         /           \
      4               12
   /     \         /      \
  2       6       10       14
 /  \    /  \    /   \    /   \
1    3  5    7  9    11  13    15
```

And say we're searching for the value 7. Because it's a Binary Search Tree, we start with the root node, 8 in this case. 7 is less than 8, so we go to the left sub tree and repeat the process.

```
               x
         /           \
      4               x
   /     \         /      \
  2       6       x        x
 /  \    /  \    /   \    /   \
1    3  5    7  x    x  x     x
```

That's when everything's working correctly.

Ultimately, that means that searching for a value in a binary search tree takes `O(h)` time where `h` is the height of the tree. (If the tree is balanced, this is equivalent to `O(log(n)` time.)

What about the case when the Binary Search Tree _isn't_ properly built? What if it's not valid?

## Checking If A Binary Search Tree Is Valid
How might we confirm that a binary tree is a valid binary search tree? I.e. that it conforms to our rules above?

We might start by examining a single node at a time and making sure that its children, if it has them, conform to our rules.

Let's write a small helper function for this:

```javascript:title=childrenAreValid.js
function childrenAreValid(node) {
    const leftValid = node.left ? node.left.value < node.value : true
    const rightValid = node.right ? node.value < node.right.value : true
    return leftValid && rightValid
}
```

There are two primary ways to search a tree - depth-first (DFS) or breadth-first (BFS). In our case either will work. For simplicity, I'll start with an iterative BFS approach (using an Array as a queue):

```javascript:title=isValidBST.js
function isValidBST(node) {
    if (!node.left && !node.right) return true
    if (!childrenAreValid(node)) return false
    const queue = []
    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
    while (queue.length) {
        const currentNode = queue.shift()
        if (!childrenAreValid(currentNode)) return false
        currentNode.left && queue.push(currentNode.left)
        currentNode.right && queue.push(currentNode.right)
    }
    return true
}
```

This approach is making frequent use of the `&&` to short circuit calls that aren't necessary (for example, if a node doesn't have a left child, we don't try to enqueue a left child).

Other than that, it enqueues each child left to right, then processes them all until it's done.

If all of children have valid children themselves, then we determine that the tree itself is a valid Binary Search Tree.

Is that a _valid_ assumption?

What happens if we modify our tree above to the following?

```
               8
         /           \
      4               12
   /     \         /      \
  2       6       10       14
 /  \    /  \    /   \    /   \
1    3  5  *20* 9    11  13    15
```

If we passed this tree into our `isValidBST`, we'd return true, even though the node with a value of 20 is not less than 8, the root - violating our second rule of Binary Search Trees.

## Another Approach: Inspecting Nodes, Not Children
The problem with the above approach is that instead of determining if the node is valid within the context of a Binary Search Tree, it only inspects whether the immediate descendants are valid.

As I showed with the exceptionally large leaf node, this can prove problematic.

To account for this, we can change our perspective. Instead of trying to look _down_ the tree, what if we look _up_?

Each node needs to be within a bounded area. For example, inspecting the right side of our tree:

```
8
 \
  12
    \
     14
    /  \
  13    15
```
- `8`, our root, is between `-Infinity` and `+Infinity`
- `12` is between `8` and `+Infinity`
- `14` is between `12` and `+Infinity`
- `15` is between `14` and `+Infinity`
- `13` is when things get interesting. It is between `12` and `14`

How could we write that in code?

Well, first, we no longer care about whether the children are valid. We care if our node is a valid descendant. A valid descendant is one that is between a lower and upper bound. For example:

```javascript:title=isValidDescendant.js
function isValidDescendant(value, lowerBound, upperBound) {
    return lowerBound <= value && value <= upperBound
}
```

Because we're now looking _up_ the tree, I found a recursive approach easier for managing these bounds<sup>1</sup>:

```javascript:title=isValidBST-Updated.js
function isValidBST(node) {
    let isValid = true
    function evaluateNode(node, lowerBound, upperBound) {
        if (!isValidDescendant(node.value, lowerBound, upperBound)) {
            isValid = false
        }
        isValid && node.left && evaluateNode(node.left, lowerBound, node.value)
        isValid && node.right && evaluateNode(node.right, node.value, upperBound)
    }

    isValid && node.left && evaluateNode(node.left, Number.NEGATIVE_INFINITY, node.value)
    isValid && node.right && evaluateNode(node.right, node.value, Number.POSITIVE_INFINITY)
    return isValid
}
```

Let's see how this works with our

```
    8
  /
4
  \
   6
     \
      20
```

Comparing these nodes to their respective bounds:
- ✅ - `8`, our root, is between `-Infinity` and `+Infinity`
- ✅ - `4` is between `-Infinity` and `8`
- ✅ - `6` is between `4` and `8`
- ❌ - `20` is between `6` and `8`

Voila!

## Conclusion
When I first looked at evaluating the validity of a Binary Search Tree, I took a "top down" / greedy approach. I thought that if each node had valid children, the entire tree would be valid.

However, as shown by exploring edge cases, this turned out to be a faulty assumption. By inverting my perspective and looking _up_ I was able to resolve this issue and come away with a more robust solution. It does this all in an `O(n)` time (each node needs to be compared in order to confirm the _entire_ tree is valid) and `O(h)` space (since its recursive, our stack can get to be the size of the height of the tree at its largest).

