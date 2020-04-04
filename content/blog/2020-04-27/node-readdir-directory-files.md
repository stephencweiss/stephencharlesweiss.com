---
title: 'Using Node To Find All Files In A Directory'
date: '2020-04-04'
publish: '2020-04-27'
category: ['programming']
tags: ['node', 'readdir', 'readdirsync', 'files', 'async', 'callbacks']
---

Turns out Node has `readdir` for exactly this purpose.

From the [docs](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback):

> Asynchronous [readdir(3)](http://man7.org/linux/man-pages/man3/readdir.3.html). Reads the contents of a directory. The callback gets two arguments (err, files) where files is an array of the names of the files in the directory excluding '.' and '..'.

```javascript
const path = require('path')
const fs = require('fs')

// hard-coding our directory path
const directoryPath = path.resolve(__dirname, 'path/to/directory/with/files')

fs.readdir(directoryPath, function(err, files) {
    const allFiles = []
    if (err) {
        console.log('Error getting directory information.')
    } else {
        files.forEach(function(file) {
            console.log(`file -->`, file)
        })
    }
})
```

While, by default file types are excluded, there's an option `withFileTypes` that can be turned on to ensure they're included.

How could we make this slightly more usable though? Perhaps by converting it into a function that can receive a directory path...

At this point we might be tempted to do something like:

```javascript:title="getFiles-broken"
const path = require('path')
const fs = require('fs')

function getFiles(directoryPath) {
    const allFiles = []
    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            console.log('Error getting directory information.')
        } else {
            files.forEach(function(file) {
                const filePath = directoryPath.concat(file)
                allFiles.push(filePath)
            })
            return allFiles
        }
    })
}
```

The problem, however, is that `readdir` is _asynchronous_ (there is a `readdirsync` though).

The result is that if we were to run:

```javascript
const directoryPath = path.resolve(__dirname, '../../data/localData')
const files = getFiles(directoryPath)
console.log(files) // undefined //highlight-line
```

At this point, there are two ways we can solve this:

1. Convert to the synchronous version of `readdir` (i.e. use `readdirsync`)
2. Pass in a callback into which our results can passed once they've resolved.

Looking at each in turn.

### Asynchronous With Callbacks

Callbacks have been one of those parts of learning Javascript that's given me fits for ages. It was all the more surprising then that not only did I quickly recognize the reason my `files` was undefined was due to asynchronicity of `readdir` but that I saw how to pass in a callback!

Here's one way to look at it:

```javascript:title="getFiles-async"
const path = require('path')
const fs = require('fs')

function getFiles(directoryPath, cb) {
    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            console.log('Error getting directory information.')
        } else {
            cb(files) //highlight-line
        }
    })
}
```

Now, once `fs.readdir` completes, it passes the files (our data received from the function) into our callback (`cb` by convention).

To use this new `getFiles`, we can do the following:

```javascript
const directoryPath = path.resolve(__dirname, "../../data/localData");
function myCallback(value){console.log('files ->', value}
getFiles(directoryPath, myCallback)
```

You might notice that we're just passing in the function, `myCallback` and not `(files) => myCallback(files)`, which would also work. This reason we don't _need_ to is because of [currying](https://stephencharlesweiss.com/blog/2019-04-13/currying-an-introduction-with-function-declarations-and-expressions/).

### Synchronous Approach

Switching gears a bit, if we're willing to pause your application and switch from the native asynchronous nature of javascript to synchronous, we can simplify this even further.

```javascript:title="getFiles-sync"
const path = require('path')
const fs = require('fs')

function getFiles(directoryPath) {
    return fs.readdirsync(directoryPath)
}
```

Which can then be used as:

```javascript
const directoryPath = path.resolve(__dirname, '../../data/localData')
console.log(`files --> `, getFiles(directoryPath))
```

## Wrapping Up

Because so much of Javascript is built on open sourced packages, it's easy to forget how much we can do with the native APIs. Exploring Node is often fruitful - not only to find new solutions to problems, but to reinforce how programming paradigms like asynchronicity _work_.
