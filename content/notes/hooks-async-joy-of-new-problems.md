---
title: 'Hooks, Async, And The Joy Of New Problems'
date: '2019-05-17'
publish: '2019-05-17'
category: ['programming']
tags: ['react', 'hooks', 'async']
---

> When all you have is a hammer, every problem looks like a nail.

When approaching new problems, it’s easy to fall into old ways of doing things - at least at first.
There’s an efficiency argument to be made for this. If we have reliable solutions to solving certain problems, it doesn’t make a ton of sense to look for alternatives unnecessarily.

New problems, by definition, are unfamiliar territory - so the old solutions _may_ be extendable (with our without any need for modification). To know, we have to start working on the problem and starting with what we know is a reasonable place.

That approach is how I found myself starting at an error screen having triggered an infinite loop.

# The Context

I was working on a new page in our application that would show a user’s preferred photo. User photos are stored on a database, which meant that I would need to make a database call and wait while that resolved.

# The Wrinkle

This particular project is using the new Hooks API within React, and I wanted to follow suit. Whereas I had a pretty good idea of how I might approach this for class components, I had never done any asynchronous work with hooks.

However, having recently thought about the lifecycles in React <sup>1</sup> and then reading the React team’s docs on hooks, I thought I had a decent framework to think about this. In a class component, I would have put the async call in the `componentDidMount` phase, and the docs showed examples where `useEffect` was used in lieu of the `componentDidMount` - so that’s where I started.<sup>2</sup>

# The Class Component Approach

The hammer in my toolbox - the way I would have approached this problem for a class component - can be summarized with the steps:

1. Make the API call in `componentDidMount` to wait for the DOM to be available
2. Set state with the response from the API call
3. Use the state in the render

```javascript
import React from "react";
import { PhotoAPI } from API;

class MyComponent {
  constructor(props){
    super(props);
    this.state = {
      photo: '',
    }

  async componentDidMount() {
    const photo = await PhotoAPI.getPhoto(...)
    this.setState({photo})
  }

  render() {
    <React.Fragment>
      <img src={this.state.photo} />
    </React.Fragment>
  }

};
```

# Old Paradigms; New Problems

Given my foundation with class components for asynchronous calls, that’s where I started with my new functional component.

(Actually, this skips the first attempt where I tried the `useEffect` method with `async` — it’s not supported, though Robin Wieruch shows how you might accomplish data fetching with `useEffect` .<sup>3</sup>)

Notice, this approach looks very similar to the class approach. I have a local state, I am using `useAsync` which awaits the return of the API call. Then setting state using my `setPhoto` method, I can now use that value in my return which will render to the DOM.

```javascript
import React, {useState} from "react";
import { PhotoAPI } from API;
import { useAsync } from "react-use";

function myComponent(props) {
  const [ photo, setPhoto ] = useState(undefined)
  const primaryPhoto = useAsync( () => PhotoAPI.getPhoto(...), [photo]);
  setPhoto(primaryPhoto.value)
  return (
    <div>
      <img src={photo} />
    </div>
  )
...
};
```

There’s only one problem: this creates an infinite loop.

I only call `useAsync` when the value of `photo` changes (notice the `[photo]` in the second argument position for `useAsync`), but I set that value each time it returns, which means I can call it again, and again, and again…

I guess my reliable solution wasn’t so reliable any more.

# New Approaches For New Problems

Before I started working with Hooks, I noticed a lot of people make comments along the lines of "it’s a different way of thinking." The React team themselves call this out specifically in their introduction to Hooks<sup>4</sup>> :

> It takes a bit of a mindshift to start "thinking in Hooks."

When refactoring to hooks, we actually don’t need to use state at all. Instead, the `useAsync` method returns a promise which has a `loading` attribute and once it’s resolved a `value`.

This makes our new code succinct and very readable.

```javascript
import React from "react";
import { useAsync } from "react-use";

function myComponent(props) {
  const primaryPhoto = useAsync( () => API.getPhoto(...), []);
  return (
    <div>
      { primaryPhoto.loading
        ? loading...
        : <img src={primaryPhoto.value} />
      }
    </div>
  )
...
};
```

# Conclusion

While it’s tempting, and I would argue smart, to start a new problem by attempting to reuse old knowledge - sometimes it doesn’t work out. The problems can be fundamentally different in ways you couldn’t have anticipated. The new problem can also offer new opportunities, different approaches, and surprising lessons.

You can shoe-horn old solutions into new problems or create new skills and add tools to your tool chest. It takes work and can be frustrating — or fun. The choice is yours.

## Footnotes

-   <sup>1</sup> [React Lifecycle Methods Primer](https://www.stephencharlesweiss.com/2019-04-04/react-lifecycle-methods/)
-   <sup>2</sup> [Using the Effect Hook | React](https://reactjs.org/docs/hooks-effect.html)
-   <sup>3</sup> [Data Fetching with React Hooks | Robin Weiruch](https://www.robinwieruch.de/react-hooks-fetch-data/)
-   <sup>4</sup> [Introduction to Hooks | React](https://reactjs.org/docs/hooks-intro.html#gradual-adoption-strategy)
