---
title: 'Object Oriented Javascript: Class Instantiation Patterns'
date: '2019-02-18'
category: ['programming']
tags:
  [
    'object oriented programming',
    'javascript',
    'class instantiation',
    'prototype',
    'inheritance',
  ]
---

What are classes anyway?
A class is an entity that is capable of producing objects (instances) that share common attributes, features, and methods.

A little more colloquially:

> Making the class is like create a stamp.
> Making an instance of it is actually stamping the paper.

I was exploring object oriented programming within Javascript this week - following along with Nicolas Marcora’s [lecture on the topic](https://www.youtube.com/watch?v=eDx8tElm-9s&feature=youtu.be).

As I primarily write Javascript, I sometimes am painfully unaware that some of the flexibility offered within Javascript is not present in other languages. After the lecture, I took a dive back into the different instantiation patterns available in Javascript.

For example, Javascript has multiple class patterns, including:

1. Functional
2. Functional-Shared
3. Prototypal
4. Pseudoclassical

In Ruby, however, [according to at least one article on the internet](https://www.thegreatcodeadventure.com/javascripts-functional-class-pattern/), there’s only one way to define a class.

This write-up then is a reminder of some of the differences and when/why you might use the different approaches.

# Functional Instantiation Pattern

```javascript
function Car(make, model, year) {
  const obj = {}
  obj.make = make
  obj.model = model
  obj.year = year
  obj.wheels = 4
  obj.trunk = true
  obj.doors = 4
  obj.greet = function() {
    return `Hi, I am a ${this.model} ${this.make}.`
  }
  return obj
}
const functionalCar = Car('S', 'Tesla', 2018)
const functionalCar2 = Car('Fiesta', 'Ford', 2015)
functionalCar.greet() // 'Hi, I am a Tesla S.'
functionalCar2.greet() // 'Hi, I am a Ford Fiesta.'
```

This is pretty straight forward. Except for naming the function with a capital letter (to indicate it’s a class), this looks very similar to any function.

The functional instantiation pattern returns an object with attributes that are stored on it - these can be passed into the constructor (like our make, model, and year), or part of the "prototype" (like wheels, trunk, door, and the method, greet).

The good news: Functional instantiation is really simple and easy to follow.

The bad news: Every time you instantiate the class, you duplicate all of the code. That means that every single car has its own copy of greet.

That’s not such a big deal in our case where we have only a few copies, but its not optimal when you have hundreds, or thousands of instances.

Moreover, since each instance is distinct, if you wanted to change something, you’d need to do it for every single instance. There’s no shared lineage.

# Functional-Shared Instantiation Pattern

To address the memory space of shared details, we can use the functional-shared instantiation pattern.

This addresses the problem by creating a second object which is used to extend the class object prior to returning.

```javascript
function Car(make, model, year) {
  const obj = {}
  extend(obj, objShared)
  obj.make = make
  obj.model = model
  obj.year = year
  return obj
}

function extend(obj, methods) {
  for (let key in methods) {
    obj[key] = methods[key]
  }
}

const objShared = {
  wheels: 4,
  trunk: true,
  doors: 4,
  greet: function() {
    return `Hi, I am a ${this.model} ${this.make}.`
  },
}
const functionalSharedCar = Car('S', 'Tesla', 2018)
const functionalSharedCar2 = Car('Fiesta', 'Ford', 2015)
functionalSharedCar.greet() // 'Hi, I am a Tesla S.'
```

Woot! Okay, no duplication of features like wheels or greetings. That’s a win! But, how did we accomplish it? By creating a helper function (for clarity, this could be accomplished within the object) and by creating a second object that’s stored somewhere else.

That’s not exactly ideal for readability.

The biggest drawback of this approach, however, has to do with its limited dynamism. Once the class is instantiated, it loses its connection to the shared methods. So, any modification there will not be passed along to instances instantiated _before_ the change - creating a potentially confusing situation.

Imagine:

```javascript
// Extending the above example re: functional-shared
objShared[greet] = function() {
  return 'Howdy! I am a ${this.model} ${this.make} from ${this.year}!'
}
const functionalSharedCar3 = Car('Veyron', 'Bugatti', 2019)
functionalSharedCar3.greet() // 'Howdy! I am a Bugatti Veyron from 2019!'
functionalSharedCar2.greet() // 'Hi, I am a Ford Fiesta.'
```

See how this can be confusing?

# Prototypal Instantiation Pattern

Before going into the details, it’s worth understanding that Javascript is prototype-based. Per [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain):

> When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its**prototype**. That prototype object has a prototype of its own, and so on until an object is reached with `null` as its prototype. By definition, `null` has no prototype, and acts as the final link in this**prototype chain**.

If you aren’t yet sure how Prototypes address the issues noted in the Functional-Shared Instantiation pattern example of a changing method, it’s also worth reading through the MDN page and playing around in the console to see how this approach makes things nice and simple.

```javascript
carPrototype = { wheels: 4, trunk: true, doors: 4, greet: function(){ return `Hi, I am a ${this.model} ${this.make}.`, };
function makeCar (make, model, year) {
  return {
    model,
    make,
    year,
    __proto__: carPrototype,
  }
}
const prototypalCar = makeCar('S', 'Tesla', 2018)
const prototypalCar2 = makeCar('Fiesta', 'Ford', 2015)
prototypalCar.greet() // 'Hi, I am a Tesla S.'
```

In this example, we're assigning the `__proto__` the value of `carPrototype` to make an intermediate step _before_ the default `Object.__proto__`.

A more standard approach would be to use the `Object.create()` built-in method to attach the prototypes.

While the end result is the same, the latter has the advantage of being slightly more explicit (and not requiring you to designate attributes for the `__proto__`).

```javascript
function makeCar (make, model, year) {
  const obj = Object.create(objShared)
  obj.model = model
  obj.make = make
  obj.year = year
}

objShared = {
  wheels: 4,
  trunk: true,
  doors: 4,
  greet: function(){ return `Hi, I am a ${this.model} ${this.make}.`, };
}
const standardPrototypalCar = makeCar('S', 'Tesla', 2018)
const standardPrototypalCar2 = makeCar('Fiesta', 'Ford', 2015)
standardPrototypalCar.greet() // 'Hi, I am a Tesla S.'
```

This addresses the problem of changing definitions. For example, if we were to change the greet as we did in the Functional-Shared, the cars we instantiated _prior_ to the change would return the _new_ definition.

The drawbacks of this approach are really the verbosity.

# Pseudoclassical

The pseudoclassical approach addresses some of the verbosity of the Prototypal Instantiation pattern by using the `.prototype`.

Instead of using `Object.create()` to define an intermediate prototype or attaching directly to the `__proto__`, we can do that by attaching values and methods to the `.prototype`.

```javascript
function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}
Car.prototype.wheels = 4
Car.prototype.trunk = true
Car.prototype.doors = 4
Car.prototype.greet = function() {
  return `Hi, I am a ${this.make} ${this.model}`
}

const psueodclassicalCar = new Car('S', 'Tesla', 2018)
const psueodclassicalCar2 = new Car('Fiest', 'Ford', 2015)
psueodclassicalCar.greet() // 'Hi, I am a Tesla S.'
```

Suddenly we don’t have any extra objects, methods to add those to an object. Instead we’re using the keyword `this` to help identify our context.

Prototypal inheritance means that you’re _sharing_ the constructor, and so there’s only one version of the prototype in memory.

# Let’s Add Sugar: ES6, `class` and `new`

To make folks who came from class-based languages more comfortable, as of ES2015, Javascript now has support for `class` and `new` keywords.

Still, it remains a prototype-based language (see MDN referenced above).

The syntactic sugar of the class, however, has some very nice features.

Instead of needing to identify shared methods and attributes as `.prototype`, we can place methods within the class object and shared attributes in the constructor.

```javascript
class Car {
  constructor (make, model, year) {
    this.model = model;
    this.make = make;
    this.year = year;
	  this.wheels = 4;
    this.trunk = true;
    this.doors = 4;
  }
  greet () {return `Hi, I am a ${this.make} ${this.model`}
}
const classCar = new Car(`S`, `Tesla`, 2018);
const classCar2 = new Car(`Fiesta`, `Ford`, 2018);
```

This is still using `prototypal` inheritance under the hood - meaning methods such as `greet()` are not duplicated.

# Conclusion

The enhancements from ES2015 with the introduction of `class` I would argue addresses any of the obfuscation present in some of the other patterns that the Functional Instantiation Patterns benefits from.

More to the point, it does that without sacrificing the performance - maintaining the prototype-chain and inheritance benefits available within Javascript.

Understanding _how_ we got here and what’s actually happening under the hood, however, makes it much easier for me to understand _why_ we need to use the constructor and how shared attributes and methods are passed around.

# Further Reading And Sources

[Object Oriented JavaScript - Nicolas Marcora - YouTube](https://www.youtube.com/watch?v=eDx8tElm-9s&feature=youtu.be)
[Inheritance and the prototype chain - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
[Instantiation Patterns in JavaScript – Jennifer Bland](https://medium.com/dailyjs/instantiation-patterns-in-javascript-8fdcf69e8f9b)
[Javascript’s Functional Class Pattern - Sophie DeBenedetto](https://www.thegreatcodeadventure.com/javascripts-functional-class-pattern/)
