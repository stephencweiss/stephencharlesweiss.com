---
title: 'RESTful APIs: Put Vs. Patch'
date: '2019-08-27'
category: ['programming']
tags: ['api', 'restful', 'put', 'patch']
---

I routinely find myself looking up the differences between the HTTP methods (aka verbs) `PUT` and `PATCH`. While there’s plenty of nuance, some of which I’ll get to below, the tl;dr is:

> `PATCH` and `PUT` have different semantics. `PUT` means create/replace and it is idempotent. `PATCH` means update (full or partial) and it is not idempotent.<sup>1</sup>

The Wikipedia article on HTTP has a great table which summarizes several of the HTTP methods - I’ve adapted it lightly below: <sup>2</sup>.

| HTTP method | RFC                                             | Request has Body | Response has Body | Safe | Idempotent | Cacheable |
| ----------- | ----------------------------------------------- | ---------------- | ----------------- | ---- | ---------- | --------- |
| DELETE      | [RFC 7231](https://tools.ietf.org/html/rfc7231) | Optional         | Yes               | No   | Yes        | No        |
| GET         | [RFC 7231](https://tools.ietf.org/html/rfc7231) | Optional         | Yes               | Yes  | Yes        | Yes       |
| POST        | [RFC 7231](https://tools.ietf.org/html/rfc7231) | Yes              | Yes               | No   | No         | Yes       |
| PUT         | [RFC 7231](https://tools.ietf.org/html/rfc7231) | Yes              | Yes               | No   | Yes        | No        |
| PATCH       | [RFC 5789](https://tools.ietf.org/html/rfc5789) | Yes              | Yes               | No   | No         | No        |

While William Durand may object, I like how simple `PATCH` makes it to update a record: Instead of having to `GET` the record’s most recent data so that you can replace the entire record with a `PUT`, with `PATCH`, you can just declare what you’d like set. <sup>3</sup>

For example - update user `123` the body can be as simple as:

```
PATCH /users/123

{ "email": "new.email@example.org" }
```

Related: [Idempotence](../../2019-08-26/idempotent)

# Footnotes

- <sup>1</sup> [Patch verb by dlee | GitHub](https://github.com/rails/rails/pull/505#issuecomment-3225622)
- <sup>2</sup> [Hypertext Transfer Protocol | Wikipedia](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- <sup>2</sup> [Please. Don’t Patch Like An Idiot. | William Durand](https://williamdurand.fr/2014/02/14/please-do-not-patch-like-an-idiot/)
