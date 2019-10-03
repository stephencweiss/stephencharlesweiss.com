---
title: 'Named Anchors & Markdown'
date: '2019-10-11'
category: ['programming']
tags: ['markdown']
---

When writing longer files in Markdown, it can be useful to create links _within_ the document to help readers navigate. This cross referencing makes jumping around the document even simpler.<sup>1</sup>

For example:

```markdown
…

### <a name="my-header"></a> Header

…
And then later, I want to go to [Header](#my-header), you create a link, just like any other.
```

The reason we have to add the anchor tag to the Header is that the Markdown spec doesn’t automatically do it.

Fortunately, many Markdown resolvers do, Gitlab, VSCode, Remark, etc.

If you’re using one of these to convert the Markdown to HTML, things are even simpler<sup>3</sup> :

```markdown
…

### My Stupendous Header

…
And then later, I want to go to the [header](#my-stupendous-header), you create a link, just like any other.
```

## Footnotes

- <sup>1</sup> [markdown - How to link to a named anchor in Multimarkdown? | Stack Overflow](https://stackoverflow.com/questions/6695439/how-to-link-to-a-named-anchor-in-multimarkdown)
- <sup>2</sup> For why we use `name` instead of `id` see this conversation on Stack Overflow related to [Cross-reference (named anchor) in markdown](https://stackoverflow.com/questions/5319754/cross-reference-named-anchor-in-markdown/7335259#7335259).
- <sup>3</sup> Since this is not part of the standard, the _specifics_ for the link can vary, however the most common practice I’ve seen is kebab case.
