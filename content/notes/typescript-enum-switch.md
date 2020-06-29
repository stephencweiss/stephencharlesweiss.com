---
title: 'Typescript Switch Statement With Enums'
date: '2020-02-28'
publish: '2020-03-17'
category: ['programming']
tags: ['typescript', 'enum']
---

We use [Enums](https://www.typescriptlang.org/docs/handbook/enums.html) a lot in our Typescript code to make sure that we're using a value that we expect.

One way that we use the Enum is as the basis of a switch statement.

Instead of:

```typescript
type Fruit = 'Apple' | 'Orange' | 'Kiwi'

function getFruit(prop: Fruit) {
    switch (prop) {
        case 'Apple':
            return () => <AppleComponent />
        case 'Orange':
            return () => <AppleComponent />
        case 'Kiwi':
            return () => <AppleComponent />
        default:
            throw Error(`Unknown fruit of type --> ${prop}`)
    }
}
```

With an Enum, it can be refactored to be more explicit as follows:

```typescript
enum Fruit {
    Apple = 'Apple',
    Orange = 'Orange',
    Kiwi = 'Kiwi',
}

function getFruit(prop: Fruit) {
    switch (prop) {
        case Fruit.Apple:
            return () => <AppleComponent />
        case Fruit.Orange:
            return () => <AppleComponent />
        case Fruit.Kiwi:
            return () => <AppleComponent />
        default:
            throw Error(`Unknown fruit of type --> ${prop}`)
    }
}
```

While Typescript provided type safety in the first iteration because of the type `Fruit`, by switching to an Enum the dependency is more explicit and can now provide hints through intellisense.

Related: Using the [Default Enum as a Fallback](enum-defaults-fallback.md)

## Resources

-   More examples of [using Typescript Enums](https://www.sharepointsky.com/typescript-enum/)
