---
title: 'Converting Synchronous Code to Asynchronous'
date: '2019-11-08'
publish: '2019-11-18'
category: ['programming']
tags: ['javascript', 'async/await', 'promises', 'async']
---

I often find myself looking up patterns for converting synchronous code into async variants in Javascript. Whether it’s remembering how exactly Promise chains work or what I need to do to create a Promise - there always seems to be one part that trips me up.

I wanted to document a simple, but I think representative, example of how to take a synchronous function and convert it to be asynchronous in Javascript.

I’ll be using a node function that is reading a file from the file system.

The original function is:

```javascript
const findAssetSync = name => {
  const assetPath = path.join(__dirname, 'assets', name)
  return fs.readFileSync(assetPath, { encoding: 'utf-8' }).toString()
}
```

The first step is to make this function return a promise instead.<sup>[1](#footnotes)</sup><a id="fn1"></a>

```javascript
const findAssetAsync = name => {
  const assetPath = path.join(__dirname, 'assets', name)
  return new Promise((resolve, reject) => {
    fs.readFile(assetPath, { encoding: 'utf-8' }, (err, data) => {
      if (err) reject(err)
      return resolve(data)
    })
  })
}
```

Now, let’s look at how this would actually be used. I’ll start with the synchronous version.<sup>[2](#footnotes)</sup><a id="fn2"></a>

```javascript
const server = http.createServer((req, res) => {
  const route = url.parse(req.url).pathname
  if (routes[route]) {
    const assets = findAssetSync(routes[route])
    res.write(assets)
    res.end()
  } else {
    res.writeHead(404, ‘Not Found’)
    res.end()
  }
})
```

To use the asynchronous version, however, we either need to convert the callback within `createServer` into an `Async/Await` function or now use a promise chain.

The point, however, is that now, instead of returning the string itself as we do in `findAssetSync`, `findAssetAsync` returns a promise.

## Using Promise Chain

Promise chains create some complexity. Because we want to to make sure we resolve _before_ moving onto the writing of the server response - we can't do this:

```javascript
const server = http.createServer((req, res) => {
  /* ... */
  if (routes[route]) {
    let assets = findAssetAsync(routes[route])
      .then(results => {
        assets = results
      })
      .catch(err => console.error(err))
    res.write(assets)
    res.end()
  } else {
    /* ... */
  }
})
```

This would error, because while the promise is resolving, node would just continue moving along and reading the file -- so we'd write assets (which would be undefined at the time) and then end the response.

To handle this - we place the response _inside_ the `.then` block:

```javascript
const server = http.createServer((req, res) => {
  /* ... */
  if (routes[route]) {
    findAssetAsync(routes[route])
      .then(results => {
        res.write(results)
        res.end()
      })
      .catch(err => console.error(err))
  } else {
    /* ... */
  }
})
```

It’s easy to see how, if this were to get much more complicated - and/or you wanted to carry variables forward (instead of just using the "response" variable from a Promise) how this can quickly get messy.<sup>[3](#footnotes)</sup><a id="fn3"></a>

## Using Async/Await

The async await syntax is much simpler to reason through. While it's _not_ creating synchronous code - it reads as if it is. And underneath, it's all just using Promises.

```javascript
const server = http.createServer(async (req, res) => {
  /* ... */
  if (routes[route]) {
    const assets = await findAssetAsync(routes[route])
    res.write(assets)
    /* ... */
  } else {
    /* ... */
  }
})
```

That’s it. We’re now waiting for the Async function to resolve _before_ preceeding - all while not blocking other requests.

## Conclusion

Converting from synchronous to asynchronous javascript code is not particularly difficult. It's a matter of understanding _what_ is actually happening with the event loop and then pattern recognition.

## Bonus: Error Handling With Async/Await

Async functions return a promise. As a result, they’re chain-able.

While most of the time, we simply await for the async function to resolve and assign the results to a variable, what about if there’s an error? The most common way to handle error handling with Async/Await is a try/catch block.

```javascript
const server = http.createServer(async (req, res) => {
  /* … */
  try {
    if (routes[route]) {
      const assets = await findAssetAsync(routes[route])
      res.write(assets)
      /* … */
    } else {
      /* … */
    }
  } catch (error) {
    throw new Error(error)
  }
})
```

This is not that dissimilar to a single catch in a large chain of promises.

But what if we want a little more fine control? We could have multiple try/catch blocks. Or, we could use a .catch:

```javascript
const server = http.createServer(async (req, res) => {
  /* … */
  if (routes[route]) {
    const assets = await findAssetAsync(routes[route]).catch(error => {
      throw new Error(error)
    })
    res.write(assets)
    /* … */
  } else {
    /* … */
  }
})
```

I’ve historically used the try/catch, but having learned about this new approach, I imagine I’ll be adopting it much more going forward!

## Footnotes

- <sup>[1](#fn1)</sup> I found [André Staltz’s article on Promises interesting](https://staltz.com/promises-are-not-neutral-enough.html), and learned about the eagerness of promises!
- <sup>[2](#fn2)</sup> I have simplified the code here a bit. For example, we're missing the `routes` object that I'm looking for the `route`.
- <sup>[3](#fn3)</sup> Danny Moerkeke’s article on [Async Programming in JavaScript](https://medium.com/swlh/what-you-need-to-know-about-asynchronous-programming-in-javascript-894f90a97941) was particularly informative in highlighting this challenge.
