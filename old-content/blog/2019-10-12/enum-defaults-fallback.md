---
title: 'Default Enums And Fallbacks'
date: '2019-10-12'
category: ['programming']
tags: ['typescript', 'enums']
---

Working on a component that receives a `status` prop where the status are defined by an enum (I’m working in Typescript).

The problem arose when a child component required a value for `status`. Here’s a simplified illustration of what I’m talking about:

```typescript
export enum StatusTypes {
    INCOMPLETE = 'INCOMPLETE',
    ERROR = 'ERROR',
    COMPLETE = 'COMPLETE',
}

export interface IStep {
    id: string
    status?: StatusTypes
}

const Step = (props: IStep) => {
    /* … */
    return <ChildComponent status={status} />
}
```

In normal circumstances, this could be simplified and we could get rid of the `IStep` interface altogether.<sup>[1](#fn1)</sup><a id="sup1"></a>

```typescript
export enum StatusTypes {
    INCOMPLETE = 'INCOMPLETE',
    ERROR = 'ERROR',
    COMPLETE = 'COMPLETE',
}

export interface IStep {
    id: string
    status?: StatusTypes
}

const Step = ({ id: string, status: StatusTypes = StatusTypes.INCOMPLETE }) => {
    /* … */
    return <ChildComponent status={status} />
}
```

This is the best way to set a default to an Enum. Very explicitly, it's occurring _within_ the function signature, which is exactly where a default is assigned.

Two complicating factors:

1. The `status` was actually set within an array of elements that was being passed to the component at the top level. I.e., there’s another level above this and we get to step only _after_ mapping over the steps.
2. The number of props involved is larger than the two demonstrated above, and destructuring, even to spread most of them, felt less than ideal.

Okay, so a default value in the signature isn’t tenable, or at least not attractive. What about through destructuring?

That’s exactly what I did.

```typescript
interface IMenu {
    steps: IStep[]
}

const Step = (props: IStep) => {
    const { step /* ... */ } = props
    const { id, status = StepStatusTypes.INCOMPLETE } = step
    /*...*/
}
```

The important part is that you can’t just set `step.status` to `"INCOMPLETE"` because that’s a string, and Typescript will yell.

## Footnotes

-   <sup>[1](#sup1)</sup><a id="fn1"></a> I got inspiration for this approach from this conversation about [typescript enum default value](https://stackoverflow.com/questions/45363572/typescript-enum-default-value) on Stack Overflow.
