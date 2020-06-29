---
title: 'DRY And Styled Components'
date: '2019-10-15'
publish: '2019-10-15'
category: ['programming']
tags: ['dry', 'styled-components', 'currying']
---

A quick optimization to keep an eye out for while styling components - particularly those where they share logic - whether between components or between properties.

For example, dependency on the status of my component, I will show different colors at different places.

Initially, I had something like this:

```javascript
import styled from ‘styled-components';
import { Circle } from ‘react-feather’;

export const Circle = styled(Circle)`
  fill: ${props => props.status === 'ERROR'
    ? ‘red’
    : props.status === 'COMPLETE'
    ? ‘green’
    : ‘grey’};
  stroke: ${props => props.status === StepStatusTypes.ERROR
    ? colors.error
    : props.status === StepStatusTypes.COMPLETE
    ? colors.success
    : colors.lightGray;};
`;
```

Because we’re using styled-components, we have all of the power of Javascript within our CSS. Yes, there are pros and cons to that, but the that means dynamic attributes like this are possible without adding / removing classes.

It _also_ means that we can extract the duplicative code into a function. Like so:

```javascript
import styled from ‘styled-components';
import { Circle } from ‘react-feather’;

const circleColor(props) = props =>
  props.status === 'ERROR'
    ? ‘red’
    : props.status === 'COMPLETE'
    ? ‘green’
    : ‘grey’;

export const Circle = styled(Circle)`
  fill: ${props => circleColor(props);
  stroke: ${props => circleColor(props)};
`;
```

Even better, since we’re consuming the same argument in both functions, we can curry them and eliminate the lambda function:<sup>1</sup>

```javascript
import styled from ‘styled-components';
import { Circle } from ‘react-feather’;

const circleColor(props) = props =>
  props.status === 'ERROR'
    ? ‘red’
    : props.status === 'COMPLETE'
    ? ‘green’
    : ‘grey’;

export const Circle = styled(Circle)`
  fill: ${circleColor};
  stroke: ${circleColor};
`;
```

## Footnotes

-   <sup>1</sup> I’ve written previously about [currying with function declarations and expressions](https://www.stephencharlesweiss.com/2019-04-13/currying-an-introduction-with-function-declarations-and-expressions/).
