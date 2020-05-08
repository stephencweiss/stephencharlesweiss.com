---
title: 'Getting Strikethroughs When Writing In Markdown'
date: '2020-05-07'
publish: '2020-06-16'
category: ['programming']
tags: ['markdown','strikethrough','html']
---

This evening I was going on my merry way when I realized that I wanted to add some emphasis to my writing by adding a strikethrough mark.

Since I use Slack daily, I was under the mistaken impression that I would be able to wrap my words with `~`, like ~so~. Though this site is written in markdown, I'm sure you'll have noticed that that was not striken.

So, what gives?

Well, it turns out that there [is _no_ strikethrough in markdown](https://daringfireball.net/projects/markdown/syntax). Not the original version spec'd by John Gruber at least. He even wrote about the [explicit design choice to leave it off](https://daringfireball.net/linked/2015/11/05/markdown-strikethrough-slack), which I found pretty interesting.

So, if I want to strike, what to do?

<del>There's nothing I can do!</del>

HTML to the rescue. Instead of using tildes, I can use the `<del>` tag (as I did in the line above)!

This is very similar to my solution for [super- and subscripts with markdown](../../2019-08-09/markdown-superscript-subscript): rendering markdown into HTML is powerful.

