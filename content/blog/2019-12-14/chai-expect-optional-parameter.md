---
title: 'Chai Testing - Expect's Optional Parameter'
date: '2019-11-26'
publish: '2019-12-14'
category: ['testing']
tags: ['chai','expect', 'javascript', 'bdd','tdd']
---

When testing with the Chai assertion library, I like the `expect` syntax and how it reads.

The [example from the docs](https://www.chaijs.com/guide/styles/#expect) demonstrates this nicely: 

```javascript
var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);
```

Reading the `expect` lines - it's intuitive what you would _expect_ to occur.

There is, however, an optional second parameter. This serves as a message that is prepended to the message in the event of an AssertionError.

Again, from the docs:
```javascript
var answer = 43;

// AssertionError: expected 43 to equal 42.
expect(answer).to.equal(42);

// AssertionError: topic [answer]: expected 43 to equal 42.
expect(answer, 'topic [answer]').to.equal(42);
```

This is useful for situations where additional context behind an assertion is necessary, though it does break the readability of the assertion. In that sense, I'm happy to know about it, but will use it sparingly. 

