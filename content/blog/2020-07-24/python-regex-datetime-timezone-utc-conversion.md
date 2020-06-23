---
title: 'Converting Timestamps To UTC In Python'
date: '2020-06-20'
publish: '2020-07-24'
category: ['programming']
tags: ['python', 'regex', 'datetime', 'timezone', 'utc', 'groups']
---

Recently, I was working on a project where the API I was using would sometimes decide to include an offset for the timestamp and other times not. To make this example more concrete - most of the time the result would look like this: `2020-06-16T00:00:00`. Sometimes, however, it came back with additional information, like this `2020-06-18T14:55:28-05:00`.

Since my database doesn't handle timezones, I wanted to convert the timestamp to UTC to make sure I retained the actual information being communicated. The result of this led me to learn quite a few interesting ways to use Python's `datetime` and `re` modules.

Let's dive in.

## Breaking Up The Timestamp

In order to _create_ a timestamp in Python from a string, it needs to be in [ISO format](https://docs.python.org/3/library/datetime.html#datetime.datetime.fromisoformat). This actually _is_ the format that my timestamps were coming in.

```python
>>> from datetime import datetime
>>> dt_str = "2020-06-18T14:55:28-05:00"
>>> datetime.fromisoformat(dt_str)
>>> dt_str
datetime.datetime(2020, 6, 18, 14, 55, 28, tzinfo=datetime.timezone(datetime.timedelta(days=-1, seconds=68400)))
```

If I could simply convert this to UTC and print that, the whole problem would be simple. Unfortunately, there is no built-in way to change the timezone within Python.<sup>1</sup> This [Stack Overflow conversation](https://stackoverflow.com/questions/4563272/convert-a-python-utc-datetime-to-a-local-datetime-using-only-python-standard-lib) provides several options for representing a timestamp in local time, but I'm actually trying to go the _other_ way and the process seems to require that you know the name of the local timezone.

So, while I could _create_ a timestamp, in order to convert it to a string in UTC, I concluded I needed to construct it manually.

The first step of that process was to break up the string into the component pieces - which I accomplished using a regular expression. The insight here was that the regular expression object that's returned on a match can be broken down into groups.

```python
import re

dt_str = "2020-06-18T14:55:28-05:00"
pattern_with_offset = r"(\d{4})(-)(\d{2})(-)(\d{2})(T)(\d{2})(:)(\d{2})(:)(\d{2})(-|\+)(\d{2})(:)(\d{2})"

tz = re.compile(pattern_with_offset)
tz.match(dt_string)
if tz.match(timestamp):
    return _convert_to_no_offset(tz.match(timestamp))

def _convert_to_no_offset(regex_timestamp):
    """
    Takes a regex match with groups and returns a new string based timestamp
    """
    print(regex_timestamp)
    year = int(regex_timestamp.group(1))
    div1 = regex_timestamp.group(2)
    month = int(regex_timestamp.group(3))
    div2 = regex_timestamp.group(4)
    day = int(regex_timestamp.group(5))
    T = regex_timestamp.group(6)
    hour = int(regex_timestamp.group(7))
    div3 = regex_timestamp.group(8)
    minute = int(regex_timestamp.group(9))
    div4 = regex_timestamp.group(10)
    second = int(regex_timestamp.group(11))
    sign = regex_timestamp.group(12)
    hour_offset = int(regex_timestamp.group(13))
    div5 = regex_timestamp.group(14)
    minute_offset = int(regex_timestamp.group(15))
```

With these building blocks, I now had what I needed to construct my new datetime.

## Calculating The offset

Before I could create the timestamp though, I needed to find the offset which would be my `timedelta`. To do that, I created a small helper function:

```python
from datetime import timedelta

def _calc_time_delta(sign = "+", hour_offset = 0, minute_offset = 0):
    """Returns the time delta in seconds based on the offset"""
    sign = -1 if sign == "-" else 1
    return sign * timedelta(hours=hour_offset, minutes=minute_offset)
```

This returns a `timedelta` _from_ UTC:

```python
>>> delta = _calc_time_delta("-",5)
>>> delta
datetime.timedelta(days=-1, seconds=68400)
```

With the timedelta, we now have everything we need to create datetime in UTC time.

## Creating A UTC Date

My initial idea was to _set_ the timezone using the named parameter `tzinfo` based on the `offset`:

```python
from datetime import datetime, timezone
tzinfo = timezone(offset=_calc_time_delta(
    sign, hour_offset, minute_offset))

dt = datetime(year=year, month=month, day=day, hour=hour,
                minute=minute, second=second, tzinfo=tzinfo)
```

This approach, however, is what led me to the discover that there's no way to convert the timezone natively within Python (pre 3.9) as mentioned previously. Trying a different approach, I realized I could just _assume_ that the time was in UTC and then "add" the offset to the UTC time to get it to reflect the _actual_ UTC time.

In code this looked like:

```python
from datetime import datetime, timezone
dt = datetime(year=year, month=month, day=day, hour=hour,
                    minute=minute, second=second, tzinfo=timezone.utc) - offset
```

A few things to note:

1. I no longer needed to use the timezone and could simply set the `tzinfo` to `timezone.utc` (though leaving it off would default to `None` which is effectively the same in this case).
2. While I'm _setting_ it to UTC, all of the values are in my offset time (in this case -5:00), so I would need to _reverse_ the offset. Fortunately, among the [supported operations](https://docs.python.org/3/library/datetime.html#datetime.date.day) between a date and timedelta is `date2 = date1 + timedelta` - which is what I took advantage of above.

## Converting The Datetime To A String

The final piece is that I needed to convert this _back_ to a string so that when I turned the result into a JSON, I didn't break things.<sup>[2](#footnotes)</sup><a id="fn2"></a>

Since I was taking a string in initially, I wanted to return a string in all cases. Fortunately, `datetime` comes with an [instance method, `strftime`](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior) for this purpose.

Converting the datetime object to a string in the ISO format can be done like so:

```python
from datetime import datetime
dt = datetime.now()
return dt.strftime("%Y-%m-%dT%H:%M:%S")
```

## Polish and Wrap Up

At this point we've taken a string representing a datetime, converted it _into_ a `datetime` object in Python, made it timezone aware as its _correct_ UTC time, and then converted it back to a string.

Fortunately, when you spend long enough with a problem (and walk away a time or two), it starts to reveal itself. That's exactly what happened here. It's _very_ possible this is just a few lines if I used `pytz`, or waited for Python 3.9. None the less, I was able to find a few areas where I could simplify my approach. Below is the final function in all its glory (and opportunity for improvement).

A few bigger changes to call out:

1.  The biggest change was realizing that even if `.fromisoformat` didn't solve _all_ of my problems, it _could_ be used to great effect to simplify the regular expression by reducing the number of groups.
2.  Once I realized that I needed fewer groups, I also realized that I could use the `.groups()` method instead of the numbered group to define my variables.

In practice, this meant changing my pattern from:

```python
pattern_with_offset = r"(\d{4})(-)(\d{2})(-)(\d{2})(T)(\d{2})(:)(\d{2})(:)(\d{2})(-|\+)(\d{2})(:)(\d{2})"
```

to

```python
  pattern_with_offset = r"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(-|\+)(\d{2}):(\d{2})"
```

Reducing the number of groups from 15 to 4 (it helps to realize that not everything needs to be a group!).

It also meant that, assuming I had a match, I could declare the variables in one line:

```python
import re
#...
iso, sign, hour_offset, minute_offset = re.compile(pattern_without_offset).match("2020-06-18T14:55:28-05:00").groups()
```

The full code:

```python:title=process_datetime.py
import re
from datetime import datetime, timezone, tzinfo, timedelta

def process_datetime(datetime):
    """
    Inputs are strings representing datetimes in one of two forms:
        1. YYYY-MM-DDTHH:MM:SS
        or
        2. YYYY-MM-DDTHH:MM:SS(+/-)HH:MM
    The second option includes a timezone offset.
    Returns a datetime that has been adjusted and in the form of YYYY-MM-DDTHH:MM:SS
    """
    print(datetime)
    pattern_with_offset = r"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(-|\+)(\d{2}):(\d{2})"
    pattern_without_offset = r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}"
    tz = re.compile(pattern_with_offset)
    without_tz = re.compile(pattern_without_offset)
    if tz.match(datetime):
        return _convert_to_utc(tz.match(datetime))
    elif without_tz.match(datetime):
        return datetime
    else:
        raise UnexpectedDatetimeFormat(datetime)


def _convert_to_utc(regex_timestamp):
    """
    Takes a regex match with groups and returns a new string based timestamp
    """
    iso, sign, hour_offset, minute_offset = regex_timestamp.groups()
    offset = _calc_time_delta(sign, hour_offset, minute_offset)
    dt_utc = _construct_utc_dt(iso, offset)

    return dt_utc.strftime("%Y-%m-%dT%H:%M:%S")


def _construct_utc_dt(iso, offset):
    return datetime.fromisoformat(iso) - offset


def _calc_time_delta(sign="+", hour_offset="0", minute_offset="0"):
    """Returns the time delta in seconds based on the offset"""
    sign = -1 if sign == "-" else 1
    return sign * timedelta(hours=int(hour_offset), minutes=int(minute_offset))


class UnexpectedDatetimeFormat(Exception):
    def __init__(self, details):
        self.details = details
```

Testing this in the Python REPL looks like:

```python
>>> s1 = "2020-06-18T14:55:28-05:00"
>>> s2 = "2020-06-18T14:55:28+05:00"
>>> s3 = "2020-06-16T00:00:00"
>>>
>>> process1 = processDatetime(s1)
>>> process2 = processDatetime(s2)
>>> process3 = processDatetime(s3)
>>> print(f"RESULTS ->\n\t1: {process1}\n\t2: {process2}\n\t3: {process3}")
RESULTS ->
        1: 2020-06-18T19:55:28
        2: 2020-06-18T09:55:28
        3: 2020-06-16T00:00:00
```

## Footnotes

-   <sup>[1](#fn1)</sup> With the introduction of [ZoneInfo](https://docs.python.org/3.9/library/zoneinfo.html) in Python 3.9 this appears to be changing. At time of writing, however the highest runtime available at time of writing within AWS's Lambda is 3.8.3 - which is where my application is running. Moreover, because I was working with a Lambda, I wanted to keep my project as small as possible and so I explored alternatives to using `pytz`, which seems like it _may_ be useful in this context.
-   <sup>[2](#fn2)</sup> This is a problem that's bitten me more than once. [jjmontes](https://stackoverflow.com/a/36142844/9888057) provides a nifty solution in this Stack Overflow conversation answer the question [How to overcome "datetime.datetime is not JSON serializable"?](https://stackoverflow.com/questions/11875770/how-to-overcome-datetime-datetime-not-json-serializable):
    ```python
    json.dumps(my_dictionary, indent=4, sort_keys=True, default=str)
    ```
    The key part being the `default=str`. This function is applied to any values in the dictionary that aren't serializable -- in this case treating them as strings.
