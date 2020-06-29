---
title: 'Setting Up Apollo To Work With React (And NextJS)'
date: '2020-04-08'
publish: '2020-05-04'
updated: ['2020-04-20']
category: ['programming']
tags: ['nextjs', 'apollo', 'react', 'graphql', 'server-side-rendering', 'ssr']
---

Things we'll be covering:

1. Creating an Apollo Client
2. Connecting the client to React

## Creating An Apollo Client

I'm working in NextJS, so my sample client looks like the following:

```javascript:title=lib/withData.js
import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { endpoint } from '../config'

function createClient({ headers }) {
    return new ApolloClient({
        uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
        request: (operation) => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include',
                },
                headers,
            })
        },
    })
}

export default withApollo(createClient)
```

Walking through this step by step:

`withApollo` is a higher order function designed to work specifically with NextJS. We will pass our `createClient` function to it.

The `ApolloClient` from `apollo-boost` is the recommended way to [get started](https://www.apollographql.com/docs/react/get-started/#whats-included) with Apollo. It wraps up most of the useful features needed to start managing state with minimal configuration.

It [includes useful packages](https://www.apollographql.com/docs/react/get-started/#whats-included):

> -   `apollo-client`: Where all the magic happens
> -   `apollo-cache-inmemory`: Our recommended cache
> -   `apollo-link-http`: An Apollo Link for remote data fetching
> -   `apollo-link-error`: An Apollo Link for error handling

The simplest client would look like:

```javascript
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
})
```

I wanted a bit more, however, so I've added a custom `request` [configuration option](https://www.apollographql.com/docs/react/get-started/#configuration-options). The docs say the following about this option:

> This function is called on each request. It takes a GraphQL operation and can return a promise. To dynamically set `fetchOptions`, you can add them to the context of the operation with `operation.setContext({ headers })`. Any options set here will take precedence over `fetchOptions`. Useful for authentication.

Notice, that's exactly what I've done. The only modification I've made is to _also_ configure `fetchOptions` to include credentials (i.e. any cookie based credentials will be sent along for the ride on a request from the client.

Conceptually, this was described to me as similar to an "express middleware". The big difference, however, is that we're on the client side here. That means that we still have access to all `localStorage`, `cookies`, etc. and what we're doing here is taking an operation and then modifying it. The specific modification in this case is that we're _injecting_ the headers and configuring our `fetchOptions`.

Finally, we use our `config` file to set our URI - in this case, it's pointing to a backend GraphQL server.

## Connecting To React

According to the [Getting Started](https://www.apollographql.com/docs/react/get-started/#connect-your-client-to-react) guide, connecting our Apollo Client to React is done similarly to how you'd wrap a [Redux store around React](https://react-redux.js.org/introduction/quick-start#provider) or connect a [Context Provider](https://reactjs.org/docs/context.html).

In my case, it's only _marginally_ more complicated due to the fact I'm using NextJS:

```javascript:title=pages/_app.js
import { Container } from 'next/app'
import { Page } from '../components'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

function App(props) {
    const { apollo, Component } = props //highlight-line
    return (
        <Container>
            <ApolloProvider client={apollo}>
                {' '}
                //highlight-line
                <Page>
                    <Component />
                </Page>
            </ApolloProvider>
        </Container>
    )
}

export default withData(App) //highlight-line
```

`withData` is a higher order function and so we wrap the `App` with it to inject `apollo` into our props.

That prop is then passed to our `ApolloProvider` as the value for the client.

### Going A Step Further: Initial Props

> `getInitialProps` enables [server-side rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) in a page and allows you to do **initial data population**, it means sending the [page](https://nextjs.org/docs/basic-features/pages) with the data already populated from the server. This is especially useful for [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) .

**Update**: `getInitialProps` was deprecated. It is now recommended to use `getStaticProps` (for statically generation) or `getServerSideProps` (for server side rendering). I'm using `getInitialProps` however because I'm on version 7.0 of NextJS and these new methods are available on 9.3+.

```diff:title=pages/_app.js
function App(props) {
-  const { apollo, Component } = props;
+  const { apollo, Component, pageProps } = props;
  return (
    <Container>
      <ApolloProvider client={apollo}>
      <Page>
-        <Component />
+        <Component {...pageProps} />
      </Page>
      </ApolloProvider>
    </Container>
  );
}

+ App.getInitialProps = async ({ Component, ctx }) => {
+   let pageProps = {};
+   if (Component.getInitialProps) {
+     pageProps = await Component.getInitialProps(ctx);
+   }
+   // expose the query to the user
+   pageProps.query = ctx.query;
+   return { pageProps };
+ };

export default withData(App);
```

Also worth highlighting: `ctx.query` is the query parameters from the URL, i.e. the `?key=value&otherKey=otherValue` part of `example.com/pageTitle?key=value&otherKey=otherValue`.

When I say that this `getInitialProps` "exposes the query to the user", I mean that in the components that are rendered which receive the `pageProps`, if there is any query parameter in the URL, it will be accessible as `props.query.x`.

## Conclusion

That's it. We now have an Apollo Client connected to our backend and accessible from our client!
