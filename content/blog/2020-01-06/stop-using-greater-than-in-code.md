---
title: 'Don't Use `>` In Programming'
date: '2019-12-21'
publish: '2020-01-06'
category: ['programming']
tags: ['readability','clean code']
---

I don't remember how I found [Llewellyn Falco's blog post about the use of the greater sign in programming](https://llewellynfalco.blogspot.com/2016/02/dont-use-greater-than-sign-in.html), but I thought it was an excellent point for writing readable code.

In English, we read left-to-right, and when we _write_ code, our primary audience should be the engineers who come later - not the computer.

With that in mind, Llewellyn's "rule" to never use the greater sign makes a lot of sense.

First, however, an admission. When I'm comparing two things, I often start with a greater than statement in my head.

That is, I ask myself is x _greater_ than y? In code, the equivalent conditional could be written as:

```javascript
if (x > y) {
  // do something
}
```

Llewellyn's point (about which I agree) has more to do with consistency and cases where _three_ things are compared.

In those situations, the use of the greater than symbol creates a significant overhead for readers as they try to keep the meaning straight.

To see this, let's look at an example.

Imagine x relative to y and z and where we want to know if x is between y and z (and z is greater than y).

Now, we have lots of ways to write the condition to evaluate:

```shell
z > x && x > y
z > x && y < x
x < z && x > x
x < z && y < x

x > y && z > x
y < x && z > x
x > y && x < z
y < x && x < z
```

While they all say the same thing, the last one (`y < x && x < z`) is the winner for readability.

We're testing to see if x is _between_ y and z and that's exactly where it's placed in the conditional.

I readily admit that sometimes the `>` symbol _feels_ right, however, by abolishing it from our code, we create more extensible and readable code.

It's like a linting rule. We can argue all day about whether it's right or wrong. The gains come from agreeing on a standard and moving forward so that we can focus on the actual functionality of our programs and worry less about the style - because right or wrong, at least it's consistent.
