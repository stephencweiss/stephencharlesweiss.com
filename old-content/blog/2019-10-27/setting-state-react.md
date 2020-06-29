---
title: 'Setting State In React Components'
date: '2019-10-27'
category: ['programming']
tags:
    [
        'react',
        'state',
        'class component',
        'function component',
        'pure component',
    ]
---

There are three main types of React Components. There are also (with the introduction of hooks in 16.8) three different ways to define / set state.

## Class / Pure Components

The types of components are very similar, though with key differences that should be borne in mind when choosing between them.<sup>[1](#Footnotes)</sup><a id="fn1"></a>

There are also two different ways to set state.

With a constructor:

```
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
  }
  ...
}
```

Without a constructor:<sup>[2](#Footnotes)</sup><a id="fn2"></a>

```
class ClassComponent extends React.Component {
  state = {
    showForm: false
  }
  ...
}
```

While these examples are for Class Components, the same syntax would work for a Pure Component (as long as it met the guidelines for what a pure component should be).

## Function Components

I haven’t written a class component in months (which was part of the impetus to even remind myself of how they work) because I can now do almost everything I’ve wanted with a functional component… more simply.

For example, the same state within a functional component would be:

```javascript
function MyComponent (props){
  const [showForm, setShowForm] = useState(false)
  ...
}
```

## Final Thoughts

The big thing to remember about class components is that they need to be bound. Arrow functions receive their context at time of definition, not invocation, so there’s no need to bind them. There’s also no need to bind a `setState` function from the `useState` hooks.

All of which, again, makes me love hooks more and more.

## Footnotes

-   <sup>[1](#fn1)</sup> [reactjs - React.Component vs React.PureComponent - Stack Overflow](https://stackoverflow.com/questions/41340697/react-component-vs-react-purecomponent)
-   <sup>[2](#fn2)</sup> The fact that we do not need a constructor appears to be due to the introduction of class instances in EcmaScript7. Source: [Speed up development with some and ES7 features 🤘 | React Made Native Easy](https://www.reactnative.guide/6-conventions-and-code-style/6.4-es7-features.html)
