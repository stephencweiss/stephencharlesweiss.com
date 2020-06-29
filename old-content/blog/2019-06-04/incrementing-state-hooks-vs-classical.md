---
title: 'Incrementing State In Functional Components'
date: '2019-06-04'
category: ['programming']
tags:
    ['react', 'hooks', 'functional component', 'class component', 'MaterialUI']
---

I was recently trying to understand Material UI's `<Stepper>` component. In looking through their implementation of the Horizontal Linear Stepper, they used the `useState` React Hook to set the state.<sup>1</sup>

The implementation caught my attention because of the use of a parameter, `prevActiveStep`, which wasn’t defined anywhere else.

```javascript
function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
}
```

Digging into it, I realized that the `useState` can behave very similarly to the `setState` method for class components. Whereas both can set the value for a specific element in state, they can also take a function.<sup>2</sup>

Here’s what that could look like.

# React Hooks Version

```javascript
import React, { useState } from ‘react’;

function MyComponent() {

  const [activeStep, setActiveStep] = React.useState(0);

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    {/*...*/}
    <div>
      <Button onClick={handleBack} >
        Back
      </Button>
    </div>
    {/*...*/}
}

export default MyComponent;

```

# React Class Component Version

To put this in perspective, let’s look at how this looks with a class component.

```javascript
import React, { useState } from ‘react’;

class MyComponent{
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    }
  }

  function handleBack() {
    this.setState( prevState => ({ activeStep: prevState.activeStep - 1});
  }

  return (
    {/*...*/}
    <div>
      <Button onClick={handleBack} >
        Back
      </Button>
    </div>
    {/*...*/}
}

export default MyComponent;
```

I appreciate the concision of this approach, though just to be explicit, it works the same as the following by not reassigning a state variable within `setState` (which React tends to complain about).

```javascript
function handleBack() {
    const activeStep = this.state.activeStep - 1
    this.setState({ activeStep })
}
```

## Footnotes:

-   <sup>1</sup> [Stepper React component | Material-UI](https://material-ui.com/components/steppers/#horizontal-linear)
-   <sup>2</sup> [How to use the increment operator in React | StackOverflow](https://stackoverflow.com/questions/39316376/how-to-use-the-increment-operator-in-react) <br/>
