---
title: 'Asserting Errors In Pytest'
date: '2020-06-04'
publish: '2020-07-18'
category: ['programming']
tags: ['pytest', 'testing', 'python', 'error', 'assert', 'mark', 'raises']
---

Imagine a function that, under certain conditions _expects_ to throw an error. How might we test that with Pytest?

Pytest offers two approaches that we'll explore in this post:

1. `Marks`<sup>1</sup>
2. `Raises`

To demonstrate how these work, we'll have two functions `increment` which increments a number and [raises a custom exception](../../2020-06-25/python-raising-custom-exceptions), `NonIntegerException` , if the argument is not an integer, and `divide` which uses the built in python division.

```python:title=main.py
def divide(numerator, denominator):
  return numerator / denominator

class NonIntegerException(Exception):
  pass
```

Okay, with this set up, we're ready to investigate how to test these. Before we do, however, the [Pytest documentation](https://docs.pytest.org/en/latest/assert.html#assertions-about-expected-exceptions) provides guidance on _when_ to use both situations that's worth noting before we begin:

> Using `pytest.raises` is likely to be better for cases where you are testing exceptions your own code is deliberately raising, whereas using `@pytest.mark.xfail` with a check function is probably better for something like documenting unfixed bugs (where the test describes what “should” happen) or bugs in dependencies.

## pytest.mark.xfail

The first strategy is documenting known bugs those that aren't handled. For example - dividing by 0 in our `divide` method. We've done and _know_ that it will error, but we don't do anything about it.

So we're going to use the `xfail` approach here:

```python:title=test_expect_fail.py
import pytest
from main import divide

@pytest.mark.xfail(raises=ZeroDivisionError)
def test_divide_xfail():
    assert divide(2, 0)
```

That's all there is to it.

Unfortunately, when we run the tests, we don't get a lot of context. Just that it failed as expected:

```shell
$ poetry run pytest test_expect_fail.py -rA
====================== test session starts =======================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example, inifile: pytest.ini
collected 1 items

test_expect_fail.py x                                  [100%]

============================= PASSES =============================
==================== short test summary info =====================
XFAIL test_expect_fail.py::test_divide_xfail
================== 0 passed, 1 xfailed in 0.11s ==================
```

Despite being specific before that there's a `ZeroDivsionError` exception, we don't get much detail to that point in the logs. In fact, we'd see basically the same thing if we added a _second_ test with a general `Exception` raised:

```python:title=test_expect_fail.py
import pytest
from main import divide

#...
@pytest.mark.xfail(raises=Exception)
def test_divide_xfail_general():
    assert divide(2, 0)
```

Note the logs look nearly identical.

```shell
$ poetry run pytest test_expect_fail.py -rA
====================== test session starts =======================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example, inifile: pytest.ini
collected 2 items

test_expect_fail.py xx                                  [100%]

============================= PASSES =============================
==================== short test summary info =====================
XFAIL test_expect_fail.py::test_divide_xfail
XFAIL test_expect_fail.py::test_divide_xfail_general
================== 0 passed, 2 xfailed in 0.11s ==================
```

So why be more specific? Two possible arguments for why you're well served specifying the actual exception raised:

1. Refactoring: Remember, `xfail` is best used for _unhandled_ errors. When we come back to refactor, by noting the _specific_ error in the test, we make the job easier for our future selves.
2. Specificity: While the tests don't provide any detail in the logs, _if_ the error specified is _not_ raised, the test will fail. For example:

```python:title=test_expect_fail.py
import pytest
from main import divide

# ...
@pytest.mark.xfail(raises=TypeError)
def test_divide_xfail_type():
    assert divide(2, 0)
```

Now, when we run the tests it's clear that `TypeError` was _not_ raised:

```shell
poetry run pytest test_expect_fail.py -rA
====================== test session starts =======================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example, inifile: pytest.ini
collected 3 items

test_expect_fail.py xxF                               [100%]

============================ FAILURES ============================
_____________________ test_divide_xfail_type _____________________

    @pytest.mark.xfail(raises=TypeError)
    def test_divide_xfail_type():
>       assert divide(2, 0)

test_expect_fail.py:35:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

numerator = 2, denominator = 0

    def divide(numerator, denominator):
>     return numerator / denominator
E     ZeroDivisionError: division by zero

main.py:7: ZeroDivisionError
============================= PASSES =============================
==================== short test summary info =====================
XFAIL test_expect_fail.py::test_divide_xfail
XFAIL test_expect_fail.py::test_divide_xfail_general
FAILED test_expect_fail.py::test_divide_xfail_type - ZeroDivisi...
============= 1 failed, 0 passed, 2 xfailed in 0.10s =============
```

Okay, so we have seen some of the ways we can use the `xfail` in raising expected failures in our test. What about `pytest.raises`? Let's look at that now.

## pytest.raises

Imagine we want to now handle the errors we know can arise from using our functions. We want to throw an error _before_ we attempt to divide saying that the denominator is zero.

```python:title=main.py
def divide(numerator, denominator):
  if(denominator == 0):
    raise ZeroDenominator
  return numerator / denominator

class ZeroDenominator(Exception):
  pass
```

Well, the first thing this does is break all of our tests that were expecting `ZeroDivisionError` because we know longer attempt to divide by zero. We've short circuited that.

So, now we need to refactor our tests. And because the errors are now handled (i.e. we have code that's explicitly seeking out these conditions and our decision is to raise an error, we'll use the `pytest.raises` API:

```python:title=test_expect_fail.py
import pytest
from main import divide, ZeroDenominator

def test_divide_raises():
    with pytest.raises(ZeroDenominator):
        divide(2, 0)
```

Unlike `mark`, the raises is _not_ a decorator. So, now we're using the `with` keyword to note that we want to use the `pytest.raises()`. `raises` takes an Error.

### Assertions About Raised Exceptions

The `raises` API provides some useful features for dissecting the error in greater detail. For example, it may be useful to make an assertion about the raised error rather than merely accept that it was raised. The [pytest documentation](https://docs.pytest.org/en/latest/assert.html#assertions-about-expected-exceptions) has several nice examples of this.

Here's one contrived example where we pull the type from the exception class raised to confirm it's what we expect:

```python:title=test_expect_fail.py
import pytest
from main import divide, ZeroDenominator

def test_divide_raises():
    with pytest.raises(ZeroDenominator) as exception_info:
        divide(2, 0)
    assert "ZeroDenominator" in str(exception_info.type)
```

The main attributes of interest on the `ExceptionInfo` class are:

1. `type`
2. `value`
3. `traceback`

Another potentially useful feature of the `.raises` API is the `match` parameter that allows for a regex search within the error (particularly useful for `ValueError`s that provide additional context. For example (from the [Pytest docs](https://docs.pytest.org/en/latest/assert.html#assertions-about-expected-exceptions)):

> ```python
> import pytest
>
>
> def myfunc():
>     raise ValueError("Exception 123 raised")
>
>
> def test_match():
>     with pytest.raises(ValueError, match=r".* 123 .*"):
>         myfunc()
> ```

## Wrap Up

In this walk through we looked at two different strategies for testing for failures in a python test suite using `pytest`'s `.raises` as well as the `xfail` mark.

All of the code that I used for this post is part of my GitHub repo, [pytest-example](https://github.com/stephencweiss/pytest-example).
