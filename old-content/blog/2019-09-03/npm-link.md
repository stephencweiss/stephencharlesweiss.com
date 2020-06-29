---
title: 'NPM Link'
date: '2019-09-03'
category: ['programming']
tags: ['npm', 'npm-link']
---

Unless you’re working on a mono-repo, it’s fairly common that in the process of making changes to a code base, you’ll actually need to update the dependency.

When that happens, if you want to test that the changes you’re making work _before_ merging to master in the dependency, linking repos can be a god-send. Enter NPM Link.<sup>1</sup>

To make this explicit, let’s think about two apps: `AppA` is an e-commerce application (could be anything, I just picked e-commerce). We’re building it, and our other apps in React, so `AppB` is a shared-UI library full of components that we can re-use across all of different apps.

`AppA` imports a component, let’s call it `Input`, from `AppB`, but it wants some additional validation. Instead of writing that validation in `AppA` (and then needing to re-write it in every subsequent app that uses `Input`), we want to modify the `Input` component directly and then test that the changes took as expected within `AppA`.

## Create The Link

1. Navigate to the root directory of `AppB` (the dependency) in your terminal (or open your text editor’s console)
2. Run `npm link`
3. If you need to build your app (e.g., if `AppB` is written in Typescript), do so now: `npm run build`

At this point, _any_ app that has `AppB` as a dependency can now link to it. What that means is that when running an app that uses `AppB`, instead of using the files in `node_modules`, it will reference the local version stored by the link.

## Establish The Link

1. Navigate to the root directory of the app that you want to link, `AppA` in our case
2. Run `npm link AppB` where `AppB` is the _name_ of the app.

Note: **DO NOT** run `npm install`. That will break the link.

## Breaking The Link

As noted above, the easiest way to break the link is from within `AppA` running `npm install`.

If you’d like a more formal approach, Erin Bush wrote about Linking and Unlinking and has the following steps:<sup>2</sup>

1. In the root directory of `AppA` run `npm unlink --no-save AppB`
2. In the root directory of `AppB` run `npm unlink`

### Why Order Matters

If the order is messed up and we unlink `AppB` before `AppA`, you can get into a situation where your project, `AppA` won’t be able to install its dependency `AppB` - linked or not.

The solution (which is hardly a solution) was to remove the local copy and do a fresh copy from the remote repo.

## Wrapping Up

Linking apps is one of my favorite ways to speed up my development. Not only do I _not_ need to wait until my changes to the dependency have been reviewed and merged into master, but I can verify myself that what I want to happen _does_ happen.

While reading up on the topic, in addition to Erin’s post, I found Alexis Hevia’s Medium post quite helpful in understanding _how_ to link and do so safely.<sup>3</sup>

## Footnotes:

-   <sup>1</sup> [npm-link | NPM](https://docs.npmjs.com/cli/link.html)
-   <sup>2</sup> [NPM Linking and Unlinking | Erin Bush](https://dev.to/erinbush/npm-linking-and-unlinking-2h1g?returning-user=true)
-   <sup>3</sup> [The magic behind npm link | Alexis Hevia](https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af)
