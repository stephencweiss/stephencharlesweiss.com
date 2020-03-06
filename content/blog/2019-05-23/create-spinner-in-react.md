---
title: 'Create A Spinner & Add A Loader In React'
date: '2019-05-23'
category: ['programming']
tags: ['react', 'spinner', 'react-image', 'styled-components']
---

Using two libraries, `styled-components` and `react-image`, I learned a new simple way to create a `Loader` component (i.e. a spinner) to be used while an image is being loaded in a `react` application.

# Create Your Spinner

A spinner is just a component with animation. However, in the process of doing this, I learned about the tagged template literal support for `keyframes` in `styled-components`.<sup>1</sup>

If you’re building out a library of UI components (as I am), this type of abstraction can be really nice.

Here’s an example `Loader` component.

```javascript
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const Loader = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #767676;
  border-radius: 50%;
  width: 2.28571429rem;
  height: 2.28571429rem;
  animation: ${spin} 0.6s linear infinite;
`

export default Loader
```

# Create An Image With A Loader

Now that I have a loader, I can pull it into my ImageComponent and use it while the image is loading thanks to the straightforward API of `react-image`.<sup>2</sup>

```javascript
import React from 'react'
import Img from 'react-image'

import { housePlaceholder } from 'assets'
import { Loader } from './Loader'

function ImageComponent(props) {
  const { alt, image } = props
  return (
    <Img alt={alt} src={image ? image : housePlaceholder} loader={<Loader />} />
  )
}

export default ImageComponent
```

## Footnotes

- <sup>1</sup> [API Reference | styled-components](https://www.styled-components.com/docs/api)
- <sup>2</sup> [React.js `img` tag rendering with multiple fallback & loader support | react-image](https://github.com/mbrevda/react-image)
