---
title: 'List Comprehension In Python (With Comparisons In Javascript)'
date: '2020-05-04'
publish: '2020-06-11'
category: ['programming']
tags:
    [
        'python',
        'javascript',
        'list comprehension',
        'beginner',
        'map',
        'filter',
        'for-loop',
    ]
---

Python has a very concise syntax for creating new lists called List Comprehension.

List comprehension is a way to define a _new_ list based on an _old_ one.

In this post I'll:

1. Discuss the syntax of List Comprehension
2. Walk through some examples in Python
3. Contrast it with Javascript

## Syntax Breakdown

The syntax for a list defined with list comprehension has four pieces (some of which are optional):

1. the result, e.g., `new_list`
2. the expression, i.e. the new value based on the old list's element, e.g., `el`
3. the old list, e.g., `for el in old_list`
4. an optional filter, e.g., `if el != None`

This looks like:

```
new_list = [el for el in old_list if el != None ]
```

NB: The expression must reference the variable used to to find elements in the old list. So while `python> new_list = [el for el in old_list]` is valid, `python> new_list = [number for el in old_list]` will throw an error. The same is true for the filter.

## Python Example

First up, creating a list of odd numbers between 1 and 10 in Python.

We begin by constructing our base list:

```python
>>> numbers = []
>>> for number in range(1,11):
...	numbers.append(number)
...
>>> numbers
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Now we want to filter out odd numbers, we could use the same for loop strategy:

```python
>>> odd_numbers = []
>>> for number in numbers:
...     if number % 2 != 0:
...             odd_numbers.append(number)
...
>>> odd_numbers
[1, 3, 5, 7, 9]
```

But list comprehension allows a more concise syntax:

```python
>>> odd_numbers = [number for number in numbers if number % 2 != 0]
>>> odd_numbers
[1, 3, 5, 7, 9]
```

But what if we didn't want to filter. Instead we wanted to transform - doubling each number in the list for example:

```python
>>> doubles = [number * 2 for number in numbers]
>>> doubles
[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

And now putting that together - filtering out the evens, and then tripling the remaining values:

```python
>>> triple_odds = [number * 3 for number in numbers if number % 2 != 0]
>>> triple_odds
[3, 9, 15, 21, 27]
```

Now that we understand list comprehension, we can see that we could have created our first list more concisely too:

```python
>>> numbers = [number for number in range(1,11)]
>>> numbers
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Before moving on, let's look at those side-by-side to see how list comprehension mirrors the syntax of the for-loop / if-statement:

```python
>>> numbers = [number for number in range(1,11)]
>>> numbers
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
>>> triple_odd = [number * 3 for number in numbers if number % 2 != 0]
>>> triple_odd
[3, 9, 15, 21, 27]
>>> triple_odd = [] # reset the variable
>>> for number in numbers:
...     if number % 2 != 0:
...             triple_odd.append(number * 3)
...
>>> triple_odd
[3, 9, 15, 21, 27]
```

The expressions are almost identical, though the list comprehension is in one line:

1. `number * 3` is the expression in the list comprehension in the first position. It is the _last_ thing to occur in our for/if statement.
2. `if number % 2 != 0` is the filter in the list comprehension (last position), and the middle place in the for/if statement.
3. `for number in numbers` is the loop over the old list and is in the second position of our list comprehension and kicks off the for/if statement.

Now that we've seen how it's done in Python, let's take a look at how you might achieve similar results in Javascript.

## Javascript Equivalent

One of the interesting things about learning a new language is to see how it compares to others.

Here, I'll look at how I might achieve the same results of list comprehension with Javascript.

Javascript used to have [array comprehension](https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/Array_comprehensions), but it's been deprecated which means we'll need a different strategy here.

We get a hint for _how_ to approach this from the documentation on array comprehensions:

> Comprehensions can often be used in place of calls to [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) , or as a way of combining the two.

Since array comprehension was about combining maps and filters, we'll likely be able to achieve the same results by combining those.

Let's take a look at the same example above of creating a numbers array, then finding an odd numbers and a triple odd numbers list.

First, let's be fancy and use `Array.from()` and it's second argument, which is a map to generate our range of numbers 1-10.<sup>[1](#footnotes)</sup>

```javascript
let numbers = Array.from(new Array(10), (_, i) => i + 1)
console.log(numbers) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Now, we can create a filter to get our odd numbers:

```javascript
let oddNumbers = numbers.filter((num) => num % 2 !== 0)
console.log(oddNumbers) // [1, 3, 5, 7, 9]
```

And for our triple odd numbers:

```javascript
let tripleOddNumbers = numbers
    .filter((num) => num % 2 !== 0)
    .map((odd) => odd * 3)
console.log(tripleOddNumbers) // [3, 9, 15, 21, 27]
```

In our case, the order actually does _not_ matter, however filtering _before_ mapping is slightly more efficient as we reduce the number of elements we'll need to map over:

```javascript
let tripleOddNumbers = numbers
    .map((number) => number * 3)
    .filter((number) => number % 2 !== 0)
console.log(tripleOddNumbers) // [3, 9, 15, 21, 27]
```

## Footnotes

-   <sup>[1](#fn1)</sup> I say fancy because generating prefilled arrays has always been something I've struggled with - unless I use a for-loop, and this is the first time I've used the second argument from [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). This particular approach was inspired by [Jason Yu's article on Dev.To](https://dev.to/ycmjason/how-to-create-range-in-javascript-539i).
