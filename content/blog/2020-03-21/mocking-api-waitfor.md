---
title: 'Mocking Async Functions with waitFor'
date: '2020-02-16'
publish: '2020-03-21'
category: ['programming']
tags: ['javascript', 'async', 'mock', 'fake', 'promise', 'setTimeout']
---

Frequently, I find myself needing to mock out (or fake) an asynchronous call to test my API I'm developing. I hate having to remember the process every time - so I'm writing it down.

A while back I was researching how to loop over arrays asynchronously. It turns out there are some nuances (a topic for a future post). In that process, I came across a `waitFor` function that's been quite useful for mocking out an asynchronous call.

Even better, it's one line:

```javascript title="index.js"
const waitFor = ms => new Promise(r => setTimeout(r, ms))
```

It takes a waiting period and returns a promise. The promise takes the `resolve` argument in the new Promise constructor and passes it into a `setTimeout` with the waiting period.

So, how does this work in practice? Let's look at an example:

```javascript title="index.js"
function fakeTimer() {
  return waitFor(50).then(() => console.log(`successfully waited`))
}

fakeTimer()
console.log(`print first`)
```

As you might expect, "print first" is ... printed first, though eventually the promise is resolved and "successfully waited" will be printed.

This is because the promise was placed into the event loop,<sup>[1](#footnotes)</sup><a id="fn1"></a> and when it resolved was popped off.

But what if we want the code to behave more synchronously? Well, we'd need to wrap the entire thing in a function that handles this asynchronisity.

```javascript title="index.js"
async function simpleAsync() {
  await fakeTimer()
  console.log(`print after`)
}
```

Now, we're successfully waiting for the promise in `fakeTimer` to resolve _before_ printing the `console.log`.

As I mentioned, I found this while researching asynchronous mapping of arrays. To see that in practice, we can look at an example of an array with three elements:

```javascript title="index.js"
async function fakeAsync() {
  await Promise.all(
    [1, 2, 3].map(async num => {
      await waitFor(50).then(() => {
        console.log(num)
      })
    })
  )
  console.log('Done')
}
```

When we execute:

```javascript
fakeAsync()
// 1
// 2
// 3
// Done
```

Here, instead of _simply_ waiting, we're looping over an array. Each element is processed _before_ we get to the last console log for "Done" (thanks to the `await`s).

I created a [repl.it for this called "fake async"](https://repl.it/@stephencweiss/fake-async) to make it easier for me to remember and play with these ideas in the future.

## Footnotes

- <sup>[1](#fn1)</sup> [What the heck is the event loop anyway? by Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ) is one of the best talks I've seen on the topic. I return to it frequently when I need to remember the details.
