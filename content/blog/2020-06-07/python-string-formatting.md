---
title: 'Formatting Strings In Python'
date: '2020-05-02'
publish: '2020-06-07'
category: ['programming']
tags:
    [
        'python',
        'strings',
        'format',
        'f-strings',
        'templates',
        '%-formatting',
        'str.format',
    ]
---

There are a number of different ways to write / format strings in Python.

1. `%-formatting`
2. `Str.format()`
3. `f-strings`
4. Template Strings

This [GeeksforGeeks article](https://www.geeksforgeeks.org/python-string-interpolation/#template) is a helpful resource on the differences.

Coming from Javascript, I thought Template strings would be what I'm most comfortable with, but it's actually `f-strings`.

Printing "Hello, World!" in four ways:

```python
str1 = "Hello"
str2 = "World"

# %-formatting
print("% s, % s!"%(str1, str2))

# Str.format()
print("{0}, {1}!".format(str1, str2))
print("{s1}, {s2}!".format(s1 = str1, s2 = str2))

# f-strings
print(f"{str1}, {str2}!")

# Template Strings
from string import Template
template = Template('$s1, $s2!')
print(template.substitute(s1 = str1, s2 = str2))

template2 = Template('${s1}, ${s2}!') # braces also work
print(template2.substitute(s1 = str1, s2 = str2))

```

Notes:

1. I looked at the example for the `%-formatting` a number of times before I actually noticed the syntax - `% s` represents the place for a string. The arguments are positional and can be referenced at the closing of the quotes.
2. `Str.format()` can use positional or named arguments. If named, their scope is limited to the arguments of `.format`, so they need to be assigned there, i.e. `print("{str1}".format())` will return a KeyError for an undefined `str1`.
