---
title: 'NPM - Cannot read property "match" of undefined'
date: '2019-10-22'
category: ['programming']
tags: ['npm', 'error handling']
---

When trying to run an `npm` command, you can’t install the packages, you may get the error:

```shell
 stephen  ~/_coding/remine/revolution   master  👉 npm run setup

> revolution@0.0.1 setup /Users/stephen/_coding/remine/revolution
> lerna link && lerna bootstrap

lerna notice cli v3.15.0
lerna info Symlinking packages and binaries
lerna notice cli v3.15.0
lerna info Bootstrapping 6 packages
lerna info Installing external dependencies
lerna ERR! npm install exited 1 in '@revolution/web'
lerna ERR! npm install stderr:
npm ERR! Cannot read property 'match' of undefined

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/stephen/.npm/_logs/2019-10-11T17_31_46_811Z-debug.log

lerna ERR! npm install exited 1 in '@revolution/web'
lerna WARN complete Waiting for 5 child processes to exit. CTRL-C to exit immediately.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! revolution@0.0.1 setup: `lerna link && lerna bootstrap`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the revolution@0.0.1 setup script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/stephen/.npm/_logs/2019-10-11T17_31_46_935Z-debug.log
```

While not a root-cause solution, a [workaround](https://github.com/npm/npm/issues/20954) is:

1. Delete `node_modules` _and_ `package-lock.json`
2. Run `npm install` again
