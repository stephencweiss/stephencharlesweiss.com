---
title: 'Dealing With NPM Config Files'
date: '2019-10-17'
category: ['programming']
tags: ['node', 'npm', 'npmrc']
---

When things that used to work break, I want to understand why. That was the situation recently with `npm`, the reliable workhorse behind node projects.

The issue, it turned out had to do with my `.npmrc`, a file I didn’t even know existed.

Like other `.*rc` files, the `.npmrc` is a configuration file. This one, as you might expect from its name, for NPM.

## When Something You Thought Worked, Stops & Global Configs

I was working on a project recently and did the initial set up on one computer. Then I tried working on it on another machine to find that I couldn’t install any of the packages.

The issue, it turned out (after a lot of head scratching) was that the package lock pointed to a private registry as the first place to look, but that computer didn’t have access to that registry.

This was the first time I realized the role the `.npmrc` plays and I set about fixing it.

First of all - worth mentioning: You can have a global `.npmrc` which comes with all of the same warnings that having global _anything_ comes with. And/or you can have a separate `.npmrc` for each project.

To override any global settings, all you need to do is create a _more_ local `.npmrc` with the values that you want in the root of the project (i.e. a sibling to the `package.json` and `node_modules`).<sup>[1](#footnotes)</sup><a id="fn1"></a>

Let’s say you want to override the global registry configured in your `.npmrc`. The steps you’d need are:

1. Create a more local `.npmrc` with the value you do want:

```
// .npmrc
registry="https://registry.npmjs.org/"
```

2. Delete the `package-lock` and `node_modules` (which retain references to the old registry)
3. Reinstall (`npm install`)

## Configuring Defaults

The experience with the global `.npmrc` did pique my interest, however, and I wondered what else you can do with the `.npmrc` file.

Turns out - quite a bit!<sup>[2](#footnotes)</sup><a id="fn2"></a>

I’d already found that you can point to an alternative registry, but you can also set defaults.

Customizing your `.npmrc` can speed up the `npm init` process with some decent defaults. Here are some example

```shell
$ npm config set init.author.name "Stephen Weiss"
$ npm config set init.author.email "stephencweiss@gmail.com"
$ npm config set init.author.url "https://stephencharlesweiss.com"
$ npm config set init.license "MIT"
$ npm config set init.version "0.0.1"
```

My favorite is the last one - the initial version. NPM defaults to 1.0.0, but when I’m starting from scratch, it’s rare that my first commit will be to a fully working project. By setting my default to 0.0.1, I’m able to indicate much more clearly what the expectations should be for anyone who uses the project.

Set your defaults, and you’ll see them populate when you initialize a new project (or you can automatically accept them with `npm init --yes`

## Configuring Registries

As previously noted, configuring a private registry can be done within the `.npmrc` .

For example, if you’re working on a team and you want to privately host packages, you could use a private repository like JFrog.

To point to JFrog, use the `npm config set registry` command, like so:

```shell
npm config set registry "https://custom-registry.jfrog.io"
```

If using a private repository, you’ll likely also need auth. Look at the documentation for the registry for how to configure that. For JFrog, it includes adding an `_auth` property to the `.npmrc`

To reset you can either create a more local `.npmrc` (see above) or return to the default:

```shell
npm config set registry "http://registry.npmjs.com/"
```

Note: the `npm config` command will set the _global_ config file.

## Conclusion

I’m sure there’s much more to learn about the `.npmrc` and I’m excited to continue to explore, but I hav found understanding these basics has helped me immensely in speeding up my own work and being able to debug problems when they do arise.

## Footnotes

- <sup>[1](#fn1)</sup> For more about per-project configuration, see [NPM’s documentation on the topic](https://docs.npmjs.com/files/npmrc#per-project-config-file).
- <sup>[2](#fn2)</sup> When it comes to configuring the `.npmrc`, I found this article by Tierney Cyren on [Configuring Your `.npmrc` for an Optimal Node.js Environment”](https://nodesource.com/blog/configuring-your-npmrc-for-an-optimal-node-js-environment/) particularly useful.
