---
title: 'Pytest Marker Basics'
date: '2020-06-02'
publish: '2020-07-17'
category: ['programming']
tags: ['python','testing','pytest','marks']
---
Within Python's testing framework `Pytest`, markers can decorate a test method (i.e. a method which has a name beginning `test_` and inside a file prefixed/suffixed with `test`, e.g., `test_something_awesome.py`).

Pytest provides some built-in markers:
> * [skip](https://docs.pytest.org/en/latest/skipping.html#skip)  - always skip a test function
> * [skipif](https://docs.pytest.org/en/latest/skipping.html#skipif)  - skip a test function if a certain condition is met
> * [xfail](https://docs.pytest.org/en/latest/skipping.html#xfail)  - produce an “expected failure” outcome if a certain condition is met
> * [parametrize](https://docs.pytest.org/en/latest/parametrize.html#parametrizemark)  to perform multiple calls to the same test function.

Before digging into _how_ to use these, let's think about _why_ we might use a mark. The built in markers offer some good intuition on this score by seeing what's provided out of the box (though the fact that custom marks can be registered, more on this in a bit, suggests it's not an exhaustive list):

1. Skipping tests (e.g., if you're writing tests before functionality, you might want to only test one thing at a time).
2. Skip tests when certain conditions are not met (e.g., the version of python is not supported).
3. Writing tests for the "unhappy path", i.e. things that are expected to fail.
4. Passing in _different_ test conditions - e.g., if you want to see how a function behaves under _multiple_ scenarios.

Marks can be applied with a decorator (the `@pytest.mark.xxx()` before a test definition) or imperatively _during_ the test execution. From the docs we can see some good examples:

> ```python
> @pytest.mark.skip(reason="no way of currently testing this")
> def test_the_unknown():
>     ...
> ```
> Alternatively, it is also possible to skip imperatively during test execution or setup by calling the
> ```python
> pytest.skip(reason)
> function:
> def test_function():
>     if not valid_config():
>         pytest.skip("unsupported configuration")
> ```

For the remainder of this post I'll be using the decorators. Though a newer concept to me, I find the intent clearer.<sup>1</sup>

## Markers In Use
I wanted to get a good grasp on the built in markers, so I decided to take an `increment` function and then build up a test suite one test at a time - leveraging markers. The different examples I cover:

1. Define a basic function we want to test
2. Define a single test
3. Define tests that are expected to fail
4. Define multiple tests
5. Define tests that we'll want to skip
6. Define multiple tests that mix successes and expected failures
7. Bonus: Multiple tests with _multiple_ marks

All of the code can be found on GitHub.

Let's start with a definition of `increment`:
```python:title=increment.py

def increment(n):
  if not isinstance(n, int):
    raise Exception
  return n + 1
```

### Our First Test

With that in place, let's write the simplest test we can think of: incrementing 0 to 1:

```python:title=test_single.py
import pytest
from main import increment

def test_increment():
    assert increment(0) == 1
```

We can check that this works from the command line (I'm managing the dependencies with `poetry`):

```shell
$ poetry run pytest test_single.py
============================== test session starts ===============================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example
collected 1 item

test_single.py .                                                           [100%]

=============================== 1 passed in 0.00s ================================
```

### Tests We Expect To Fail
Now that we know it works - let's use markers to say we know what _shouldn't_ work.
```python:title=test_expect_fail.py
import pytest
from main import increment

@pytest.mark.xfail()
def test_increment():
    assert increment('0') == 1
```

Testing this, we get the expected 1 (expected) failed:
```shell
$ poetry run pytest -rx test_expect_fail.py
============================== test session starts ===============================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example
collected 1 item

test_expect_fail.py x                                                      [100%]

============================ short test summary info =============================
XFAIL test_expect_fail.py::test_increment
  not an integer!
=============================== 1 xfailed in 0.03s ===============================
```

Note, we passed in the options `-rx`  which provides additional details on the failed tests
```shell
$ pytest --help
//...
-r chars
show extra test summary info as specified by chars: (f)ailed, (E)rror, (s)kipped, (x)failed, (X)passed, (p)assed, (P)assed with output, (a)ll except passed (p/P), or (A)ll. (w)arnings are enabled by default (see --disable-warnings), 'N' can be used to reset the list. (default: 'fE').
```

### Multiple Test Cases
What if we want to have test cases that handle a number of different situations and verify that we've accommodated different situations? This is a good use case for `parametrize`. The parameters are defined in the first position and then a set of scenarios are passed in as a list in the second position.

```python:title=test_parametrize.py
import pytest
from increment import increment

@pytest.mark.parametrize(
    ("n","expected"),
    [
         (1, 2),
         (4, 5),
         (-1, 0),
    ],
)
def test_increment(n, expected):
    assert increment(n) == expected

```

When we run the tests we'll see that _three_ tests pass (one for each in our list):

```shell
 poetry run pytest test_parametrize.py
============================== test session starts ===============================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example
collected 3 items

test_parametrize.py ...                                                    [100%]

=============================== 3 passed in 0.01s ================================
```

### Skipping Tests

Skipping tests doesn't need to be a black and white decision. It can depend on conditions. Let's skip one test _always_ because, let's imagine, there's no current way of testing it. For the others, however, we want to use a condition to determine whether to run the test. Maybe that will be the version of Python. Or maybe, as in my example, it's just based on a condition.

If using a boolean as a condition, a `reason` _is_ required.

``` python:title=test_skip.py
import pytest
from main import increment

CONDITION = True

@pytest.mark.skip(reason="no way to currently test")
def test_increment():
    assert increment(0) == 1

@pytest.mark.skipif(CONDITION == False, reason="Condition is False")
def test_increment_skip1():
    assert increment(0) == 1

@pytest.mark.skipif(CONDITION == True, reason="Condition is True")
def test_increment_skip2():
    assert increment(0) == 1
```

Now, when we run this, we get the following summary:

```shell
poetry run pytest test_skip.py -rs
============================== test session starts ===============================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example
collected 3 items

test_skip.py s.s                                                           [100%]

============================ short test summary info =============================
SKIPPED [1] test_skip.py:6: no way to currently test
SKIPPED [1] test_skip.py:14: Condition is True
========================== 1 passed, 2 skipped in 0.01s ==========================
```

### All Together Now: Parametrize WIth Skip And XFail

Now that we've done all of that prep, let's combine them and use `parametrize` with `skip` and `xfail`. The thing to note is that when we want to add a mark, we annotate the parametrized list element:

``` python:title=test_combined.py
import pytest
from main import increment

CONDITION = True

@pytest.mark.parametrize(
    ("n","expected"),
    [
         (1, 2),
         (4, 5),
         pytest.param(-1, 0, marks=pytest.mark.skip(reason="because we want to")),
         pytest.param(-1, 0, marks=pytest.mark.skipif(CONDITION == True,reason="Condition is False")),
         pytest.param(-1, 0, marks=pytest.mark.skipif(CONDITION == False, reason="Condition is True")),
         pytest.param('a', 'a', marks=pytest.mark.xfail(reason="non integer")),
         pytest.param(0, 0, marks=pytest.mark.xfail(reason="did not increment"))
    ],
)
def test_increment(n, expected):
    assert increment(n) == expected

```

Then in the summary - we can see this operated as expected

```shell
 poetry run pytest test_combined.py -rsx
============================== test session starts ===============================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example
collected 7 items

test_combined.py ..ss.xx                                                   [100%]

============================ short test summary info =============================
SKIPPED [1] test_combined.py:6: because we want to
SKIPPED [1] test_combined.py:6: Condition is False
XFAIL test_combined.py::test_increment[a-a]
  non integer
XFAIL test_combined.py::test_increment[0-0]
  did not increment
==================== 3 passed, 2 skipped, 2 xfailed in 0.04s =====================
```


### Bonus: Multiple Tests With Multiple Marks

The final example for today is what happens when we want to apply _multiple_ marks to a test (e.g., a `skipif` and `xfail`) - both within parametrized and not.

Note, while this is a slightly contrived example, you can imagine that it would be useful if you've registered custom marks.

``` python:title=test_multiple_combined.py
import pytest
from main import increment

CONDITION = True
multiple_marks = [pytest.mark.skipif(CONDITION == True,reason="Multiple marks, condition is True"), pytest.mark.xfail(reason="non integer")]

@pytest.mark.parametrize(
    ("n","expected"),
    [
         (1, 2),
         (4, 5),
         pytest.param(-1, 0, marks=pytest.mark.skip(reason="because we want to")),
         pytest.param(-1, 0, marks=pytest.mark.skipif(CONDITION == True,reason="Condition is True")),
         pytest.param(-1, 0, marks=pytest.mark.skipif(CONDITION == False, reason="Condition is False")),
         pytest.param('a', 'a', marks=multiple_marks),
         pytest.param('a', 'a', marks=pytest.mark.xfail(reason="non integer")),
         pytest.param(0, 0, marks=pytest.mark.xfail(reason="did not increment"))
    ],
)
def test_increment(n, expected):
    assert increment(n) == expected


@pytest.mark.skipif(CONDITION == True,reason="Condition is True")
@pytest.mark.xfail(reason="non-integer")
def test_increment_single_true():
    assert increment('0') == 1


@pytest.mark.skipif(CONDITION == False,reason="Condition is False")
@pytest.mark.xfail(reason="non-integer")
def test_increment_single_false():
    assert increment('0') == 1
```

And the results:

```shell
$ poetry run pytest test_multiple_combined.py -rsx
============================== test session starts ===============================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example
collected 10 items

test_multiple_combined.py ..ss.sxxsx                                       [100%]

============================ short test summary info =============================
SKIPPED [1] test_multiple_combined.py:7: because we want to
SKIPPED [1] test_multiple_combined.py:7: Condition is True
SKIPPED [1] test_multiple_combined.py:7: Multiple marks, condition is True
SKIPPED [1] test_multiple_combined.py:24: Condition is True
XFAIL test_multiple_combined.py::test_increment[a-a1]
  non integer
XFAIL test_multiple_combined.py::test_increment[0-0]
  did not increment
XFAIL test_multiple_combined.py::test_increment_single_false
  non-integer
==================== 3 passed, 4 skipped, 3 xfailed in 0.05s =====================
```

## Registering Marks
Before closing this out, it's probably worth spending a moment reviewing how to register custom marks.

While it's possible to [register marks in the pytest configuration](https://docs.pytest.org/en/latest/mark.html#registering-marks) I'll focus on the `pytest.ini` approach.

To register a mark for use in your test suite:
1. Create a `pytest.ini` file (in the root of the project)<sup>2</sup>
2. Under a `[pytest]` section add the markers for your new marks
3. Use the mark in a test
4. Optionally raise errors on unknown marks by adding `addopts = --strict-markers` in the `[pytest]` section.

A small example:
```ini:title=pytest.ini
[pytest]
markers =
    mark_one
    mark_two
```

And then
```python:title=test_custom_marks.py
import pytest
from main import increment

@pytest.mark.mark_one()
def test_increment_one():
    assert increment(0) == 1


@pytest.mark.mark_two()
def test_increment_two():
    assert increment(0) == 1


@pytest.mark.mark_three()
def test_increment_three():
    assert increment(0) == 1

```

Notice we have a _third_ mark that is _not_ expected. When we run the tests we receive a warning that `mark_three()` is not registered, however our tests are allowed to run.

``` shell
poetry run pytest -rsx test_custom_marks.py
============================== test session starts ===============================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example, inifile: pytest.ini
collected 3 items

test_custom_marks.py ...                                                   [100%]

================================ warnings summary ================================
test_custom_marks.py:14
  /Users/weisss/code/temp/pytest-example/test_custom_marks.py:14: PytestUnknownMarkWarning: Unknown pytest.mark.mark_three - is this a typo?  You can register custom marks to avoid this warning - for details, see https://docs.pytest.org/en/latest/mark.html
    @pytest.mark.mark_three()

-- Docs: https://docs.pytest.org/en/latest/warnings.html
========================== 3 passed, 1 warning in 0.01s ==========================
```

If we add the strict usage to `pytest.ini`:
```ini:title=pytest.ini
[pytest]
addopts = --strict-markers
markers =
    mark_one
    mark_two
```

Now, when we run the test, it errors and yells much more loudly:
```shell
 poetry run pytest -rsx test_custom_marks.py
============================== test session starts ===============================
platform darwin -- Python 3.8.0, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /Users/weisss/code/temp/pytest-example, inifile: pytest.ini
collected 0 items / 1 error

===================================== ERRORS =====================================
_____________________ ERROR collecting test_custom_marks.py ______________________
'mark_three' not found in `markers` configuration option
!!!!!!!!!!!!!!!!!!!!! Interrupted: 1 error during collection !!!!!!!!!!!!!!!!!!!!!
================================ 1 error in 0.06s ================================
```


## Conclusion
Okay, that's enough for one day! I hope you learned a thing or two about Pytest and how / why you might use marks for testing your Python code - I know I did!

## Footnotes
- <sup>1</sup> Javascript _mostly_ doesn't use decorators, though there is an [RFC](https://github.com/tc39/proposal-decorators) for them and some frameworks, like Angular, use them heavily
- <sup>2</sup> [Wikipedia](https://en.wikipedia.org/wiki/INI_file) has more on the `.ini` format.
