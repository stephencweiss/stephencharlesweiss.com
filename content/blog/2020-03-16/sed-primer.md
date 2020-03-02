---
title: "Sed: Grep's Successor For Substitution"
date: '2020-02-27'
publish: '2020-03-16'
category: ['programming']
tags: ['unix','sed','grep']
---

In [Git Log Archeology/ Digging In With Grep And Pickaxe](../../2020-02-25/git-commit-archeology), I noted that the `grep` utility is an acronym for "_g_lobally search for a _r_egular _e_pression and _p_rint." This fact helps explain why it is sometimes written as g/re/p.<sup>[1](#footnotes)</sup><a id="fn1"></a>

Then this morning, I saw a commit which included a Sed command that seemed like magic! I wanted to understand a bit more about it. What's follow is a teaser at best with some basic Sed utilization.

At it's most basic, Sed is a related utility program. Instead of simply searching, Sed is a stream editor that "parses and transforms text."<sup>[2](#footnotes)</sup><a id="fn2"></a>

While Sed can do more, the most common use of it is to substitute text read in a stream.

```shell
$ echo day | sed 's/day/night'
night
```

Sed is also line oriented. Simply put this means that each line is processed independently.

Imagine the file:
```shell:title="panagram"
The quick brown fox jumps over the lazy dog.
The lazy dog chases two lazy squirrels.
The really lazy squirrel gets caught. The merely lazy gets away.
```

And now, if we want to replace `lazy` with `quick-witted` we could do it as follows:

```shell
sed 's/lazy/quick-witted/' < panagram
The quick brown fox jumps over the quick-witted dog.
The quick-witted dog chases two lazy squirrels.
The really quick-witted squirrel gets caught. The merely lazy gets away.

```

Of course, this only substituted the _first_ instance of `lazy` in each line.

If we really wanted _all_ instances to be replaced, we would use `/g` to indicate a global replace. Again, Sed is line oriented meaning that the "universe" of each operation is a single line.

```shell
$ sed 's/lazy/quick-witted/g' < panagram
The quick brown fox jumps over the quick-witted dog.
The quick-witted dog chases two quick-witted squirrels.
The really quick-witted squirrel gets caught. The merely quick-witted gets away.
```

To keep learning more (like I need to), I went looking for reference materials that would help me understand (more than merely reading the spec). One of the most complete tutorials I've found for learning Sed is Bruce Barnett's [Sed - An Introduction and Tutorial by Bruce Barnett](https://www.grymoire.com/Unix/Sed.html)

## Footnotes
- <sup>[1](#fn1)</sup> [grep | Wikipedia](https://en.wikipedia.org/wiki/Grep)
- <sup>[2](#fn2)</sup> [sed | Wikipedia](https://en.wikipedia.org/wiki/Sed)