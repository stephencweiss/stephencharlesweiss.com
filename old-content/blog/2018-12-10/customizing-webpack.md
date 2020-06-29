---
title: 'Customizing webpack'
date: '2018-12-10'
category: ['programming']
tags: ['configuration', 'environmental variables', 'package.json', 'webpack']
---

I've looked up how to customize my Webpack a number of times, so I'm documenting here to serve as a reference and template for future projects. Hopefully you find it useful too!

# Webpack Modes

Webpack comes with three standard [modes](https://webpack.js.org/concepts/mode/). The modes (Development, Production, and None) conveniently provide a series of default configurations.† To see the default settings that come with each mode, follow the link above.

# Package.json Script

Being able to specify which mode I want to use on compilation is helpful, so I've gotten in the habit of configuring both as scripts available in my projects.

```json
//package.json
...
"scripts": {
    ...
    "bundle:dev": "webpack --watch --debug --mode='development'",
    "bundle:prod": "webpack --watch --mode='production'",
}
...
```

# Customizing Default Configurations

Sometimes, you may want to customize beyond the default values. Whether you're creating your own configuration (and using the `None` mode) or would like to augment a built-in mode:

1. Create your own config file with the basics
2. Define a function that will modify the parts of the default mode that you want to change by mode

```javascript
//webpack.config.js
const path = require('path')
const SRC_DIR = path.resolve(__dirname, 'client')
const DIST_DIR = path.resolve(__dirname, 'public')

var config = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        filename: 'bundle.js',
        path: DIST_DIR,
    },
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        // settings that are customized *beyond* the defaults for the development mode
        // config.devtool = 'source-map';
        console.log(`Development mode!`)
    }
    if (argv.mode === 'production') {
        // settings that are customized *beyond* the defaults for the production mode
        console.log(`Development mode!`)
    }
    return config
}
```

We'll start with a baseline that we will _always_ want our Webpack configuration to have.

Then, in step two, we'll add specific modifications based on the mode, which is defined through an argument passed into the webpack command (e.g., `\--mode='production'`).

# Gotchya

## Setting Mode With Node Environmental Variables

One mistake that I made early on while trying to set the mode was to use environmental variables.

This is a common mistake and the Webpack team calls it out specifically on their page describing Modes:

> Please remember that setting NODE_ENV doesn't automatically set mode.

If you're using the `process.env.NODE_ENV` to set your global variables, just be aware that it will _not_ catch the expected modifications to the default Webpack configuration defined in your `webpack.config.js` \-- at least not natively.

† None has _no_ default configurations as the name suggests.
