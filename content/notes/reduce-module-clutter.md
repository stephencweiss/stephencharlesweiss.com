---
title: 'Importing Modules While Reducing Clutter'
date: '2019-08-12'
publish: '2019-08-12'
category: ['programming']
tags: ['node', 'import', 'require', 'best practices']
---

I’ve developed a peculiar habit. I knew I’d developed it, but didn’t know it was peculiar until my lead asked me about it this morning.

When organizing my files, I’m quick to add a subdirectory to house even a single module.

Here’s an example of a folder structure for my `Property` directory. It’s a fairly typical example of this habit:

```
$ tree
.
├── InteriorFeatures
│   ├── InteriorFeatures.tsx
│   └── index.tsx
├── Location
│   ├── Location.tsx
│   └── index.tsx
├── Lot
│   ├── Lot.tsx
│   └── index.tsx
├── Rooms
│   ├── AddRooms.tsx
│   ├── Rooms.style.tsx
│   ├── Rooms.types.ts
│   ├── RoomsSummary.tsx
│   └── index.tsx
└── Structure
    ├── Structure.tsx
    └── index.tsx
```

My reasoning for this structure was two-fold:

1. Don’t house logic in an `index` file since I find them difficult to locate later (searching `index` in an IDE can yield a _lot_ of files if components are written this way)
2. Related: Avoid import statements that look like: `import Lot from "./Property/Lot/Lot"`

# Prettier Imports

In my aim to organize my code, I’d created a lot of overhead and extra files. Directories that didn’t need to exist and two line index files: For example, `./Location/index.tsx` is a typical example:

```javascript
import Location from './Location'
export default Location
```

I’d gotten in this habit because of how _nice_ it made my import statements.

```javascript
import Location from './Property/Location'
import Lot from './Property/Lot'
import AddRooms from './Property/Rooms'
import Structure from './Property/Structure'
import InteriorFeatures from './Property/InteriorFeatures'
```

See? Pretty.

# Pretty Imports Without The Cruft

After discussing the topic for a few minutes, my lead shared the Node documentation on Modules. It wasn’t my first time looking, but it’s always informative.

This time, I started stepping through the Pseudocode the Node team provided on how `require` works: <sup>1</sup>

```javascript
require(X) from module at path Y
1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with '/'
   a. set Y to be the filesystem root
3. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
4. LOAD_NODE_MODULES(X, dirname(Y))
5. THROW "not found"

LOAD_AS_FILE(X)
1. If X is a file, load X as JavaScript text.  STOP
2. If X.js is a file, load X.js as JavaScript text.  STOP
3. If X.json is a file, parse X.json to a JavaScript Object.  STOP
4. If X.node is a file, load X.node as binary addon.  STOP

LOAD_INDEX(X)
1. If X/index.js is a file, load X/index.js as JavaScript text.  STOP
2. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
3. If X/index.node is a file, load X/index.node as binary addon.  STOP

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. If "main" is a falsy value, GOTO 2.
   c. let M = X + (json main field)
   d. LOAD_AS_FILE(M)
   e. LOAD_INDEX(M)
   f. LOAD_INDEX(X) DEPRECATED
   g. THROW "not found"
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)
1. let DIRS = NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = [GLOBAL_FOLDERS]
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS
```

(NB: while there are differences between `require` and `import` in this context my understanding is that they do not apply)

Since my imports are relative, they fall under step 3:

```javascript
3. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
```

If _all_ I did was delete the `index` file, but retain the directory structure, the app wouldn’t be able to compile because it would try to import as an entire file.

For example - a refactored `InteriorFeatures`:

```
$ tree
.
├── InteriorFeatures
│   ├── InteriorFeatures.tsx
…
```

Followed by:

```javascript
import InteriorFeatures from ‘./Property/InteriorFeatures’;
```

Going through our Pseudocode, we’d end up in `LOAD_AS_FILE` with X as the value of `Property/InteriorFeatures/InteriorFeatures` — this _is_ a `.js` (`.tsx` compiles to `.js`), so we know we’d load it as JavasScript text.

```
LOAD_AS_FILE(X)
1. If X is a file, load X as JavaScript text.  STOP
2. If X.js is a file, load X.js as JavaScript text.  STOP
3. If X.json is a file, parse X.json to a JavaScript Object.  STOP
4. If X.node is a file, load X.node as binary addon.  STOP
```

What I really want is to import the file and then _use_ the default export within it.

So, deleting the `index.tsx` and calling it a day won’t work. But, I _can_ lift the files out of the subdirectory altogether and _delete_ the extra folder, which, after all, serves no real purpose since the folder isn’t actually organizing anything for all of these modules (with the exception of `Rooms`).

Understanding this, my new folder structure is as follows:

```
$ tree
.
├── Rooms
│   ├── AddRooms.tsx
│   ├── Rooms.style.tsx
│   ├── Rooms.types.ts
│   ├── RoomsSummary.tsx
│   └── index.tsx
├── InteriorFeatures.tsx
├── Location.tsx
├── Lot.tsx
└── Structure.tsx
```

My import statements _remain_ pretty, but without the extra cruft of unnecessary directories or `index` files.

# Conclusion

Understanding _how_ require (and import) work allow for more intuitive grouping of modules and can avoid unnecessary clutter. Using this understanding, I’m avoiding housing logic within `index` files which are predominantly reserved for routing, maintaining streamlined import statements, _and_ eliminating excess files.

## Footnotes

-   <sup>1</sup> [Modules Documentation v12.8.0 | Node](https://nodejs.org/api/modules.html#modules_all_together)
