---
title: 'Sharing Control Of UI With React Components'
date: '2020-02-24'
publish: '2020-03-14'
updated: ['2020-03-15']
category: ['programming']
tags: ['react', 'state', 'useEffect', 'onMount', 'life cycles']
---

> Update: I wrote a follow up in which I suggested a more idiomatic approach to this problem through deference of control.

React makes it really easy to control a component's UI. The two most common approaches I've seen are to manage the UI completely from an external component's state via props or self-managed via state.

For the most part, this works really well too. Unfortunately, I came across a situation recently where I wanted to share control.

My component tree looked something like:

```
<Wrapper>
    <Component>
        <Optional/>
    </Component>
</Wrapper>
```

Initially, `Component` was trusted to entirely manage whether or not `Optional` was displayed through the use state:

```javascript
function Component() {
  const [show, setShow] = useState(false)
  //...
  return (
    <div>
      {/*...*/}
      {show && <Optional />}
    </div>
  )
}
```

This worked well until I need a side effect from a click handler affect `Component`. My first idea was to use a `useEffect` (after all, I'm dealing with side effects). I started by passing in a boolean value `externalFlag` like so:

```javascript
function Component({ externalFlag }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(show => !show)
  }, [externalFlag])
  //...
  return (
    <div>
      {/*...*/}
      {show && <Optional />}
    </div>
  )
}
```

If you're familiar with React life cycles you may already see the problem. Though I specified I wanted the `useEffect` to fire on each change of the `externalFlag`, this didn't resolve the fact that it fired on mount! The result was that by the time the component settled, `show` was `true` and `Optional` was visible -- not what I wanted!

Setting `show` to `true` initially in the `useState` was an option, but I opted against it. It wasn't clear _why_ it would be `true` - particularly because the desired default behavior is that `Optional` doesn't display - so, even if I wrote a comment explaining the decision, a well-meaning engineer might come along later and change it back and reintroduce the "bug".

A lot of the trouble stemmed from two facts:

1. I was dealing in a boolean environment (I either wanted something to show or I didn't).
2. `useEffect` requires a _change_ in the variable to fire and in my particular case, the external value was intended to _always_ reset `show` to `false` (which meant I was always passing `false` in and nothing was changing _or_ I was passing in non-sense just to get it to change).

To address these concerns, I gave up trying to pass in the _value_ I wanted in `Component` to have, deferring all state management _to_ the component itself. Instead, by passing in a `count`, I was able to trigger a change. This addresses both concerns: counts increment (in my case), so I could exclude the initial value relatively easily (by excluding a specific value) _and_ have it fire on every subsequent change:

```javascript
function Component({ count }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(show => !show)
  }, [count])
  //...
  return (
    <div>
      {/*...*/}
      {show && <Optional />}
    </div>
  )
}
```

I put together a [CodeSandBox](https://codesandbox.io/s/staging-tdd-d6is8?fontsize=14&hidenavigation=1&theme=dark) to demonstrate this scenario. Check it out and let me know what you think!

The solution I arrived at surely isn't the most declarative and I'm still thinking about alternatives to this, so if you have a better solution on how to share control of the UI in React components, I'd love to hear it!

That said, I do appreciate this approach because by stepping back I freed myself from self-imposed constraints that the wrapper needed to set the state itself. By trying a different approach, I settled on a solution to allow two components to share responsibility for how the UI is rendered.