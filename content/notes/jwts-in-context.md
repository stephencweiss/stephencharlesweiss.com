---
title: 'JWTs In Context'
date: '2020-06-16'
publish: '2020-07-23'
category: ['programming']
tags: ['jwt', 'json web token']
---

One of the projects I enjoyed working on the most was creating a unified concept of a user between three separate applications. In doing so, I learned quite a bit about _using_ JSON Web Tokens (JWTs), but what I never really grasped was _why_ they were the solution. Mariano Calandra's [Why do we need the JSON Web Token (JWT) in the modern web?](https://medium.com/swlh/why-do-we-need-the-json-web-token-jwt-in-the-modern-web-8490a7284482) seeks to fill in that gap by providing the context around the problem JWTs solve.

Specifically, Mariano discusses how the _stateless_ nature of HTTP, the need for authentication/authorization in web applications, and the increasing _scale_ of applications made once viable solutions like Server Side Sessions untenable, paving the way for JWTs.

For further reading, the [JWT RFC](https://tools.ietf.org/html/rfc7519) is full of useful and interesting details.
