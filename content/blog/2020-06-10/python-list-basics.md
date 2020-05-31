---
title: 'List Basics In Python'
date: '2020-05-03'
publish: '2020-06-10'
category: ['programing']
tags: ['lists', 'python', 'built-ins', 'basics', 'beginner']
---

Lists in Python are similar to arrays, though there are some idiosyncrasies to how the methods work in Python (at least relative to Javascript).

## Manipulating List Contents

Python replaces the `push` method with `append`, and though `pop` is still present, it _can_ take a positional argument.

There's also a `remove` method in Python which takes an element's value and removes the first instance found (and an error otherwise).

```python
>>> my_list = []
>>> my_list.append('bear')
>>> my_list.append('lion')
>>> my_list.append('cat')
>>> my_list.append('elephant')
>>> my_list
['bear', 'lion', 'cat', 'elephant']
>>> my_list.pop(3)
'elephant'
>>> my_list
['bear', 'lion', 'cat']
>>> my_list.remove('lion')
>>> my_list
['bear', 'cat']
```

## Sorting Lists

In Python, there's both a `list.sort()` method as well as a `sorted()`. The latter can take any iterable (lists, dictionaries, etc.).

The biggest difference between `list.sort()` and `sorted()` is that the former is in place and slightly more efficient - though being in place means you will lose the original list.

Sorting in Python is stable and leverages the [Timsort](https://en.wikipedia.org/wiki/Timsort) algorithm, "a hybrid stable sorting algorithm, derived from merge sort and insertion sort."<sup>[1](#footnotes)</sup><a id="fn1"></a>

The [Python documentation](https://docs.python.org/3/howto/sorting.html) covers several interesting sorting examples - beyond the basics. Included are:

1. multi / complex sorts
2. use of lambdas
3. item and attribute getters

## Counting A List

To find the number of elements in a list, we have `len` and the occurrences of an item, we have `list.count()`.

For example:

```python:title=list_counting.py
>>> my_list = ['cat','bear','dog','dog','elephant']
>>> my_list
['cat', 'bear', 'dog', 'dog', 'elephant']
>>> len(my_list)
5
>>> my_list.count('dog')
2
```

## Slicing Lists

Slicing can be used to retrieve portions of an existing list or mutate a list.

For example:

```python:title=list_slicing.py
>>> a = [1,2,3,4,5,6,7,8,9]
>>> a[4:7] # starts at the 4th index and continues to the 7th, though the end is not included
[5, 6, 7]
>>> a[3:] # the end index is not included, so we continue to the end
[4, 5, 6, 7, 8, 9]
>>> a[:3] # the start index is not included, so we start at 0.
[1, 2, 3]
>>> a[-4:-2] # negatives also work, here we're starting at the fourth to the end and continuing ot the second to the end
[6, 7]
>>> a[2:5] = [103, 104, 105] # we can also replace values with slices
>>> a
[1, 2, 103, 104, 105, 6, 7, 8, 9]
>>> a[2:5] = [1002] # the replacements can be of different sizes
>>> a
[1, 2, 1002, 6, 7, 8, 9]
>>> a[3] = [67, 78] # though going the other way will create a nested list
>>> a
[1, 2, 1002, [67, 78], 7, 8, 9]
```

## Combining Two Lists

Combining two lists is as easy as using the `.extend` method:

```python:title=list_combination.py
>>> a = [1,2,3,4,5]
>>> b = [6,7,8,9,10]
>>> a.extend(b)
>>> a
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
>>> b
[2, 3, 4, 5]
```

This is _similar_ to using the spread parameter in Javascript, e.g., `a = [...a, ...b]`, that is, it mutates the original list `a` (though not `b`).

## Wrap Up

Python lists are very interesting, and this is only a smattering of the use cases. There are other methods that are useful like `clear`, `reverse`, and `copy`. See [the docs](https://docs.python.org/3/tutorial/datastructures.html?highlight=lists#more-on-lists) for more on those and other useful tips - like list comprehension!

It's worth noting that the Python community seems to be much comfortable with mutating in place than what I grew accustomed to within the React community where reducers were an important concept for managing state transformations.

## Footnotes

-   <sup>[1](#fn1)</sup> For more on the Timsort algorithm, see [Wikipedia](https://en.wikipedia.org/wiki/Timsort).
