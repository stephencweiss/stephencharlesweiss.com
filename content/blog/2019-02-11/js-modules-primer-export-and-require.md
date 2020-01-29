---
title: "JS Modules Primer: Export & Require"
date: '2019-02-11'
category: ['programming']
tags: ['modules','export', 'require']
---

# Import/Export vs. Require in JS
On more than one occasion I’ve found myself looking up the MDN page on imports and exports for modules in Javascript.

This is often preceded or followed shortly by an investigation into the different between the import/export and requirement statements in Javascript.

Hopefully this is the last time that I have to do this exercise, but either way, I wanted to have a single place to look.
- - - -
# What Are Modules?
Preethi Kasireddy wrote a great guide for freeCodeCamp on Modules - what they are and why we use them. Read it. I particularly liked her analogy for *how* to think about modules:

> Good authors divide their books into chapters and sections; good programmers divide their programs into modules.

Modules have several advantages:
1. They break up code into smaller parts, making it easier to reason through
2. We make our dependencies explicit (they’re listed at the top by convention)

# So How Do We Use Modules In Node.js?
The most common (pun intended) way I’ve found to import a module is with the CommonJS approach. This is where Javascript *exports module* objects which are then accessible for other modules to *require*.

ES6 added import / export statements as well. This standard was set without native support in Javascript engines and so tools like Babel would transpile an `import` into a `require` statement.

To use modules natively in Node.js, we have several options (as explained by [Axel Rauschmayer](http://2ality.com/2018/12/nodejs-esm-phases.html)) at the end of 2018:
1. Use the `esm` library by John-David Dalton
2. Run Node.js with the `—experimental-modules` flag

**The short answer then is: If you’re not transpiling with Babel or Webpack, using the `esm` library or the `--experimental-modules` flag, you *need* to use `require` statements.**

# Modules In Node.js: Exports & Require
In the Node.js context, we have a few different ways to "bundle" a module together to be reference-able by other modules.
* Named exports
* Default Exports

There’s also distinctions between `export` and `module.exports` that are worth discussing.

Let’s see these in action!

# Require
In order to understand exports, it’s helpful to think about the `require` statement.
A `require` statement tells a module *what* to consume.  These can be built into Node.js (as in the case of `fs` below), local (like the ones we’ll be defining later in `utils.js`), or community libraries (stored in the `node_modules` directory).

In this example, we’re declaring that our file has a dependency on Node’s filesystem module (`fs`) and we will be accessing it through the variable `fs`.
```js
// main.js
const fs = require('fs');
fs.readFile('./file.txt', 'utf-8', (err, data) => {
  if (err) {console.error(err)}
  else {console.log(`data: `, data)}
})
```

# The Other Half Of The Equation: Exports
There are a number of ways to export modules for access but they can be bucketed into `exports` and `module.exports`.
Simply put - `exports` is an alias for `module.exports` with the caveat that assigning *directly* to `exports` will break the link to `module.exports` (More on this below.)

The number of ways to export functions, classes, generators, etc. are many and varied. [MDN](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) has the full list of acceptable syntax (copied below for convenience):
```js
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}

export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;

```

# Named exports
* Can have multiple per module
* In ES6 syntax it would be `javascript> exports.fn = () => {}`
* In ES5 and before it would be `javascript> export function fn(){}`
* Can also be listed together at the bottom of a file

## Exporting Functions
The following shows three different ways to export functions.
The first two use function declaration and function expressions. The third is a mixture but uses the module.exports to bundle the functions for access later.
```js
// utils.js
// named function declaration
export function add(x, y) { return x + y; }
export function diff(x, y) { return x - y; }

// alternative approach with ES6 function expressions
exports.add = (x, y) => { x + y; }
exports.diff = (x, y) => { x - y; }

// alternative approach with module.exports
function add(x, y) { return x + y; }
const diff = (x, y) => { x - y; }
module.exports = { add, diff };
```

Accessing these functions would be done using a `require` statement (unless using the `--experimental-modules` flag or `esm` library).

For example, regardless of how we export the `utils` module, we could import it into `main.js` in the following way:
```js
// main.js
const utils = require('./utils')
console.log(`add 2 and 3 --> `, utils.add(2,3))
console.log(`the difference between 3 and 1 -->`, utils.diff(3,1))
```

Alternatively, if we did not want to have to reference the `utils`namespace, we could do the following:
```js
// main.js
const {add, diff} = require('./utils')
console.log(`add 2 and 3 --> `, add(2,3))
console.log(`the difference between 3 and 1 -->`, diff(3,1))
```
This is possible because we used named exports.

## Exporting Classes
If we’re not exporting functions, we may want to export Classes, or objects, etc.
Here’s how that could look:
```js
// classes.js
class Sample {
  doSomething() {console.log(`done`)}
}
module.exports = Sample // with only one property, do not use brackets

// alternative example with multiple classes
class Sample {
  doSomething() {console.log(`done`)}
}

class Second {
  doSomethingElse() {console.log(`yessir`)}
}
module.exports = {Sample, Second}
```
These can then be accessed in the following way:
``` javascript
// main.js
// single class example
const Sample = require('./classes')
const sample = new Sample;
sample.doSomething();

// multiple class example
const Classes = require('./classes')
const sample = new Classes.Sample;
const second = new Classes.Second;
sample.doSomething()
second.doSomethingElse();
```
# Default Exports
There’s also a Default option.
If you’re only exporting a single method, class, etc, this can make sense as you can name it on import.
```js
// utils.js
export default function add(x,y) { return x + y; }
```

This could then be imported as:
```js
// main.js
const utils = require('./utils');
console.log(utils.default(2,3))
```

If you have multiple exports, however, while I prefer naming all exports, there’s the option to mix and match.

That said, there can only be one default per export in a module.

For example:
``` js
// utils.js
// making the add method our default
export default function add(x, y) {
  return x + y;
}
export function diff(x, y) {
  return x - y;
}

const PI = 3.1415
export const area = (r) => {
  return PI * (r ** 2)
}
export const circumference = (r) => {
  return 2 * PI * r;
}
```
These could then be imported into `main.js` and accessed in the following way:
``` js
const utils, { diff, circumference, area} = require('./utils')
utils.default(2,3) // this is the add method
diff(5,2)
```

# Breaking Things aka What Won’t Work
From the Node.js docs
> `[exports]` allows a shortcut, so that `module.exports.f = …`can be written more succinctly as `exports.f = …`. However, be aware that like any variable, if a new value is assigned to `exports`, it is no longer bound to `module.exports`.
Consequently the following will not work.

## Mix & Match
While it’s okay to mix Default and Named exports, mixing `exports` and `module.exports` is not going to work well.
For example:
```js
// utils.js
exports.add = (x, y) => { return x + y; }

diff = (x, y) => { return x - y; }
module.exports = {diff}
```

## Assigning to Exports
```js
// utils.js
const add = (x, y) => { return x + y; }
exports = add; // add won't be a function when the module is required later.
```

# Conclusion
Hopefully this was helpful and serves as a good jumping off point for anyone else who might have been confused about what modules are and how to use them.

I definitely am indebted to all of the people who came before to write down their thoughts.

Articles:
* [How to publish native ES modules backwards compatible with Node < 8.5.0](https://medium.com/@dandv/publishing-native-es-modules-with-node-v8-5-0-730736e0f612)
* [Using import/export in node.js with esm – Jamis Charles – Medium](https://medium.com/@jamischarles/using-import-export-in-node-js-with-esm-7ce9153ff63)
* [Getting started with Node.js modules: require, exports, imports and beyond | Adrian Mejia Blog](https://adrianmejia.com/blog/2016/08/12/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/)
* [JavaScript Modules: A Beginner’s Guide – freeCodeCamp.org](https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc)
* [ECMAScript modules in Node.js: the new plan](http://2ality.com/2018/12/nodejs-esm-phases.html)
* [javascript - Using Node.js require vs. ES6 import/export - Stack Overflow](https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export)
* [Modules | Node.js v11.9.0 Documentation](https://nodejs.org/api/modules.html)