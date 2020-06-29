---
title: 'How To Execute Node Package CLIs'
date: '2020-02-12'
publish: '2020-03-08'
category: ['programming']
tags: ['cli', 'node', 'npm', 'package.json', 'node_modules', '.bin']
---

In node projects, many times a package will have its own CLI. React, Storybook, Typescript and Gatsby all have their own for example.

How do we actually use those CLIs within a project? This is one of those topics that I don't normally think about because it's _usually_ handled by the base case.

Well, there are a few different ways:

1. Using scripts (base case)
2. Using global packages
3. Ad hoc references

Below, I'll walk through all of these using Gatsby as an example.

## Using A Script

The most common solution I've found, particularly for commands used frequently within a project is to add a script in the `package.json`.

For example, my Gatsby starter came with a `dev` and `build` script included:

```json:title=./package.json
{
    "scripts": {
        "build": "gatsby build",
        "dev": "gatsby develop"
    }
}
```

But what if you want to build and then serve the site? You can add another line to the scripts:

```json:title=./package.json
{
    "scripts": {
        "build": "gatsby build",
        "dev": "gatsby develop",
        "serve": "gatsby serve"
    }
}
```

This works well, but it can also lead to a ballooning of scripts which might become unweildly over time.

### Passing Options

What about if the CLI needs an option and your script doesn't have them predefined? The most common case I see for this is linting.

For example:

```json:title=./package.json
{
    "scripts": {
        "lint": "eslint --ext .js,.jsx src test"
    }
}
```

If you just run `shell> $ npm run lint` then `eslint` will process the specified files and return warnings and errors. It will note that you can use the `--fix` option if you want `eslint` to try to fix them on your behalf.

But, if you were to take it at its word and run

```shell
$ npm run lint
```

Nothing would happen. That's because the options are being passed to `npm` _not_ `eslint`.

To fix that, you can do a double set of `--`:<sup>[1](#footnotes)</sup><a id="fn1"></a>

```shell
$ npm run lint -- --fix
```

## Global Packages

Another approach is to install the [package globally](global-node-package-management) and then use that to run your more ad hoc scripts.

For example:

```shell
$ npm install --global gatsby
$ pwd
Users/stephen/my-gatsby-project
$ gatsby serve
```

## Ad Hoc References

I've been having [issues with globally installed packages lately](global-node-packages-revised), however, so I tend to avoid them.

Fortunately, it's possible to run the command _without_ installing a package globally by reaching into your `node_modules` folder (just like the script is doing):

```shell
$ pwd
Users/stephen/my-gatsby-project
$ ./node_modules/.bin/gatsby serve
```

The other benefit here is that you never run itno the situation where your globally installed package is a different version from the local one!

## Conclusion

In most cases, using a script is a great solution. When you want a quick ad hoc script and _don't_ want to install the package globally though, knowing how to reach into your `node_modules` folder can be really useful!

Happy hacking!

## Footnotes

-   <sup>[1](#fn1)</sup> [The `--` is how to indicate the end of options in node](https://nodejs.org/dist/latest-v12.x/docs/api/cli.html#cli_1)
