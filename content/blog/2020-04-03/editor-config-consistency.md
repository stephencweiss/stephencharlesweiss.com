---
title: 'Keeping Things Consistent With Editor Configs'
date: '2020-03-15'
publish: '2020-04-03'
category: ['programming']
tags: ['tools','linting','editor config']
---
Today, I want to talk about adding another tool designed to improve the developer experience by making _easy_: [Editor Configs](https://editorconfig.org/).

## Other Solutions: Linters

Before getting into editor config, first a short aside on linters.

Tools like `prettier` and `eslint` are wonderful for linting and keeping projects clean. Linters, however, work by cleaning up code _after_ it’s been written.

That means that unless you set them to clean on every save, it’s likely you’ll have a git log that looks a little like this:

```shell
* 02b2595 2020-03-14 | refactor: lint
* 8ea04ca 2020-03-14 | feat: add def
* a0787e7 2020-03-14 | refactor: lint
* 95299fe 2020-03-14 | feat: add abc
```

Yes, there are configurations to mitigate this - including rebasing, but the editor configuration file is a simple one for some of the more basic linting nuisances.

## How Editor Config Fits In
Editor config handles a few cases particularly well, which can combine with linters nicely:
1. They change the actual performance of the editor vs cleaning up after the fact
2. They facilitate cross-platform development

Unlike linting, with Editor Configs, changes are made _as you type_. If you set your `indent_size=4` and then tab, you’ll get four character worth of space. No need to clean up and lint later.

Editor Config facilitates cross-platform development (by which I mean some devs working on a Windows machine and others on Unix) with settings like the `end_of_line` property.

[Carl Saunders (deadlybyte)](https://github.com/deadlybyte) wrote a good article on the pain this can cause on Dev.To (see here: [🙏 Please Add .gitattributes To Your Git Repository](https://dev.to/deadlybyte/please-add-gitattributes-to-your-git-repository-1jld)), but suffice to say: making a decision on how you want lines to end can avoid a lot of linting pain.

## Using Editor Config
Using it is also really simple. A [number of editors have built-in support](https://editorconfig.org/#download) for it. Just put a `.editorconfig` file in the root of your project and away you go.

For those editors that _don’t_ have native support, many have plugins (like [VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)).

Once you’re set up (either by using an IDE like Webstorm with native support or with a plugin installed on VSCode), add your `.editorconfig` file to the root of the project.

My standard `.editorconfig` file:
```
# EditorConfig helps developers define and maintain consistent
# coding styles between different editors and IDEs
# editorconfig.org

root = true

[*] # Applies rules to all file types

# Holy-War Section
indent_style = space
indent_size = 4

# Cross-Platform Consistency
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## Wrapping Up
That’s it! Using Editor Config is simple and can help avoid a lot of unnecessary conversations / linting pain. Moreover, it can clean up your git history - which is always a plus!

Credit to [Greg Lobinski](https://github.com/greglobinski) for using Editor Config in his [gatsby-start-hero-blog](https://www.gatsbyjs.org/starters/greglobinski/gatsby-starter-hero-blog/), which is where I first saw a `.editorconfig` file and it spurred this investigation.
