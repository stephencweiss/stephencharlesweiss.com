---
title: 'Native HTTP Requests with NodeJS'
date: '2020-05-17'
publish: '2020-07-03'
category: ['programming']
tags:
    [
        'axios',
        'post request',
        'node',
        'http/s',
        'aws lambda',
        'dependency management',
    ]
---

When making network requests with Javascript there are a number of options. One of my favorites is [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), native and promise based it "provides an easy, logical way to fetch resources asynchronously across the network."

Node, however, doesn't have fetch, though there's [node-fetch](https://www.npmjs.com/package/node-fetch) which mostly unifies the API between the client and server (known [differences as of 3.x](https://github.com/node-fetch/node-fetch/blob/master/docs/v3-LIMITS.md)).

The documentation for Node's HTTP/S modules note that it is a low level streaming module, and one consequence of that is there's no native promise support.

So, let's explore how to make some requests with Axios and the equivalent with HTTP(S) in Node<sup>1</sup>:

We'll begin with defining some things that we'll use in both examples:

```javascript:title=constants.js
const url = generic - domain.com / api / endpoint
const postData = `the body of the request can go here`
const options = {
    method: 'POST',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'text/plain',
        connection: 'keep-alive',
    },
}
```

Then, to make a POST request with Axios, we can put all of this in an object and send it off - creating a promise to easily retrieve the data.

```javascript:title=axiosPost.js
const responseData = await axios({ url, postData, ...options })
    .then(res => res.data)
    .catch(err => console.log(`error: ${err}`))
```

As alluded to by the fact that Node calls its `HTTP/S` modules low-level, they're more verbose. Here's the first attempt:

```javascript:title=nativeWithoutPromises.js
const req = https.request(url, options, res => {
    let data = ''
    res.on('data', chunk => {
        data += chunk
    })

    res.on('end', () => {
        console.log('No more data in response.')
        console.log(`complete data --> `, JSON.parse(data))
    })
})

req.on('error', err => {
    console.error(`error: ${err.message}`)
})

// Write data to request body
req.write(postData)
req.end()
```

That part at the bottom, `req.write(postData)` was what threw me for a loop for the longest time. It's just not well-documented (in my opinion), that if you're writing a `POST` request, you add the body after setting up the request.

But, notice - this is _not_ a promise. In fact, if we tried to access the data in any code down stream, it'd be undefined when we try to use it, unless we put that access _inside_ the `res.on('end', () => {...})` callback. While that's an option, promises keep code so much cleaner, so let's look at [converting this synchronous code into an asynchronous variant](https://stephencharlesweiss.com/blog/2019-11-18/convert-synchronous-to-asynchronous-code-javascript/)<sup>2</sup>.

We can do this by wrapping it in a `Promise` - which at a minimum means that we can now start to _chain_ things.

For example:

```javascript:title=nativeWithPromises.js
new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
      reject(e);
    });

    // Write data to request body
    req.write(postData);
    req.end();
  })
  .then(res => console.log(`here's the full data! -> ${data}`)
  .catch(error => console.error(`Error: ${error})
```

Now, we can refactor this out into its own function and simply await it:

```javascript:title=nativeAsync.js

function main(){
  res = await genericRequest().catch(error => console.error(`Error: ${error})
  console.log(`here's the full data --> ${data}`)
}


function genericRequest(){
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
      reject(e);
    });

    // Write data to request body
    req.write(postData);
    req.end();
  });
}
```

## Wrap Up

As this example demonstrates, `axios` (and other libraries) can make writing requests much more succinct and abstract away a lot of the details for you. This is a huge boon if you're writing a lot of requests!

In my particular case, however, I was writing a network request for a lambda function - so every dependency I could shed counted and that meant digging into the native APIs to understand them better!

## Footnotes

-   <sup>1</sup> Examples are inspired by the [Node documentation](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_request_url_options_callback), [Flavio Copes](https://flaviocopes.com/node-http-post/), and [AWS](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html) - among others.
-   <sup>2</sup> The designation of synchronous vs. asynchronous is a little fuzzy. My rationale for calling this synchronous code, however, has to do with how the Javascript runtime is treating it. That is, if I don't pass a callback into the `on('end')` event, then if I tried to access the "value" of the data - even if I lifted it outside of the scope of the request, it'd be undefined by the time I got to it in the code. By converting it to an "asynchronous" variant, what I really mean is making it _behave_ synchronously, even if it remains asynchronous underneath.
