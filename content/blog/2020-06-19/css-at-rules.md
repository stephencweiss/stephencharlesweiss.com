---
title: 'CSS at-rules And Logical Operators In Media-Queries'
date: '2020-05-08'
publish: '2020-06-19'
category: ['programming']
tags:
    [
        'css',
        'media-queries',
        'logical operators',
        'at-rules',
        '@media',
        '@supports',
    ]
---

Yesterday, when I was writing about adding [drop caps with css](../../2020-06-18/css-first-letter-drop-cap), I stumbled on two new features within CSS:

1. The [css at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule) `@supports`
2. Conditional Media Queries

Now, if you'd asked me before I looked, I would have said the only time I'd ever seen the `@` in CSS was for media-queries which leverage the `@media` rule. For example, this site uses an adaptive design to scale the width of the blog based on the device used.<sup>[1](#footnotes)</sup><a id="fn1"></a>

After looking at the full list, I realize I have seen `@keyframes` before, though I admit that I have not yet mastered the power embedded within (not like the keyframe.rs that's for sure!). The full list, [per MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule), iis:

> -   [@charset](https://developer.mozilla.org/en-US/docs/Web/CSS/@charset) — Defines the character set used by the style sheet.
> -   [@import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) — Tells the CSS engine to include an external style sheet.
> -   [@namespace](https://developer.mozilla.org/en-US/docs/Web/CSS/@namespace) — Tells the CSS engine that all its content must be considered prefixed with an XML namespace.
> -   **Nested at-rules** — A subset of nested statements, which can be used as a statement of a style sheet as well as inside of conditional group rules:
>     * [@media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) — A conditional group rule that will apply its content if the device meets the criteria of the condition defined using a *media query*.
>     * [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) — A conditional group rule that will apply its content if the browser meets the criteria of the given condition.
>     _ [@document](https://developer.mozilla.org/en-US/docs/Web/CSS/@document) — A conditional group rule that will apply its content if the document in which the style sheet is applied meets the criteria of the given condition. _(deferred to Level 4 of CSS Spec)\*
>     _ [@page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page) — Describes the aspect of layout changes that will be applied when printing the document.
>     _ [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) — Describes the aspect of an external font to be downloaded.
>     _ [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) — Describes the aspect of intermediate steps in a CSS animation sequence.
>     _ [@viewport](https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport) — Describes the aspects of the viewport for small screen devices. _(currently at the Working Draft stage)_
>     _ [@counter-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style) — Defines specific counter styles that are not part of the predefined set of styles. _(at the Candidate Recommendation stage, but only implemented in Gecko as of writing)\*
>     _ [@font-feature-values](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-feature-values) (plus @swash, @ornaments, @annotation, @stylistic, @styleset and @character-variant)
>     — Define common names in [font-variant-alternates](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates) for feature activated differently in OpenType. _(at the Candidate Recommendation stage, but only implemented in Gecko as of writing)\*

The second discovery is potentially more useful. It has to do with conditional at-rules (i.e. using logical operators).

Whereas it often makes sense to only apply CSS when a query is true, yesterday's example with Drop Caps provides a perfect example of when that isn't quite true.

Instead of "undoing" CSS in the future as Jason Pamental suggested in [his post](https://rwt.io/typography-tips/drop-caps-styling-initial-letter), which felt like a waste, I wondered if there wasn't a way to _only_ apply CSS in certain situations. <sup>[2](#fn2)</sup> It turns out that's exactly what the `@selector` is for!

Using `styled-components`, my final solution looked something like:

```javascript:title=drop-caps.js
import styled, { css } from 'styled-components'

const classicFirstLetterStyle = css`
    float: left;
    font-size: 3.5em;
    font-weight: bold;
    margin: 0 0.2em 0 0;
    line-height: 0.75;
`

const modernFirstLetterStyle = css`
    -webkit-initial-letter: 3 2;
    initial-letter: 3 2;
`

const Wrapper = styled.div`
    padding: 0 0.5em;

    & > p:first-of-type::first-letter {
        color: rgb(70, 70, 70);
        font-family: Georgia, serif;
        text-transform: lowercase;
        @supports not (initial-letter: 1 and -webkit-initial-letter: 1) {//highlight-line
            ${classicFirstLetterStyle}
        }

        @supports (initial-letter: 1) or (-webkit-initial-letter: 1) {//highlight-line
            ${modernFirstLetterStyle}
        }
    }
`
```

The highlighted lines are the interesting bit. The first is checking if both `initial-letter:1` and `-webkit-initial-letter:1` are not considered valid CSS by the browser. The latter is asking if _either_ is valid.

For more on the logical operators and how they work, see MDN on [using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).

## Footnotes

-   <sup>[1](#fn1)</sup> Wondering what the difference between Adaptive and Responsive web design is? This [CSS-Tricks article](https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/) does a pretty good job of detailing it!
-   <sup>[2](#fn2)</sup> I'd like to emphasize just how much I learned _from_ Jason. This particular decision was likely for the sake of simplicity, but it offered me an opportunity to learn something new so I took it!
