---
title: 'Error Handling: Uncaught TypeError: this.searchDB is not a function'
date: '2018-12-12'
publish: '2018-12-12'
category: ['programming']
tags: ['bind', 'error handling', 'react', 'this']
---

While working on a React project, I came across the following error: `Uncaught TypeError: this.searchDB is not a function`

`searchDB` is a method on my component that is called when certain buttons are clicked.

In retrospect, this is a common issue that comes from a failure to appropriately supply context.

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.searchDB = this.searchDB.bind(this);
    this.handleClick = this.handleClick.bind(this); // This was the missing critical line
  }

  handleClick (type, param) {
    if (type === "Search") {
      this.searchDB(param);
    }
    else console.log('No type managed --> ', type);
  }

  searchDB (query) {
    console.log(`The search query is --> `, query);
  }
  render () {
    ...
  }
}
```

Since the `searchDB` method was being called _when_ a button was clicked, the context was set by the handleClick, which was the window -- _not_ the component itself.

The window does not have a function `searchDB`, however, so the fact that it is not defined is not at all surprising.

The handleClick method wasn’t bound to the current context and so when it invoked `this.searchDB()` it was in fact not defined as a function.

This is a great example of why looking at the stacktrace is helpful. I was initially focused on the `searchDB` method and trying to understand if I had a typo. The problem, however, lay in what was invoking the searchDB. I needed to trace back to find and resolve the issue.

Hopefully this will help you avoid a similar issue!
