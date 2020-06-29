---
title: 'Multi-Line Bash Scripting'
date: '2020-03-02'
publish: '2020-03-19'
category: ['programming']
tags: ['bash', 'scripting', 'multi-line', 'adam dymitruk']
---

In researching how to [filter Git Commits by Author](git-commit-filter-author) I found [Adam Dymitruk](http://dymitruk.com/)'s bash solution.

```shell
git log --format='%H %an' |  # get a list of all commit hashes followed by the author name
  grep -v Adam |             # match the name but return the lines that *don't* contain the name
  cut -d ' ' -f1 |           # from this extract just the first part of the line which is commit ref
  xargs -n1 git log -1       # call git log from that commit stopped after 1 commit
```

The reason I'm writing about this is not the solution itself - which _excludes_ any commits where the author name includes "Adam" - but because of the accompanying note:

> Don’t be afraid to split your piped commands onto multiple lines. As long as a line ends with a pipe, bash knows there is more and will prompt for the next line. You can continue to do this until you have written what you want or pasted a multiline snippet from an example online. When you search history, it will be recalled as one line with proper semi-colons inserted if you used while loops or other flow control.

I was unaware of this feature but find its simplicity fantastic. Making use of multi-line bash commands can greatly improve the readability of a script - allowing both for improved documentation (as Adam did with comments) and smaller parts that a future reader must parse and understand.
