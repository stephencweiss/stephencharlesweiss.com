---
title: 'MDX vs Remark'
date: '2019-08-11'
category: ['programming']
tags: ['markdown', 'mdx','remark']
---

Both MDX and Remark are Markdown compilers that will convert valid Markdown into HTML to render on the web. The beauty of Remark is that it can be extended via plugins for a number of use-cases.

Since the destination is valid HTML, if you include valid HTML in a `.md` file compiled by Remark, it will be processed as HTML. I use this to my advantage for superscripting my footnotes.<sup>1</sup>

MDX is _very_ similar.<sup>2</sup> It's also a Markdown compiler and is compatible with all Remark plugins.

So what's the difference? It allows writing of JSX within the body of a `.md` file and will compile that. Basically, it turns all files into React components that can import and render other components.

To date, I've been focusing exclusively on writing and haven't had the need to import JSX, but one of my side projects I want to work on involves data visualization and MDX's ability to import a component will make blogging about it that much easier!

Very excited to continue exploring this space.

## Footnotes
* <sup>1</sup> [Superscript And Subscript With Markdown](https://www.stephencharlesweiss.com/2019-08-09/markdown-superscript-subscript/)
* <sup>2</sup> [MDX](https://mdxjs.com)

