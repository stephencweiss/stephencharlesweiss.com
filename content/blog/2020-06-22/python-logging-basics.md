---
title: 'Logging In Python: An Introduction'
date: '2020-05-09'
publish: '2020-06-22'
category: ['programming']
tags: ['python', 'logging', 'tracing', 'log level']
---

Logging in Python is quite easy (once you know the basics). Unlike Javascript, where you'll need to build your own logger, or use a third-party one like [Bunyan](../../2020-02-27/easy-logging-bunyan), logging is built-in in Python: just import `logging` and away you go.

While, I've seen variations of the hierarchy, the general convention for criticality of logs (in descending order) is:

1. critical
2. error
3. warning
4. info
5. debug
6. trace

## When To Use Logs - At What Level

[Python](https://docs.python.org/3.8/howto/logging.html#when-to-use-logging) provides guidance on _when_ to use what type of logging:

| Task you want to perform                                                                                          | The best tool for the task                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display console output for ordinary usage of a command line script or program                                     | print()                                                                                                                                                                                                                                                        |
| Report events that occur during normal operation of a program (e.g. for status monitoring or fault investigation) | logging.info() (or logging.debug() for very detailed output for diagnostic purposes)                                                                                                                                                                           |
| Issue a warning regarding a particular runtime event                                                              | warnings.warn() in library code if the issue is avoidable and the client application should be modified to eliminate the warning\nlogging.warning() if there is nothing the client application can do about the situation, but the event should still be noted |
| Report an error regarding a particular runtime event                                                              | Raise an exception                                                                                                                                                                                                                                             |
| Report suppression of an error without raising an exception (e.g. error handler in a long-running server process) | logging.error(), logging.exception() or logging.critical() as appropriate for the specific error and application domain                                                                                                                                        |

Now that we have some idea of when we might want to use different types of logs, we can look at implementing them!

## Setting Up Basic Logging

If we don't need our logs to persist, we can just import the Logging module and log away:

```python:title=basic-logging
>>> import logging
>>> logging.warning("watch out!")
WARNING:root:watch out!
>>> logging.info("what??")
>>>
```

Note that the `info` didn't print anything because the **default** log level is WARNING.

## Log Levels And Persistent Logs

If we want to see lower priority logs, we'll need to configure it ourselves (and it appears log them out to a file):

```python:title=app.py
import logging

logging.basicConfig(filename="./app.log", level=logging.DEBUG)
logging.debug('this will be logged')
logging.info('as will this')
logging.warning('and this')
```

NB: the relative path is relative to where the `app.py` is run _from_, not the location of `app.py` itself.

## Configurable Log Levels

What if we want to be able to toggle the log level from the execution of the app, not by hard-coding a variable?

We can use two additional Python packages, `sys` and `getopt`. For example:

```python:title=configurable-logging.py
import sys
import logging
import getopt

opts, args = getopt(sys.argv[1:], "l:", ["log="]) # get the arguments after the 0th, see if any are "l:" or "log="

log_level="WARNING" # default

for opt, arg in opts:
  if opt in ("-l", "--log"):
    log_level = getattr(logging, arg.upper())

logging.basicConfig(filename='./configurable.log', level=log_level)
logging.debug('this will be logged')
logging.info('as will this')
logging.warning('and this')
```

If we were to run this in our shell:

```bash
$ python configurable-logging.py --log debug
$ cat ./configurable-log
DEBUG:root:this will be logged
INFO:root:as will this
WARNING:root:and this
$ python configurable-logging.py --log warning
$ cat ./configurable-log
DEBUG:root:this will be logged
INFO:root:as will this
WARNING:root:and this
WARNING:root:and this
```

Interestingly, the second run _appended_ the new logs (in this case only the WARNING). That's because "if a filename is specified, the [default open mode](https://docs.python.org/3.8/library/logging.html#logging.basicConfig) is `a` (where the [modes](https://docs.python.org/3.8/library/functions.html#filemodes) are `r, w, x, a, b, t, +`)

## Customizing The Log Message

In the above example, we see that the default log message includes three pieces: the level, root, and the message.

These are configurable using the [LogRecord Attributes](https://docs.python.org/3.8/library/logging.html#logrecord-attributes). For example, perhaps we care about the function name, line number and time for future debugging purposes in addition to the level and message:

```diff:title="custom-log-attributes.py
...
- logging.basicConfig(filename='./configurable.log', level=log_level)
+ logging.basicConfig(filename='./configurable.log', level=log_level format='%(asctime)s %(levelname)s %(funcName)s %(lineno)d --> %(message)s')

+ def main():
    logging.debug('this will be logged')
    logging.info('as will this')
    logging.warning('and this')

+ main()
```

The logs are now in a function called `main`. When we run the logger:

```shell
$ python configurable-logging.py --log info
$ cat ./configurable-log
...
2020-05-09 16:26:46,967 INFO main 15 --> as will this
2020-05-09 16:26:46,968 WARNING main 16 --> and this
```

Note: I defined a _main_ function since I'm not including the function name and without it, the log would say `<module>` for the function name.

We can even format the time:

```diff:title="custom-time-format.py
...
- logging.basicConfig(filename='./configurable.log', level=log_level, format='%(asctime)s %(levelname)s %(funcName)s %(lineno)d --> %(message)s')
+ logging.basicConfig(filename='./configurable.log', level=log_level, format='%(asctime)s %(levelname)s %(funcName)s %(lineno)d --> %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
)

def main():
    logging.debug('this will be logged')
    logging.info('as will this')
    logging.warning('and this')

main()
```

Which, when invoked provides the following:

```shell
$ python configurable-logging.py --log info
$ cat ./configurable-log
...
05/09/2020 06:47:58 PM INFO main 17 --> as will this
05/09/2020 06:47:58 PM WARNING main 18 --> and this
```

## Wrapping Up

There's a lot more to learn about logging - but this is more than enough to start adding useful logs to your applications and libraries today! For more, read the [documentation on logging](https://docs.python.org/3.8/howto/logging.html) for the appropriate version.

Some additional reading on logging, tracing, and monitoring (and how they're not the same):

1. [Logging vs Tracing vs Monitoring](https://winderresearch.com/logging-vs-tracing-vs-monitoring/#instrumentation-and-monitoring)
2. [Tracing vs Logging vs Monitoring: What’s the Difference? – BMC Blogs](https://www.bmc.com/blogs/monitoring-logging-tracing/)
