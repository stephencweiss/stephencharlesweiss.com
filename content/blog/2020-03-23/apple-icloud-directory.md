---
title: 'Apple: Making Things Simple And iCloud'
date: '2020-03-06'
publish: '2020-03-23'
category: ['programming']
tags: ['icloud', 'directory', 'bash', 'alias']
---

One thing Apple does very well is making products that "just work."

One thing Apple makes extraordinarily difficult is tweaking those products.

A recent example was when I wanted to use some command line utilities to modify my iCloud configuration.

Just _finding_ the iCloud directory was a chore because it's hiding in a `Mobile Documents` directory.

The root directory for iCloud is:

```shell
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs
```

If you're like me, you might find it useful to create an alias to access this directory quickly:

```shell:title=".bash_profile"
goiCloud='cd /Users/stephen/Library/Mobile\ Documents/com~apple~CloudDocs/Documents'
```
