---
title: 'State, Reducers, And useReducer In React'
date: '2019-07-31'
category: ['programming']
tags: ['react','redux','reducer','action','payload']
---

To date, I’ve struggled to understand reducers. Terms like reducers, actions, dispatch, all blurred together and even though I could use, and in some cases, extend the redux store on some projects, I never understood all of the pieces.

Despite reading the hooks documentation on `useReducer`, the pieces didn’t click until I read Robin Wieruch’s two-part tutorial on reducers.<sup>1, 2, 3</sup>

So, what’s exactly going on?

## useReducer
The `useReducer` returns a tuple `[state, dispatch]` and takes three arguments, `reducer`, `initialArg`, and `init`. Note: `init` is optional and used for lazy initialization - more on that in a minute.

In a Javascript file then, you would see something like:
```javascript
import React, { useReducer } from 'react';
...

function FunctionalComponent() => {
  const [state, dispatch] = useReducer(reducer, initialArg, init);
  return (
    <>
        {/* ... */}
    </>
  )
};
```

Notice, that at this point, this looks very similar to `useState`:
```javascript
import React, { useState } from 'react';
...

function FunctionalComponent() => {
  const [value, setValue] = useState(initialValue);
  return (
    <>
        {/* ... */}
    </>
  )
};
```

In fact, even if `initialValue` is something more exotic than a `boolean` or `string`, we can still use `useState`. We would just need to use the functional update syntax.

For example, adapting the React team’s example:
```javascript
const initialValues = {
  buttonOne: 0,
  buttonTwo: 0,
}

function Counter() {
  const [count, setCount] = useState(initialValues);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialValues)}>Reset</button>
      <button onClick={() => setCount(prevCount => {...prevCount, prevCount.buttonOne + 1)}>+</button>
      <button onClick={() => setCount(prevCount => {...prevCount, prevCount.buttonTwo - 1)}>-</button>
    </>
  );
}
```
This example isn’t very useful as the two values can only go in opposite directions, but it illustrates how we can use `useState` to manage more complicated state objects.

## Why useReducer?
Since we can manage state with `useState`, why do we need `useReducer` at all? Per the React team:
> `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because  [you can pass dispatch down instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down) .
> — React Team

## Using Reducers
`useReducer` accepts a `reducer`, a function in the form of `(state, action) => newState`.

Let’s simplify our example for the moment and _just_ add numbers, but use `useReducer`:
```javascript
const initialValues = 0;

function reducer = (state, action) => {
return state + 1
}

function Counter() {
  const [state, dispatch] = useState(reducer, initialValues);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch()}>+</button>
    </>
  );
}
```

The reason we _only_ add numbers here, is because our `reducer` doesn’t _use_ the second argument, `action`. It’s fixed.

How might we change that?

## Actions
Actions are how we change that.

From Redux documentation:
> Actions are payloads of information that send data from your application to your store. They are the *only* source of information for the store.<sup>4</sup>>

Here’s an example using the simplest of actions — again reintroducing our second button:
```javascript
const initialValues = 0;

function reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
}

function Counter() {
  const [state, dispatch] = useState(reducer, initialValues);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'INCREMENT'})}>+</button>
      <button onClick={() => dispatch({type: 'DECREMENT'})}>-</button>
    </>
  );
}
```

When we hit the `+` we dispatch the action to increment while the `-` dispatches an action. Those actions are evaluated by our reducer and return a new state.

### Payload
The convention for writing an Action is to have both a `type` and a `payload` key. While the `type` is the _what_, the `payload` is the _how_. It doesn’t make much sense in this case since the state we’ve been using is just an integer, but what would happen if it were something more complicated? How might we change it then?

Let’s imagine a state object that has both our count _and_ a person attribute.
```javascript
const initialValues = {
  count: 0,
  person: {
    firstName: 'John',
    lasttName: 'Doe',
    age: '30',
  },
};

function reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, count: state.count + action.payload};
    case 'DECREMENT':
      return {...state, count: state.count - action.payload}
    default:
      throw new Error(`Unknown action type, ${action.type}`);
}

function Counter() {
  const [state, dispatch] = useState(reducer, initialValues);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'INCREASE', payload: 1})}>+</button>
      <button onClick={() => dispatch({type: 'DECREASE', payload: 1})}>-</button>
    </>
  );
}
```
NB:  In this case, we _spread_ the state object before modifying the `count` attribute so that we don’t overwrite the whole object _and_ avoid having our new value for the count be overwritten (order matters).

### Lazy Initialization
Now that we know how to use actions, we can pull it all together to see how we would use a lazy initialization.

For example:
```javascript
function init(initialValues){
return (
  { count: 0,
    person: {
      firstName: 'John',
      lasttName: 'Doe',
      age: '30'
    },
  }
)};

function reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, count: state.count + action.payload};
    case 'DECREMENT':
      return {...state, count: state.count - action.payload}
    case 'RESET':
      return init(action.payload);
    default:
      throw new Error(`Unknown action type, ${action.type}`);
}

function Counter() {
  const [state, dispatch] = useState(reducer, initialValues, init);
  return (
    <>
      <button onClick={() => dispatch({type: 'RESET', payload: initialValues})>Reset</button>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'INCREASE', payload: 1})}>+</button>
      <button onClick={() => dispatch({type: 'DECREASE', payload: 1})}>-</button>
    </>
  );
}
```

This is often used in an example like the above where we want to extract the ability to reset the value _outside_ of setting it initially. We do this in the above with the `Reset` button element.

## Conclusion
When I came across a project that used Redux or another state management tool, I never really understood how it all worked. I could use it, butt I never felt comfortable.

After reading through Robin’s tutorials, I was able to return with fresh eyes and implemented it within my own project. It’s a great feeling when things click! Hopefully this write up will help someone else experience that same feeling.

## Footnotes
* <sup>1</sup> [Hooks API Reference – React](https://reactjs.org/docs/hooks-reference.html#usereducer)
* <sup>2</sup> [What is a reducer (React/Redux) in JavaScript? | RWieruch](https://www.robinwieruch.de/javascript-reducer/)
* <sup>3</sup> [How to useReducer in React? | RWieruch](https://www.robinwieruch.de/react-usereducer-hook/)
* <sup>4</sup>> [Actions | Redux](https://redux.js.org/basics/actions)

