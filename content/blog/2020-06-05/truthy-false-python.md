---
title: 'Truthy and Falsey: Python Edition'
date: '2020-04-30'
publish: '2020-06-05'
category: ['programming']
tags: ['python','truthy','falsey','boolean','conditions','evaluation']
---
Just like Javascript, in Python, not everything's black and white. Here too there are truthy things and falsey values.

Also, like Javascript, falsey is the more limited set. In fact, in Python, where everything is an object, is considered true by default. From the [docs](https://docs.python.org/3/library/stdtypes.html#truth-value-testing):

> By default, an object is considered true unless its class defines either a  [__bool__()](https://docs.python.org/3/reference/datamodel.html#object.__bool__)  method that returns False or a  [__len__()](https://docs.python.org/3/reference/datamodel.html#object.__len__)  method that returns zero, when called with the object.  Here are most of the built-in objects considered false:  

Estefania Cassingena Navone, in her [Introduction to Truthy and Falsey Values in Python](https://www.freecodecamp.org/news/truthy-and-falsy-values-in-python/), separates the falsey values into three groups: Sequences and Collections, Numbers, and Constants:

**Sequences and Collections:**
* Empty lists []
* Empty tuples ()
* Empty dictionaries {}
* Empty sets set()
* Empty strings ""
* Empty ranges range(0)
**Numbers**
* Zero of any numeric type.
* Integer: 0
* Float: 0.0
* Complex: 0j
**Constants**
* None
* False


