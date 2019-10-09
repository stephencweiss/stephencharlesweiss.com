---
title: '"regeneratorRuntime is not defined"'
date: '2019-10-20'
category: ['programming']
tags: ['webpack','regeneratorruntime','error handling']
---
Deciding to not bootstrap my [React-Playground](https://github.com/stephencweiss/react-playground) app is the gift that keeps on giving.

Not only do I have the pleasure of getting to use new technologies of my choosing (today it was authentication with Auth0), but I also get to learn Webpack when something invariably goes wrong.

When I added Toasts, I couldn’t load the CSS styles needed for the toasts because I had misconfigured the CSS Loader.

Today, it was the `regeneratorRuntime`.<sup>[1](#footnotes)</sup><a id="fn1"></a>

Building my app went fine, but when I went to use it, it crashed immediately. 
``` shell
Auth0Context.js:145 Uncaught ReferenceError: regeneratorRuntime is not defined
    at eval (Auth0Context.js:145)
    at Auth0Provider (Auth0Context.js:193)
    at renderWithHooks (react-dom.development.js:16320)
    at mountIndeterminateComponent (react-dom.development.js:18735)
    at beginWork$1 (react-dom.development.js:20084)
    at HTMLUnknownElement.callCallback (react-dom.development.js:362)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:411)
    at invokeGuardedCallback (react-dom.development.js:466)
    at beginWork$$1 (react-dom.development.js:25730)
    at performUnitOfWork (react-dom.development.js:24638)
```

I started by reviewing my code to make sure I hadn’t missed anything. Once I’d convinced myself that the issue didn’t lay with me, I started looking around for others who had faced similar problems.

It turns out that many others had run into this same problem - and they’d fixed it using Babel.

Unfortunately, I’m not using Babel, at least not directly. That is, I don’t have a `.babelrc` file where I”m configuring my plugins and presets.

So, I needed to do it directly in Webpack (this is what I meant about how I get to just keep learning more about Webpack).

Fortunately, Webpack had the answer in their docs:<sup>[2](#footnotes)</sup><a id="fn2"></a>
``` javascript
const path = require(‘path’);
const webpack = require(‘webpack’);

module.exports = {
  ...
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader’,
        options: {
          presets: [‘@babel/env’, ‘@babel/react’],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ...
    ],
  },
};

```

Notice that I only installed `@babel/plugin-transform-runtime` as a dependency (time will tell if I need to add `@babel/runtime`). 

Once done, and I rebuilt my project, the errors evaporated. Woo!

## Footnotes
* <sup>[1](#fn1)</sup> Side note: The `regeneratorRuntime` is a [library from Facebook](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) that is [needed to transpile generator functions](https://babeljs.io/docs/en/babel-polyfill).
* <sup>[2](#fn2)</sup> Webpack’s docs on [babel-loader](https://webpack.js.org/loaders/babel-loader/#babel-is-injecting-helpers-into-each-file-and-bloating-my-code) are filled with gems.


