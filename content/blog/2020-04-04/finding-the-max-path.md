---
title: 'Recursion: Finding The Max Path'
date: '2020-03-17'
publish: '2020-04-04'
category: ['programming']
tags: ['recursion', 'algorithms']
---

Continuing my toy problem practice, today I worked on a path finding problem.

Given a two-dimensional board of integers, find the _largest_ path comprised of four adjacent squares (without repetition).

For example, take a three-by-three board of incrementing integers:

```
[
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]
]
```

The largest value for a board like this one will be `9874`

I suggest trying it yourself before reading my approach below.

Overall, my approach could be described as:

1. For each position in the board
2. Find the valid paths of that position
3. Sort the valid paths according to size and select the largest only
4. Compare that path against the largest, and if larger, reset the value to reflect the newly found largest path.

The hardest part for me was determining _which_ paths were valid. The problem was two fold:

1. Preventing my algorithm from visiting the same position twice
2. Correctly storing and organizing the valid paths

Admittedly, the latter problem was much easier _once_ I was generating valid paths.

## Visiting Twice

The first few attempts resulted in solutions like `9898` (given the above example).

In a way, this is just smart. The algorithm was greedy and finding the largest neighbor at each position.

Unfortunately, it violated the conditions of the question stem which wanted a _path_ - that is four unique positions.

So, I needed to find a way to track where I’d been. Or, rather, that’s what I thought and it’s the rabbit hole I went down until I realized there was a special bit of information provided in the question stem.

Following this trail, I started by creating a completely new `shadowBoard` for each path. The `shadowBoard` was the same dimensions as the board, but was filled only with `0`s. When I “visited” a square, I would toggle it and so I could use that to determine if a move was valid.

The issue I had with this approach was that I was pursuing a recursive strategy for each move. This meant that if I was on the `5` (again in the example above), I had four valid moves:

```
    2
    ↑
4 ← 5 → 6
    ↓
    8
```

But each of those moves needed to have an independent `shadowBoard` so that moves from other paths didn’t interfere with the evaluation and that proved problematic given how I was creating it.

I explored other options as well to track my visited positions. One approach I thought of was a hash table. For example, representing the path of 0 -> 1 -> 5, I could have:

```
const visited = {
  0: [0, 1]
  1: [1]
}
```

Again, though, the space requirements felt _wrong_.

That’s when I noticed something special about the question. We only wanted paths of 4.

As a result, as long as we didn’t turn right around and go back to where we came from - there wouldn’t be enough _time_ to make a circle.

This meant I could determine a valid move just by comparing my previous move with the proposed one:

```javascript
function isValidMove(previousMove, proposedMove) {
    return oppositeMoves[previousMove] !== proposedMove
}
const oppositeMoves = {
    LEFT: ‘RIGHT’,
    RIGHT: ‘LEFT’,
    UP: ‘DOWN’,
    DOWN: ‘UP’,
}
```

## Comparing Valid Paths

Once I’d solved the issue of returning to a previously visited position, I was ready to start finding the valid path for a given position.

Instead of trying to cycle through _all_ of the positions on a board, I focused only on a specific position and wrote out the different paths by hand to make sure I had a sense of what the problem would feel like.

The shape looked something like:

```javascript
function findValidPaths() {
    // is the path valid? add the path to a collection of valid paths
    // looking to the left - is it a valid move (i.e. is it on the board) and did I not come from there?
    // looking to the right - is it a valid move (i.e. is it on the board) and did I not come from there?
    // looking to up - is it a valid move (i.e. is it on the board) and did I not come from there?
    // looking to down - is it a valid move (i.e. is it on the board) and did I not come from there?
}
```

The least intuitive part about this approach was what to do with the return value so that I could compare it to the currently longest path and overwrite that if needed.

The key was to take advantage of Javascript’s lexical scoping (i.e. to use closure) and placed my valid paths in a variable called `validPaths` (original, I know), which I would evaluate against later.

```javascript
const validPaths = []
function findValidPaths(/* ... */) {
    if (isValidPath(path)) {
        validPaths.push(path)
    }
    /* ... */
}
```

With this in place and tests validating that it worked, I set about refactoring a bit to clean up my top level function.

```javascript
export function findMaxPath(board) {
    let globalMaxPath = Number.NEGATIVE_INFINITY
    for (let row = 0; row < board.length; row += 1) {
        for (let column = 0; column < board[0].length; column += 1) {
            const validPaths = findAllValidPaths(row, column, board)
            validPaths.sort()
            const largestValidPath = validPaths[validPaths.length - 1]
            if (largestValidPath > globalMaxPath)
                globalMaxPath = largestValidPath
        }
    }
    return globalMaxPath
}
```

[Here’s my full solution](https://github.com/stephencweiss/code-katas/blob/master/src/44-find-max-path/findMaxPath.js). What do you think? How might you optimize it further?
