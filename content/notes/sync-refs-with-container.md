---
title: 'Getting Refs To Sync With Container State'
date: '2019-09-24'
publish: '2019-09-24'
category: ['programming']
tags: ['react', 'useRef', 'refs', 'state']
---

I was working on a project recently which was using Refs in order to integrate with a third-party library.

My mental model for refs are that they allow you to view into the internal state of a component _without_ tracking it explicitly. In that way, you can use it for calculations and without the overhead of making a component stateful that otherwise doesn’t require state.

My scenario looked something like this:
![Sketch example](https://res.cloudinary.com/scweiss1/image/upload/v1593206596/ref-container_mw0oi4.png)

A stateful container with a component that stored business logic wrapping an input.

The goal was to find a way to lift the value of the input up to the top level container _after_ processing it in a wrapper that contained business logic and _without_ storing it in the wrapper as state. I also needed to be able to update the value of the input in certain situations based on business logic considerations.

Here’s a simplified version of what I came up with:

```javascript
import React, { Component } from ‘react’;
import { render } from ‘react-dom’;
import ‘./style.css’;

const WrapperComponent = props => {
  const refContainer = React.useRef({});
  const { onChange } = props;
  const curRef = refContainer.current
  const curRefVal = refContainer.current && refContainer.current.value;
  console.log({ props, refContainer, curRef, curRefVal })

  const businessLogic = (val) => {
    return val.concat(`—modified!`)
  }

  const handleChange = (e) => {

    onChange(businessLogic(e.target.value))
    if(e.target.value.length === 10) {
      refContainer.current.value = businessLogic(e.target.value)
    }
    console.log(refContainer.current.value)
  }
  return (
    <React.Fragment>
      <div> Phone </div>
      <input ref={refContainer} onChange={handleChange} type='tel'></input>
    </React.Fragment>)
}

const App = () => {
  const [value, setValue] = React.useState(null)
  console.log({ value })
  return (<WrapperComponent onChange={setValue} />)

}

render(<App />, document.getElementById(‘root’));
```

Inspecting the console, we can see that this works!

My `input` has a value. My wrapper applies business logic and then passes it through to the container’s `onChange` method.

I can also format the value inside the input and change it when I need — as I did here when I reach a valid 10-digit phone number.

![A modified ref](https://res.cloudinary.com/scweiss1/image/upload/v1593206596/ref-modified_i7xnk6.png)

## Conclusion

I don’t expect to use refs frequently. The React team discourages the practice for one except in certain circumstances (like working with 3rd Party Libraries which was the impetus to this exercise).<sup>1</sup>

Still, learning _how_ I can use them to manage state without re-rendering a component when it changes can be useful, which is exactly what I did here.

Refs also allow you to reach _up_ in React, at least if viewed from a certain perspective, and knowing about that is handy.

NB: I also put this into a Stackblitz if you’re interested in playing around<sup>2</sup>

## Resources

-   <sup>1</sup> [Refs and the DOM | React](https://reactjs.org/docs/refs-and-the-dom.html)
-   <sup>2</sup> [refs-in-sync | StackBlitz](https://stackblitz.com/edit/refs-in-sync)
