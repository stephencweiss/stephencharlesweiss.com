---
title: 'Running Scripts With Poetry'
date: '2020-05-12'
publish: '2020-06-28'
category: ['programming']
tags: ['poetry', 'pip', 'pipenv', 'package management', 'python', 'scripts']
---

I've been exploring Poetry as an alternative to pip and pipenv recently. As pleasant as it has been, I knew I wasn't taking advantage of all of its features and the one that I _really_ wanted was the scripts. Coming from the Javascript ecosystem, I'm so used to running `yarn start` or `npm run dev` to run various scripts and I hadn't figured out this basic feature in python (generally) or with Poetry (specifically) yet.

It's also a good example of the challenge with open source documentation. As much work has gone into the docs for Poetry, the [scripts section](https://python-poetry.org/docs/pyproject/#scripts) told me very little about how to _use_ them:

> This section describe the scripts or executable that will be installed when installing the package
>
> ```
> [tool.poetry.scripts]
> poetry = 'poetry.console:run'
> ```
>
> Here, we will have the poetry script installed which will execute `console.run` in the poetry package.

That was it. That's the entire section.

Fortunately, I found [Package Python Projects the Proper Way with Poetry](https://hackersandslackers.com/python-poetry-package-manager/) on HackersAndSlackers.com which made it all so much clearer for me!

In no small part, this was because the example (copied in part below) was much more robust:

> ```toml:title=pyproject.toml
> [tool.poetry]
> name = "poetry_tutorial_project"
> [...]
> [tool.poetry.scripts]
> run = "wsgi:main"
> [...]
> ```
>
> [...]
>
> `[tool.poetry.scripts]`: This is where we specify where our app entry point(s) is by assigning function within modules to the name of a script to be run. The example **run = "wsgi:main"** is specifying that we want to create a command called "run," which will look in wsgi.py for a function called main(). With this set, we can then launch our app via the Poetry CLI by typing **poetry run** (more on this in a bit).

That was the aha moment for me! It made _sense_!

The `run` script was now creating an entry point into the app! `wsgi` in this case is the Node world's convention of `index.js` and everything is starting with a `main` function.

It's worth pointing out that `run` is a slightly special script. If the script had been `main` to execute it, execute `poetry run main`.
