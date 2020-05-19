---
title: 'Passing Arguments Into Exceptions In Python'
date: '2020-05-18'
publish: '2020-07-04'
category: ['programming']
tags: ['python', 'exceptions', 'classes', '__init__']
---

Previously, I wrote about [raising custom exceptions](../../2020-06-25/raising-custom-exceptions-python), but it was a hamstrung approach. It didn't actually enable any information to be passed _into_ the exception that might be relayed for further debugging in the logs. Instead, any information that could be reported upon had to be defined above the `try/except` block.

In an effort to document my errors better, I sought out how to actually pass along useful information. Well, as I noted in my previous post - custom exceptions are just sub classes, extending the `Exception`, which means that to pass along information, we can create a custom initialization, `__init__`.

For example:

```python:title=custom_exceptions.py
class MyException(Exception):
    def __init__(self, details ):
        self.details = details

try:
    raise MyException("Useful details to know about the exception!")
except FooException as e:
    print e.details
```

I first learned about this approach from Stack Overflow in this conversation on [passing variables to exceptions](https://stackoverflow.com/questions/6626816/how-to-pass-a-variable-to-an-exception-when-raised-and-retrieve-it-when-excepted).
