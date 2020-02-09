---
title: 'Back To The Basics: HTML Head Tag'
date: '2020-02-09'
publish: '2020-02-29'
category: ['programming']
tags: ['html', 'basics', 'fundamentals', 'react', 'next.js']
---

When you manage a web-app _fully_ with React, it's easy to forget that there's HTML involved.

You add the `script` tag to the body, give it a `div` as a target, and call it a day letting React handle the rest.

This is what I covered in two previous posts about getting React apps running.<sup>[1](#footnotes)</sup><a id="fn1"></a>

It's interesting to look back at those posts because in both, there _is_ information in the HTML's `<head>` tag.

For example, in one:

```html:title="index.html"
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="“viewport”" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Adopt Me</title>
    <link rel=“stylesheet” href=“./style.css”/>
  </head>
</html>
```

What I didn't appreciate at the time was _what_ this tag was doing.

Simply put, the `<head>` tag is a container into which metadata about your site is placed. The types of metadata that can go into the `<head>` tag are diverse, but some examples include:

1. Title
2. Style
3. Links
4. Scripts
5. Meta

## Title

The `<title>` tag, which would live inside the `<head>` serves as the site's title. In a browser, this is most easily seen as the name on the tab.

```html:title="index.html"
<html>
  <head>
    <title>My Site!</title>
  </head>
</html>
```

## Style

Since it's possible to style an HTML document directly, this is where the CSS would live. More commonly, however, you would use a link to import the CSS.

```html:title="index.html"
<html>
  <head>
    <style>
      body {
        background-color: blue;
      }
    </style>
  </head>
</html>
```

## Link

A common use case for the `<link>` tag is to load resources _like_ stylesheets.

For example:

```html:title="index.html"
<html>
  <head>
    <link rel=“stylesheet” href=“./style.css”/>
  </head>
</html>
```

## Script

Similar to Link, the `<script>` tag will fetch resources and make them available. Link, however is asynchronous and non-blocking whereas script is blocking.<sup>[2](#footnotes)</sup><a id="fn2"></a>

This is, however, how we could load a library like React directly to make it available for compilation and execution.

For example:

```html:title="index.html"
<html>
  <head>
    <script src=“https://unpkg.com/react@16.8.4/umd/react.development.js”></script>
  </head>
</html>
```

## Meta

This was probably the one with which I was least familiar. It's quite powerful though as it can be used to set encoding, manage responsiveness, and much more.

For example:

```html:title="index.html"
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
  </head>
</html>
```

## Aside: Managing The <Head> I React

Managing the `<head>` tag in React is not necessarily straight forward. In standard React applications, however, we can use tools like `react-helmet`. Next.js also offers their own approach with a `<Head>` component.

An example of the Next approach:

```javascript:title="components/Meta.js"
import Head from 'next/head'

function Meta() {
  return (
    <Head>
      {/* enables responsive layouts */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Ensures our character set is utf-8 encoded */}
      <meta charSet="utf-8" />
      {/* Pulls in the favicon from our static assets */}
      <link rel="shortcut icon" href="./static/favicon.png" />
      {/* import css */}
      <link rel="stylesheet" type="text/css" href="./style.css" />
      <title>Sick Fits!</title>
    </Head>
  )
}

export default Meta
```

This can now be wrapped around the [`_app.js` Page](../../) to set the `Head`.

## Conclusion

Realizing that I didn't really understand the `<head>` tag or its role was a great reminder that there's always more to learn, but _also_ that while I learn, I can be productive.

I do not need to know every API inside and out to be able to build websites and apps. But by continuing to nibble away at the edges as I come upon problems, I can move forward.

## Footnotes

<sup>[1](#fn1)</sup> The tutorials were [Getting a Basic React App Up And Running](../../2019-09-08/tutorial-basic-react-app/) which uses Webpack and Babel for bundling and [An Even More Basic React App Tutorial](../../2019-09-23/tutorial-even-more-basic-react-app/) where I used React directly within the HTML instead of bundling.
<sup>[2](#fn2)</sup> I found the answers to [this question on Quora about the differences between the `<script>` and `<link>` tags](https://www.quora.com/What-is-the-difference-between-script-src-and-link-href?share=1) quite helpful.
