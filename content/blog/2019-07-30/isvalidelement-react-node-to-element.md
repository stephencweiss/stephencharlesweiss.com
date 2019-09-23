---
title: 'Using isValidElement To Ensure A Node Is An Element In React'
date: '2019-07-30'
tags: ['react','typescript','isvalidelement']
category: ['programming']
---
I am trying to reduce an array of React Nodes to an array of React _Elements_. Specifically, I’m trying to extract the title prop from those elements.

The problem is that a node has a much larger set of possible values than my Elements. Consequently, if I try to directly access my props to find the title, I run the risk of trying to access values that don’t exist.

For example:
``` javascript
export function extractTitles(accumulator: JSX.Element[], value?: React.ReactNode): JSX.Element[] {
    if (value.props.title) {
        accumulator.push(value.props.title);
    }
    return accumulator;
}
const titles: JSX.Element[] = nodes.reduce(extractTitles, []);
```

Typescript warns me about this upfront with the following warning:
``` shell
Property 'props' does not exist on type 'string | number | boolean | {} | ReactElement<any, string | ((props: any) => ReactElement<any, string | ... | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> | ReactNodeArray | ReactPortal'.
  Property 'props' does not exist on type 'string'
```

The solution is simple: make sure that I’m not dealing with any of those other kinds of nodes _before_ trying to access the title prop. To do this, React provides the top level API `isValidElement` which verifies the object is a React element.<sup>1</sup>

Updating my conditional, I’m able to only access those elements in my array that _are_ elements and therefore have props.
``` typescript
import React from "react";

export function extractTitles(accumulator: JSX.Element[], value?: React.ReactNode): JSX.Element[] {
    if (React.isValidElement(value) && value.props.title) {
        accumulator.push(value.props.title);
    }
    return accumulator;
}

const titles: JSX.Element[] = nodes.reduce(extractTitles, []);
```

I’ve struggled with this problem a number of times before, but never quite grasped what I was looking at. Today, I made the time to dig a little deeper than in the past and it paid off — as it almost always does.

## Footnotes
* <sup>1</sup> [React Top-Level API: isValidElement | React](https://reactjs.org/docs/react-api.html#isvalidelement)

