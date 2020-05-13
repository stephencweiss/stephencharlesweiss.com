---
title: 'Raising (Custom) Exceptions In Python'
date: '2020-05-11'
publish: '2020-06-25'
category: ['programming']
tags: ['exception', 'try', 'catch', 'error', 'python', 'raise']
---

If a Python program receives values it cannot handle, it can abort by raising an exception.

Most of errors in Python are built on the [Exception class](https://docs.python.org/3/library/exceptions.html#built-in-exceptions).

Here’s the beginning of the manual page for Exception:

```python
>>> help(Exception)
class Exception(BaseException)
 |  Common base class for all non-exit exceptions.
 |
 |  Method resolution order:
 |      Exception
 |      BaseException
 |      object
 |
 |  Built-in subclasses:
 |      ArithmeticError
 |      AssertionError
 |      AttributeError
 |      BufferError
 |      ... and 15 other subclasses
 |
 |  Methods defined here:
 |
 |  __init__(self, /, *args, **kwargs)
 |      Initialize self.  See help(type(self)) for accurate signature.
```

The nice thing about this is it suggests the way forward for raising our own, custom exceptions!

We can create custom exceptions in Python by extending the `Exception` class.

For example, Goldilocks likes her porridge _just right_, not too hot and not too cold.

Let’s see how we might model that with some custom exceptions:

```python:title=custom_exception.py
class TooHotError(Exception):
    """Raised when the temperature is too hot"""
    pass


class TooColdError(Exception):
    """Raised when the temperature is too cold"""
    pass


def porridge(temp):
  if temp < 90:
    raise TooColdError(f"Sorry, at {temp} degrees, the porridge is too cold for Goldilocks!")
  elif temp > 120:
    raise TooHotError(f"Sorry, at {temp} degrees, the porridge is too hot for Goldilocks!")
  return "Ahh, just right!"

porridge(80)
porridge(150)
porridge(110)
```

Refactoring `porridge` to a try catch block may be more idiomatic:

```python:title=custom_exception.py
# ...

def porridge(temp):
    try:
        if temp < 90:
            raise TooColdError
        elif temp > 120:
            raise TooHotError
        return print("Ahh, just right!")
    except TooColdError:
        print(
            f"Sorry, at {temp} degrees, the porridge is too cold for Goldilocks!")
    except TooHotError:
        print(
            f"Sorry, at {temp} degrees, the porridge is too hot for Goldilocks!")


porridge(80)
porridge(110)
porridge(150)
```
