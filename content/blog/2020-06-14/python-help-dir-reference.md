---
title: 'Exploring Python Methods With Help And Dir'
date: '2020-05-06'
publish: '2020-06-14'
category: ['programming']
tags:
    [
        'python',
        'help',
        'dir',
        'manual',
        'reference',
        'documentation',
        'beginner',
        'tips',
    ]
---

Over the past few days I've been exploring different data structures and built-in methods with Python.

I looked at [strings](../../2020-06-07/python-string-formatting/), [lists basics](../../2020-06-10/python-list-basics/), [list comprehension](../../2020-06-08/python-flow-control/), [flow control](../../2020-06-08/python-flow-control/), and I'm sure there will be more.

Today, however, I came across a great way to find and explore new methods using two [built-in functions](https://docs.python.org/3/library/functions.html):

1. [dir()](https://docs.python.org/3/library/functions.html#dir)
2. [help()](https://docs.python.org/3/library/functions.html#help)

## Dir And Help - What Are They?

`dir()` is a function that takes an optional object as it's argument:

> Without arguments, return the list of names in the current local scope. With an argument, attempt to return a list of valid attributes for that object.

This is really handy for understanding which methods are available on the object. NB: `dir()` is primarily intended as a convenience as a result, "[t]he resulting list is not necessarily complete, and may be inaccurate when the object has a custom [**getattr**()](https://docs.python.org/3/reference/datamodel.html#object.__getattr__)." It's focus is on relevant, not complete information.

`help()`, as might be expected, invokes the built-in help system. This proves to be a convenient way to pull up the documentation for methods.

The behavior changes depending on the argument. Help has three different behaviors - no argument, a string, any other object.

No argument:

> If no argument is given, the interactive help system starts on the interpreter console.

String:

> If the argument is a string, then the string is looked up as the name of a module, function, class, method, keyword, or documentation topic, and a help page is printed on the console.

Any other object:

> If the argument is any other kind of object, a help page on the object is generated.

## Example Time

Try the following in local python environment:

```python
>>> my_list = [1,2,3,4]
>>> dir(my_list)
['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
```

I wanted to learn more about what it means to remove an element from a list, so I continued with:

```python
>>> help(my_list.remove)
```

This opened up the manual page for remove, a built in of the list:

```text:title=remove-man-page
Help on built-in function remove:

remove(value, /) method of builtins.list instance
    Remove first occurrence of value.

    Raises ValueError if the value is not present.
(END)
```

Also, if you are worried that you're missing methods based on the `dir(my_list)`, you can pull up the full manual page for a list with `help(my_list)` - the problem is more verbose and less easily searchable.

## Conclusion

I'm learning a lot of new stuff, very quickly, with Python! Knowing about `dir()` and `help()` are huge time savers so that I can look up the documentation quickly and keep moving!
