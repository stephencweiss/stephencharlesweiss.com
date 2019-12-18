---
title: 'GraphQL Fragments'
date: '2019-12-18'
publish: '2020-01-04'
category: ['graphql']
tags:
  [
    'fragments',
    'lee byron',
    'immutable.js',
    'modern web podcast',
    'full stack fest',
  ]
---

Recently, I listened to a conversation on the [Modern Web Podcast about GraphQL in 2019](https://modernweb.podbean.com/e/s05e22-modern-web-podcast-whats-up-with-graphql-2019-with-tracy-lee-rob-ocel-tanmai-gopal-and-uri-goldshtein/)

When it comes to understanding GraphQL, several of the panelists referenced the talk [Lee Byron gave at Full Stack Fest 2016 on Immutable User Interfaces](https://www.youtube.com/watch?v=pLvrZPSzHxo).

The talk is a great primer on _why_ we have GraphQL and how it solves some of the problems inherent with MVC/REST - particularly around latency.

The best part for me, however, was around colocated data dependencies (~18 minute mark) - in particular the use of fragments to define collections of data that are often required together and help to address overfetching.

An example from Lee's slides:

```graphql
{
  event(id: 1234) {
    ...attendeeLIst
  }
}

fragment attendeeList on Event {
  attendees {
    ...personRow
  }
}

fragment personRow on User {
  ...profilePic
  name
  isFriend
}

fragment profilePic on User {
  profilePicture {
    width
    height
    url
  }
}
```

Plenty more to learn about _how_ to best use Fragments, but at least I now know they exist!

## Resources

-   [Apollo Docs on Using Fragments](https://www.apollographql.com/docs/react/data/fragments/)
