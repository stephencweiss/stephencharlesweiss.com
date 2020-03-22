---
title: 'Typescript Compiler Options: Lib Vs. Target'
date: '2020-03-22'
publish: '2020-04-08'
category: ['programming']
tags: ['typescript','compiler options','--lib','--target']
---
I was setting up a new typescript project the other day when I realized that there were two compiler options that felt very similar: `lib` and `target`. 

According to the [Typescript Compiler Options docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html), the purpose of the options are:
- `--lib` is used to list “library files to be included in the compilation”
- `--target` is used to "specify [the] ECMAScript target version"

Reading those definitions didn't exactly clarify how or why I would use one or the other - or both.

After finding this [conversation on Stack Overflow](https://stackoverflow.com/questions/42093758/need-clarification-of-the-target-and-lib-compiler-options), however, I feel better equipped thanks to [Aaron Bell's answer](https://stackoverflow.com/a/42097465).

The reason Typescript has both is historic. `--target` was always there, while `--lib` was added later. 

This was done to handle the evolution of Javascript with new features like Promises.

For example, before `--lib` was available, if you wanted to serve users that were still on `ES5`, you had two choices:
1. Do not use features introduced in newer versions, or
2. Target the most modern version of Javascript needed, and then use a transpiler like Babel to compile down to the appropriate level latel

The introduction of `--lib` solves that problem by allowing the `--lib` and `--target` to diverge - avoiding compiler errors by referencing a more modern type declaration file (via `--lib`) while still compiling down to the targeted version. 


