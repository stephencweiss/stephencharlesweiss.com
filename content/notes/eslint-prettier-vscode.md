---
title: 'ESLint, Prettier, And VSCode - When They Stop Cooperating'
date: '2019-10-14'
publish: '2019-10-14'
category: ['programming']
tags: ['vscode', 'prettier', 'eslint']
---

A while ago I installed the Prettier extension in VSCode and configured a few defaults in my global settings. I like having a global configuration so that I don’t have to go through the steps of setting up each project. Sometimes, however, that can create problems. For example, when ESLint and Prettier stop cooperating.

When that happens, Prettier just stops working. Kindly, VSCode alerts me, with a little `x` in the bottom bar, but the error messages have always been a bit cryptic.
![vscode-prettier-error](https://res.cloudinary.com/scweiss1/image/upload/v1593206679/vscode-prettier-error_lastlb.png)

Here’s a recent example:

```shell
10/4/2019, 8:52:55 AM:
----------------------
Failed to load plugin 'react-hooks' declared in 'CLIOptions'/Users/stephen/_coding/personal/fem-courses/fem-complete-intro-to-react-v5-adopt-me/src/SearchParams.js:: Cannot find module 'eslint-plugin-react-hooks'
Require stack:
- /Users/stephen/_coding/personal/fem-courses/complete-intro-to-react-v5/__placeholder__.js
```

Since I could still get formatting to work by running prettier in the command line, it’s never felt urgent. Still, today, I decided to dig into it to see if there was an answer.

Apparently, this is a known issue and has to do with how ESLint and Prettier interact.

There are threads for similar issues for Atom<sup>[1](#fn)</sup><a id="sup1"></a>, VSCode<sup>[2](#fn2)</sup><a id="sup2"></a>, and Prettier<sup>[3](#fn3)</sup><a id="sup3"></a>. I’m sure there are others.

Reading through the threads, I found a solution that works at least for VSCode, per [@2Color](https://github.com/2color):<sup>[4](#fn4)</sup><a id="sup4"></a>

> Try changing
> `"prettier.eslintIntegration": true`
> to
> `"prettier-eslint.eslintIntegration”: true`
> in Settings (JSON) for VSCode.
> Fixed the problems that I was having after upgrading to ESLint 6.x.

I made the change and suddenly everything was back to normal!

Actually - that’s not totally true. Hovering over the new line, VSCode was telling me that it was an “Unknown Configuration Setting”. So, I deleted it all together. It still works! At least in this project, which _does_ have a `.prettierrc`, even if it’s just an empty set of `{}`.

I’ll be keeping an eye on this, but if nothing else, at least I have a working solution for the future.

## Footnotes

-   <sup>[1](#sup1)</sup><a id="fn1"></a> [Failed to load plugin ‘prettier’ declared in ‘CLIOptions’: Cannot find module ‘eslint-plugin-prettier’ · Issue #505 · prettier/prettier-atom | GitHub](https://github.com/prettier/prettier-atom/issues/505)
-   <sup>[2](#sup2)</sup><a id="fn2"></a> [ESLint fails to load plugins when using ESLint 6.x · Issue #696 · microsoft/vscode-eslint | GitHub](https://github.com/microsoft/vscode-eslint/issues/696)
-   <sup>[3](#sup3)</sup><a id="fn3"></a> [Cannot find module ‘../ast-utils’ when formating · Issue #672 · prettier/prettier-vscode · GitHub](https://github.com/prettier/prettier-vscode/issues/672)
-   <sup>[4](#sup4)</sup><a id="fn4"></a> [@2Color’s solution](https://github.com/microsoft/vscode-eslint/issues/696#issuecomment-528305585) was the first that worked for me.
