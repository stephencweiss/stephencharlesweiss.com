---
title: 'Object Oriented Javascript: Extending Classes'
date: '2020-03-19'
updated: ['2020-04-07']
category: ['programming']
tags:
    [
        'oop',
        'object oriented programming',
        'javascript',
        'class instantiation',
        'prototype',
        'inheritance',
        'class constructor',
    ]
---

I’ve written in the past about [OO in Javascript](object-oriented-javascript/), but recently I was working on learning more about heaps and as I pulled together my own implementation of a binary heap, I noticed a gap in my understanding specifically as it relates to extending classes in Javascript.

In my previous OO post in Javascript, I wrote about the different styles of writing "classes" (which are really just functions that return objects - though their differences, particularly as they relate to memory management are important to keep in mind):

-   [Functional Instantiation](../../blog/2019-02-18/object-oriented-javascript/#functional-instantiation-pattern)
-   [Functional-Shared Instantiation](../../blog/2019-02-18/object-oriented-javascript/#functional-shared-instantiation-pattern)
-   [Prototypal Instantiation](../../blog/2019-02-18/object-oriented-javascript/#prototypal-instantiation-pattern)
-   [Pseudoclassical Instantiation](../../blog/2019-02-18/object-oriented-javascript/#pseudoclassical) (and the [syntatic sugar approach with the `class` keyword](https://stephencharlesweiss.com/blog/2019-02-18/object-oriented-javascript/#lets-add-sugar-es6-class-and-new))

The focus of that article, however was about designing classes, _not_ about extending or subclassing. Let's tackle that topic now.

## Pseudoclassical SubClassing

First up: extending a "class" with Javascript's pseudoclassical pattern. As a basis for example, I'll revisit the `Car` class from my previous post:

```javascript
function Car(make, model, year) {
    this.make = make
    this.model = model
    this.year = year
}
Car.prototype.wheels = 4
Car.prototype.trunk = true
Car.prototype.doors = 4
Car.prototype.greet = function () {
    return `Hi, I am a ${this.make} ${this.model}`
}
```

How might it look if I wanted a `Truck` class? A truck is similar to a car, but it's _special_. It has two-doors by default (in my mind) and it's towing capacity is a key characteristic.

I also think its personality would be different. Let's make a greeting that's _moar_.

```javascript
function Truck(make, model, year, towingCapacity, doors) {
    Car.call(this, make, model, year)
    this.towingCapacity = towingCapacity
    this.doors = doors || 2
}

Truck.prototype = Object.create(Car.prototype)
Truck.prototype.greet = function () {
    return `I want moaaaaar! I'm a ${this.make} ${this.model} from ${this.year}`
}
```

**Nota Bene**

1. When extending the Truck class's prototype, it's critical to use `Object.create()`. Without it, the Truck prototype would point to the same object in memory as the Car. As a result, any change made to the Truck prototype would then be reflected on the car.

```javascript
function Car(/*...*/) {
    /*...*/
}
Car.prototype.greet = function () {
    return `Hi, I am a ${this.make} ${this.model}`
}
/*...*/
function Truck(/*...*/) {
    /*...*/
}
Truck.prototype = Car.prototype
Truck.prototype.greet = function () {
    return `I want moaaaaar! I'm a ${this.make} ${this.model} from ${this.year}`
}
const myCar = new Car(/*...*/)
console.log(myCar.greet()) // I want moaaaaar! I'm a ...
```

2. Because `Object.create` creates a brand new object in memory, at that point, the prototypes diverge. This means that a "subclass" _may not_ have access to all of the same methods as its parent _if_ that method was added later.

```javascript
function Car(/*...*/) {
    /*...*/
}
/*...*/
function Truck(/*...*/) {
    /*...*/
}
Truck.prototype = Object.create(Car.prototype)
Car.prototype.eject = function () {
    return `Preparing eject sequence. 5...4...3...2..1...`
}
const myTruck = new Truck(/*...*/)
myTruck.eject() // TypeError: myTruck.eject is not a function
```

## Class Sugar

Now that we've extended a class with the pseudoclassical approach, let's look at how we might do the same but with the syntactic sugar offered by the `class` keyword. The car, again, might look like:

```javascript
class Car {
    constructor(make, model, year) {
        this.make = make
        this.model = model
        this.year = year
    }
    wheels = 4
    trunk = true
    doors = 4
    greet = function () {
        return `Hi, I am a ${this.make} ${this.model}`
    }
}
```

The first thing to notice is that the entire class is defined within one object (though this isn't strictly necessary). "Extending" the class is now much clearer because of the `extends` keyword.

```javascript
class Truck extends Car {
    constructor(make, model, year, towingCapacity, doors) {
        super(make, model, year)
        this.towingCapacity = towingCapacity
        this.doors = doors || 2
    }
    greet = function () {
        return `I want moaaaaar! I'm a ${this.make} ${this.model} from ${this.year}`
    }
}
```

As a reminder for what's happening here:

-   The `constructor` function replaces the function signature.
-   The invocation of `super` replaces the `Car.call(this,...)` but does the same thing. Because `Truck` extends `Car`, when we call `super`, we're instantiated a `Car` class. We have the opportunity to override the parent class values though. While this example doesn't, imagine a constructor that had another property `this.year = year - 2`. Now, instead of using the `year` in our class returned by the `Car` class, our year would be two less.

The biggest benefit here is readability. The `class` keyword helps to colocate the class logic in a more intuitive (to me) way.

This self-containment mitigates the risk of sprinkling logic around in different places that can result in diverging prototypes. More to the point, however, the class keyword uses the same prototypal chain. The result is that we can extend a parent class whenever and our subclasses will still have access to those new methods.

Take for example, defining a new method on our Car class _after_ the Truck has been defined.

For example:

```javascript
class Truck extends Car {
    /*...*/
}
const myTruck = new Truck('tesla', 'cyber truck', 2019, 1000)
Car.prototype.start = function () {
    return `START YOUR ENGINES!`
}
console.log(myTruck.start()) // START YOUR ENGINES
```

Prototypal inheritance rules still apply however. If a more localized version of the method `start` is present, it will be invoked (and this is true if the start function is defined in the class or later - as was the case with the Car's `start` method):

```javascript
class Truck extends Car {
    /*...*/
    start = function () {
        return `VROOM! Let's Go!`
    }
}
const myTruck = new Truck('tesla', 'cyber truck', 2019, 1000)
Car.prototype.start = function () {
    return `START YOUR ENGINES!`
}
console.log(myTruck.start()) // VROOM! Let's Go!
```

## Conclusion

Every time I dip back into object oriented programming, I learn something. This is part and parcel of my favorite part about programming: there's no _one_ way to solve a problem, though different approaches lend themselves to problems better than others.

Understanding how to take advantage of OO in Javascript is important to me so that when I encounter problems that are well suited for it, I'm ready.

Hopefully this was helpful for you!
