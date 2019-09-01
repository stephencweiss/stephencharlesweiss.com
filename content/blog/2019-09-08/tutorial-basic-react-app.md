---
title: 'Getting a Basic React App Up And Running'
date: '2019-09-08'
category: ['programming']
tags: ['react','tutorial','webpack','babel']
---

At this point, I feel fairly comfortable with React, but when I had to go back to the basics and get an app up and running this weekend, I found I’d forgotten more than I thought. 

Since I’m stubborn (stupid?) and didn’t want to use `npx create-react-app` to bootstrap, I had to look up a few things.<sup>1</sup> Below are my notes on what I learned when it comes to getting a basic React app up and running. 

A quick preview on what you can expect to learn by reading on: 
1. How React can fit within a larger website (i.e. how to blend HTML with React)
2. How to fit _multiple_ React components (which could be expanded into full fledged features in their own right)
3. How to bundle React using Webpack and Babel

## Adding React To A Website
The React team has a great page on getting React into an existing website quickly.<sup>2</sup> Unfortunately, in my case, I had nothing going, so I needed to start even farther upstream than that.

Let’s start with the absolute basics:
1. Make a directory for your project, `mkdir <the-name-of-my-project>`
2. Navigate into it, `cd <the-name-of-my-project>`
3. Initialize the repo with `git` and `npm` (`git init` and `npm init`).
4. Scaffold a basic app structure with some files and folders. Here’s what mine looked like
```shell
.
├── .gitignore
├── .prettierrc
├── dist
│   └── index.html
├── package-lock.json
├── package.json
├── src
│   └── index.js
└── webpack.config.js
```

### Setting up the HTML
At a really basic level, React works by overwriting a single element in the DOM. The convention is that this is done by having an empty `<div>` element with an `id=“app”` that React-DOM will be able to identify and overwrite.  

I deviated ever-so-slightly for purposes of explicitness (which will become more clear when I add a _second_ React component later). This is my first `dist/index.html`
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Toast-Demo</title>
</head>
<body>
  <div id="React-App"></div>
  <script src="bundle.js"></script>
</body>
</html>

```

With our HTML ready, we now need an actual React component. 

(We’ll also come back to the `<script>` tag.)

### Our First React Component
This is what I put into `src/index.js`
``` javascript
import ReactDOM from ‘react-dom’;
import React from ‘react’;

const HelloWorld = () => {
  return (
    <div>
      Hello world!
    </div>
  )
};

ReactDOM.render(
  <HelloWorld/>, document.getElementById(‘React-App’)
)
```

From this, it’s easy to see how ReactDOM renders the `HelloWorld` component — it _replaces_ what’s in the document (`index.html`) at the location of the Id, `’React-App’`.

If at this point, we tried to open the `index.html` in our browser, we’d see a blank screen. This is because even though React replaced the `div` in the DOM, it can’t be interpreted.  
- [ ] Get someone to spot check this line.

We need to build our app and create the bundle.

### Using Webpack and Babel To Bundle Our App
Babel is a Javascript compiler — an application that converts code written in future versions of Javascript and translates it down to browser compatible versions.<sup>3</sup> A few of the ways Babel can help are highlighted on the first page of their Docs:
> * Transform syntax  
> * Polyfill features that are missing in your target environment (through [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) )  
> * Source code transformations (codemods)  
> * And more! (check out these [videos](https://babeljs.io/videos.html) for inspiration)  

This is accomplished through a variety of plugins and ladders, but what should be clear is that it’s both _very_ easy to setup and _very_ powerful. 

Webpack uses Babel (in our case) to coordinate the whole process and create a bundle by using it as a loader and specifying certain options. Another convention (similar to `id=“app”` for React) is to call the output of Webpack `bundle`. You can name it whatever you want and specify it within the webpack configurations. It should also be noted that Webpack is _much_ more powerful than what I’m demo-ing here which is meant only to to illustrate how to compile Javascript and JSX files for use in our demo app. 

In the root directory, our `webpack.config.js` file has the following setup: 
``` javascript
const path = require(‘path’)

module.exports = {
  entry: ‘./src/index.js’,
  output: {
    filename: ‘bundle.js’,
    path: path.resolve(__dirname, ‘dist’)
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader’,
        options: {
          presets: [‘@babel/env’, ‘@babel/react’, ]
        }
      },
    ],
  }
}
``` 

Things to note: 
* Entry point - this is what Webpack is looking to bundle
* Output - this is where the product of that bundling process will go (and you can see we’ve named int `bundle.js`). 
* Modules - these are the tools to use in the effort of bundling

The way I’ve set this up to name the presets within the options of the `webpack.config.js`  means that I do _not_ need a `.bablerc` file<sup>4</sup>

### Dependencies
We’re using quite a few dependencies here, so it’s worth looking at the `package.json` 

``` ruby
{
  “name”: “react-playground”,
  “version”: “0.0.1”,
  “description”: “a playground to understand react, webpack, and babel”,
  “main”: “index.js”,
  “scripts”: {
    “test”: “echo \”Error: no test specified\” && exit 1”,
    “build”: “webpack”,
  },
  “keywords”: [ “react” ],
  “author”: “Stephen Weiss <stephen.c.weiss@gmail.com>”,
  “license”: “MIT”,
  “devDependencies”: {
    “@babel/core”: “^7.5.5”,
    “@babel/preset-env”: “^7.5.5”,
    “@babel/preset-react”: “^7.0.0”,
    “@babel/preset-typescript”: “^7.3.3”,
    “babel-loader”: “^8.0.6”,
    “prettier”: “^1.18.2”,
    “webpack”: “^4.39.3”,
    “webpack-cli”: “^3.3.7”
  },
  “dependencies”: {
    “react”: “^16.9.0”,
    “react-dom”: “^16.9.0”
  }
}
```

### Launching The App
Now that the app is configured, we have a React Component, and we’ve set up our Webpack, we’re ready to build.

In the shell, run our script `npm run build` (`npx webpack —config webpack.config.js` also works if you don’t want to install `webpack` as a dependency). 

Once that’s done, you should see a new file, `dist/bundle.js`.

And now, when you open / refresh your application in the browser, it should display our `HelloWorld` component.

![](&&&SFLOCALFILEPATH&&&60B48C95-790D-4736-BA2F-FA6E6807DF31.png)

I promised I’d come back to `<script>` tag: This is the only reason that the app loads. Without it, we’d have a bundle of Javascript, but nothing invoking it. As a result, even though we’ve compiled our app, the client would never have a reason to call it and so would not display our React app. 

## Adding A Second React Component
To add a second React component and blend that into an existing website, we need to make a few changes:
1. Update our `src` directory to include a second React component (both the first React component and second could be extended significantly, this is just a simple example)
2. Update `webpack.config.js` to have multiple entry points
3. Update our `dist/index.html` to note where the different React components should go. 

### Adding A Second React Component 
In the `src` directory, I added an `index2.js` (not a great name, but it’ll do):
```javascript
import ReactDOM from ‘react-dom’;
import React from ‘react’;

const PartDeux = () => {
  return (
    <div>
      PartDeux
    </div>
  )
};

ReactDOM.render(
  <PartDeux/>, document.getElementById(‘React-App-2’)
)
```
It’s another very simple React component that will mount to the `div` with the id `React-App-2` in our `index.html`.

### Modifying Webpack
The `webpack.config.js` file remains large the same with the exception of the `entry` key:
``` javascript
const path = require(‘path’)

module.exports = {
  entry: [‘./src/index.js’, ‘./src/index2.js’, ],
  ...
}
```

### Modifying the HTML
Finally, update the HTML to indicate _where_ the second component will go: 

``` html
<!DOCTYPE html>
<html lang=“en”>
<head>
  <meta charset=“UTF-8”>
  <meta name=“viewport” content=“width=device-width, initial-scale=1.0”>
  <meta http-equiv=“X-UA-Compatible” content=“ie=edge”>
  <title>React-Demo</title>
</head>
<body>
  <h1>
    Here’s my first react entry point
  </h1><div id=“React-App”></div>
  <h1>Here’s my second react entry point</h1>
  <div id=“React-App-2”></div>
  <script src=“bundle.js”></script>
</body>
</html>
```

### Rebundle and Run
Running webpack again and opening up our `index.html` in our browser, I now see: 
![](&&&SFLOCALFILEPATH&&&F4AECFDE-DADF-49FC-BB9F-5DDD93DA681A.png)
Voilá

## Conclusion
Hopefully this demo helps explain how React can mount to the DOM, how to use multiple different React applications within one website and how to orchestrate it all with Webpack and Babel. I know I learned a ton through the process!

This full code for this demo can be found on my Github.<sup>5</sup>

## Footnotes
* <sup>1</sup> [Create a New React App | React](https://reactjs.org/docs/create-a-new-react-app.html)
* <sup>2</sup> [Add React to a Website | React](https://reactjs.org/docs/add-react-to-a-website.html)
* <sup>3</sup> [What is Babel? | Babel](https://babeljs.io/docs/en/)
* <sup>4</sup> [Configure Babel | Babel](https://babeljs.io/docs/en/configuration#babelrc)
* <sup>5</sup> [react-demo | GitHub](https://github.com/stephencweiss/react-demo)

## Resources / Additional Reading
* [Tutorial: How to set up React, webpack, and Babel 7 from scratch (2019)](https://www.valentinog.com/blog/babel/)
* [Add React to a Website | React](https://reactjs.org/docs/add-react-to-a-website.html)
* [Getting Started | webpack](https://webpack.js.org/guides/getting-started/)
* [What is Babel? | Babel](https://babeljs.io/docs/en/)
