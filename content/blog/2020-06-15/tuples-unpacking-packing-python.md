---
title: 'Packing And Unpacking Tuples In Python'
date: '2020-05-07'
publish: '2020-06-15'
category: ['programming']
tags:
    [
        'python',
        'beginner',
        'tuple',
        'unpacking',
        'packing',
        'spread operator',
        'javascript',
    ]
---

Unlike a list or a dictionary, in Python, tuples are immutable.<sup>[1](#footnotes)</sup><a id="fn1"></a> This is clear when investigating the methods available on the `tuple` object. Conspicuously absent are any methods for adding or removing elements:

```python
>>> dir(tuple)
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__rmul__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'count', 'index']
```

So, how _can_ you add a new item to a tuple? Technically you can't. But what you _can_ do is reassign the variable to a _new_ tuple.

This is where unpacking comes in handy. Unpacking is comparable to object destructuring from Javascript. There's even a "rest operator" equivalent: the `*`.

Let's look at an example of a family.

```python:title=our_first_tuple.py
>>> family = 'Stephen', 'Kate', 'Finn' # packing a tuple
>>> *adults, animals = family # unpacking
>>> adults
['Stephen', 'Kate']
>>> animals
'Finn'
>>> id(family)
4326772672
```

Interestingly, unlike destructuring in Javascript, the "rest" portion of this can occur at any point. In this example, the adults are leading the group, and I want to pull them out.

Below, the family gets a new addition, a cat named Garfield.

```python:title=modifying_tuples.py
>>> family = *family, 'Garfield'
>>> family
('Stephen', 'Kate', 'Finn', 'Garfield')
>>> id(family)
4326761632
```

The first thing we do is create a _new_ tuple. This is done by unpacking the original tuple and then adding a new member (`Garfield`). We know it's a new tuple because the id that Python's tracking for its position in memory is different.

Let's split this group into a few different factions:

```python:title=more_unpacking.py
>>> *original_cast, new_addition = family
>>> original_cast
['Stephen', 'Kate', 'Finn']
>>> new_addition
'Garfield'
>>> *adults, dog, cat = family
>>> adults
['Stephen', 'Kate']
>>> dog
'Finn'
>>> cat
'Garfield'
>>> dad, mom, *animals = family
>>> dad
'Stephen'
>>> mom
'Kate'
>>> animals
['Finn', 'Garfield']
```

These examples better show the various ways a tuple can be unpacked.

In case you missed it, packing is the term used to describe the _creation_ of the tuple. E.g.,:

```python:title=packing_tuples
my_tuple = ('a', 'b', 'c') # this is packing
my_other_tuple = 1, 2, 3 # this is also packing
```

## Wrap Up

Tuples may be immutable, but with the <del>spread</del> unpacking operator, it's easy enough to modify them. Just remember that you're creating a brand new list - with all of the performance implications therein.

## Footnotes

-   <sup>[1](#fn1)</sup> For what it's worth, I _always_ thought a tuple was a pair. Turns out that's not the case. Per [Wikipedia](https://en.wikipedia.org/wiki/Tuple), "a tuple is finite ordered lists (sequence) of elements." The point is that it's finite, not that it's a pair.
