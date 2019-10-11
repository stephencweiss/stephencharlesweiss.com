---
title: 'Typescript’s Omit: Pick’s Mirror'
date: '2019-10-18'
category: ['programming']
tags: ['typescript', 'pick', 'omit']
---

I’ve written in the past about the [benefits of `Pick` in writing better interfaces with Typescript](../../2019-06-25/typescript-pick-interface-partials/).

Today, I found out about `Pick`’s mirror: `Omit`.<sup>[1](#footnotes)</sup><a id="fn1"></a>
Quick refresher: `Pick` is useful for maintaining the type checking when we only want a select number of properties from an existing interface (as opposed to `Partial`). `Omit` behaves similarly, but in the inverse: we use it where we want to _keep_ all, but a select number of properties from an interface.

I think of both `Pick` and `Omit` similarly to `extends` in so far as they’re building upon some base. You can think of them similarly to recipes:

1. `Extends` uses all of the ingredients in the original recipe and then adds some more.
2. `Pick` takes all of the original ingredients and plucks a few out for use in a smaller dish.
3. `Omit` takes all of the original ingredients, but sets aside some of the more specific ingredients because someone in the party is “allergic” to cilantro.

## Using `Omit`

To show how `Omit` works, let’s use the same example we’ve used in the past, `IMyTable`

```typescript
interface IMyTable {
  id: string
  foreign_id: string
  name: string

  is_enabled: boolean
  is_custom: boolean
  display_order?: number

  name_en: string
  name_sp?: string
  name_fr?: string

  description_en?: string
  description_sp?: string
  description_fr?: string
}
```

Let’s say that we want to omit the `foreign_id`. The type is:

```typescript
type NewTableProps = Omit<IMyTable, 'foreign_id'>
```

This is saying that we will have access to _all_ of `IMyTable` _except_ `"foriegn_id”`.

Similarly, if we wanted to exclude _multiple_ properties, we use the `|`:

```typescript
type NewTableProps = Omit<IMyTable, 'foreign_id' | 'is_custom'>
```

## Conclusion

Just like `Pick` is useful when you want to keep the benefits of type checking and increase the specificity of the interface when all you need is a few attributes, `Omit` serves a similar role when you want to exclude a few.

I found this particularly useful when dealing with intrinsic HTML elements. For example, `Omit<JSX.IntrinsicElements['button'], 'css'>`.

## Footnotes

- <sup>[1](#fn1)</sup> Interestingly, whereas Pick is noted in the Typescript documentation on [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html), I could not find a reference to `Omit`. I did, however, find this post on [Omit And Projection Types](http://ideasintosoftware.com/typescript-advanced-tricks/) by Tomas Brambora useful for understanding how to use `Omit`.
