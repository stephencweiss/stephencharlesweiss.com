---
title: 'Mock API Call With Promised setTimeout'
date: '2020-01-06'
publish: '2020-01-16'
tags: ['async', 'promise', 'javascript']
category: ['programming']
---

I was recently working on a project where I wanted a loading state while an API resolved.

Instead of testing with a live API, I wanted to be able to mock it.

An easy way to do that is to create a simple `waitFor` function that returns a `Promise` of a `setTimeout`. Then, await it.

For example:

```javascript
const waitFor = ms => new Promise(r => setTimeout(r, ms))

const onClick = async event => {
  await waitFor(1000)
  //normal handling of event
}
```

Now, we can see what the UI does for 1000ms instead of actually making the call. And, if we want, we can use that time to [freeze the UI by running the debugger](../../2019-09-27/inspect-hoverable-event).
