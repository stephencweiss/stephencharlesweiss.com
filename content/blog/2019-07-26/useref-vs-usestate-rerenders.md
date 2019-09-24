---
title: 'useRef Vs. useState And Unnecessary Renders'
date: '2019-07-26'
tags: ['react', 'hooks', 'useState', 'useRef']
category: ['programming']
---
Today, I found a wonderful side-effect of `useRef`: it doesn't re-render components when it changes.

This was ideal for my situation because I needed to keep a property around so that I could access it in an API call. Naively, I reached for the tool I know best for this in functional React components,  `useState`.  What I didn't realize at the time was the cost I was paying in doing so.

Because I was using state to store this information, every time it changed, the entire component and all of the children components re-rendered as well.

Using the “Highlight Updates” feature in the React Chrome Dev Tools, it was pretty clear to see:
![`useState`](https://media.giphy.com/media/f9MOvbfziDhl3NDRNL/giphy.gif)

Here's a simplified component showing what was going on under the hood.
``` javascript
function NameInput (props) {
    const { handleSubmit } = props;
    const [name, setName] = useState('')
    const handleChange = event => {
        setName(event.target.value)
    }
    const handleSave = async () => {
        try {
            await handleSubmit(name)
        } catch (e) {
            throw new Error('Submission failed!', e)
        }
    }
    return (
        <div>
            <label hmtlFor="add-name" >
                Add your name
            </label>
            <input id="add-name" onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
        </div>
    )
}
```

## Solving The Problem Through Refs
The issue is the “unnecessary” re-renders. I'm not actually _showing_ anything different to the user based on what I'm storing in state (the `input` component is managing its own state), so, every time I rerendered the form was unnecessary to communicate the information to the user.

It turns out the `useRef` is ideal for this situation _because_ it doesn't subscribe to changes. Instead, per the React team: <sup>1</sup>
> `useRef` returns a mutable `ref` object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.
> …
> Keep in mind that `useRef` *doesn't*notify you when its content changes. Mutating the `.current` property doesn't cause a re-render.

With that in mind, I was able to refactor my code simply by lifting out the `useState` and replacing the `setName` with a `name.current`.
```javascript
function NameInput (props) {
    const { handleSubmit } = props;
    const name = useRef('')
    const handleChange = event => {
        name.current = event.target.value // set the ref's .current property
    }
    const handleSave = async () => {
        try {
            await handleSubmit(name.current) // access the ref's .current property
        } catch (e) {
            throw new Error('Submission failed!', e)
        }
    }
    return (
        <div>
            <label hmtlFor="add-name" >
                Add your name
            </label>
            <input id="add-name" onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
        </div>
    )
}
```

It's worth noting that I am _mutating_ the value of the ref with each change. Unlike `useState` which is side-effect free and returns a new state object (or `useReducer` which makes this even more explicit).

Still, in my case, this is perfectly acceptable and the results speak for themselves.
![`useRef`](https://media.giphy.com/media/ZD8R50KA3GxNtQ3xhm/giphy.gif)

(H/t to Christian Nwamba for a useful writeup on the differences between useState and useRef and getting me started. <sup>2</sup> )

## Resource:
* <sup>1</sup> [useRef Hooks API Reference | React](https://reactjs.org/docs/hooks-reference.html#useref)
* <sup>2</sup> [useRef vs useState: Should we re-render or not? | Codebeast](https://www.codebeast.dev/usestate-vs-useref-re-render-or-not/)

