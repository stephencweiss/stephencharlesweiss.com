---
title: 'Rename Variable While Destructuring In Javascript'
date: '2019-04-04'
category: ['programming']
tags: ['javascript', 'object destructuring']
---

I recently came across a situation where I had two different props in a component that had the same name (they were in different parts of the object).

I wanted to use both and compare them, but also wanted to use destructuring so I didn't have to drill through the object to find them.

This got me wondering whether or not I'd be able to simply rename while destructuring the object.

Turns out you can.

Imagine the following:

```javascript
const me = {
  name:'stephen',
  family: {
    wife : {
      name: 'kate'
    }
    animal: {
      name : 'finn',
      type: 'dog',
    },
  }
}
```

So, I want to be able to access my name, my wife's name, and my dog's name.

I can do that with destructuring, like so:

```javascript
const { name } = me
const { name: wife } = me.family.wife
const { name: dog } = me.family.dog
```

The only thing that I really wish this could do that it *can't* is allow additional restructuring *within* the object and combine this into one line. That is, the following will *not* work:
`const {name, family.wife.name: wife, family.dog.name: dog} = me`

Oh well.

[Wes Bos](https://wesbos.com/destructuring-renaming/) has a helpful post on the topic. Check it out.
