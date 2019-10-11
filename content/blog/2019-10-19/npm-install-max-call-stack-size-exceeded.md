---
title: 'NPM Install - Max Call Stack Exceed'
date: '2019-10-19'
category: ['programming']
tags: ['error handling', 'npm']
---

I was recently trying to switch over from a private registry default to the default one.

When I tried to reinstall my dependencies, however, I got an error:

```shell
$ npm i
npm ERR! Maximum call stack size exceeded

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/stephen/.npm/_logs/2019-10-09T23_59_46_372Z-debug.log
```

After looking around online, I found a few suggestions:<sup>[1](#footnotes)</sup><a id="fn1"/>

1. Rebuild
2. If rebuilding doesn’t work, try clearing the cache (this changed with v5 of npm, which is why it’s no longer the default)

```shell
$ npm rebuild

$ npm i
npm ERR! Maximum call stack size exceeded

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/stephen/.npm/_logs/2019-10-10T00_00_53_259Z-debug.log
$ npm cach clear
npm ERR! As of npm@5, the npm cache self-heals from corruption issues and data extracted from the cache is guaranteed to be valid. If you want to make sure everything is consistent, use 'npm cache verify' instead. On the other hand, if you're debugging an issue with the installer, you can use `npm install --cache /tmp/empty-cache` to use a temporary cache instead of nuking the actual one.
npm ERR!
npm ERR! If you're sure you want to delete the entire cache, rerun this command with --force.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/stephen/.npm/_logs/2019-10-10T00_01_39_646Z-debug.log
$ npm i --cach /tmp/empty-cache
npm ERR! code ENOLOCAL
npm ERR! Could not install from "../../../../../tmp/empty-cache" as it does not contain a package.json file.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/stephen/.npm/_logs/2019-10-10T00_02_06_918Z-debug.log
$ npm install --cache /tmp/empty-cache
npm ERR! Maximum call stack size exceeded

npm ERR! A complete log of this run can be found in:
npm ERR!     /tmp/empty-cache/_logs/2019-10-10T00_02_42_186Z-debug.log
$ npm cache verify
Cache verified and compressed (~/.npm/_cacache):
Content verified: 16758 (1425371568 bytes)
Content garbage-collected: 6312 (918876581 bytes)
Index entries: 26407
Finished in 29.242s
$ npm i
npm ERR! Maximum call stack size exceeded

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/stephen/.npm/_logs/2019-10-10T00_03_47_594Z-debug.log
```

A note about the logs: Several of the answers reported success with `npm cache clear --force`. As you can see in the logs, `npm` doesn’t advise it. I followed their advice and was able to get to an answer - however, if it hadn't worked, that would have been my next step.

Another comment suggested that the error happens due to an issue with the `.npmrc`. The suggestion was to delete the file.

I gave it a shot and suddenly the error went away.

Unfortunately, the whole point of the exercise was to have a project specific `.npmrc`. So, I deleted the `node_modules` and `package-lock` again, added the `.npmrc` back to the project’s root and tried again.

This time, it worked!

## Footnotes

- <sup>[1](#fn1)</sup> Of all the conversations I reviewed related to the stack overflow... [Stack Overflow had the best answers](https://stackoverflow.com/a/53381497).
