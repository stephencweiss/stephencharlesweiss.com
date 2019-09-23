---
title: '`Type[]` vs `Array<Type>`: What’s the Difference?'
date: '2019-06-24'
category: ['programming']
tags: ['developer experience', 'typescript', 'pick', 'interface', 'DRY']
---

The short answer: there is _no_ difference.

When investigating, I was steered to the Typescript Handbook<sup>1</sup> which notes:

> The `ReadonlyArray` type describesArrays that can only be read from. Any variable with a reference to a `ReadonlyArray` can’t add, remove, or replace any elements of the array.

```typescript
function foo(arr: ReadonlyArray<string>) {
    arr.slice();        // okay
    arr.push("hello!"); // error!
}
```

> While it’s good practice to use `ReadonlyArray`over `Array` when no mutation is intended, it’s often been a pain given that arrays have a nicer syntax. Specifically, `number[]`is a shorthand version of `Array<number>`, just as `Date[]` is a shorthand for `Array<Date>`.

Notice, the final sentence: It’s short hand.

That said, it also introduced to me the concept of the `Readonly` syntax which is nice and is an opportunity for additional communication to the user about what is expected / constrains the methods implementation from introducing _unintended_ mutation.

# Source:

- <sup>1</sup> [TypeScript 3.4 · TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#a-new-syntax-for-readonlyarray)
- [Array<Type> VS Type in Typescript - Stack Overflow](https://stackoverflow.com/questions/36842158/arraytype-vs-type-in-typescript)
