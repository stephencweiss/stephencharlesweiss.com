---
title: 'List Comprehension And Chunking In Python'
date: '2020-05-11'
publish: '2020-06-23'
category: ['programming']
tags: ['python', 'list comprehension', 'range']
---

Previously, I wrote about basic use cases of [list comprehension in Python](python-list-comprehension).

Today’s example is slightly different and has to do with chunking an input into approximately even parts.<sup>1</sup>

So, for example, given the string `ABCDEFGH`, if I want strings that are 3 characters long, how can I do that?

```python:title=split_string.py
def split_string(string, size):
  return [string[i:i+size] for i in range(0, len(string), size)]
```

Let’s break this down (for a summary of the different parts of the syntax, refer to my previous post on [list comprehension basics](python-list-comprehension)):

1. This is using list comprehension to return a new list.
2. The expression is `string[i:i+size]` - which is a slice of the input from `i` to `i+size` (where size is the length of the chunk)
3. The list we’re iterating over is `i in range(0, len(string), size)`, i.e. we’re making a _new_ list in the list comprehension to loop over. In this case, we’re starting at position 0, and iterating until the end of the list.
4. We have no filter.

Another way to see this would be to take it step-by-step:

```python:title=split_with_step.py
def split_simple(string, size):
  result = []
  for i in range(0, len(string), size):
    result.append(string[i:i+size])
  return result
```

## Footnotes

-   <sup>1</sup> I say approximately even because if the chunk size is not a factor of the length of the input, the last portion will be partial.
