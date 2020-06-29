---
title: 'UseReducer With Typescript'
date: '2019-10-21'
category: ['programming']
tags: ['typescript', 'react', 'usereducer', 'hooks']
---

When does it make sense to use a reducer vs a simple state value with React’s Hooks? There’s no hard-and-fast rule, but the React team suggests `useReducer` when “managing state objects that contains multiple sub-values”

That described my use case well. I had a series of steps, each one with multiple sub values, and depending on what the user did, the step(s) would be affected in a variety of ways (to start with - only two, but the number of interactions may grow in the future).

Before jumping into the `useReducer`, a few thoughts:

1. I could have stored the entire object in a single `useState` and then managed the updates manually. For example, from the docs:<sup>[1](#footnotes)</sup><a id="fn1"></a>
    > ```javascript
    > setState(prevState => {
    >  // Object.assign would also work
    >  return {…prevState, …updatedValues};
    > })
    > ```
2. I may have benefitted from using React's Context API to avoid some of the prop-drilling and passing around that occurred later on. I opted to _not_ use it in this case, however, because the reducer was used immediately in the child components (i.e. I would not benefit from avoiding prop drilling).

## Getting Started - Adding the `UseReducer`

To actually _use_ this hook, I needed to invoke it within a component. A simplified look at how that was done:

```typescript
interface Step {
  id: string;
  hidden?: boolean;
  status?: StepStatusTypes;
}

const MyComponent = () => {
  /* ... */
  const initialArg: Step[] = [...]
  const [steps, stepsDispatch] = useReducer(stepsReducer, initialArg);
  /* ... */
  return (
    /* ... */
    <MyChildComponent stepsDispatch={stepsDispatch} />
    /* ... */
  )
}
```

### Defining The Reducer

Defining the reducer, the first argument for `useReducer` was actually the trickiest part. Not because reducers themselves are actually that complicated, but because of Typescript.

For example, here’s the basic reducer that I came up with:

```javascript
function stepsReducer(steps, action) {
    switch (action.type) {
        case 'SHOW-ALL':
            return steps.map((step) => ({ ...step, hidden: action.payload }))
        case 'SET-STATUS':
            steps.splice(action.payload.index, 1, {
                ...steps[action.payload.index],
                status: action.payload.status,
            })
            return steps
        default:
            return steps
    }
}
```

If it received a `SHOW-ALL` action, each step would take the value of the payload and apply it to the `hidden` attribute. On the other hand, if it received the `SET-STATUS` action, only _that_ step would have its status updated. In all other cases, the steps object was simply returned.

In this project, Typescript is configured to yell if anything has a type of `any` - implicitly or otherwise. As a result, I needed to type the Actions. And, given the different _shape_ of the actions, this proved to be the most challenging part of the entire exercise.

My first approach

```typescript
interface Action {
    type: string
    payload: boolean | { index: number; status: string }
}
```

I thought this was going to work the compiler started yelling that `index` doesn’t exist on type `false`. Sure, that makes sense - except that I was trying to say it’d be a boolean value _or_ an object _with_ an `index` property.

Oh well.

So, I started digging for examples of folks using `redux` with `typescript`. (While I was using a hook, since they’re still relatively new and the principles are the same, I figured whatever I found, I'd be able to apply.)

I found this thread on [how to type Redux actions and Redux reducers in TypeScript?](https://stackoverflow.com/questions/35482241/how-to-type-redux-actions-and-redux-reducers-in-typescript) on Stack Overflow helpful and got me going in the right direction.

The first attempt I made was splitting up the types like the first answer suggests:

```typescript
interface ShowAllAction {
    type: string
    payload: boolean
}

interface Action {
    type: string
    payload: { index: number; status: string }
}

type Action = ShowAllAction | SetStatusAction
```

Same story. Typescript yelled because `index` didn’t exist on type `false`. This wasn’t the answer.

Then, I found an answer which used [Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types).<sup>[2](#footnotes)</sup><a id="fn2"></a> Type Guards have always made more sense to me than Generics. A Type Guard is a function that allows Typescript to determine which type is being used while a Generic is a type that receives another to define it (actually `Dispatch` is a Generic if I'm not mistaken).

Effectively, _before_ I used an action, I needed to determine which type of action I’d be using. Enter Type Guards:

```typescript
export interface Action {
    type: string
}

export interface ShowAllAction extends Action {
    payload: boolean
}

export interface SetStatusAction extends Action {
    payload: {
        index: number
        status: string
    }
}

// The Type Guard Functions
function isShowAllAction(action: Action): action is ShowAllAction {
    return action.type === 'SHOW-ALL'
}
function isSetStatusAction(action: Action): action is SetStatusAction {
    return action.type === 'SET-STATUS'
}

function stepsReducer(steps: IFormStep[], action: Action) {
    if (isShowAllAction(action)) {
        return steps.map((step: IFormStep) => ({
            ...step,
            disabled: action.payload,
            hidden: action.payload,
        }))
    }
    if (isSetStatusAction(action)) {
        steps.splice(action.payload.index, 1, {
            ...steps[action.payload.index],
            status: action.payload.status,
        })
        return steps
    }
    return steps
}
```

With the type guards in place, I was ready to actually start dispatching actions.

## Invoking (And Typing) The Dispatch Function

If I had only ever tried to dispatch actions from within the component in which the `useReducer` was defined, Typescript probably would have been able to tell what was happening. However, I wanted different parts of my app to be able to dispatch actions and not have to repeat logic. That was why I wanted a shared state in the first place.

That meant I needed to pass the dispatch function around and define it as part of the other component’s interfaces.

So, how do you type a dispatch so that Typescript doesn't yell? It turns out React exports a `Dispatch` type which takes an `Action` (note, however, that the `Action` is the one defined by you).

Use React’s `Dispatch` like so:

```typescript
import React, { Dispatch } from "react";
import { Action, ShowAllAction } from "../index";

const MyChildComponent = ({stepsDispatch: Dispatch<Action & ShowAllAction>}) => {
	/* ... */
}
```

## Conclusion

Using `useReducer` with Typescript is not that challenging once the basics are understood. The hardest part about the entire process was getting the typing right, and Type Guards proved to be up to the challenge!

I’m excited to keep exploring other ways to use reducers and dispatch actions.

Maybe my next step will be to explore Action Factories so I don’t have to keep creating these objects!

## Footnotes

-   <sup>[1](#fn1)</sup> While `useState` predominately is updated declaratively. It can use the old syntax of using `prevState` in a functional update: [Hooks API Reference – React](https://reactjs.org/docs/hooks-reference.html#functional-updates).
-   <sup>[2](#fn2)</sup> I’d read the typescript documentation on Type Guards several times in the past without it clicking. As with so many topics, things fell in place once I had a reason to be there.
