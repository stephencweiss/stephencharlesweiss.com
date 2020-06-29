---
title: 'Global Node Package Management: Revisited'
date: '2020-02-06'
publish: '2020-02-26'
category: ['programming']
tags: ['npm', 'global', 'nvm']
---

I've written in the past about how to [manage globally installed NPM packages](../../2019-11-03/global-node-package-management/). In my previous post I covered how to:

1. See what’s installed (view globally installed node packages)
2. Install a node package globally
3. Uninstall a globally installed node package

What I didn't know at the time (though it makes sense now that I think about it): globally installed `node` packages are installed for the _version_ of `node` that's _running_.

If you're using a single instance of `node`, then this will never come up. However, if you're using [NVM to manage multiple installations automatically](../../2020-02-14/nvm-node-version-management-automatic), things can get out of sync.

I noticed this recently when trying to use the Typescript compiler on a project.

The project was at v3.7 (which [brought a bunch of useful new features](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html) like optional chaining and nullish coalescing). When I ran my compiler, however, I kept getting a bunch of errors. The errors were not random either, they were specifically related to the new features of Typescript.

```shell
$ tsc -w
[10:57:19 AM] Starting compilation in watch mode...

src/config/datadictionary/fmls/create_fmls_rules.ts:150:66 - error TS1109: Expression expected.

150     const allClasses = mappedFields.flatMap(f => f.classes_reso ?? []);
                                                                     ~
//... and a long list of other errors related to new features available in Typescript 3.4+
[10:57:30 AM] Found 31 errors. Watching for file changes.

^C
```

As a result, I suspected the issue was with my version of Typescript, so I looked at what was running:

```shell
$ tsc -v
Version 3.6.3
```

Where was that coming from though? When I looked at my global packages, I didn't see it!

```shell
$ npm list -g --depth=0
/Users/stephen/.nvm/versions/node/v12.15.0/lib
├── bunyan@1.8.12
└── npm@6.13.4
```

Notice that the list is of my globally installed packages for node v12.15.0... and Typescript's nowhere to be found!

Using NVM then, I moved back to v10, our previous major version to see if that's where it was pulling from:

```shell
$ nvm list
       v10.12.0
->     v12.15.0
         system
default -> node (-> v12.15.0)
$ nvm use 10.12
Now using node v10.12.0 (npm v6.9.0)
$ npm list -g --depth=0
/Users/stephen/.nvm/versions/node/v10.12.0/lib
├── ...
└── typescript@3.6.3

```

Lo and behold - there it is! `typescript@3.6.3`.

Interestingly, this seems to suggest that while npm packages are installed globally and namespaced, there's some inheritance going on. So, if your current version of Node doesn't have the package installed, it will look in _other_ versions first, before alerting you that the package is not installed.

Now that I had the fix, I could go back to v12 and install Typescript (again):

```
$ nvm use stable
Now using node v12.15.0 (npm v6.13.4)
$ npm i -g typescript
/Users/stephen/.nvm/versions/node/v12.15.0/bin/tsc -> /Users/stephen/.nvm/versions/node/v12.15.0/lib/node_modules/typescript/bin/tsc
/Users/stephen/.nvm/versions/node/v12.15.0/bin/tsserver -> /Users/stephen/.nvm/versions/node/v12.15.0/lib/node_modules/typescript/bin/tsserver
+ typescript@3.7.5
added 1 package from 1 contributor in 3.137s
```

Running `tsc -w` however, still broke. When I checked the version, I understood why: I needed to reload my session to get the new version:

```
$ tsc -v
Version 3.6.3
$ source ~/.bash_profile
nvm is not compatible with the npm config "prefix" option: currently set to "/usr/local"
Run `npm config delete prefix` or `nvm use --delete-prefix v12.15.0 --silent` to unset it.
Now using node v12.15.0 (npm v6.13.4)
$ tsc -v
Version 3.7.5
$ tsc -w
[11:05:59 AM] Starting compilation in watch mode...

[11:06:07 AM] Found 0 errors. Watching for file changes.
```

## Conclusion

The jump from v10 to v12 is my first experience with jumps between stable releases. For the most part, it's been a relatively painless experience as I have not had too many situations where applications I'm working on have had breaking changes. Still, edge cases like this are a fun reminder that there's plenty of territory left to explore!
