---
title: 'Transpile vs. Compile'
date: '2020-02-12'
publish: '2020-03-03'
category: ['programming']
tags: ['transpile', 'babel', 'shawn wang', 'swxy', 'javascript', 'build tools']
---

What does it mean when we say that `babel` is a transpiler?

According to Shawn Wang (known on the internet as swxy), when `babel` transpiles, it "compile[s] from Javascript to Javascript".<sup>[1](#footnotes)</sup><a id='fn1'></a>

So, if we're comparing transpiling to compiling - the former is from it's language to itself (at a target specified by the developer to be compatible with the consuming application — in this case the various browsers) while the latter is taking a language and transforming it into a _different_ language - whether it's a lower level language (C or C++) or machine code.

## Footnotes

-   <sup>[1](#fn1)</sup> This comes from Shawn's interesting blog [The Many jobs of JS Build Tools: For new JS Developers](https://www.swyx.io/writing/jobs-of-js-build-tools)
