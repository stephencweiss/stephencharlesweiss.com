---
title: 'Determining A Process Run Time With Python'
date: '2020-05-19'
publish: '2020-05-07'
category: ['programming']
tags: ['python', 'atexit', 'datetime', 'timedelta']
---

I was recently trying to find the parts of my python application that were lagging in performance and so I went in search of a way to document how long things took.

I found this interesting approach based on PaulMcG's answer on [Stack Overflow](https://stackoverflow.com/questions/1557571/how-do-i-get-time-of-a-python-programs-execution):

```python:title=timing.py
import atexit
from time import time, strftime, localtime
from datetime import timedelta

def secondsToStr(elapsed=None):
    if elapsed is None:
        return strftime("%Y-%m-%d %H:%M:%S", localtime())
    else:
        return str(timedelta(seconds=elapsed))

def log(s, elapsed=None):
    line = "="*40
    print(line)
    print(secondsToStr(), '-', s)
    if elapsed:
        print("Elapsed time:", elapsed)
    print(line)
    print()

def endlog():
    end = time()
    elapsed = end-start
    log("End Program", secondsToStr(elapsed))

start = time()
atexit.register(endlog)
log("Start Program")
```

I hadn't previously encountered the [atexit](https://docs.python.org/3/library/atexit.html) module, but love how easy it is to register an event to execute on a normal termination.

_Using_ this approach per PaulMcG's guidance also introduced me to the `site-packages` directory<sup>1</sup> in which he stories the file `timing.py` allowing for importing it into any future python applications with a simple `import timing` at the top.

The `timing.log` function can be inserted to help narrow logs to a specific part of the application.

A nice recipe to have on hand for the future!

## Footnotes

-   <sup>1</sup> The `sites-packages` seems to be roughly equivalent to a global `node_modules` directory. Per the README in my `site-packages` installed via `.pyenv` (`~/.pyenv/versions/3.8.0/lib/python3.8/site-packages/`):

```txt:title=README.txt
This directory exists so that 3rd party packages can be installed here.  Read the source for site.py for more details.
```
