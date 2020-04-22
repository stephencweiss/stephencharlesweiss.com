---
title: 'Another Angle To Understand Global State With React: Next.js'
date: '2020-02-09'
publish: '2020-02-28'
category: ['programming']
tags: ['javascript', 'next.js', 'global state']
---

Recently, I was playing around with [Next.js](https://nextjs.org/) (simply referred to as Next from here on) to see how a framework might make building React applications simpler.

When I got to the `_app.js` page a light bulb went off. The page illustrates _how_ React applications manage global state.

First, let's understand the problem we're trying to solve: If you refresh a page running a React application, all of the state is blown away.

That means that React applications need to provide the appearance of navigating to different pages, updating the URL, creating a history, etc. _without_ actually loading a brand new page. (Coincidentally, this helped me understand why a good router is so important.)

Now, coming back to Next, let's examine the `_app.js` component. This is provided by default by Next, but can be [overridden with a custom file as needed](https://nextjs.org/docs/advanced-features/custom-app).

That's what I'm doing here:

```javascript:title=pages/_app.js
function MyApp({ Component, pageProps }) {
  return (
    <>
      <p>I'm on every page!</p>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
```

Yeah, it's not much. I'm simply adding a paragraph tag _before_ every `<Component>` is rendered.

The `Component` is the `page` that's loaded. `pageProps` are any props passed along to the `Component` - it's an empty object if not using `getInitialProps`.<sup>[1](#foototes)</sup><a id="fn1"></a>

The effect, however, is that when we navigate between pages, the state that exists in `MyApp` persists - _it_ is not being rerendered.

To see this, here's an example:

![React reload](https://media.giphy.com/media/gfkM9D5o7pjHUTjhdC/giphy.gif)

Notice in the video that the `html> <p>I'm on every page!</p>` doesn't change or get reloaded even though the page contents change?

If we were to put our state management, global styles, etc. at this level then, they can be loaded once and persist even while different pages are loaded underneath.

## Footnotes

- <sup>[1](#fn1)</sup> [`.getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps) is part of the Next API to asynchronously fetch data and then feed it to `props`. The big catch on using it is that it will disable [Automatic Static Optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization).
