---
title: 'How To Increment The Version Of Your Node Package'
date: '2020-02-17'
publish: '2020-03-07'
category: ['programming']
tags: ['npm', 'npm publish', 'npm scripts', 'npm version']
---

Using `npm package` we can auto-increment the version.

To see the existing published version of a package:

```shell
$ npm view <package_name> version
```

To update the version, the API is for `npm version` is:

```shell
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]
```

[The NPM docs](https://docs.npmjs.com/cli/version) describe this as three different types of inputs:

1. A valid [SemVer](https://semver.org/) string ([NPM details their implementation here](https://github.com/npm/node-semver#functions))
2. A label related to a valid SemVer String (`major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>]`)
3. From the latest git tag (`from-git`)

There's also an optional `-m` or `--message` flag to be included as a commit message when the version was created. It can receive the version number using the `%s` variable.

For example:

```shell
$ npm version patch -m "Upgrade to %s for reasons"
```

Intriguingly, you can also tie the publish command into `npm scripts` to make the process simpler. The docs, again, include a nice example of using the `preversion`, `version`, and `postversion` to automate much of the publishing process:

```json:title=./package.json
"scripts": {
  "preversion": "npm test",
  "version": "npm run build && git add -A dist",
  "postversion": "git push && git push --tags && rm -rf build/temp"
}
```
