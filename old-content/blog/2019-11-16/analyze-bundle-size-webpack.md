---
title: 'Analyzing Webpack Bundle Sizes'
date: '2019-11-05'
publish: '2019-11-16'
category: ['programming']
tags:
    [
        'webpack',
        'bundle analysis',
        'bundle size',
        'bloat',
        'code weight',
        'code splitting',
    ]
---

One of the best parts of the javascript ecosystem is the number of packages that are readily available to expedite development. If there’s a feature you’re trying to add to your app, there’s a good chance there’s a library out there for you.

This is not costless however. While you would have to add your own code to get the feature into your app, libraries often offer many more features than what you need and if you’re not tree-shaking or the library doesn’t support it, it’s easy to add quite a bit of weight to your app quickly.

If you’re using `webpack`, there are a number of tools out there to assess the situation and help you make an informed decision whether the library is worth the weight.

`webpack` highlights several in their documentation regarding [code splitting](https://webpack.js.org/guides/code-splitting/#bundle-analysis), but I wanted to document _how_ to use two of them

1. The `webpack-bundle-analyzer`, both regularly and on an ad hoc basis, and
2. The `webpack-visualizer-plugin` for sunburst graphs

## Regular Bundle Analysis

If you’d prefer to see your bundle analysis on every build, modify your `webpack.config.js` such that:

```javascript
//…
const { BundleAnalyzerPlugin } = require(‘webpack-bundle-analyzer’);

module.exports = {
//…
    plugins: [
        //…
        new BundleAnalyzerPlugin()
    ]
}
```

Now, every time you build, it will automatically open a bundle analysis that will look something like:
![](./bundle-analysis.png)

## Ad Hoc Bundle Analysis

On the other hand, this might get annoying to see _every_ time you build. If you can trust yourself to regularly check-in on bundle-size to keep a tabs on things, than this may be sufficient.

According to the [`webpack-bundle-analyzer` docs](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin):

> In disabled mode you can use this plugin to just generate Webpack Stats JSON file by setting generateStatsFile to true.

So, if we modify the `webpack.config.js` to:

```javascript
//…
const { BundleAnalyzerPlugin } = require(‘webpack-bundle-analyzer’);

module.exports = {
//…
    plugins: [
        //…
        new BundleAnalyzerPlugin({
            analyzerMode: ‘disabled’,
            generateStatsFile: true,
            statsOptions: { source: false },
        })
    ]
}
```

We can now add an `npm` script to explicitly call the analyzer when we want it.

```json
//package.json
  "scripts”: {
    “analyze-stats”: “webpack-bundle-analyzer dist/stats.json”
  },
```

If you’d prefer to _not_ modify your `webpack.config.js` to use `webpack-bundle-analyzer`, it’s also possible to simply use two `npm` scripts:

```json
//package.json
  "scripts”: {
    “stats”: “webpack —profile —json > stats.json”,
    “analyze-stats”: “webpack-bundle-analyzer ./stats.json”
  },
```

Note that in the first edition of `analyze-stats`, the file was located at `dist/stats.json` whereas now it’s in the root directory. This is because the `dirt` is our output directory of `webpack` and so that’s where it places everything.

In this new script, we’re explicitly setting the data into the root directory in a file called `stats.json`.

Once these scripts have been set, to see your bundle statistics, run the following scripts in order:

```shell
$ npm run stats
$ npm run analyze-stats
```

## Sunburst Bundle Analysis

Personally, I found the UI for the `webpack-bundle-analyzer` a little difficult to navigate. An alternative is the [webpack-bundle-visualizer](https://github.com/chrisbateman/webpack-visualizer#plugin-usage) which provides a sunburst version of the same data.

Setup is very simple:

```javascript
//…
const Visualizer = require(‘webpack-visualizer-plugin’);

module.exports = {
//…
    plugins: [
        //…
        new Visualizer({filename: ‘../stats.html’}),
    ]
}
```

Again, `webpack` is placing the output in the `dist` folder. In this case, however, I wanted the `stats.html` in the root directory, so provided the relative path to put it there.

This will produce an HTML file, which, although does not automatically open in a browser, can be opened easily and produces a nice interactive “sunburst” chart like the following:
![](./sunburst-analysis.png)

## Conclusion

It's good to know that the tools to keep your code weight manageable are readily available. Even if they require a little configuratin, the payoff in a better user experience seems like a worthy enough reason to pay the cost before things get out of hand.
