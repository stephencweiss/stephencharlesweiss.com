---
title: 'How To Execute Node Package CLIs'
date: '2020-02-12'
publish: '2020-03-06'
category: ['programming']
tags: ['cli','node','npm','package.json','node_modules','.bin']
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
```json title="package.json"
{
    "scripts": {
        "build": "gatsby build",
        "dev": "gatsby develop",
    },
}
```

But what if you want to build and then serve the site? You can add another line to the scripts:

```json title="package.json"
{
    "scripts": {
        "build": "gatsby build",
        "dev": "gatsby develop",
        "serve": "gatsby serve",
    },
}
```

This works well, but it can also lead to a ballooning of scripts which might become unweildly over time.

## Global Packages

Another approach is to install the [package globally](../../2019-11-03/global-node-package-management) and then use that to run your more ad hoc scripts.

For example:
```shell
$ npm install --global gatsby
$ pwd
Users/stephen/my-gatsby-project
$ gatsby serve
```

## Ad Hoc References

I've been having [issues with globally installed packages lately](../../2020-02-26/global-node-packages-revised), however, so I tend to avoid them.

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