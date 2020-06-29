---
title: 'Using Typescript’s Pick To Improve Communication And Decrease Maintenance'
date: '2019-06-25'
publish: '2019-06-25'
category: ['programming']
tags: ['developer experience', 'typescript', 'pick', 'interface', 'DRY']
---

Instead of documenting an interface that is redundant, but only a partial, we can use `Pick` to allow the interface to automatically be linked, w without being overly broad.

Situation: I want to be able to propose changes to a table — but only to two fields - `is_enabled` and `display_order`.

Imagine I want to create a method that will make changes to a table - but instead of opening up the _entire_ record for modification, I want to limit _which_ attributes to just two (`is_enabled` and `display_order`).

However, the original table has more fields than that. Here’s an interface for demonstration purposes:

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

# Get It Working With Partial or Distinct Interfaces

## Using Partial Interfaces

One method that would work would be to use a partial of the `IMyTable`.

```typescript
async changeMyTable(proposal: Partial<IMyTable[]>): Promise<...> { /* ... */ }
```

This has the benefit of keeping the management of interfaces down, but introduces several new issues.
Namely - I could pass _any_ of the fields on the table and my method would either need to handle them or alert the user if not. Also, partials don’t give me the opportunity to require any fields. So, imagine `id` is necessary to find the correct record, but it’s not passed — the changes _should_ fail.

Going this route sets me up to have to handle a number of additional fail states or fail silently — creating a lot more work for me or a poor user experience. Not great options.

A _better_ approach would be to create a separate interface to communicate clearly to the user what you’re expecting and, therefore, what’s handled. That interface could look like this:

```typescript
interface IMyTableProposal {
    id: string;
    is_enabled?: boolean;
    display_order?: number;
}
...
async changeMyTable(proposal: IMyTableProposal): Promise<...> { /* ... */ }

```

This addresses several of the issues I introduced with the `Partial`, however, it creates new ones as well - specifically: I now have a second interface I need to maintain.

# Making It Better `Pick`

By converting to a `type`, however, I can streamline the process using `Pick`.

```typescript
export type MyTableProposal = Pick<myTable, "id" | "is_enabled" | "display_order">;
...
async changeMyTable(proposal: MyTableProposal): Promise<...> { /* ... */ }
```

## How `Pick` Works:

The API requires two features:

1. The Base Interface (i.e. what is being picked _from_)
2. The Select(ed) Attributes (i.e. which of the base interface’s characteristics should be included in the type)

## Perks of `Pick`

A few of the perks that come with `Pick` include:

1. If the interface `IMyTable` changes later, it will flow through automatically to the `type`
2. The interface is shown in IntelliSense as is expected (i.e. only the picked fields)
3. I only have to maintain _one_ interface (unless I want to change which cases are handled, in which case it makes sense I’d need to update the `type` anyway).

![Pick Table](https://res.cloudinary.com/scweiss1/image/upload/v1593195207/code-comments/pick-type-my-table_f4knyt.png)

# Conclusion

Using the `Pick` instead of a `Partial` or separate interface in this case increases the specificity of my control with respect to which elements I allow to be updated without having to keep a second interface in-sync (thereby adhering to DRY).
