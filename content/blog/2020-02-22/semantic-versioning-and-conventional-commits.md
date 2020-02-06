---
title: 'Semantic Versioning & Conventional Commits'
date: '2020-02-04'
publish: '2020-02-22'
category: ['programming']
tags: ['semver','conventional commits','tom preston-werner']
---

I am a big fan of [semantic versioning](https://semver.org/). Even reading through FAQ is helpful for understanding some of the common problems that come up when developing software.

In describing [_why_ use semantic versioning](https://semver.org/#why-use-semantic-versioning), Tim Preston-Werner writes (emphasis mine):
> This is not a new or revolutionary idea. In fact, you probably do something close to this already. The problem is that “close” isn’t good enough. Without compliance to some sort of formal specification, version numbers are essentially useless for dependency management. **By giving a name and clear definition to the above ideas, it becomes easy to communicate your intentions to the users of your software.** Once these intentions are clear, flexible (but not too flexible) dependency specifications can finally be made.

The point of semantic versioning, then, is communicating intent.

Recently, I found another tool that pairs nicely with semantic versioning and is similarly focused on intent: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary).

From the summary:

> The commit contains the following structural elements, to communicate intent to the consumers of your library:
> 1. **fix:** a commit of the type `fix` patches a bug in your codebase (this correlates with `PATCH` in semantic versioning).
> 2. **feat:** a commit of the type `feat` introduces a new feature to the codebase (this correlates with `MINOR` in semantic versioning).
> 3. **BREAKING CHANGE:** a commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with `MAJOR` in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.
> 4. Others: commit types other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the the Angular convention) recommends `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others. We also recommend improvement for commits that improve a current implementation without adding a new feature or fixing a bug. Notice these types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE, which is NOT recommended).
> A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., feat(parser): add ability to parse arrays.

And, if the rules are too difficult to remember, or you'd prefer to offload the work to a linter, there's [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional).

Adopting Conventional Commits and Semantic Versioning in a project is a relatively lightweight way for developers to move beyond good intentions and clearly communicate to users of their software. I'm a fan.