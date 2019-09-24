---
title: 'HTML Id Fields'
date: '2019-09-21'
category: ['programming']
tags: ['html', 'id', 'w3', 'whatwg']
---

Ids are everywhere. But what are the rules for them?

Turns out, the rules in HTML5 are pretty permissive: unique, at least one character, and no spaces.<sup>1</sup>

From the spec itself:<sup>2</sup>

> When specified on [HTML elements](https://html.spec.whatwg.org/multipage/infrastructure.html#html-elements) , the [id](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute) attribute value must be unique amongst all the [IDs](https://dom.spec.whatwg.org/#concept-id) in the element's [tree](https://dom.spec.whatwg.org/#concept-tree) and must contain at least one character. The value must not contain any [ASCII whitespace](https://infra.spec.whatwg.org/#ascii-whitespace).

The rules used to be more specific. In HTML4<sup>3</sup>:

> **ID** and **NAME** tokens must begin with a letter ([A-Za-z]) and may be followed by any number of letters, digits ([0-9]), hyphens (“-“), underscores (“\_”), colons (“:”), and periods (“.”).

Note the restrictions as well as the fact that the id _had_ to start with a letter.

## Footnotes

- <sup>1</sup> [What are valid values for the id attribute in HTML? | StackOverflow](https://stackoverflow.com/questions/70579/what-are-valid-values-for-the-id-attribute-in-html)
- <sup>2</sup> [HTML Standard | WHATWG](https://html.spec.whatwg.org/multipage/dom.html#global-attributes)
- <sup>3</sup> [Basic HTML data types | W3](https://www.w3.org/TR/html4/types.html#type-id)
