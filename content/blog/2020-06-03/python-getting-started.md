---
title: 'Getting Up And Running With Python On MacOS'
date: '2020-04-30'
publish: '2020-06-03'
category: ['programming']
tags: ['python', 'pipenv', 'pyenv', 'pip']
---

It looks like I'll be doing some more python development in the near future, so time to brush up!

First things first though: getting a computer ready to run Python code.

I've done this so many times with Javascript at this point that I've practically forgotten that this can ever be a challenge, and yet, Python's new, it's different, and the dragons are lurking in different places.

What follows is a few steps to follow to make sure that you're ready to start coding with python.

MacOS comes preinstalled with Python, though as of this writing it's still version 2.7.x. (If you want a different version, you can [use pyenv to help manage multiple versions](../../2020-03-08/multiple-python-versions-installed-macos/)).

The next step is to make sure pip is installed (`shell> pip --version`). In my case, it wasn't.

Following some directions, I found the [installation guide for pip](https://pip.pypa.io/en/stable/installing/), however, the warning's worth paying attention to:

> **Warning** Be cautious if you are using a Python install that is managed by your operating system or another package manager. `get-pip.py` does not coordinate with those tools, and may leave your system in an inconsistent state.

This was exactly my situation, so I decided to download `pyenv` from Homebrew and use that to manage my installations (like I'd written about before)

Once I downloaded v3.8.0...

```shell
$ pyenv install 3.8.0
python-build: use openssl@1.1 from homebrew
python-build: use readline from homebrew
Downloading Python-3.8.0.tar.xz...
-> https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tar.xz
Installing Python-3.8.0...
python-build: use readline from homebrew
python-build: use zlib from xcode sdk
Installed Python-3.8.0 to /Users/stephen/.pyenv/versions/3.8.0
$ pip --version
zsh: command not found: pip
```

Ack! Still no luck!

It turns out the issue was that I wasn't using `pyenv` properly. Once I installed v3.x, I needed to actually _set_ it:

```shell
$ pyenv global 3.8.0
```

So that should do it, right? Wrong.

In order to use pyenv, you need to initialize it:

```shell
$ pyenv init
# Load pyenv automatically by appending
# the following to ~/.zshrc:

eval "$(pyenv init -)"
```

Despite having written about this before, I _still_ got it wrong. Just initializing it didn't work because I needed to refresh my shell to take advantage, but the act of refreshing meant that I lost `pyenv`. I solved this by finally doing what they say -- adding the `eval` command to my `.zshrc`.

That should do the trick...

```shell
$ pip --version
pip 20.1 from /Users/stephen/.pyenv/versions/3.8.0/lib/python3.8/site-packages/pip (python 3.8)
```

Finally!

At this point, I'm now able to download python packages and run them, however, [the official recommendation (as of this writing) is to use Pipenv](https://packaging.python.org/tutorials/managing-dependencies/).

> [Pipenv](https://packaging.python.org/key_projects/#pipenv) is a dependency manager for Python projects. If you’re familiar with Node.js’ [npm](https://www.npmjs.com/) or Ruby’s [bundler](http://bundler.io/) , it is similar in spirit to those tools. While [pip](https://packaging.python.org/key_projects/#pip) alone is often sufficient for personal use, Pipenv is recommended for collaborative projects as it’s a higher-level tool that simplifies dependency management for common use cases.

Running a quick test with the pytest package, I quickly appreciated pipenv:

With the standard pip approach:

```shell
$ pip install pytest pytest-cache
Collecting pytest
  Downloading pytest-5.4.1-py3-none-any.whl (246 kB)
     |████████████████████████████████| 246 kB 6.8 MB/s
Collecting pytest-cache
  Downloading pytest-cache-1.0.tar.gz (16 kB)
Collecting more-itertools>=4.0.0
  Downloading more_itertools-8.2.0-py3-none-any.whl (43 kB)
     |████████████████████████████████| 43 kB 5.6 MB/s
Collecting wcwidth
  Downloading wcwidth-0.1.9-py2.py3-none-any.whl (19 kB)
Collecting pluggy<1.0,>=0.12
  Downloading pluggy-0.13.1-py2.py3-none-any.whl (18 kB)
Collecting py>=1.5.0
  Downloading py-1.8.1-py2.py3-none-any.whl (83 kB)
     |████████████████████████████████| 83 kB 8.0 MB/s
Collecting packaging
  Downloading packaging-20.3-py2.py3-none-any.whl (37 kB)
Collecting attrs>=17.4.0
  Downloading attrs-19.3.0-py2.py3-none-any.whl (39 kB)
Collecting execnet>=1.1.dev1
  Downloading execnet-1.7.1-py2.py3-none-any.whl (39 kB)
Collecting pyparsing>=2.0.2
  Downloading pyparsing-2.4.7-py2.py3-none-any.whl (67 kB)
     |████████████████████████████████| 67 kB 21.9 MB/s
Collecting six
  Downloading six-1.14.0-py2.py3-none-any.whl (10 kB)
Collecting apipkg>=1.4
  Downloading apipkg-1.5-py2.py3-none-any.whl (4.9 kB)
Could not build wheels for pytest-cache, since package 'wheel' is not installed.
Installing collected packages: more-itertools, wcwidth, pluggy, py, pyparsing, six, packaging, attrs, pytest, apipkg, execnet, pytest-cache
    Running setup.py install for pytest-cache ... done
Successfully installed apipkg-1.5 attrs-19.3.0 execnet-1.7.1 more-itertools-8.2.0 packaging-20.3 pluggy-0.13.1 py-1.8.1 pyparsing-2.4.7 pytest-5.4.1 pytest-cache-1.0 six-1.14.0 wcwidth-0.1.9
$ pytest --version
This is pytest version 5.4.1, imported from /Users/stephen/.pyenv/versions/3.8.0/lib/python3.8/site-packages/pytest/__init__.py
```

Notice that the package is installed in the same location as my python instance. Said another way: it's installed globally! Something I try to avoid. Moreover, there's no reference to _what_ I've installed in my project! There's no `package.json` or anything like it.

Compare that to pipenv:

```shell
$ pipenv install pytest pytest-cache
Creating a virtualenv for this project…
Pipfile: /Users/stephen/Exercism/python/Pipfile
Using /usr/local/Cellar/pipenv/2018.11.26_4/libexec/bin/python3.8 (3.8.2) to create virtualenv…
⠏ Creating virtual environment...created virtual environment CPython3.8.2.final.0-64 in 601ms
  creator CPython3Posix(dest=/Users/stephen/.local/share/virtualenvs/python-UlNrU6gd, clear=False, global=False)
  seeder FromAppData(download=False, pip=latest, setuptools=latest, wheel=latest, via=copy, app_data_dir=/Users/stephen/Library/Application Support/virtualenv/seed-app-data/v1)
  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator,XonshActivator

✔ Successfully created virtual environment!
Virtualenv location: /Users/stephen/.local/share/virtualenvs/python-UlNrU6gd
Creating a Pipfile for this project…
Installing pytest…
Adding pytest to Pipfile's [packages]…
✔ Installation Succeeded
Installing pytest-cache…
Adding pytest-cache to Pipfile's [packages]…
✔ Installation Succeeded
Pipfile.lock not found, creating…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
✔ Success!
Updated Pipfile.lock (f1741b)!
Installing dependencies from Pipfile.lock (f1741b)…
  🐍   ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 12/12 — 00:00:01
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
$ pytest --version
This is pytest version 5.4.1, imported from /Users/stephen/.pyenv/versions/3.8.0/lib/python3.8/site-packages/pytest/__init__.py
```

Now, the packages are still globally installed, _but_ there's a difference: I now have a `pipfile` and a `pipfile.lock`. A cursory inspection of my `pipfile` gives me the warm and fuzzies - I can _see_ my dependencies!

```txt:title=pipfile
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]

[packages]
pytest = "*"
pytest-cache = "*"

[requires]
python_version = "3.8"
```

## Wrap Up

It was more of a trip than I was expecting to be able to be productive with Python and it's more than likely that I'm still missing a step or three -- but at least I'm starting to get the hang of this new ecosystem!

Smell that? That's that sweet smell of learning things!
