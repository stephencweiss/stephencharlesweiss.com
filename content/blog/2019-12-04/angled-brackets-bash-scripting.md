---
title: 'Redirection In Unix - AKA Angled Brackets'
date: '2019-11-15'
publish: '2019-12-04'
category: ['programming']
tags: ['bash scripting','shell scripting','zsh','redirect','append','stdin','stdout']
---
Today I wanted to learn how to programmatically update a file with shell scripting.

Turns out that there are multiple approaches and it depends on whether or not you’re okay with a destructive action or not.

The short answer:
`>` will push data from what’s to the left of the bracket to the right. This is potentially destructive.
`>>` will push data in a non-destructive way by appending the data only.

I found [Paul Brown’s tutorial](https://www.linux.com/tutorials/understanding-angle-brackets-bash/) on the differences between the angle brackets over at Linux.com really accessible and informative.

For an even more in-depth look, the [Advanced Bash-Scripting Guide has a great chapter on Redirection](http://www.tldp.org/LDP/abs/html/io-redirection.html) is fantastic and contains lots of relevant examples.