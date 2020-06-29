---
title: 'Intersection Observer and React-Intersection-Observer'
date: '2019-10-25'
publish: '2019-10-25'
category: ['programming']
tags: ['react', 'intersection observer', 'web apis']
---

I was reviewing a project recently that made use of the `react-intersection-observer` library and was fascinated by the simplicty of the API - particularly the hooks version.<sup>[1](#footnotes)</sup><a id="fn1"></a>

You pass in intersection options and it returns:

-   a `ref` which can be passed along to the component for tracking purposes
-   `inView` a boolean that evaluates whether the component is or is not in view
-   `entry`, which is the `IntersectionObserverEntry`, which "describes the intersection between the target element and its root container at a specific moment of transition."<sup>[2](#footnotes)</sup><a id="fn2"></a>

A simple use case (the repo has better examples) to see how it can be used:

```javascript
import React from 'react'
import { useInView } from 'react-intersection-observer'

const Container = (props) => {
    const { scrollDirection } = props

    const [ref, inView] = useInView({
        rootMargin:
            '-' +
            String(
                window.innerHeight *
                    (scrollDirection === 'scrollingDown' ? 0.25 : 0.4)
            ) +
            'px',
    })

    return <div ref={ref}>{inView && props.children}</div>
}

export default React.memo(Container)
```

In this case, we didn’t need access to `entry`, but instead toggle the children on/off based on whether or not the containing `div` is `inView` (which in this case means either 25% or 40% of it is visible depending on the direction of scroll).

## Footnotes

-   <sup>[1](#fn1)</sup> The [react-intersection-observer | Github](https://github.com/thebuilder/react-intersection-observer) source code.
-   <sup>[2](#fn2)</sup> [IntersectionObserverEntry - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
