---
title: 'Property Accessors And Typescript'
date: '2019-10-28'
publish: '2019-11-06'
tags: ['typescript', 'javascript', 'property accessors', 'static type checking']
category: ['programming']
---

Came across an interesting example of a rarely used feature (at least for me) in Javascript creating unexpected results with Typescript: dynamic property accessors.

Property Accessors (dot and bracket notation) are not always side-effect free.<sup>1</sup> For example, getters there’s nothing limiting a getter from mutating a value before it’s retrieved.

If you’re using Typescript and you want to assure Typescript that the value being accessed is the same each time, you need to assign it to a variable (e.g., `val` in the example below). That’s how to communicate to Typescript that the value is the same each time it’s referenced.

Here’s a simple example to demonstrate how getters and setters can overwrite the property values:

```javascript
class C {
    i = 0
    get q() {
        return ++this.i
    }
    set q(val) {
        this.i = val
    }
}

const c = new C()
console.log(c.q) // 1
console.log(c.q) // 2
console.log(c.q) // 3
console.log(c.q) // 4

const val = c.q // static assignment
console.log(val) // 5
console.log(val) // 5

c.q = 10 // setter
console.log(c.i) // 10
```

## Footnotes

-   Background reading for this post included [Property accessors | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors), [Property getters and setters | Javascript.info](https://javascript.info/property-accessors), and [Classes | TypeScript](https://www.typescriptlang.org/docs/handbook/classes.html)
