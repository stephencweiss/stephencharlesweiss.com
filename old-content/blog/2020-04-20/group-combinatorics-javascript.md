---
title: 'Finding Groups - Combinatorics With Javascript'
publish: '2020-04-20'
date: '2020-03-31'
category: ['programming']
tags: ['combinatorics', 'javascript', 'recursion', 'groups', 'n choose k']
---

Imagine you're planning a dinner party.

You have a table that can comfortably seat 6, but you have 20 friends.

How many combinations can you have?

This is a classic [combinatorics problem](https://en.wikipedia.org/wiki/Combination). Given a set, `n`, how many groups of size `k` are available?

When the numbers are small, you might be tempted to solve it by hand, but the combinations can get out of hand quickly.

So, let's try solving this algorithmically.

When the groups are small, say of two people, it's reasonable to do something like this:

```javascript
function bruteForceGroupsOfTwo(arr) {
    const results = []

    for (let i = 0; i < arr.length - 1; i += 1) {
        const first = arr[i]
        for (let j = i + 1; j < arr.length; j += 1) {
            const second = arr[j]
            results.push([first, second])
        }
    }
    return results
}
```

Given a group of people (listed out in an array), for each person, match them with every other person once.

To visualize this, try locking in the first person, `Anabelle`, and then moving on down the alphabet:

Imagine our group is: `group = ["Anabelle", "Billy", "Cindy", "David", "Elise"]`

Then, let's inspect Anabelle (i.e. when `i=0`).

Our _first_ pair for Anabelle is Billy. The pair is put into our results, and then we continue on to Cindy, then David, and finally Elise.

Having reached the end of the sequence, we start fresh with Billy. Note, however, that we don't pair Billy with Anabelle (we already have!), so we start with Cindy.

We continue this until we get to David. David has only one new pair, Elise. Then we stop. Elise has already been paired with everyone and so we do not need to do anything more.

What if our groups increase to three? Add another loop!

```javascript
function bruteForceGroupsOfThree(arr) {
    const results = []

    for (let i = 0; i < arr.length - 2; i += 1) {
        const first = arr[i]
        for (let j = i + 1; j < arr.length - 1; j += 1) {
            const second = arr[j]
            for (let k = j + 1; k < arr.length; k += 1) {
                const third = arr[k]
                results.push([first, second, third])
            }
        }
    }
    return results
}
```

As before, we lock in our first person, _then_ we lock in the second, and then iterate the third member of the group. Once we've reached Elise, we unlock the second person (from Billy to Cindy in the first time this moves), and then proceed to generate a new group from there.

This works... but you can see it's not very flexible _and_ each new member in a group involves a brand new for-loop.

Having brute-forced my way through the solution, I thought I was finally able to try my hand at a recursive approach. After a bit of tinkering, I landed on this solution:

```javascript
function findAllGroups(arr, groupSize) {
    const results = []

    function findGroup(currentGroup, arr, sizeRemaining) {
        if (sizeRemaining === 0) {
            return results.push(currentGroup)
        }
        for (let i = 0; i < arr.length; i += 1) {
            findGroup(
                [...currentGroup, arr[i]],
                arr.slice(i + 1),
                sizeRemaining - 1
            )
        }
    }

    for (let i = 0; i <= arr.length - groupSize; i += 1) {
        findGroup([arr[i]], arr.slice(i + 1), groupSize - 1)
    }

    return results
}
```

It's _not_ the sexiest, but I think it has the benefit of being fairly clear.

For each member of my group, I pass them into an internal method `findGroup` along with all remaining individuals (i.e. for Anabelle, that's the rest of the group, but for Cindy, it's only David and Elise, etc.).

There are a few little catches, gotchas, or otherwise noteworthy details:

1. Our starting individual needs to appear in the original group at a position less than _or equal to_ the total group size (`arr.length`) minus the `groupSize` (e.g., 2, 3, etc.). To see why this is, imagine a group of 5 and a group size of two. If went all the way up to the last person (`Cindy`), we'd invoke `findGroup` looking for two other people, but the remaining array we'd pass in would be empty and we'd end up adding a group of just Cindy to the results.
2. As before with our brute force approach, I wanted to step my way forward without repeating (a group of Anabelle and Billy is the same for my purposes as Billy and Anabelle), but I needed a way to set that dynamically. That's where `groupSize` comes in and the resulting `sizeRemaining`.
3. Constructing the current group for each new round was also a bit of a catch. While this is a less memory efficient process as I'm creating a new array with each new group (both due to the spread as well as the `.slice`), again, I found the trade off for clarity helpful. This makes it clear that I'm passing a new current group which consists of the old one _and_ the current individual into the recursive call.

In the end, this is one of those problems that felt like it should have been solved much more simply - but which is all the more rewarding because of the difficulty I had in finding the clarity. The best thing I did was start with the brute force and then step up from there. It helped me to see much more clearly _what_ I was trying to accomplish and I resisted it for a while because I _knew_ it "wouldn't scale". A classic mistake of premature optimization that ended up costing me in terms of time and effort!

https://repl.it/@stephencweiss/Unique-Combinations
