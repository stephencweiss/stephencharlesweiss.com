---
title: 'UseEffect Basics'
category: ['programming']
tags: ['react','hooks','useeffect']
date: '2019-10-26'
publish: '2019-11-04'
---

The `useEffect` hook in React is scheduled to run after render.

There are three different categories of running it:
1. Without dependencies
2. With no dependencies
3. With specified dependencies

## A useEffect Without Dependencies
``` javascript
function MyComponent() {
    useEffect(() => {/* What needs to run after render? */})
    return (
        <div>
            {/* The details */}
        </div>
    )
}
```
In this case, we want to execute the function within the `useEffect` on _any_ change.

Notice that the optional dependency argument is missing. This is what tells React to run this on any change.

## A useEffect With No Dependencies
Contrary to the `useEffect` without dependencies, when there are _no_ dependencies listed (indicated by placing an empty array in the second position), the `useEffect` will run _once_ after the initial render and then never again.

It doesn’t run again because the dependencies that are listed (i.e. the elements of the empty array) never change to indicate that the effect should run again.

``` javascript
function MyComponent() {
    useEffect(() => {/* What needs to run after render? */}, [])
    return (
        <div>
            {/* The details */}
        </div>
    )
}
```

## A useEffect With Specified Dependencies
To only re-run the effect in certain situations, such as when something the effect depends on changes, list them in the array of dependencies.
``` javascript
function MyComponent() {
    const [state, setState] = useState(null)
    useEffect(() => {/* What needs to run after render? */}, [state])
    return (
        <div>
            {/* The details */}
        </div>
    )
}
```
In this case, the function within our useEffect relies on the value of `state` and so if it changes, we want to re-run the effect.

## Conclusion
I hope this primer serves as a useful reminder about the different ways to use the `useEffect` hook and why you may hit infinite loops (your `useEffect` _has_ dependencies but they’re not listed in the dependency array for example). For more on `useEffect`, be sure to reference the [React docs](https://reactjs.org/docs/hooks-effect.html). Or, if you're a glutton for pain and want to hear what Dan Abramov has to say on the subject, read his [Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/).
