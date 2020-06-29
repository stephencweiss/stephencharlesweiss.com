---
title: 'Creating Objects'
date: '2019-10-29'
published: '2019-10-29'
category: ['programming']
tags: ['javascript', 'prototypal inheritance', 'object.assign', 'object.create']
---

The other day I came across a pattern for creating objects I couldn’t quite understand. The code looked a little like this:

```javascript
const objA = { /* … */ }
const objB = { /* … */ }
const objC = { /* … */ }
​
const newObj = Object.assign(Object.create(objA), objB, objC)
```

My confusion was around _why_ we would use `Object.create`. Wouldn't I end up with an object with all of the same properties if I excluded the `Object.create`?

To help myself understand, I played around with a few different ways for creating the `newObj`.

## Object.Create vs {} vs Spread

In creating the objects, I thought about three different ways for creating an object:

1. `Object.assign(Object.create(a), b)`
1. `Object.assign({}, a, b)`
1. `{...a, ...b}`

Here's what that looks like:

```javascript
const personPrototype = {
    eyes: 2,
    greet() {
        return `Hi! My name is ${this.name}!`
    },
}

const stephen = {
    name: 'Stephen',
}

const justin = {
    name: 'Justin',
}

const jim = {
    name: 'Jim',
}

const stephenPerson = Object.assign(Object.create(stephen), personPrototype)
const justinPerson = Object.assign({}, justin, personPrototype)
const jimPerson = { ...jim, ...personPrototype }
```

The second and third approaches are the same, however, there’s a major distinction between them and the first approach.

![](https://res.cloudinary.com/scweiss1/image/upload/v1593204796/create-objects_dvxija.png)

The `stephenPerson` object has two properties (`eyes`, and `greet`), while `justinPerson` and `jimPerson` have a `name` property as well.

But wait…

![](https://res.cloudinary.com/scweiss1/image/upload/v1593204796/stephenperson-greeting_coq9nh.png)

How does the greeting know the name’s `Stephen` if it’s not on the object? Because it’s on the object’s **prototype**.

![](https://res.cloudinary.com/scweiss1/image/upload/v1593204796/stephenperson-prototype_fhapkb.png)

## Why This Matters

When it comes to updating the name then, the `stephenPerson` has more options than `justinPerson` or `jimPerson`.

We can _add_ a `name` property directly to `stephenPerson` which would then be referenced by the `greeting`:

![](https://res.cloudinary.com/scweiss1/image/upload/v1593204796/stephenperson-add-name_gsauer.png)

Alternatively, we could update `stephen` directly:

![](https://res.cloudinary.com/scweiss1/image/upload/v1593204796/stephen-add-name_f6bwbr.png)

This does _not_ work for the `justin` or `jim` objects because `justinPerson` and `jimPerson` have no reference to those objects any more.

![](https://res.cloudinary.com/scweiss1/image/upload/v1593204796/justin-jim-add-name_eresu1.png)

## Conclusion

Use `Object.create` if you want to be able to continue to manage the object separately. In our example above, we would be able to continue to update `objA` directly and have those values accessible in our `newObj` because of prototypal inheritance. The values would be present on `newObj`'s prototype and therefore if they don’t appear directly on `newObj`, we would look to its prototype.

If the management of `objA` directly is not a primary concern, and you’re comfortable updating the `newObj` going forward, however, `Object.create` is unnecessary - particularly because if you assign a property to `newObj` that is present on `objA`, it will make the property on `objA` inaccessible unless you go through `__proto__` directly.
