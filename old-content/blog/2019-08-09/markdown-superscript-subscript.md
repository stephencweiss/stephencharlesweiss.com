---
title: 'Superscript And Subscript With Markdown'
date: '2019-08-09'
category: ['programming']
tags: ['markdown', 'remark']
---

Markdown doesn’t support for superscript or subscript directly. However, there are multiple strategies to adding superscript and subscript to your markdown.

The simplest, and the way I’d been doing it for months, is to use character itself. For example, using the Emoji keyboard on a Mac (or a symbol keyboard in Windows), you can insert the character you want manually.<sup>1</sup> It’s a valid character and so Markdown will honor it.

When writing for the web, however, it’s also possible to use a markdown compiler. Examples of compilers include Remark and Liquid. The will compile the markdown _into_ HTML, which means that valid HTML within the body of the file will be respected.

This is powerful because it allows the blending of Markdown _and_ HTML - which in my case means that I can use a `<sup>` tag to <sup>easily</sup> add words in superscript without needing to select the characters one at a time from a symbols keyboard.

This may not _look_ as pretty as a the actual superscript / subscript when looking at the markdown, but it _is_ mighty handy.

H/t to Sung Kim (again) for asking the question and pushing me to find a better solution.<sup>2</sup>

## Footnotes

-   <sup>1</sup> [remarkjs/remark: Markdown processor powered by plugins part of the @unifiedjs collective | Github](https://github.com/remarkjs/remark)
-   <sup>2</sup> https://sung.codes
