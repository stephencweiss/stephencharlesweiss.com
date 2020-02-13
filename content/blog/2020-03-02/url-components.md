---
title: 'Components Of The URL'
date: '2020-02-10'
publish: '2020-03-02'
category: ['programming']
tags: ['url', 'host', 'window.location', 'mdn']
---

Naming is hard. Recently, I was working on constructing a URL to send users to when I realized that I didn't actually know the _parts_ of the URL I was constructing.

For example, I was refering to everything before the `path` of a URL as the `baseURL`. Figuring that wasn't exactly correct (turns out `host` is what I was looking for), I did some digging. Below is what I found about the different components of the URL.

## Basics Of The URL

There are four parts to a URL (Uniform Resource Locator):

1. Scheme
2. Host
3. Paths
4. Query strings are preceeded by a `?` and separated by `&` characters

The scheme (also called a protocol) includes: `http`, `https`, and `ftp`

The host is made up of several parts:

1. The TLD or top level domain (e.g., `.com`, `.net`, etc.)
2. The domain the `example` in `example.com`
3. (Optionally) a subdomain, such as `blog` in `blog.example.com`

Interestingly, the host has a directory equivalent. Using our blog example, this resource would be located at `com/example/blog`.

These parts come together in the following way:

```shell copy=true
scheme://host:port/path?query
```

The path is also the name of the resource being loaded. Paths begin with a single `/`. If there is no trailing slash, it means we're loading the root resource, often (always?) the `index` file in the directory.

Not all resources are nameless, however. For example, if you wanted to have a blog path (instead of a subdomain), you could load it at `example.com/blog`.

Lastly, there's the query string. Query strings are made up of three parts:

1. The initial indicator, marked by an `?` following a path
2. A key value pair
3. Subsequent separator, marked by the `&`.

For example `example.com/form?first=stephen&last=weiss`.

## Putting It Into Practice

So, how do we use this information?

Well, we can access it with the [API for `Location`](https://developer.mozilla.org/en-US/docs/Web/API/Location) which is available on both the `window` and `document`.

It's important to reference the documentation however to understand the difference between the `host` and the `hostname` (the former is the latter _with_ the specified `port`, if it exists).

For example, this section's `Location` is:

```javascript
const location = window.location
console.log(location)
// location = {
//   origin: 'https://stephencharlesweiss.com'
//   protocol: 'https:'
//   host: 'stephencharlesweiss.com'
//   hostname: 'stephencharlesweiss.com'
//   port: ''
//   pathname: '/blog/2020-03-02/url-components/'
//   search: ''
//   hash: '#putting-it-into-practice'
//   href: 'https://stephencharlesweiss.com//blog/2020-03-02/url-components/#putting-it-into-practice'
// }
```

And when running it locally:

```javascript
// location = {
//   origin: 'http://localhost:8000'
//   protocol: 'http:'
//   host: 'localhost:8000'
//   hostname: 'localhost'
//   port: '8000'
//   pathname: '/blog/2020-03-02/url-components/'
//   search: ''
//   hash: '#putting-it-into-practice'
//   href: 'http://localhost:8000/blog/2020-03-02/url-components/#putting-it-into-practice'
// }
```

While not immediately obvious, the query string would live in the `search` property.

## Location Methods

There are also some useful methods in the `location` API.

For example `location.assign` and `location.replace`. Note, the biggest difference is the behavior with history ([`assign` adds to the browser history, `replace` does not.](https://stackoverflow.com/questions/4505798/difference-between-window-location-assign-and-window-location-replace))

> The difference from the `assign()` method is that after using `replace()` the current page will not be saved in session history, meaning the user won't be able to use the Back button to navigate to it.

If looking to redirect a user, you can also use the [`window.open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open).

## Resources

- [The components of a URL | IBM](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.1.0/com.ibm.cics.ts.internet.doc/topics/dfhtl_uricomp.html)
- [Understanding the Components and Structure of a URL](https://techwelkin.com/understanding-the-components-and-structure-of-a-url)
- [Web API Location | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location)
