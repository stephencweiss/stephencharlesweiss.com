---
title: 'Modifying Head Tags As Side Effects With NextJS'
date: '2020-04-19'
publish: '2020-05-14'
category: ['programming']
tags: ['nextjs', 'head tag', 'meta']
---

When navigating around a digital store, it can be a nice enhancement to let the user know which page they're on by updating the `Head` tag's title.

(For more on the `Head` tag, see my previous post on the [basics of the Head Tag](html-basics-head-tag))

NextJS makes this straightforward by allowing you to import the `Head` component from `next/head` and modify it from any page or component.

Let's look at a small example.

Imagine a `Meta` component that's imported on each Page in our NextJS app.

```javascript:title=components/Meta.js
import Head from 'next/head'

export const Meta = () => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <title>My Store!</title>
    </Head>
)
```

Now, when we navigate to a single item's detail page, we want to update the page title from `My Store!` to include the product's title, e.g., `My Store! | World's Best Pen` (this works best when the user doesn't have 89 tabs open).

```javascript:title=components/ItemDetail.js
import Head from 'next/head'
//hide-start
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import ErrorMessage from './ErrorMessage'
import styled from 'styled-components'

const ItemDetailStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${({ theme }) => theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
`

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            largeImage
        }
    }
`
//hide-end
//...

export const ItemDetail = (props) => {
    return (
        <Query query={SINGLE_ITEM_QUERY} variables={{ id: props.id }}>
            {({ error, loading, data }) => {
                //hide-start
                if (error) return <ErrorMessage error={error} />
                if (loading) return <p> Loading... </p>
                if (!data.item)
                    return (
                        <ErrorMessage
                            error={{ message: `No item found for ${props.id}` }}
                        />
                    )
                //hide-end
                /*...*/
                const { id, title, description, largeImage } = data.item
                return (
                    <ItemDetailStyles>
                        //highlight-start
                        <Head>
                            <title>My Site! | {title} </title>
                        </Head>
                        //highlight-end
                        {/*...*/}
                        //hide-start
                        <img src={largeImage} alt={title} />
                        //hide-end
                    </ItemDetailStyles>
                )
            }}
        </Query>
    )
}
```

Here, I'm using React-Apollo's Query Higher Order Component to retrieve my item and render it to the page. Once it's received, I am passing that title into the `Head` which will override the top level title tag.
