---
title: 'Private Fields and Methods In Javascript'
date: '2020-01-21'
publish: '2020-02-05'
category: ['programming']
tags: ['node', 'javascript', 'private variables', 'private methods']
---

When I was first learning about Javascript (so, several months ago), I found this article from [Douglas Crockford about private variables and members in Javascript](https://www.crockford.com/javascript/private.html). In it, he begins with the assertion that "JavaScript is the world's most misunderstood programming language" and then proceeds to claim that "JavaScript objects can have private members" and takes the rest of the article as an opportunity to demonstrate how.

More recently, however, I found an blog post from [Tsh.io highlighting several of the features that landed with Node v12](https://tsh.io/blog/new-node-js-features/). Among the list was private class fields and methods.<sup>[1](#footnotes)</sup><a id="fn1"></a>

Private class fields are a Stage 3 proposal from TC39, however:

1. Node has support as of v12
2. Babel has plugin support<sup>[2](#footnotes)</sup><a id="fn2"></a>

This proposal replaces many of the conventions the Javascript community has found in the past to emulate private methods and fields in the past such as an `_` prefix (e.g., `_privateVar`), closure, proxies, etc. (for more of these approaches, see the resources below).

## Private Fields

Let's look at an example using a `Rectangle` class.

```javascript
class Rectangle {
  width = 0;
  #height = 0;

  constructor(width, height) {
    this.width = width;
    this.#height = height
  }

  area() {
    return this.width * this.#height
  }
}
```

Now, let's instantiate that class and try accessing its properties:

```javascript
let rect = new Rectangle(4,5)
console.log(rect.area()) // 20
console.log(rect.width) // 4
//highlight-start
rect.#height = 6;
console.log(rect.#height)
//highlight-end
```

Things go swimmingly until the last two lines. If either of them are present, you'll get an error:

```shell
SyntaxError: Private field '#height' must be declared in an enclosing class
```

And while dot notation doesn't work, bracket notation does not either:

```javascript
console.log(rect['#height']) // undefined
```

## Private Methods

The TC39 proposal also includes support for private methods:

```javascript
class Rectangle {
    width = 0;
    #height = 0;

    constructor(width, height) {
      this.width = width;
      this.#height = height
    }

    #increase (factor) {
        this.width = factor*this.width
        this.#height = factor*this.#height
    }
    area() {
      return this.width * this.#height
    }

    enlarge(by) {
        this.#increase(by)
    }
  }
```

Note, however, that this is not yet supported in Node (as of V12.13).

## Conclusion

When it comes to private fields and methods in Javascript, there are a variety of approaches and opinions. Douglas Crockford is on one side proposing we've have them since 2001. At the same time TC39's proposal is pushing us toward a more declarative future.

In any case, I'm excited about the inclusion of private variables within Node 12 (and am continually grateful to the folks behind Babel for allowing the community to push forward with experimental syntax). It's not yet clear what the final spec for private variables will look like (it's been in committee for several years at this point), but it's clear we're still making progres - that alone is exciting and inspiring enough to make me want to keep learning!

## Footnotes

- <sup>[1](#fn1)</sup> For more on class fields and methods generally, MDN has a good primer. [Class fields | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields)
- <sup>[2](#fn2)</sup> [@babel/plugin-proposal-private-methods](https://babeljs.io/docs/en/babel-plugin-proposal-private-methods)

## Additional Resources

1. [Implementing Private Variables In Javascript | CSSTricks.com](https://css-tricks.com/implementing-private-variables-in-javascript/)
2. [Marcus Noble on various methods to create private variables in Javascript](https://marcusnoble.co.uk/2018-02-04-private-variables-in-javascript/). Of particular note here are [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), which I had not heard of before and his reminder that Typescript has support for Private/Public guarantees, however, these only apply at compile time. Therefore, if you want to rely on Typescript, you need to not ship code which Typescript alerts has errors (even if it's valid Javascript, as it would be in this case).
