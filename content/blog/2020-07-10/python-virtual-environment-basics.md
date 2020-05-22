---
title: 'Python Virtual Environments - Absolute Basics'
date: '2020-05-20'
publish: '2020-07-10'
category: ['programming']
tags: ['python', 'venv', 'pip', 'virtual environment', 'poetry', 'pipenv']
---

Python's virtual environments are a way to avoid conflicting dependencies.

For example - imagine you have two Python projects that both use `pytest` to provide testing. One, however, was built before and is using v3.x and one is using the latest and greatest (as of today 5.x).

Virtual environments allow us to have _both_ installed so that we can run each project as it was written _without_ having keep all of our project dependencies in sync (a nightmare scenario if I've ever heard of one).

Let's see how that can work.

Below is intended to demonstrate the absolute basics - see the [official documentation](https://docs.python.org/3/tutorial/venv.html) for more information or look at related solutions like [pipenv](https://pypi.org/project/pipenv/) and [poetry](https://python-poetry.org/docs/) for alternatives.

## Step 0: Project setup

First, make sure that you're in the project:

```shell
$ pwd
/Users/stephen/code/my-new-project
```

If I look at my project directory, it's pretty bare bones right now:<sup>1</sup>

```shell
$ tree
.
├── app.py
├── requirements-dev.txt
└── requirements.txt
```

If we look at the `requirements.txt`, we'll see a few production dependencies:

```shell
$ cat requirements.txt
pg8000
pyyaml
```

And `requirements-dev`:

```shell
$ cat requirements-dev.txt
flake8
mypy
pylint
pytest
pytest-pylint
coverage
```

Great - so we know we need to _install_ some packages, but how do we scope them?

## Step 1: Create the virtual environment

Before we can use the virtual environment for its sandboxing, we need to create it:

```shell
python -m venv my-venv
```

This should create a new directory in your project with a few sub-directories, including a new `site-packages` (Python's equivalent to a `node_modules` for the node world):

```shell
$ tree -d -L 4
.
└── my-env
    ├── bin
    ├── include
    └── lib
        └── python3.8
            └── site-packages
```

## Step 2: Activate the virtual environment

Now that the virtual environment's present, we need to activate it.

```shell
$ source ./my-env/bin/activate
```

This is a shell script that sets everything up (you can read its contents with `cat ./my-env/bin/activate`).

You'll know that it worked when you see the virtual environment name (`my-env`) in parentheses to the left of your shell line:

```shell
(my-env) $
```

## Step 3: Managing packages with pip

At this point we can install various packages using [pip](https://pip.pypa.io/en/stable/quickstart/). In our case, however, we have a `requirements.txt` and `requirements-dev.txt`. That being the case, we can read those in and install from them directly:

```shell
(my-env) $ pip install -r requirements.txt requirements-dev.txt
```

## Step 4: Exiting the virtual environment

One of the methods that's included in the `activate` script is a `deactivate`. This is what will tear down the virtual environment when you're done.

To use it, all you need to do is run the command:

```shell
(my-env) $ deactivate
$
```

When the `(my-env)` has disappeared, you'll know that you're no longer in the virtual environment.

## Wrap Up

With these few commands we can now isolate our Python dependencies - an important step to being able to develop python applications with confidence!

## Footnotes

-   <sup>1</sup> I will be using the `tree` package to print out my directories. It's one of my favorite little utilities. I wrote about it [here](https://stephencharlesweiss.com/blog/2019-05-31/printing-the-directory-tree/).
