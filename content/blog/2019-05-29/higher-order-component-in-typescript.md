---
title: 'Higher Order Components In Javascript / Typescript'
date: '2019-05-29'
category: ['programming']
tags: ['javascript', 'typescript', 'higher order components']
---

Imagine you have a prop that you want to be passed all the way through to the DOM. If you try and pass through a prop that isn't semantically correct (i.e. doesn't use “kebab-case”), React will yell at you.

One way to handle that is to use a Higher Order Component (HOC). HOCs are components that return a component. Another way to think about them are as “wrappers” - so that's what I'm going to call mine here.

Let's look at an example where we use an HOC, `Wrapper`, to look at the props being passed in and determine what to do.

```typescript
import React from 'react';
import PropTypes from 'prop-types';

export type WrapperProps = { special-prop?: string; specialProp?: string };
const Wrapper = <P extends WrapperProps>(WrappedComponent: React.ComponentType<P>): React.FunctionComponent<P> => {
    const Wrapper = (props: P) => {
        return <WrappedComponent data-special-prop={props['special-prop'] || props.specialProp} {...props} />;
    };
};

export default Wrapper;
```

The nice part about this is that if neither `'special-prop'` nor `specialProp` exists, `data-special-prop` is not passed through.

Sometimes it's not about props but a different behavior contingent on the presence of a particular prop (or set of props).

Let's take a case where if we have a `specialProp` we want to make the background pink.

```typescript
import React from 'react';

export type ConditionalWrapperProps = { specialProp?: string };
const Wrapper = <P extends WrapperProps>(WrappedComponent: React.ComponentType<P>): React.FunctionComponent<P> => {
    const Wrapper = (props: P) => {
        return (
          specialProp ? (
            <div style={{background: 'pink'}}>
              <WrappedComponent {...props.style} {...props} />
            </div> )
          : <WrappedComponent {...props.style} {...props} />
    };
};

export default Wrapper;
```

# Using The HOC

Now that we've defined HOCs, we have to use them.

In our case, we've saved the HOC to a file in the same directory, `higher-order-components.tsx`.

We can import that module and use it as a wrapper around another component, so that whenever we call `MyComponent`, we pass it through the `Wrapper` (notice the last line).

```javascript
import React from 'react'
import Wrapper from './higher-order-components'

const MyComponent = () => {
  ;<React.Fragment>...</React.Fragment>
}
export default Wrapper(MyComponent)
```
