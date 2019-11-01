---
title: 'Aha Moments With Classes In Javascript'
date: '2019-10-30'
publish: '2019-11-09'
category: ['programming']
tags: ['oop', 'classes', 'javascript', 'prototype', 'inheritance']
---

When we define a class component as a derivation of a base class, this gives us access to all of the base class’s public (and protected, though not private) methods.

It also means that calling the super’s constructor (the super being the class from which our class is being derived) before accessing `this`.

```javascript
class Base {
    constructor(props) {
        this.props = props
    }
    print() {
        console.log(JSON.stringify(this.props, null, 2));
    }
}

class Extension extends Base {
    constructor(props)
    print(){
        console.log(`extension version: `, JSON.stringify(this.props, null, 2))
    }
}

const base = new Base({name: 'example', function: 'none'});
const example = new Extension({name: 'example', function: 'none'});
base.print();
example.print();

```

In the above example, `Extension` will error because we're trying to access `this` in the `print` method but we do not call pass the props (which is the only named argument) to the `super`.

At runtime, you’ll see the following error:

```
Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    at new Extension (<anonymous>:11:16)
    at <anonymous>:19:17
```

The fix is to call `super(props)` within the `constructor`:

```javascript
class Extension extends Base {
  constructor(props) {
    super(props)
  }
  print() {
    console.log(`extension version: `, JSON.stringify(this.props, null, 2))
  }
}
```

In this particular case, there’s very little reason to actually extend `Base` since `Extension` provides its own `print` method.

Alternatively, however, we could have truly extended the functionality of `Base` with additional methods that call the `Base` version of `print` from within `Extension`.

That raised the question: how exactly do you call the base classes' methods from _within_ a class?<sup>[1](#footnotes)</sup><a id="fn1"></a>
For example:

```javascript
class Extension extends Base {
  constructor(props) {
    super(props)
  }
  print() {
    return `extension version: `, JSON.stringify(this.props, null, 2)
  }
  baseMethod() {
    return `extension version 1: ${Base.prototype.print()}` // will not work because of context
  }
  secondMethod() {
    return `extension version 2: ${Base.prototype.print.call(this)}` // add context
  }
  altApproach() {
    return `extension version 3: ${super.print()}` // es6 approach
  }
}
```

In this case, we have defined `print` on the `Extension` class, but can still access the `Base` versions through `.call` and the ES6 `super` approach.

All of this came into view when I typed something I've written hundreds of times before:

```javascript
class MyClass extends React.Component {
  constructor(props) {
    super(props) // pass props to React.Component, aka give React access to the props with which we called `MyClass`
  }
}
```

The difference this time was that I realized _what_ I was doing by deriving `MyClass` from `React.Component` and the role `super` played in passing the props along to React.

I don't know how many times I've written this without really considering what it meant even though the [React docs](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) try to call it out:

> ```javascript
> class Clock extends React.Component {
>   constructor(props) {
>     super(props)
>     this.state = { date: new Date() }
>   }
>
>   render() {
>     return (
>       <div>
>         <h1>Hello, world!</h1>
>         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
>       </div>
>     )
>   }
> }
> ```
>
> Note how we pass props to the base constructor:
>
> ```javascript
>   constructor(props) {
>     super(props);
>     this.state = {date: new Date()};
>   }
> ```

But without a good understanding of _how_ classes worked, this went over my head.

I probably would have missed it again this time had it not been for Brian Holt. In his Intro to React course on Frontend Masters, he said what I've heard so many times before:

> And the constructor will take the props... and you have to say `super(props)`. This is just an odd ritual that you kind of have to do... If you don't do this, React will yell at you, so get used to doing it.

But in between he added color that I’d never heard or really thought about before.

> It [the class] is going to be constructed with properties and you have to hand those properties up to React. Right? So that's what this does. This `super(props)` says hey call the constructor on my parent class which is a `React.Component`.

There’s definitely still a lot for me to learn here... and I think that's just awesome.

## Footnotes

- <sup>[1](#fn1)</sup> [ How to call a parent method from child class in javascript? | Stack Overflow](https://stackoverflow.com/questions/11854958/how-to-call-a-parent-method-from-child-class-in-javascript/41346510#41346510)
