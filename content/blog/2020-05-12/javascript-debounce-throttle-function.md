---
title: 'Implementing Debounce And Throttle With Javascript'
date: '2020-04-16'
publish: '2020-05-12'
category: ['programming']
tags:
    [
        'fundamentals',
        'computer science',
        'control flow',
        'debounce',
        'throttle',
        'lodash',
        'javascript',
        'closure',
    ]
---

I've written about debouncing and throttling in the past in the [context of scroll events](https://stephencharlesweiss.com/blog/2019-05-06/scroll-events-invoking-throttle-or-debounce/), but I wanted to take a moment and implement them.

Quick aside: It seems like the term _Debounce_ was actually coined by John Hann ([source](https://css-tricks.com/debouncing-throttling-explained-examples/)). Unfortunately, while [the post remains](http://unscriptable.com/2009/03/20/debouncing-javascript-methods/#more-698), the content seems to have been taken down.

## Managing Work With Debounce And Throttle

Before getting into the code, let's talk about what Debounce and Throttle are and how they're different. We can do that by going way back: to my childhood.

Growing up, my dad got a lot done around the hosue. He couldn't do everything though. Sometimes he'd ask for help.

Dinners at our home were a special time. The whole family would be around the table and we never knew what dad would whip up, but we knew it'd be delicious.

From time to time, he'd ask me to help gather some of the ingredients. He liked to improvise (when it wasn't a dinner party), so there wasn't always a recipe he could point me to or list per se. Instead he'd rattle off the ingredients as they came into his head: "Tomatoes!... Chicken!... Oh, broccoli!... Also, capers... And I nearly forgot: artichokes and olive oil!"

If I just responded as the list came in, I'd have been running all over the kitchen. So, I came up with a strategy: I'd _wait_. Not that long, but just long enough that if another item was going to come to mind, he'd have time to think about it.

The result was I avoided a lot of unnecessary work. By giving him a buffer to think of the next item, I often had a full list to work with. I didn't have a term for it at the time, but I was effectively debouncing his reuqests to get a list of ingredients!

In contrast to dinner, once I got old enough, mowing the lawn was my domain. I was a bit of a punk, however, and so I had a rule - I wouldn't do it more than once a week. I'd also never think of it myself - dad had to ask. (Did I mention? Punk.)

Dad would ask me to mow the lawn, and I'd say, "Yeah, I'll get to it" - figuring I would do it in about a week. (Again, punk.).

A few days later, I'd still not have mowed the lawn, and dad would notice the lawn was getting long. He'd come in and ask me again, "would I _please_ just mow the lawn already?"

I'd listen, but basically ignore him. (Punk. Punk. Punk.) I had it on my list. I'd do it. So, no matter how many times dad asked, I'd just ignore him until my "alarm" went off.

Now I was ready to get _new_ requests to mow the lawn and the cycle would repeat - but I'd never mow the lawn more than once a week. No matter how many times dad asked. Said another way - I was throttling my dad's requests.

## Writing This Algorithmically

Now that we've established I wasn't great around the house, we're ready to formalize my (bad) behavior. Why you ask? Because though the behavior isn't great on a child, it _is_ rather efficient in certain situations!

Translating my chores into algorithms might look a little like the following:

### Debounce

When receiving a new request ask:

1. Do I have a previously scheduled request? If so, cancel it. (_Has dad recently asked me to get some ingredients? If so, stop thinking about those._)
2. Schedule a new one to occur in the future after our predetermined waiting period (_Take the new list of all ingredients and prepare to search for them after a short waiting period._)

### Throttle

When receiving a new request ask:

1. Am I waiting to complete a request? Yes, then I can ignore any new requests. I only want to to handle one request at a time. (_Have I already scheduled the task? Yes? Then I can ignore this new one._)
2. If there's nothing scheduled, I should a) schedule the task to occur after the appropriate amount of time and b) clear my schedule once I've completed the task though. (_Okay, I haven't mowed the lawn recently, I can schedule it for the future. Once I mow the lawn, though - be sure to realize that my schedule's empty again._)

## Now For The Coding Part

The first thing we need to recognize is that in order to answer the questions "Do I have a previously scheduled request" or "Am I waiting to complete a request" we'll need to store that somewhere.

We could place this into the global application state, but that would get messy if we wanted to debounce or throttle more than one thing.

Luckily, we have an alternative in the form of closures (which [I wrote about previously here](https://stephencharlesweiss.com/blog/2019-04-05/closure-and-lexical-scope/))!

In our case, we'll use this closure by returning a new function (the debounced or throttled version) which will have access to the information we need to answer these questions.

### Coding Debounce

Okay, enough talk - let's code!

Here's one way to implement Debounce:

```javascript:title=Debounce.js
function debounce(fnToDebounce, delay) {
    let scheduleId
    return function debounced() {
        const context = this
        const args = arguments
        const deferredCall = fnToDebounce.apply(context, args)
        if (scheduleId) {
            clearTimeout(scheduleId)
        }
        scheduleId = setTimeout(deferredCall, delay)
    }
}
```

The first thing to notice is that `debounce` is a function that takes two arguments:

1. A `fnToDebounce` (this is my "gatherIngredients" function)
2. A `delay`

The function will return a new function, which I've referred to as the `debounced`.

The result of calling `debounce` is a _new_ function which can be called later. That's where we'll want to focus to see if it matches our algorithm. Let's take a look:

1. "Do I have a previously scheduled request? If yes, cancel it."

    ```javascript:title=Debounce.js
    function debounce(fnToDebounce, delay) {
        let scheduleId
        return function debounced() {
            //hide-start
            const context = this
            const args = arguments
            const deferredCall = fnToDebounce.apply(context, args)
            //hide-end
            /*...*/
            //highlight-start
            if (scheduleId) {
                clearTimeout(scheduleId)
            }
            //highlight-end
            /*...*/
            //hide-start
            scheduleId = setTimeout(deferredCall, delay)
            //hide-end
        }
    }
    ```

    How do we know if we have a scheduled task? Well, that's where the closure comes into play. Our `debounced` has access to the context in which it was defined - which happens to include a variable called `scheduledId` - funny that!

    Okay, so step one's complete, let's look at step 2.

2. "Schedule a new one to occur in the future after our predetermined waiting period."

    ```javascript:title=Debounce.js
    function debounce(fnToDebounce, delay) {
        let scheduleId
        return function debounced() {
            //hide-start
            const context = this
            const args = arguments
            const deferredCall = fnToDebounce.apply(context, args)

            if (scheduleId) {
                clearTimeout(scheduleId)
            }
            //hide-end
            /*...*/
            //highlight-start
            scheduleId = setTimeout(deferredCall, delay)
            //highlight-end
        }
    }
    ```

    This part is meant to be pretty straight forward, but requires a familiarity with the [`setTimeout` API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout). `setTimeout` works by placing its first argument, typically a function, into the event loop (confused? check out this fantastic talk: [What the heck is the event loop anyway? by Philip Roberts](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)) to be called after a delay (hey! that's kind of similar to what we're doing here with debouncing!).

    The "trick" if you will is that `setTimeout` returns an id so that you can find that function later and cancel it if need be, which, as it happens, is _exactly_ what we need.

At this point we've addressed the requirements of our algorithm: sweet!

Feel to jump ahead to a discussion about throttle, but before I get there, I thought it might be worth a short detour to discuss this `fnToDebounce.apply(context, args)` business.

First, it's important to notice that the function we're returning `debounced` doesn't actually take any arguments - or _known_ arguments at least.

However, it's a function declaration, and function declarations are pretty sweet. For one: they allow any arguments that are passed in, whether they're named or not, to be accessed with the `arguments` keyword.

Then there's the matter of context. We're going to be calling this function later, but the context might change by that point, so we want to bind it to the current one. Javascript offers several APIs for this - there's the well named [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) and the slightly less-well named [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply). The functionality is similar, however the optional parameters are different (apply takes an array of arguments where as bind takes them one at a time). `arguments` is itself an array, so we can pass that along nicely to `.apply`.

Alternatively, we could define our `debounced` as a function expression, which would allow us to spread the args, though this doesn't solve the need to bind the context in our `deferredCall`:

```javascript:title=Debounce.js
function debounce(fnToDebounce, delay) {
    let scheduleId
    const debounced = (...args) => {
        const context = this
        const deferredCall = fnToDebounce.apply(context, args)
        if (scheduleId) {
            clearTimeout(scheduleId)
        }
        scheduleId = setTimeout(deferredCall, delay)
    }
    return debounced
}
```

### Coding Throttle

Now that we have Debounce out of the way - let's take a look at Throttle - which if you squint, is actually pretty similar.

The biggest difference is that in our throttle, we're simply ignoring any requests that come in while we're waiting - the goal is to not answer a request more than once in a given amount of time and since I'm a petulant child, I'm not going to be keeping track of any requests to mow the lawn along the way (or do the first one quickly).

```javascript:title=Throttle.js
function throttle(fn, delay) {
    let scheduledId
    return function throttled() {
        const context = this
        const args = arguments
        const throttledCall = fn.apply(context, args)
        if (scheduledId) return
        scheduledId = setTimeout(() => {
            throttledCall()
            clearTimeout(scheduledId)
        }, delay)
    }
}
```

As with `debounce`, `throttle` is a function that takes two arguments:

1. A `fnToDebounce` (this is my "mowTheLawn" function)
2. A `delay`

Also similarly, the function will return a new function, which this time I've referred to as the `throttled`.

The result of calling `debounce` is a _new_ function which can be called later. That's where we'll want to focus to see if it matches our algorithm.

1. "Am I waiting to complete a request? Yes, then I can ignore any new requests. I only want to to handle one request at a time."

    Again, all of the magic is happening within our returned function (this time called, `throttled`):

    ```javascript:title=Throttle.js
    function throttle(fn, delay) {
        let scheduledId
        return function throttled() {
            //hide-start
            const context = this
            const args = arguments
            const throttledCall = fn.apply(context, args)
            //hide-end
            /*...*/
            if (scheduledId) return //highlight-line
            /*...*/
            //hide-start
            scheduledId = setTimeout(() => {
                throttledCall()
                clearTimeout(scheduledId)
            }, delay)
            //hide-end
        }
    }
    ```

    The point is that because I've already scheduled myself to mow the lawn, I can blithely ignore all future solicitations. It's like I'm walking through the world with noise canceling headphones!

2. "If there's nothing scheduled, I should a) schedule the task to occur after the appropriate amount of time and b) clear my schedule once I've completed the task though."

    ```javascript:title=Throttle.js
    function throttle(fn, delay) {
        let scheduledId
        return function throttled() {
            //hide-start
            const context = this
            const args = arguments
            const throttledCall = fn.apply(context, args)
            if (scheduledId) return
            //hide-end
            /*...*/
            //highlight-start
            scheduledId = setTimeout(() => {
                throttledCall()
                clearTimeout(scheduledId)
            }, delay)
            //highlight-end
        }
    }
    ```

    Now, we need to do _two_ things after our delay (`setTimeout` again is a great way to schedule things to occur in the future). The first thing we'll do after the delay is invoke the `throttledCall`. Immediately after, we'll clear our schedule making it so we're available for work again - ready to schedule the next person who comes knocking.

## Wrap up

So there you have it! The next time your dad comes to tell you to mow the lawn or pick up your bedroom, you can safely ignore him.

Wait, no! That's not the moral of the story!

The point is that both Debouncing and Throttling are really useful tools for managing workloads that need to happen in the future.

Debouncing is great if you don't want to start until you have all of the information available (or it's at least more likely). Throttling is better suited for ensuring that you never do something more frequently than a predefined schedule - like mowing the lawn a maximum of once per week! Any more than that is just a waste of time if you ask me. Not that anyone ever did.

Nota Bene: The implementations of Debounce and Throttle above are the simplest implementations. As this wonderful article [_Debouncing and Throttling Explained Through Examples_](https://css-tricks.com/debouncing-throttling-explained-examples/) by [David Corbacho](https://twitter.com/dcorbacho) points out, there are advanced use cases for debouncing and throttling that are commonly handled in an "options" argument. These include options like performing work on the leading of trailing edge (in the above I only did trailing). For these and more, Lodash's implementations are very informative: [Debounce](https://github.com/lodash/lodash/blob/master/debounce.js) and [Throttle](https://github.com/lodash/lodash/blob/master/throttle.js).
