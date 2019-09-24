---
title: 'Defining Idempotent'
date: '2019-08-26'
category: ['programming']
tags: ['concepts', 'idempotence', 'idempotent']
---

Idempotent is a word that gets thrown out a lot within computing but that I continually forget what it means.
From Wordnik, the definition: <sup>1</sup>
> _n._ In *multiple algebra*, a quantity which multiplied into itself gives itself. Ordinary unity is *idempotent.*
> _adj._ ( [computing](https://www.wordnik.com/words/computing) ) Describing an action which, when performed multiple times, has no further effect on its subject after the first time it is performed.
> _adj._ Said of an element of an [algebraic structure](https://www.wordnik.com/words/algebraic%20structure) (such as a [group](https://www.wordnik.com/words/group) or [semigroup](https://www.wordnik.com/words/semigroup) ) with a [binary operation](https://www.wordnik.com/words/binary%20operation) : that when the element operates on itself, the result is equal to itself.

So, a subject is considered idempotent if performing an action multiple times has no effect after the first time.

Examples helped solidify my understanding <sup>2</sup>:
> In mathematics, an idempotent operation is one where _f(f(x)) = f(x)_. For example, the `abs()` function is idempotent because `abs(abs(x)) = abs(x)` for all `x`.

Similarly deletion operations are idempotent because you can't delete an item multiple times. For example:
```
target.delete(value)
target.delete(value)
```
The second delete call will not have any effect on the target since the value it's trying to delete is not present to be acted upon.

# Footnotes
* <sup>1</sup> [Idempotent | Wordnik](https://www.wordnik.com/words/idempotent)
* <sup>2</sup> [What is an idempotent operation? - Stack Overflow](https://stackoverflow.com/a/1077421/9888057)
* [Idempotence | Wikipedia](https://en.wikipedia.org/wiki/Idempotence)

