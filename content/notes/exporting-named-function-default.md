---
title: 'Exporting A Named Function As Default'
date: '2019-10-13'
publish: '2019-10-13'
category: ['programming']
tags: ['javascript', 'exports', 'function expression', 'function declaration']
---

Back in February I wrote a [primer on exports and require](https://www.stephencharlesweiss.com/2019-02-11/js-modules-primer-export-and-require/). While the primer was helpful, one piece that never quite clicked, was how to export a React component as the default without splitting the export statement from the component definition.

The reason for that is that I typically define my components as function expressions, not function declarations.

For example:

```javascript
const MyComponent = (props) => {
    /* ... */
}
export default MyComponent
```

There are some nice features of this approach, but I wanted to refactor to export in line.

This doesn’t work:

```javascript
export default const MyComponent = (props) => {
  /* ... */
}
```

You’ll get an error: “Expression expected”

Nor does this:

```javascript
export default MyComponent = (props) => {
    /* ... */
}
```

Here you’ll get “MyComponent is not defined.”

The answer is fairly straight forward - use a (named<sup>[1](#fn1)</sup><a id="sup1"></a>) function declaration

```javascript
export default function MyComponent(props) {
    /* ... */
}
```

Voilá. All very straight forward if I just spent

## Footnotes

-   <sup>[1](#sup1)</sup><a id="fn1"></a> Naming the function will make it easier for debugging purposes by assigning a name in the stack trace (as opposed to “anonymous”).
