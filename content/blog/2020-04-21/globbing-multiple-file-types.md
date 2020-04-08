---
title: 'Globbing And Multiple File Types'
date: '2020-04-01'
publish: '2020-04-21'
category: ['programming']
tags: ['glob', 'file types', 'multiple extensions']
---

Imagine you want to lint your files. [Prettier](https://prettier.io/docs/en/index.html) is a great option for some default options. It sets some opinionated defaults so you and Joe don't need to go to the mat over whether semi-colons are necessary or if it's safe to rely Javascript's [Automatic Semicolon Insertion](https://2ality.com/2011/05/semicolon-insertion.html). No one needs to die on a hill for tabs _or_ spaces either.

You pick one and move on.

But then, you want to lint _multiple_ file extension and not run the CLI for each of them.

What to do? Enter globbing. The [gulp.js team explains](https://gulpjs.com/docs/en/getting-started/explaining-globs):

> A glob is a string of literal and/or wildcard characters used to match filepaths. Globbing is the act of locating files on a filesystem using one or more globs.

Globbing's great for going from having a huge list of scripts tied together, like so:

```json:title="package.json"
{
    "scripts": {
        "lint:js": "prettier --check \"src/**/*.js\"",
        "lint:jsx": "prettier --check \"src/**/*.jsx\"",
        "lint:css": "prettier --check \"src/**/*.css\"",
        "lint:ts": "prettier --check \"src/**/*.ts\"",
        "lint": "yarn lint:js && yarn lint:jsx && ..."
    }
}
```

You can get it down to _one_ line:

```json:title="package.json"
{
    "scripts": {
        "lint": "prettier --check \"src/**/*{.jsx?, .css, .ts}\""
    }
}
```

So, there's actually two pieces of globbing happening here:

1. The `/**/*` part says starting in `src`, look at every directory (and directory of directories, all the way down look at all files
2. The second part is that I've specified certain file extensions: That's the part between the braces and it means that I'm only concerned with files that are `.js`, `.jsx` (the `?` after the x means that it's optional), `.css` or `.ts` .

A quick side note about Prettier: If you glob for file types that don't exist (i.e. you're looking for a `.yml` file in a directory that has no `.yml` files), it _will_ error. Better to add new file types to Prettier as they come up.

## Wrapping Up

Don't fight with Joe. Pick a tool and start producing value sooner.

Once you've picked the tool: understanding how globbing can help with their management is a great way to spend a few minutes.
