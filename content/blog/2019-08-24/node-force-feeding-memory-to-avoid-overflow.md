---
title: 'Node Out Of Memory: Force Feeding Node More Memory'
date: '2019-08-24'
category: ['programming']
tags: ['node', 'memory', 'max_old_space_szie']
---

It's not uncommon for larger apps to exceed the default memory allocated to Node. When this happens, you'll get an errory alerting you that the Javascript heap is out of memory. For example:

```shell
[md5:]  241613/241627 97.5%
[md5:]  241614/241627 97.5%
[md5:]  241625/241627 98.1%
Creating missing list... (79570 files missing)
Creating new files list... (241627 new files)

<--- Last few GCs --->

11629672 ms: Mark-sweep 1174.6 (1426.5) -> 1172.4 (1418.3) MB, 659.9 / 0 ms [allocation failure] [GC in old space requested].
11630371 ms: Mark-sweep 1172.4 (1418.3) -> 1172.4 (1411.3) MB, 698.9 / 0 ms [allocation failure] [GC in old space requested].
11631105 ms: Mark-sweep 1172.4 (1411.3) -> 1172.4 (1389.3) MB, 733.5 / 0 ms [last resort gc].
11631778 ms: Mark-sweep 1172.4 (1389.3) -> 1172.4 (1368.3) MB, 673.6 / 0 ms [last resort gc].


<--- JS stacktrace --->

==== JS stack trace =========================================

Security context: 0x3d1d329c9e59 <JS Object>
1: SparseJoinWithSeparatorJS(aka SparseJoinWithSeparatorJS) [native array.js:~84] [pc=0x3629ef689ad0] (this=0x3d1d32904189 <undefined>,w=0x2b690ce91071 <JS Array[241627]>,L=241627,M=0x3d1d329b4a11 <JS Function ConvertToString (SharedFunctionInfo 0x3d1d3294ef79)>,N=0x7c953bf4d49 <String[4]\: ,\n  >)
2: Join(aka Join) [native array.js:143] [pc=0x3629ef616696] (this=0x3d1d32904189 <undefin...

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
 1: node::Abort() [/usr/bin/node]
 2: 0xe2c5fc [/usr/bin/node]
 3: v8::Utils::ReportApiFailure(char const*, char const*) [/usr/bin/node]
 4: v8::internal::V8::FatalProcessOutOfMemory(char const*, bool) [/usr/bin/node]
 5: v8::internal::Factory::NewRawTwoByteString(int, v8::internal::PretenureFlag) [/usr/bin/node]
 6: v8::internal::Runtime_SparseJoinWithSeparator(int, v8::internal::Object**, v8::internal::Isolate*) [/usr/bin/node]
 7: 0x3629ef50961b
```

(Side note: I've seen references to a default value of 1.5gb and 1.7gb, but have so far not been able to find it in the documentation. At least one Stackoverflow thread seems to suggest it's no longer documented <sup>1</sup>.)

One way to fix this is to make sure you allocate sufficient memory to the process.

This is where the option `max_old_space_size` comes in handy. From the command line, we can run our `app.js` file: `node --max_old_space_size=4096 app.js`

If you want to persist this change, you might modify the `package.json` directly:

For example, if we're using `npm run start`, we can modify it to be:
```json
“scripts”: {
  “start”: “node --max_old_space_size=4096 app.js”,
}
```

This will allocate ~4gb (4096 mb) to the process, but there's nothing magical about 4096. It's just a “round” number. It can also be set to 5000, 8000, etc. though the amount of RAM on your machine is the limiting factor.

At this point, hopefully we've allocated enough memory to run without issues. But what exactly _is_ “old space” anyway? I found
Matt Tejom's explanation really interesting <sup>2</sup>:
> There are two spaces for memory, old space and new space. New space is made of two parts, to and from. Scavenge garbage collection happens in the young space and uses Cheneys algorithm. Mark-sweep runs in old space. Mark-sweep and compacting on old space pause the javascript vm. When v8 can't allocate any more memory in the young space all objects are moved to the to space. Then the only objects still in use are moved back to the from space. Young space will be cleared of unused objects and compacted. Objects that survive two rounds of scavenge [garbage collection] are moved to old space. Large objects can be allocated and never go to young space.

# Footnotes
* <sup>1</sup> [Memory LImit in Node.js | Stackoverflow](https://stackoverflow.com/questions/7193959/memory-limit-in-node-js-and-chrome-v8)
* <sup>2</sup> [Nodejs and V8: Getting Started with Memory and Performance | Matt Tejom](https://tejom.github.io/general/nodejs/v8/debugging/2017/01/16/nodejs-and-v8.html)

