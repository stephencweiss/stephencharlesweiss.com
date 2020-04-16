---
title: 'CSS "Mixins" With Styled Components'
date: '2020-01-29'
publish: '2020-02-17'
category: ['programming']
tags: ['css', 'mixins', 'styled-components']
---

I've heard the term "mixin" a lot without ever really understanding it or why they're valuable.

I found the [chapter on Mixins from the Object-Oriented CSS org](http://oocss.org/spec/css-mixins.html) to have a nice introduction to mixins and they define mixins as:

> Mixins allow document authors to define patterns of property value pairs, which can then be reused in other rulesets.

The chapter was helpful, but I don't write CSS. Or not really. Not in the sense of a global stylesheet.

For the most part, I have learned CSS through the CSS-in-JS tools like `styled-components`, `emotion`, etc.

Using these tools has been great most of the time, however, when I run into the boundaries of my understanding of _how_ the CSS is actually getting compiled and applied, it can be frustrating.

None the less, the recent discovery of mixins has been a boon to my CSS.

Imagine two `css` functions defined as:

```javascript:title=theme/mixins.js
import { css } from 'styled-components'

export default {
  transition: (properties, type = 'linear', time = '0.25s') => css`
    transition: ${time} ${type};
    transition-property: ${properties};
    will-change: ${properties};
  `,
  disabledStyle: (disabled = false) => css`
    opacity: ${disabled ? 0.6 : ''};
    cursor: ${disabled && `default`};
  `,
}
```

I then export it from a `theme/index.js` in the following way:

```javascript:title=theme/index.js
export { default as mixins } from './mixins'
/* all other exports */
```

What does this sort of thing offer? A single place to manage _all_ of my transitions.

For example:

```javascript:title=components/Wrapper
import { mixins } from '../theme'

export const Wrapper = styled.div`
  /* all of my standard styling */
  ${mixins.transition('opacity')};
  ${({ disabled }) => mixins.disabledStyle(disabled)};
`
```

To see a simple example of this in action, I put together a [CodeSandBox](https://codesandbox.io/s/styled-components-mixins-6xfsi). While elementary, it's possible to see how powerful this can be when you are managing dozens of components that all need to adhere to the same style.
