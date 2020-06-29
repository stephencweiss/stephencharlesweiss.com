---
title: 'React’s StrictMode'
category: ['programming']
tags: ['react', 'strict mode']
date: '2019-10-26'
publish: '2019-11-05'
---

As React continues to upgrade its API, there are parts the team is working to deprecate.

If you want to make sure your app stays up to date with the current spec and receive warnings when you’re using deprecated methods - you can wrap your entire app (or just parts of it) with a component: `<React.StrictMode>`

For example, imagine the root of your app as the following:

```javascript
import React from “react”;
import { render } from “react-dom”;
import SearchParams from “./SearchParams”;

const App = () => (
    <div id=“main-div”>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
);

render(<App />, document.getElementById(“root”));
```

We can wrap the entire app:

```javascript

const App = () => (
  <React.StrictMode>
    <div id=“main-div”>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  </React.StrictMode>
);
```

Or just a part (e.g., `<SearchParams/>`:

```javascript
const App = () => (
  <div id=“main-div”>
    <h1>Adopt Me!</h1>
    <React.StrictMode>
      <SearchParams />
    </React.StrictMode>
  </div>
);
```
