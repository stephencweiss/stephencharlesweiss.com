---
title: 'Serializing Non Serializable Objects In Python'
date: '2020-06-02'
publish: '2020-07-26'
draft: false
tags: ['json', 'python', 'serializable', 'typeerror', 'datetime']
category: ['programming']
---

A problem I've run into a number of times when working with Python is when I have a `datetime` object that I want to include in an API call. The first thing I want to do is convert it, along with the rest of my data into a JSON object.

The problem is that when I do that, I get an error: `TypeError: Object of type datetime is not JSON serializable`!

A quick example:

```python
>>> from datetime import datetime
>>> import json
>>> now = datetime.now()
>>> now
datetime.datetime(2020, 6, 23, 12, 38, 16, 997518)
>>> my_dict = {'now': now}
>>> my_dict
{'now': datetime.datetime(2020, 6, 23, 12, 38, 16, 997518)}
>>> json.dumps(my_dict)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Users/stephen/.pyenv/versions/3.8.0/lib/python3.8/json/__init__.py", line 231, in dumps
    return _default_encoder.encode(obj)
  File "/Users/stephen/.pyenv/versions/3.8.0/lib/python3.8/json/encoder.py", line 199, in encode
    chunks = self.iterencode(o, _one_shot=True)
  File "/Users/stephen/.pyenv/versions/3.8.0/lib/python3.8/json/encoder.py", line 257, in iterencode
    return _iterencode(o, 0)
  File "/Users/stephen/.pyenv/versions/3.8.0/lib/python3.8/json/encoder.py", line 179, in default
    raise TypeError(f'Object of type {o.__class__.__name__} '
TypeError: Object of type datetime is not JSON serializable
```

In this [Stack Overflow]((https://stackoverflow.com/questions/11875770/how-to-overcome-datetime-datetime-not-json-serializable) conversation, a number of solutions are presented, but the more interesting piece is that they all are taking advantage of the same feature of the native JSON encoder in Python: [the `default` argument of the `dump` and `dumps` methods](https://docs.python.org/3/library/json.html#json.dumps).

> If specified, `default` should be a function that gets called for objects that can’t otherwise be serialized. It should return a JSON encodable version of the object or raise a TypeError. If not specified, TypeError is raised.

In their answer, [jjmontes](https://stackoverflow.com/a/36142844/9888057) makes this very simple and "eats" everything by casting all potentially unserializable elements as a string:

```python
json.dumps(my_dictionary, indent=4, sort_keys=True, default=str)
```

This works with datetime objects because casting as a string is one of the [supported operations for datetime in Python](https://docs.python.org/3/library/datetime.html#datetime.datetime.dst):

> str(t)
>
> Returns a string in the form [D day[s], ][h]H:MM:SS[.UUUUUU], where D is negative for negative t. (5)

A more nuanced approach that _only_ targets datetime objects can be found in [jdi's answer](https://stackoverflow.com/a/11875813/9888057):

```python
import datetime
import json

def default(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()

return json.dumps(
  item,
  sort_keys=True,
  indent=1,
  default=default
)
```

Or, if you don't want to lose the error handling altogether, [jgbarah's answer](https://stackoverflow.com/questions/11875770/how-to-overcome-datetime-datetime-not-json-serializable/36142844#36142844):

```python
from datetime import date, datetime
from json import dumps

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))


print(dumps(datetime.now(), default=json_serial))
```

The point of all of this, however, is that not all objects are serializable and / or can be cast as strings. It's possible to use a custom conversion method (by assigning it to the `default` property) and targeting each type of non serializable object.

This is pretty handy to know!
