---
title: 'What Is `require.resolve` And How Does It Work?'
date: '2019-07-13'
category: ['programming']
tags: ['javascript', 'node', 'require', 'relative path']
---
In order to understand `require.resolve`, part of the Node API, we must first understand its context. Namely, the `require` module and how it fits within the realm of import/export and require/module.export of modules in Javascript.

At the top of many Javascript files, we import libraries to use (e.g., Lodash, React, etc.) and / or other local files that export modules (e.g., a react component or a utility function).

For example, if we wanted to import modules to use, we may write something like the following:
```javascript
import React from 'react'; // a default exported module from a library
import * as _ from 'lodash'; // a name space for all exported modules from a library
import { Link } from 'gatsby'; // a named exported module from a library
import Layout from '../components/Layout'; // a local default exported module
```

As I noted previously in my primer for imports / exports, these will all need to be transpiled as no JS engine yet supports imports (but that’s what Babel, Webpack, etc. are for). <sup>1</sup>

Alternatively, we could write the following:
```javascript

var React = require('react');
var _ = require('lodash')
var { Link } = require('gatsby')
var Layout = require('../components/Layout')
```

Sometimes, however, we just want the path to a file.  This is more commonly the case on the server side. In the past, I’ve used `path.join(__dirname, "module-i-am-looking-for")` to get the path using node’s `path` module.

```javascript
var fs = require('fs');
var path = require("path");

// "__dirname" provides the absolute path to the current module directory.
console.log( fs.readFileSync (path.join( __dirname, "module-i-am-looking-for.js") ) );
```

There’s an alternative, however. It’s the `require.resolve` API. According to the Node documentation), the `require.resolve` “use(es) the internal `require()` machinery to look up the location of a module, but rather than loading the module, just return(s) the resolved filename.” <sup>2</sup>

```javascript
var fs = require('fs');

// "__dirname" provides the absolute path to the current module directory.
console.log( fs.readFileSync (require.resolve("module-i-am-looking-for.js") ) );
```

As Ben Nadel notes, there’s inherently more overhead in this approach, but from a readability perspective, there are some significant wins here.<sup>3</sup>

## Footnotes
* <sup>1</sup> [JS Modules Primer: Export & Require | /* Code Comments */](https://www.stephencharlesweiss.com/2019-02-11/js-modules-primer-export-and-require/)
* <sup>2</sup> [Modules | Node.js v12.6.0 Documentation](https://nodejs.org/api/modules.html#modules_require_resolve_request_options)
* <sup>3</sup> [Using require.resolve() To Calculate Module-Relative File Paths In Node.js | Ben Nadel](https://www.bennadel.com/blog/3243-using-require-resolve-to-calculate-module-relative-file-paths-in-node-js.htm)


