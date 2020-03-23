---
title: 'Instantiate Class In Typescript'
date: '2020-03-22'
publish: '2020-04-10'
category: ['programming']
tags: ['error handling','typescript','class','constructor','type error']
---
Tonight, had a real head scratcher: how to instantiate a class in Typescript that uses a constructor without a compiler error!

In Vanilla JS, this works just fine:
```javascript:title="person.js"
export class Person {
  constructor(name: string) {
    this.name = name;
  }
  age = 0;
  setAge(age: number) {
    this.age = age;
  }
}

let joe = new Person('joe')
joe.setAge(22)
console.log(joe.name, joe.age) // joe 22
```

But, if you were to use this in Typescript, the compiler would yell, saying `name does not exist on type 'Person'`.

I'll admit, I was stumped for a while.
```typescript:title="person.ts"
export class Person {
  constructor(name: string) {
    this.name = name;
  }
  age = 0;
  public setAge(age: number) {
    this.age = age;
  }
}

let joe = new Person('joe')
joe.setAge(22)
console.log(joe.name, joe.age) // joe 22
```

The solution is simple in the end, albeit certainly unintuitive to me - Add a default value and then override that value within the constructor!

Here's a [CodeSandbox](https://codesandbox.io/embed/distracted-meadow-t3lmh?fontsize=14&hidenavigation=1&theme=dark) to prove the point.

https://codesandbox.io/s/typescript-class-instantiation-t3lmh

Sometimes solutions are simpler than I give them credit for - though if anyone has a _better_ way to do this, or a rationale for what's happening here that I'm missing, I'm all ears!


