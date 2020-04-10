---
title: "Querying With Apollo: Render Props Vs Hooks"
date: '2020-04-10'
publish: '2020-05-05'
category: ['programming']
tags: ['apollo','react','hooks','render props','graphql']
---
After we've hooked up our Apollo client to React<sup>[1](#footnotes)</sup><a id="fn1"></a>, we can begin to query the server.

Before Hooks, this was done using Render Props.<sup>[2](#footnotes)</sup><a id="fn2"></a>

Today, I'll be exploring both approaches (though I'll still be using hooks for the `App` because why not!)

## Setup
Before diving into the different approaches, let's refresh ourselves on how to configure an Apollo Client and some of the pieces that are consistent between the two.

First, let's create a client and connect it to Apollo:
``` javascript:title="App.js"
import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      {/*... our component will go here */}
    </ApolloProvider>
  );
}
```

The next thing is both approaches need a query to our server. We'll call it `EXCHANGE_RATES` (I'm using the Apollo Code Sandbox which is a GraphQL server that stores data about exchange rates between currencies. It's also what's used in their Getting Started documentation.)

``` javascript:title="query.js"
import { gql } from "apollo-boost";
export const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
```

With those pieces out of the way, we're ready to start writing our components!

## Render Props
As the [React team notes](https://reactjs.org/docs/render-props.html), "render props" is actually a description of a "technique for sharing code between React components using a prop whose value is a function."

The key part here is that the actual prop used is not as important as _how_ it's being used.

The [Apollo docs](https://www.apollographql.com/docs/react/v2.5/essentials/queries/#the-query-component) do a nice job of explaining the mechanics of the `Query` component, but a summary:
1. Pass the query to the `query` prop
2. The component will provide a function to the `children` props to let React know what to render. That function receives a response object as its argument containing `loading`, `error`, and `data` information.

With that in mind, let's craft our component:

```javascript:title="ExchangeRateRenderProps.js"
import React from "react";
import { Query } from "@apollo/react-components";
import { EXCHANGE_RATES } from "./query";

export function ExchangeRateRenderProps() {
  return (
    <Query query={EXCHANGE_RATES}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error!</div>;
        return (
          <>
            <h1>Exchange Rates to USD$</h1>
            {data.rates.map(({ currency, rate }) => (
              <div key={currency}>
                <p>
                  {currency}: {rate}
                </p>
              </div>
            ))}
          </>
        );
      }}
    </Query>
  );
}
```

Just like that, we've handled our loading and error state as well as rendering the success!

(Note, for more advanced use cases look at [Polling and Refetching](https://www.apollographql.com/docs/react/v2.5/essentials/queries/#polling-and-refetching), the [full Query API](https://www.apollographql.com/docs/react/v2.5/essentials/queries/#props), as well as the [Render prop API](https://www.apollographql.com/docs/react/v2.5/essentials/queries/#render-prop-function).)

## Hooks
The hooks version is arguably even simpler, though also very similar.

```javascript:title="ExchangeRateHooks.js"
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { EXCHANGE_RATES } from "./query";


export function ExchangeRatesHooks() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return (
    <>
      <h1>Exchange Rates to $USD</h1>
      {data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ))}
    </>
  );
}
```
[Apollo's API documentation](https://www.apollographql.com/docs/react/data/queries/#usequery-api) on `useQuery` is comprehensive and worth looking at, even if most of the options are often not required. The first argument is always the query. The other options are

It's worth noting that unlike `useState`, `useQuery` returns a result _object_, so each of the [returned properties](https://www.apollographql.com/docs/react/data/queries/#result) can be accessed by name, not position.

## Pulling It All Together
As a final step, let's render these - allowing the user to determine _which_ approach they want. If we did it right, the results _should be the same_.

For this, I created a `Switch` component:
```diff:title="App.js"
- import React from "react";
+ import React, {useState} from "react";
//...
+ function Switch() {
+   const [view, setView] = useState("HOOKS");
+   const toggleView = () =>
+     view === "HOOKS" ? setView("RENDER_PROPS") : setView("HOOKS");
+   return (
+     <div>
+       <h1>{view}</h1>
+       <button onClick={toggleView}>Toggle Style</button>
+       {view === "HOOKS" ? <ExchangeRatesHooks /> : <ExchangeRateRenderProps />}
+     </div>
+   );
+ }

export default function App() {
  return (
    <ApolloProvider client={client}>
-      {/*... our component will go here */}
+	     <Switch />
    </ApolloProvider>
  );
}
```

## Conclusion
This post covered how to write a query using both Apollo's `<Query>` component and their `useQuery` hook.

Hope you found it useful!

Here's a [Code Sandbox](https://codesandbox.io/s/apollo-hooks-vs-renderprops-fvztv?file=/src/ExchangeHooks.js) for your exploration enjoyment!

https://codesandbox.io/s/apollo-hooks-vs-renderprops-fvztv?file=/src/ExchangeHooks.js

## Footnotes
- <sup>[1](#fn1)</sup> See my previous post for more on [how to hook up the apollo client to a React front end (particularly a NextJS app)](../../2020-05-04/apollo-react)
- <sup>[2](#fn2)</sup> Full disclosure. I've heard a lot of folks _talk_ about Render Props, I've even read some blog posts about it, however, I basically missed the window where Render Props were a thing. This post from [Kent C Dodds](https://kentcdodds.com/blog/react-hooks-whats-going-to-happen-to-render-props), however, does a nice job of explaining _why_ they've (mostly) disappeared and where they may still be valuable.
