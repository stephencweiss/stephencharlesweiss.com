---
title: 'Conditionally Render Components in React'
date: '2019-10-26'
category: ['programming']
tags: ['react', 'conditional render', 'ternary']
---

I still remember when I first learned how to conditionally render my React components. It was a light bulb moment. I began seeing new opportunities to use this super power all over the place.

Using it is relatively simple. Let’s take a look at two different approaches within a class component:

1. A ternary within the render’s `return`
2. Variable assignment for a simpler `return`.

## Ternary Approach

When we’re within the return statement of a React component (this is true for both a React class component's `render` lifecycle method or the `return` statement within a functional component), we are able to _evaluate_ Javascript expressions by using `{}`.

This means that we have access to the full power of the language with the notable exception of variable assignment.

It also proves to be fertile ground for ternaries.<sup>[1](#footnotes)</sup><a id="fn1"></a>

For example, let’s look at a React component that will show a form when the user clicks on a button (and presumably hides it if a different button is clicked within the form):

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
    }
  }

  toggleShow = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    return (
      <div className="App">
        {this.state.showForm ? (
          <div>
            form, click to hide
            <button onClick={this.toggleShow}>Hide</button>
          </div>
        ) : (
          <div>
            click to see form
            <button onClick={this.toggleShow}>Show</button>
          </div>
        )}
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

Zooming in on the return statement, it summarizes to this:

```javascript
return this.state.showForm
  ? true /* Show the form */
  : false /* Hide the form, show the button */
```

Here we see that if `showForm` is true, we’ll show the form, if it's not, it'll be the button.

## Variable Assignment

If the component grows in size / complexity, it's quite possible that it may make more sense to extract the logic into the body of the Component (i.e. _outside_ of the `return`):

```javascript
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
    }
  }

  toggleShow = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    let RenderedComponent
    if (this.state.showForm) {
      RenderedComponent = (
        <div>
          form, click to hide
          <button onClick={this.toggleShow}>Hide</button>
        </div>
      )
    } else {
      RenderedComponent = (
        <div>
          click to see form
          <button onClick={this.toggleShow}>Show</button>
        </div>
      )
    }

    return <div className="App">{RenderedComponent}</div>
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

The `return` statement is now much simpler and it's possible to extract the defintiions of our different components into other files to clean this up further and make it easier to read.<sup>[2](#footnotes)</sup><a id="fn2"></a>

## Footnotes

- <sup>[1](#fn1)</sup> Ternaries are the terse if/then/else that take the format of `<boolean evaluation> ? <if true> : <if false>`.
- <sup>[2](#fn2)</sup> I put together a CodeSandbox to demonstrate this final state of [conditional rendering](https://codesandbox.io/s/conditional-rendering-n9thg). Check it out! I also refactored it after writing about setting state in different component types. I now have all three component types [side-by-side for comparison](https://codesandbox.io/s/conditional-rendering-three-ways-0neld).
