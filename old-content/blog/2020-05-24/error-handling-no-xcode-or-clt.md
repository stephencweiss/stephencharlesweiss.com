---
title: 'Error Handling: No Xcode or CLT version detected!'
date: '2020-04-26'
publish: '2020-05-24'
category: ['programming']
tags: ['error handling', 'xcode', 'clt', 'macos', 'gyp']
---

```shell
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/Users/stephen/.nvm/versions/node/v12.16.2/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
gyp ERR! stack     at ChildProcess.emit (events.js:310:20)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
gyp ERR! System Darwin 19.4.0
gyp ERR! command "/Users/stephen/.nvm/versions/node/v12.16.2/bin/node" "/Users/stephen/.nvm/versions/node/v12.16.2/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/stephen/.npm/_npx/32734/lib/node_modules/gatsby/node_modules/fsevents
gyp ERR! node -v v12.16.2
gyp ERR! node-gyp -v v5.1.0
gyp ERR! not ok

 ERROR
```

I've been running into this issue with some regularity recently.

It turns out it's fairly common and [nodejs even has a wiki on it for MacOS Catalina](https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md).

My issue, however, was **not** that I didn't have the CLT (CommandLine Tools) installed.

I confirmed this by trying to install the Xcode Command Line Tools:

```shell
$ xcode-select --install
xcode-select: error: command line tools are already installed, use "Software Update" to install updates
```

In fact, they were even in the right place!

```shell
$ xcode-select -print-path
/Library/Developer/CommandLineTools
$ sudo xcode-select --reset
Password:
$ xcode-select -print-path
/Library/Developer/CommandLineTools
```

The `reset` flag resets to the default command line tools path.<sup>1</sup>

At this point, I decided to uninstall and reinstall:

```shell
$ sudo rm -rf /Library/Developer/CommandLineTools/
$ xcode-select --install
xcode-select: note: install requested for command line developer tools
```

That did it! No more errors (for now)!

## Footnotes

-   <sup>1</sup> For reference, the `xcode-select` usage:

```shell
$ xcode-select --help
Usage: xcode-select [options]

Print or change the path to the active developer directory. This directory
controls which tools are used for the Xcode command line tools (for example,
xcodebuild) as well as the BSD development commands (such as cc and make).

Options:
  -h, --help                  print this help message and exit
  -p, --print-path            print the path of the active developer directory
  -s <path>, --switch <path>  set the path for the active developer directory
  --install                   open a dialog for installation of the command line developer tools
  -v, --version               print the xcode-select version
  -r, --reset                 reset to the default command line tools path
```

#.writing/4.pending publication#
