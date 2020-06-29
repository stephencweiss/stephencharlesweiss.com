---
title: "Mixing ES Modules and CommonJS Modules: Don't"
date: '2020-01-29'
publish: '2020-02-16'
category: ['programming']
tags: ['commonjs', 'es modules', 'javascript', 'import', 'require']
---

Progress toward a unified module system in Javascript is proceeding, but we've yet to arrive at a unified experience.

While we wait, I ran into a bit of a headache with some utility functions I'd written. (I have [written a primer to some of the differences from a tactical perspective between the module standards previously](js-modules-primer-export-and-require). Unfortunately, that didn't save me.)

I almost always start writing functions as ES Modules, however, I noticed some of my code needed to run in Node, so I converted it over to CommonJS.<sup>[1](#footnotes)</sup><a id="fn1"></a>

This is when I ran into problems because I didn't refactor _correctly_.

Let's look at some simple examples and some error messages we might see if we make a misstep.

This:

```javascript:title=utils/myFunc.js
import React from 'react'

export function myFunc(args) {
  /*... */
  return (/*...*/);
}

```

Becomes this:

```javascript:title=utils/myFunc.js
const React = require('react')

function myFunc(args) {
  /*... */
  return (/*...*/);
}

module.exports = { myFunc }
```

Note that not only did we change the export type, but we no longer _import_ `react`. Instead we `require` it. If we don't, we will get the error: `shell> TypeError: Cannot assign to read only property 'exports' of object '#<Object>'`.

Furthermore, the way we handle this with an `index.js` file is also different than when the files are using ESModules.

```javascript:title=utils/index.js
const myFunc = require('./myFunc')

module.exports = { ...myFunc }
```

Because the export from `myFunc` is an object, we need to spread the methods within the _new_ exports object. While we could have simply written `javascript> module.exports = myFunc` in `utils/myFunc.js`, the use of the `{}` makes it more easily extendable in the future.

This raises another potentially easy error to get. Imagine _not_ refactoring to CommonJS modules and instead of a named export, we use a default export:

```javascript:title=utils/myFunc.js
import React from 'react'

function myFunc(args) {
  /*... */
  return (/*...*/);
}

export default myFunc
```

If we tried to reference the `myFunc` in the `module.exports` within `utils/index.js` we'd get the error: `shell> TypeError: Object(...) is not a function`.

This is true in any of these situations:

```javascript:title=utils/index.js
const myFunc = require('./myFunc')
//OR
const myFunc = require('./myFunc').myFunc

module.exports = { myFunc }
//OR
module.exports = { ...myFunc }
```

I'm a little fuzzy on _why_, however, we can resolve this by using the named export:

```javascript:title=/utils/myFunc.js
import React from 'react'

export function myFunc(args) {
  /*... */
  return (/*...*/);
}
```

And then in `utils/index.js`:

```javascript:title=utils/index.js
const myFunc = require('./myFunc').myFunc

module.exports = { getBlurb }
```

In this case, we're pulling the _specific_ function out of the module that's required and then passing it along to the `module.exports` object in `utils/index.js`.

## Conclusion

My key takeaway: Don't mix CommonJS and ES Modules within the same file.

Beyond that, it's just a matter of syntax. Hopefully my enduring this headache and writing about it will help you avoid a similarly painful experience in the future!

## Footnotes

-   <sup>[1](#fn1)</sup> As a reminder, ES Modules are those that are loaded into a file with syntax like:

```javascript
import <module> from <package>
```

Whereas the same function in CommonJS would be:

```javascript
const <module> = require(<package>)
```

[Flavio Copes](https://flaviocopes.com/es-modules/) has a nice introduction on ES MOdules that's worth a read if you would like more info.
