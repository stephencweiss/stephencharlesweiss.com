---
title: 'Errors, Loading, And Happiness: A Pattern In React'
date: '2019-06-27'
publish: '2019-06-27'
category: ['programming']
tags: ['react', 'async', 'design pattern', 'single return statement']
---

If I’m working on a React application that is trying to render data based on an asynchronous call, there are three common cases I should handle:

1. Loading - While the client waits for the data to be fetched
2. Error - What happens if there’s a problem
3. Data - When the data arrives, what the client sees

There are plenty of ways to structure a React component, but one pattern that my team showed me recently, I really liked for the readability it provided.

# The Pattern At 30,000 Feet

A generic look at the pattern I found appealing is:

1. Create a Wrapper that will envelop the content - whether that’s the loading state, error state, or happy state with data - with shared styling and components
2. Determine which state you are in and return early if possible

```javascript

import {ErrorComponent, Loader} from 'shared/components'
import Header from './components/header'
import Footer from './components/footer'
import DataComponent from './component/datacomponent'

function MyComponent() {
  const fetchResults = useAsync( () => API.getResults()

  const ComponentWrapper = children => (
    <div className={"my-component-style"}>
      <Header />
      {children}
      <Footer />
    </div>
  );

  if (fetchResults.loading) return ComponentWrapper(loader);
  if (fetchResults.error || !fetchResults.value) return ComponentWrapper(error);
  return ComponentWrapper(<DataComponent data={fetchResults.value} />);
};

```

## Summary Of The Example

1. I’m importing an `ErrorComponent` and `Loader` component from a shared directory — these can be anything, but the point is that it’s likely the case that if I adopt this pattern, I’ll use them multiple times across a project. In this case, I’m assuming they are JSX Elements
2. I’m using `useAsync` from `react-use`. The method returns an object with three keys: `value`, `error`, and `loading`.
3. I have a `Header` and `Footer` component that will be shared among _all_ of the states and is applied through the wrapper.
4. The data component could be defined here, or in another file (as is the case in this example) and is what you actually expect to be rendered _when_ the data comes through without errors and loading is finished.

# Conclusion

What I like about this is how easy it is to understand what’s happening and the absence of any if / else blocks or ternary logic in the return block. While it does "violate" the Single Return Statement law, this feels to me like an appropriate early escape.

That was actually my approach _before_ I’d found this pattern, and while it works, it doesn’t make it any easier for the next person coming along to understand what’s going on — and arguably, it’s much more difficult.

```javascript
return fetchResults.loading
    ? ComponentWrapper(loader)
    : fetchResults.error || !fetchResults.value
    ? ComponentWrapper(error)
    : ComponentWrapper(<DataComponent data={fetchResults.value} />)
```

As with all rules, there are good reasons to listen and adhere to them. Knowing when it doesn’t make sense, however, is critical for moving to the next level. The only way to learn is to have an open mind and not hold any position as dogmatic.

# Additional Reading on Single Returns

-   [Language Agnostic - Should a function have only one return statement? | Stack Overflow](https://stackoverflow.com/questions/36707/should-a-function-have-only-one-return-statement)
-   [Religious War #48,293: Single Vs. Multiple Returns | Abby Fichtner](https://hackerchick.com/religious-war-48293-single-vs-multiple/)
-   [Why Many Return Statements Are a Bad Idea in OOP | Yegor256](https://www.yegor256.com/2015/08/18/multiple-return-statements-in-oop.html)
