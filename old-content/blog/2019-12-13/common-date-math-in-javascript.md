---
title: 'Common Date Math In Javascript'
date: '2019-11-26'
publish: '2019-12-13'
category: ['programming']
tags: ['javascript', 'date']
---

I'm a big fan of libraries like Moment and DayJS. They make dealing dates in Javascript so much easier.

Sometimes though, you just need to do some quick date math and don't want to bring in a whole library just for that.

I wanted to learn more about how to do that, so I did some digging into the Javascript Date object and some of the methods it ships with to be able to handle some common use cases.

Some of those that I wanted to learn were:

-   Getting the first day of the month
-   Getting the last day of the previous month
-   Getting the first day of the next month
-   Getting the last day of the month
-   Date math. Going forward or back a certain number of days (or months, seconds, etc.)

All of this can be handled using the standard APIs of Date like: `setDate`, `getDate`, `setMonth`, and `getMonth`.

## First Day Of The Month

The simplest way to get the first day of the month is to use `setDate(1)`:

```javascript
const testDate = new Date()
testDate.setDate(1) // This will change the date to the first day of the current month
```

## Last Day Of The Previous Month

In this use case, the steps are just as simple.

```javascript
const testDate = new Date()
testDate.setDate(0) // This will change the date to the last day of the previous month
```

## First Day Of The Next Month

Here's where we can start to use `setMonth` and `getMOnth`

```javascript
const testDate = new Date()
testDate.setMonth(testDate.getMonth() + 1)
testDate.setDate(1)
```

## Last Day Of The Month

And putting these lessons together, we can get the last day of the month too.

```javascript
const testDate = new Date()
testDate.setMonth(testDate.getMonth() + 1)
testDate.setDate(1)
```

## Finally, Date Math

What about going 60 days into the future or the past?

We've already talked about the parts necessary.

```javascript
const testDate = new Date()
testDate.setDate(testDate.getDate() + 60)
```

Remember, `setDate` starts at 1, the first day of the month. So, here `testDate.getDate() + 60` is 60 plus days on top of the day for the current day of `testData`.

On December 13, then that's 13+60. Said another way,:

```javascript
testData.setDate(73) // 60 days after December 13
```

Similarly going backwards 60 days:

```javascript
const testDate = new Date()
testDate.setDate(testDate.getDate() - 60)
```

Again, imagining the day this is run is December 13th, `testDate.getDate()` returns 13. On January 22nd, it would be 22.

Then subtracting 60, we get -47.

Which leaves Javascript to evaluate:

```javascript
testDate.setDate(-47)
```

When a negative number is passed into `setDate()`, it begins counting from the last day of the previous month.

In addition to `setDate()`, there's also `setMinutes()` and `setSeconds()`.

## Wrap Up

These are just a few simple examples of how to use the built-in functionality of Javascript's date object. There are plenty more.

The good news is that while dates are tricky, and [time zones are hard](https://www.youtube.com/watch?v=-5wpm-gesOY) - Javascript offers simple solutions to common use cases.
