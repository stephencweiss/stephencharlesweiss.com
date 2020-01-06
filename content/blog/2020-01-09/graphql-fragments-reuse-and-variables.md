---
title: 'GraphQL Fragments: Reuse and Variables'
date: '2020-01-06'
publish: '2020-01-09'
category: ['graphql']
tags: ['javascript','graphql','fragments','variable','apollo','gatsby']
---
After thinking more about Lee Byron's talk and some of the uses for fragments<sup>[1](#footnotes)</sup><a id="fn1"></a>, I still had some questions. Specifically - _how_ do you reuse them effectively?

It's one thing to break down complicated queries into smaller fragments (as Lee did in his talk), but it's another to actually reuse those query fragments across the app.

While researching, I also found the use of variables with fragments simple and elegant.

I'll look at both below.

## Reusing Fragments

At the end of the day, GraphQL fragments are template literals assigned to a variable. In Javascript, that means they can be passed around just like any other variable. Depending on the environment you're in, the convention may be slightly different.

For example, the [Apollo](https://www.apollographql.com/docs/react/data/fragments/#reusing-fragments) convention is to place fragments within an object named `[something].fragment`:

```javascript
import gql from 'graphql-tag';

CommentsPage.fragments = {
  comment: gql`
    fragment CommentsPageComment on Comment {
      id
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  `,
};
```

Then, to use this, would look like:

```javascript
const SUBMIT_COMMENT_MUTATION = gql`
  mutation SubmitComment($repoFullName: String!, $commentContent: String!) {
    submitComment(repoFullName: $repoFullName, commentContent: $commentContent) {
      ...CommentsPageComment
    }
  }
  ${CommentsPage.fragments.comment}
`;

export const COMMENT_QUERY = gql`
  query Comment($repoName: String!) {
    # ...
    entry(repoFullName: $repoName) {
      # ...
      comments {
        ...CommentsPageComment
      }
      # ...
    }
  }
  ${CommentsPage.fragments.comment}
`;
```

The interesting thing to note about Apollo's implementation is the use of the `...Name` for the fragment _and_ the inclusion of the `gql` template literal (`${CommentsPage.fragments.comment}`).

[Gatsby's approach](https://www.gatsbyjs.org/docs/using-graphql-fragments/#creating-and-using-a-fragment) is somewhat different and is a result of the architecture of a Gatsby site which allows defining GraphQL fragments in components, but only returns data to queries within Pages.

In the example from the Gatsby docs then, we:
1. Create a component with a GraphQL fragment (the fragment is exported and available as `SiteInformation`)
2. Import the component into a Page and use the fragment

The example (taken from the Gatsby site linked above):

```javascript:title="src/components/IndexPost.jsx"
import React from "react"
import { graphql } from "gatsby"

export default ( props ) => {
  return (...)
}

export const query = graphql`
  fragment SiteInformation on Site {
    siteMetadata {
      title
      siteDescription
    }
  }
`
```

And then used like so:

```javascript:title="src/pages/main.jsx"
import React from "react"
import { graphql } from "gatsby"
import IndexPost from "../components/IndexPost"

export default ({ data }) => {
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <p>{data.site.siteMetadata.siteDescription}</p>

      {/*
        Or you can pass all the data from the fragment
        back to the component that defined it
      */}
      <IndexPost siteInformation={data.site.siteMetadata} />
    </div>
  )
}

export const query = graphql`
  query {
    site {
      ...SiteInformation
    }
  }
`
```

As of now, my questions that remain to be tested include:
1. Why does Apollo require the `${FragmentName}`?
2. Can I export and use a fragment that's defined as:
    ```javascript
    export const siteInfoFragment = graphql`
      fragment SiteNformation on Site {
        siteMetadata {
          title
          siteDescription
        }
      }
    `
    ```

Right now, I'm still learning the theory of fragments and... I like them in theory. However, I need more experience with them and to date, my apps which use GraphQL simply haven't called for the complexity. So, this is preliminary research and I'm excited to revisit when there's an actual need.

## Using Variables With Fragments

While researching how to pass fragments around, I also found the answer to a question I didn't realize I had: how to use variables with fragments.

I found the answer in the [GraphQL docs](https://graphql.org/learn/queries/#using-variables-inside-fragments), which provide a nice example of how to use variables with fragments. Before looking at their implementation, let's examine a more generic query to see how it compares:

```graphql
query HeroComparison($first: Int = 3) {
  firstComparison: hero(episode: EMPIRE) {
    name
    friendsConnection(first: $first) {
      totalCount
      edges {
        node {
          name
        }
      }
    }
  }
  secondComparison: hero(episode: JEDI) {
    name
    friendsConnection(first: $first) {
      totalCount
      edges {
        node {
          name
        }
      }
    }
  }
}
```

In this example, the client would provide a value for the variable `first` (which defaults to 3), and that is then passed along to both the `firstComparison` and `secondComparison`.

Using Fragments, we can simplify this and reduce the duplicative code while _still_ using variables as we would expect. Here's what the GraphQL docs suggest:

```graphql
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

The key point is that, just as in the original query, the variable passed into the query is propagated all the way down and is accessible by the fragments.

## Conclusion

When it comes to fragments, it turns out that the way to pass them around and reuse them or to use variables is exactly how I'd expect to do it. That's pretty fantastic.

## Footnotes
- <sup>1</sup> I wrote about it [here](../../2020-01-04/graphql-fragments/) and [here's Lee's original talk](https://www.youtube.com/watch?v=pLvrZPSzHxo). [[return]](#fn1)