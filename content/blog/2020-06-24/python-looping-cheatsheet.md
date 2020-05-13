---
title: 'A Looping Cheatsheet For Python'
date: '2020-05-11'
publish: '2020-06-24'
category: ['programming']
tags: ['python', 'loop', 'zip', 'enumerate']
---

The following post is inspired by Trey Hunner’s great post on [looping with indexes in Python](https://treyhunner.com/2016/04/how-to-loop-with-indexes-in-python/).

What’s below:

1. [Standard loop through an iterable](./#standard-for-in-loop)
2. [Loop with range](./#loop-with-range)
3. [Loop with enumerate](./#loop-with-enumerate)
4. [Loop with zip](./#loop-with-zip)

## Standard For In Loop

Python’s looping reads almost like English. If we want to see every character in a string or every number in a range, we can do something as simple as a `for in`:

```python:title=basic_iteration.py
string = "ABCDEFG"
nums = range(10)

for c in string:
  print(c)

for num in nums:
  print(num)
```

## Loop With Range

Ranges start to be interesting if we want to loop over lists, or [create lists from other iterables](../../2020-06-23/python-list-comprehension-and-chunking).

```python:title=iterate_with_range.py
names=["Stephen","Kate","Finn","Magpie"]
for i in range(len(names)):
  print(names[i])
```

Here `i` is the index of the list `names`, which is then used to access the value in the print statement.

Of course, in Python, this isn’t necessary:

```python:title=iterate_with_range_standard.py
names=["Stephen","Kate","Finn","Magpie"]
for name in range(names):
  print(name)
```

That’s some sweet syntactic sugar right there!

## Loop With Enumerate

Learning about Python’s `enumerate` package is when I started to get excited! Sometimes, you want access to the actual index.

We _could_ do the trick above where we convert the iterable with the `len()` and then use both the index and the value, but we don’t have to.

Python’s `enumerate`, a built-in function:

```python:title=enumerate.py
names=["Stephen","Kate","Finn","Magpie"]
for index, name in enumerate(names):
  print(f"{name} is in position {index}")
```

## Loop With Zip

So, with `enumerate` we can access both the index and the value. That means that we could, in theory map it to a separate list.

For example:

```python:title=enumerate_multiple_lists.py
names=["Stephen","Kate","Finn","Magpie"]
ages=["30","???","2.5","0"]
for index, name in enumerate(names):
  print(f"{name} is {ages[index]} years old.")
```

This works, but it’s a little awkward.

We can use Python’s `zip` function for this:

```python:title=zip_to_the_rescue.py
names=["Stephen","Kate","Finn","Magpie"]
ages=["30","???","2.5","0"]
for name, age in zip(names, ages):
  print(f"{name} is {age} years old.")
```
