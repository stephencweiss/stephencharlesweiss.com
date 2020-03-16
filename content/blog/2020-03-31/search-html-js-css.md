---
title: 'Simple Searching With HTML, CSS, and JS'
date: '2020-03-14'
publish: '2020-03-31'
category: ['programming']
tags: ['html', 'javascript', 'experiment']
---

As one of the fortunate few (relatively) who learned to make websites _after_ the ascendency of React, I find that I often struggle when thrust into an environment where I need to use the browser APIs.

The component model of React and how it’s composed together to create a full UI makes sense to me at this point.

But, because I use React to hook into a single root element and fill it in with React elements, it’s easy to lose sight of what’s actually happening and how it might translate to a world of _static_ HTML.<sup>[1](#footnotes)</sup>

So, to challenge myself a bit, today I went back to the basics and build a webpage that would search for movies.

I started with a sample database of movies before wiring up the API call to the OMDb.

It was fun to remember _how_ to attach event listeners to the Document, finding elements using the document API and using pure CSS.

Here’s a [Code Sandbox](https://codesandbox.io/s/omdb-movie-search-lbgj8) of what I came up with. You can also see the [code on Github](https://github.com/stephencweiss/movie-searching).

https://codesandbox.io/s/omdb-movie-search-lbgj8?fontsize=14&hidenavigation=1&theme=dark

I really liked going back to the basics. It was both a testament to how much I’d forgotten _and_ how much I have learned.

While I didn’t remember some of the simplest things when I started, I was able to pick it back up quickly. Even better, the exercise helped me understand _better_ some of the things that React does for me.

## Footnotes

- <sup>[1](#fn1)</sup> Tangentially related: [Tyler McGinnis wrote a fantastic blog post](https://tylermcginnis.com/react-elements-vs-react-components/) on what we do when we _create_ a React component. Reading it really helped me understand how React ties into HTML - even if I never reach for React’s `.createElement` API.
  Hooking into the DOM an
