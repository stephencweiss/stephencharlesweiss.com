---
title: 'GraphQL: Sort On Multiple Fields'
date: '2020-01-16'
publish: '2020-01-30'
category: ['graphql']
tags: ['query', 'syntax', 'sort', 'multi-field']
---

Sometimes, the easiest things are hard. Or they are until you learn how the syntax.

That's what it felt like when I wanted to sort a GraphQL query on _multiple_ fields.

In my case, I was working on organizing my [books](../../../books) page where I store notes on books I've read.

I wanted to sort on title _and_ author to account for situations where I've read multiple books by the same author.<sup>[1](#footnotes)</sup>

I write my book notes in markdown and I include several things in the frontmatter including the book's title and the last name of the author. For example, a note might begin:

```md:title="example-david-copperfield.md"
---
title: 'Notes on David Copperfield by Charles Dickens'
bookTitle: 'David Copperfield'
author: 'Charles Dickens'
authorLast: 'Dickens'

---

The body of the post goes here...
```

Initially, my page query was only concerned with getting the right posts from the file system using the custom field `sourceInstance`:

```javascript:title="src/pages/books.jsx"
export const pageQuery = graphql`
  query {
    books: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "books" } } }
    ) {
    /* ... */
    }
  }
`
```

What to do? I had a sort method on other pages, so I knew how to get started, but when I tried to add a _second_ parameter, I was at a loss. My first (naïve) attempt:

```javascript:title="src/pages/books.jsx"
export const pageQuery = graphql`
  query {
    books: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "books" } } }
      sort: { order: ASC, fields: [frontmatter___author] }
      sort: { order: ASC, fields: [frontmatter___bookTitle] }
    ) {
    /* ... */
    }
  }
`
```

This didn't work and I received the error message: `"message": "There can be only one argument named \"sort\".",`

Okay, fair enough. A little searching later and I found the answer was staring me in the face: the _array_.

Arrays guarantee order and can store _multiple_ values. This is exactly what I was looking for! I just hadn't put the pieces together yet.

```javascript:title="src/pages/books.jsx"
export const pageQuery = graphql`
  query {
    books: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "books" } } }
      sort: { order: [ASC, DESC], fields: [frontmatter___author, frontmatter___bookTitle] }
    ) {
    /* ... */
    }
  }
`
```

Et Voilá! In the above example, GraphQl will sort the returned books by author (ascending) and book title (descending).

A few final notes on sorting with GraphQL:

1. If you're only sorting on one parameter, the array is optional.

```javascript:title="src/pages/books.jsx"
export const pageQuery = graphql`
  query {
    books: allMarkdownRemark(
      sort: { fields: frontmatter___author }
    ) {
    /* ... */
    }
  }
`
```

2. Sort order is optional. If no sort order is provided, GraphQL will default to ascending (`ASC`).
3. To build on the above. This is true for _all_ sort orders. So you can provide only the first one if you have two sort parameters for example. You cannot _skip_ however. For example:

```
query {
    books: allMarkdownRemark(
      filter: { fields: { sourceInstance: { eq: "books" } } },
      sort: { order: [, DESC], fields: [ frontmatter___date, frontmatter___bookTitle,] }
    ) {
    /* ... */
    }
  }
```

You might expect this to order `date` ascending and `bookTitle` descending - however, in practice, I found that `date` received the `DESC` and `bookTitle` fellback to the default `ascending`. While I did test this, I did not verify it with the docs. YMMV.

The really cool part about this is that I can delete my old custom sorting function that I'd created as a starting point when I didn't know how to sort with GraphQL

## Wrap Up

Sorting with GraphQL is simpler than I feared and intuitive once I understood the syntax! Things to remember:

1. Multiple fields are stored within an array
2. Default is ascending
3. Order matters

Even better, now that I know how to do it, I can remove the custom sorting function that I'd created with Javascript that was already too complicated and didn't even have multi-field sorting!

Good luck and good sorting!

## Footnotes

- <sup>[1](#fn1)</sup> We can categorize this under "premature optimization" since I don't currently have this problem - at least as far as my notes are concerned.
