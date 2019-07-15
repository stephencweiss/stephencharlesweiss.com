---
title: "Error Handling: Jest with Babel"
date: '2018-12-16'
category: ['programming']
tags: ['babel','error handling','jest']
---

Trying to run tests with Jest, I got the following error: `Requires Babel "^7.0.0-0", but was loaded with "6.26.3"...`

Looking at the stack trace (in full at the end of this post), however, there were _only_ mentions of `@babel/core` and `babel-core`.

That though, turns out to have been the problem and it's a known problem.

The Jest Team actually addresses this specific problem in their Getting Started documentation for [using Babel](https://jestjs.io/docs/en/getting-started.html#using-babel).

In a big yellow attention box, they write:

> Note: If you are using Babel version 7 then you need to install babel-jest, babel-core@^7.0.0-bridge.0 and @babel/core with the following command:
>
> `yarn add --dev babel-jest babel-core@^7.0.0-bridge.0 @babel/core regenerator-runtime`
>
> You will need to use babel.config.js in order to transpile node_modules. See https://babeljs.io/docs/en/next/config-files for more information.
>
> You can also see the example in the Jest repository: https://github.com/facebook/jest/tree/master/examples/babel-7

Another reason to start with the official docs. They often hold the answers!

# Why The Error Happens
Okay, so the Jest team is aware of the problem, but what is actually happening and what is `babel-core@^7.0.0-bridge.0`?

When the babel team upgraded to `v7`, they changed the syntax for their updates from `babel-core` (`v6`) to `@babel/core` (`v7`).

This meant that every package that used `babel` as a peer dependency would be forced to make a breaking change to update along with Babel.

The Babel team created the problem with their name change. They also created a fix. That's what `babel-core@^7.0.0-bridge.0` does.

Instead of forcing all package maintainers that used Babel as a peer dependency to update their package, the bridge allows them to keep using Babel without pushing a breaking change.

# Stack Trace

```bash
FAIL  jestTests/app.test.js
  ● Test suite failed to run

    Requires Babel "^7.0.0-0", but was loaded with "6.26.3". If you are sure you have a compatible version of @ba
bel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace
 of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is call
ing Babel. (While processing preset: "/Users/Stephen/Documents/_coding/matilda/node_modules/@babel/preset-env/lib
/index.js")

 at throwVersionError (node_modules/@babel/helper-plugin-utils/lib/index.js:65:11)
      at Object.assertVersion (node_modules/@babel/helper-plugin-utils/lib/index.js:13:11)
      at _default (node_modules/@babel/preset-env/lib/index.js:154:7)
      at node_modules/@babel/helper-plugin-utils/lib/index.js:19:12
      at node_modules/babel-core/lib/transformation/file/options/option-manager.js:317:46
          at Array.map (<anonymous>)
      at OptionManager.resolvePresets (node_modules/babel-core/lib/transformation/file/options/option-manager.js:275:20)
      at OptionManager.mergePresets (node_modules/babel-core/lib/transformation/file/options/option-manager.js:264:10)
      at OptionManager.mergeOptions (node_modules/babel-core/lib/transformation/file/options/option-manager.js:249:14)
      at OptionManager.init (node_modules/babel-core/lib/transformation/file/options/option-manager.js:368:12)
      at File.initOptions (node_modules/babel-core/lib/transformation/file/index.js:212:65)
      at new File (node_modules/babel-core/lib/transformation/file/index.js:135:24)
      at Pipeline.transform (node_modules/babel-core/lib/transformation/pipeline.js:46:16)
```