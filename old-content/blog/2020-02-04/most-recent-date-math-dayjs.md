---
title: 'Finding The Most Recent Date In An Array, With Conditions, Using DayJS'
date: '2020-01-20'
publish: '2020-02-04'
category: ['programming']
tags: ['dayjs', 'dates', 'javascript', 'date math', 'isafter', 'isbefore']
---

There are a lot of different ways to approach date math ([I've written about some in the past](../../2019-12-13/common-date-math-in-javascript)), but recently, I had to find the best way to find the date in a list that was the most recent (but still in the past).

Let's start by revisiting some basic date math, this time using DayJS.

## DayJS IsAfter & IsBefore

DayJS, a lightweight library offers several methods for date comparison. In this case, two that are useful are `isBefore` and `isAfter`. They allow a DayJS `Date` to be compared to another.

```javascript
const today = dayjs()
const past = dayjs('2010-06-01')

console.log(today.isAfter(past)) // true
console.log(past.isBefore(today)) // true
```

### Handling Null And Undefined

While `isBefore` and `isAfter` are quite intuitive, their handling of `null` or `undefined` values is not. Or rather, it certainly wasn't how I expected it to operate.

```javascript
const isAfterNull = dayjs().isAfter(null)
const isBeforeNull = dayjs().isBefore(null)
console.log({ isAfterNull, isBeforeNull }) // {isAfterNull: false, isBeforeNull: false, isAfterUndefined: false, isBeforeUndefined: false}
```

Knowing this, however, we can protect against comparing a valid date against `null`/`undefined`.

We'll come back to this in a bit.

## Comparing The Set

If you know that your set of dates has no gaps, then a good approach might use a `.map`/`reduce` approach:

```javascript
const days = ['2020-01-02', '2019-01-29', '2019-12-30']

const maxDates = days.map((day) => dayjs(day))

const maxDate = maxDates.reduce((accumulator, curVal) =>
    curVal && accumulator.isBefore(curVal) ? accumulator : curVal
)
console.log(maxDate) // "2020-01-02"
```

This can go awry in an awful lot of ways, however. Take one example: What happens if there's a gap in the data?

```javascript
const missingDates = ['2020-01-02', undefined, '2019-12-30']
//highlight-start
const maxDates = days.map((day) => dayjs(day))
//highlight-end

const maxDate = maxDates.reduce((accumulator, curVal) =>
    curVal && accumulator.isBefore(curVal) ? accumulator : curVal
)
console.log(maxDate) // TODAY
```

The result is today's date even though today wasn't in the initial data set. This is because in the highlighted line above, if the value's undefined, we are effectively setting it today (the value of `dayjs(undefined)` is the same as `dayjs()`, the current timestamp).

Let's handle that next.

## Filter out empty values

```javascript
const missingDates = ['2020-01-02', undefined, '2019-12-30']
//highlight-start
const maxDates = days.map((day) => dayjs(day))
//highlight-end

const filteredDates = maxDates.filter((day) => !!day)

const maxDate = filteredDates.reduce((accumulator, curVal) =>
    curVal && accumulator.isBefore(curVal) ? accumulator : curVal
)
console.log(maxDate) // "2020-01-02"
```

## Adding In A Recency Check

And now, the final step - ensuring that the date we return is in the past (that is - up to and including today).

The one part I haven't mentioned is that one of the reasons we can get sparse data is because we're really combining three dates: a set of updated dates, a publish date, and the original date. Even better, there can be gaps _anywhere_.

In the example below for example - there's a gap in `updated` and `date`.

First, let's pull some of the functions apart - highlighted is our reducer function:

```javascript
const updated = ['2020-05-02', '2020-01-19', , '2019-12-30']
const publish = '2019-08-20'
const date = undefined
const TODAY = dayjs() // 2020-02-04
const FAKE_START = dayjs('1900-01-01')
const node = { updated, publish, date }

//highlight-start
const reducerToMostRecentDateBeforeBuild = (accumulator, curVal) => {
    return curVal &&
        dayjs(curVal).isAfter(dayjs(accumulator)) &&
        (TODAY.isAfter(curVal) || TODAY.isSame(curVal, 'day')) // In case the date is the same as TODAY, need to add a second check
        ? curVal
        : accumulator
}
//highlight-end

function findMaxDate(node) {
    const { updated, publish, date } = node.frontmatter
    const allDates = []
    if (updated) allDates.push(...updated)
    allDates.push(publish, date)
    const filteredDates = allDates.filter((day) => day)

    if (filtereDates.length === 0) return // escape early and return null if no valid dates supplied
    const maxDate = filteredDates
        .map((day) => dayjs(day))
        .reduce(reducerToMostRecentDateBeforeBuild, dayjs('1900-01-01')) // to make sure the first date is valid

    return maxDate && maxDate.isAfter(FAKE_START) ? maxDate : null
}

console.log(findMaxDate(node)) // "2020-01-19"
```

The remaining changes made in order to handle the nuance of having a maximum allowable date:

2. Early escape if there are _no_ filtered dates
1. Setting an initial value
1. Adding another check relative to `TODAY` in the reducer
1. Final check against the `FAKE_START`

If _all_ of the dates were somehow null, escape right away and return null.

In my case, I also knew that all dates would be _after_ `1900-01-01`. I could therefore use that value, which was assigned to `FAKE_START`, as the initial value in the reducer.

Within the reducer I added the line:

```javascript
TODAY.isAfter(curVal) || TODAY.isSame(curVal, 'day')
```

This is equivalent to asking if today is greater or equal to the `curVal`.<sup>1</sup>

Finally, I make sure that there's actually a value at the end of this. If there's not, I don't want to return my fake date, but would prefer `null`, so I do a final check.

## Conclusion

And with that, we've sorted a potentially holey list of dates to return the maximum value that's in the past. For other ideas, you can check out [this StackOverflow conversation from 2011](https://stackoverflow.com/questions/7143399/min-max-of-dates-in-an-array#7143601).

I also have a [Code Sandbox](https://codesandbox.io/s/find-latest-date-with-parameters-y50tw) to play around with the code of finding the latest date in an array given a set of parameters (e.g., up to and including today). Do note that the answer will change _after_ May 2, 2020!

## Footnotes

-   <sup>1</sup> I am explicitly setting `day` as the comparison value because the [API documentation](https://github.com/iamkun/dayjs/blob/HEAD/docs/en/API-reference.md) doesn't make it clear what the default value is and I haven't had a chance to dig into the source code.
