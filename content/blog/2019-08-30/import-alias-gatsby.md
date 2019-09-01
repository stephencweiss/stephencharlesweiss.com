---
title: 'Import Aliases in Gatsby'
date: '2019-08-30'
category: ['programming']
tags: ['webpack', 'gatsby']
---
I wanted to be able to import JSX elements I defined in a Gatsby project into markdown files.

Very quickly I got tired of writing out the absolute paths:
```javascript
import Component from “../../../src/Shared/Component”;
```

Ideally, it would be much simpler:
```javascript
import Component from “Shared/Component”;
```
Shared communicates immediately that it’s a locally defined component.

I found a great step-by-step tutorial from Jan Hrubý @ Mrozilla which walked me through the steps.<sup>1</sup>

Jan’s tutorial walks through configuring Gatsby’s Webpack (at least as much as we’re able to since Gatsby doesn’t expose the config file for changes), ESlint, and VSCode’s auto complete.

I didn’t have his issues with ESlint, so I was able to skip that step. 

# Configuring Gatsby’s Webpack
While Gatsby doesn’t expose its Webpack configuration, they do provide an `onCreateWebpackConfig` hook that can be customized within `gatsby-node.js`. 

Using the hook, we can add a resolver object, just as we would within a `webpack.config.js`. 

For example, here’s a `webpack.config.js` file I have from another project:
```javascript
Const path = require(‘path’);

module.exports = {
    commonResolve: {
        alias: {
            /* [...] */
            Shared: path.resolve(__dirname, ‘src/Shared’),
            /* [...] */
```

In a Gatsby project, add the following lines to the `gatsby-node.js`:
```javascript
const path = require(“path”);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        “Shared”: path.resolve(__dirname, “src/Shared”)
      }
    }
  });
};
```
 
The Gatsby docs also note other ways you may want to modify the Webpack config.<sup>2</sup>


# Footnotes:
* <sup>1</sup> [How to set up import aliases for Gatsby.js | mrozilla](https://www.mrozilla.cz/blog/gatsby-eslint-vscode-import-alias/)
* <sup>2</sup> [Adding a Custom webpack Config | GatsbyJS](https://www.gatsbyjs.org/docs/add-custom-webpack-config/#absolute-imports)
