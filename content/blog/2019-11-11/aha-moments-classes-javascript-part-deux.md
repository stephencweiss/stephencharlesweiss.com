---
title: 'Aha Moments With Classes - Part Deux'
date: '2019-10-31'
publish: '2019-11-11'
category: ['programming']
tags:
  ['javascript', 'classes', 'this', 'lexical environment', 'execution context']
---

Recently I wrote about [my aha realization of what exactly we’re doing when we pass the props that a class constructor receives to super](../../2019-11-09/aha-moments-classes-javascript).

In the same vein, today I realized what it means to actually bind a function to a class within the constructor / why it works.

First, what am I talking about?

Imagine a simple React class component that renders a number and a button. The button has a click handler which is supposed to increase the value by 1 on each click:

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { val: undefined }
  }

  handleClick() {
    const { value } = this.state
    this.setState({ value: value + 1 })
  }

  render() {
    const { value } = this.state
    return (
      <>
        <div>Value: {value}</div>
        <button onClick={this.handleClick}>Increment</button>
      </>
    )
  }
}
```

The problem is that _within_ the `handleClick` method right now, `this` is _not_ the class.

Two ways to solve it:

1. Bind the function to the class to persist the context
2. Convert the function to an arrow function to take advantage of the runtime context

# Bind The Function

Binding functions is the original way to address the problem that the `handleClick` has a own execution context.

The problem is then that the `this` referred to within `handleClick` is _not_ the `this` of the class and therefore has no concept of the variable `state`

To remedy this we can bind it to the class constructor:

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { val: undefined }
    this.handleClick = this.handClick.bind(this)
  }

  handleClick() {
    /* ... */
  }
  /* ... */
}
```

The reason _this_ works is that the `this` inside of the `bind` (and actually the one to the left of the `handleClick`s as well) is the context of the the class constructor which _is_ aware of the state property.

Said another way: the `this` in the constructor is the class while the `this` within the `handleClick` is the function.

# Arrow Functions

Arrow functions make the binding of functions _to_ the class unnecessary because arrow functions take on the `this` of the enclosing lexical scope.<sup>1</sup>

Because of that, assign an anonymous (or named) arrow function to the variable `handleClick` and you will not need to bind at all:

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { val: undefined }
  }

  handleClick = () => {
    /* ... */
  }
  /* ... */
}
```

## Footnotes & Additional Reading

- <sup>1</sup> [Arrow function expressions | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Lexical Environments | ECMA](https://www.ecma-international.org/ecma-262/6.0/#sec-lexical-environments)
- [Execution Contexts | ECMA](https://www.ecma-international.org/ecma-262/6.0/#sec-execution-contexts)
