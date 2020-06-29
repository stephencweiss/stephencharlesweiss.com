---
title: 'Global Node Package Management'
date: '2019-10-25'
publish: '2019-11-03'
category: ['programming']
tags: ['global', 'npm']
---

When it comes to global node packages, there are typically three things I want to do:

1. See what’s installed (view globally installed node packages)
2. Install a node package globally
3. Uninstall a globally installed node package

This post is meant to serve as a reminder for how to do all of these (and avoid future web searches).

## See Globally Installed Node Packages

The easiest way to get a picture of what’s globally installed is:

```shell
$ npm list -g --depth=0
```

The reason we do `--depth=0` is because we rarely want to see the dependencies that our globally installed packages have installed.

## Install A Package Globally

The rule of thumb is that if you use the package from the command line, it should be installed globally. In all other cases, even `prettier`, they should be installed locally.

To install globally, we can use the following code:

```shell
npm install <package-name> -g
```

## Uninstall A Globally Installed Package

Similar to installing a package, uninstalling a package globally just requires the presence of the `-g` flag.

```shell
npm uninstall <package-name> -g
```

## Conclusion

Remembering these commands is often not worth the mental space they require — particularly early on before they’re muscle memory. Hopefully this proves to be appropriately searchable in order to speed up the information gathering and allow me to get back to the task at hand.
