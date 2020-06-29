---
title: 'Named Anchors & Markdown'
date: '2019-10-11'
category: ['programming']
tags: ['markdown']
---

When writing longer files in Markdown, it can be useful to create links _within_ the document to help readers navigate. This cross referencing makes jumping around the document even simpler.<sup>[1](#fn1)</sup><a id="sup1"></a>

For example:

```markdown
…

### <a id="my-header"></a> Header

…
And then later, I want to go to [Header](#my-header), you create a link, just like any other.
```

The reason we have to add the anchor tag to the Header is that the Markdown spec doesn’t automatically do it.<sup>[2](#fn2)</sup><a id="sup2"></a>

Fortunately, many Markdown resolvers do, Gitlab, VSCode, Remark, etc.

If you’re using one of these to convert the Markdown to HTML, things are even simpler:<sup>[3](#fn3)</sup><a id="sup3"></a>

```markdown
…

### My Stupendous Header

…
And then later, I want to go to the [header](#my-stupendous-header), you create a link, just like any other.
```

## Footnotes

-   <sup>[1](#sup1)</sup><a id="fn1"></a> [markdown - How to link to a named anchor in Multimarkdown? | Stack Overflow](https://stackoverflow.com/questions/6695439/how-to-link-to-a-named-anchor-in-multimarkdown)
-   <sup>[2](#sup2)</sup><a id="fn2"></a> While some posts will point to using the "name" property in favor of the "id", in my testing, "id" was more reliable. For example, here's a conversation advocating the use of "name" despite the fact that it is deprecated [Cross-reference (named anchor) in markdown](https://stackoverflow.com/questions/5319754/cross-reference-named-anchor-in-markdown/7335259#7335259).
-   <sup>[3](#sup3)</sup><a id="fn3"></a> Since this is not part of the standard, the _specifics_ for the link can vary, however the most common practice I’ve seen is kebab case.
