---
title: 'Web Accessibility: Form Basics: Labels'
category: ['programming']
tags:
  [
    'web accessibility',
    'a11y',
    'web forms',
    'aria',
    'label',
    'aria-labelledby',
    'aria-describedby',
  ]
date: '2019-09-19'
---

For accessibility purposes all form inputs should be labelled. How do we apply a label though?

There are multiple ways to add a label, but the two basic approaches are:

1. Use a label to wrap the input
2. Tie the label to the input by associating the label's `for` (or `htmlFor` in React) attribute to the input’s `id`

In addition, we also have ARIA for more complicated situations where we need multiple relationships.

## Labels

```html
<label>First Name <input id="firstName" type="text"/></label>
```

```html
<label for="first-name">First Name</label> <input id="first-name" type="text" />
```

## Required Inputs

```html
<label>First Name <input id="first-name" type="text"/></label>
```

```html
<label for="first-name">First Name</label> <input id="first-name" type="text" />
```

## ARIA Labelled By and Described By

Unlike the label which finds the field it's a label for, the ARIA attributes seek out their labels and descriptions.

`<label for"id">` -> `<input>`
`<p id="label">` <- `<input aria-labelledby="label">`
`<p id="label">` <- `<input aria-describedby="description">`

### ARIA LabelledBy

You can also have multiple labels using ARIA.

```html
<p id="additional-label">An additional label</p>
<label for="first-name">First name</label>
<input
  id="first-name"
  name="first-name"
  aria-labelledby="first-name additional-label"
/>
```

### ARIA Described By

In addition to labels, ARIA offers a described by attribute. Like `aria-labelledby`, `aria-describedby` is tied to the `id` attribute.

For example

```html
<p id="additional-label">An additional label</p>
<label for="first-name">First name</label>
<input
  id="first-name"
  name="first-name"
  aria-labelledby="first-name additional-label"
  aria-describedby="first-name-note"
/>
<em id="first-name-note">A note about the first name</em>
```

One reason to use the `describedBy` attribute is to tie an error state with the field _in_ error. For example:

```html
<span id="phon" -error" class="error">Please enter a valid phone number.</span>
<input name="phone" type="tel" id="phone" aria-desicribedby="phone-error" />
```

### Notes On Using ARIA

I was taught to not use ARIA unless it’s necessary (as in the case of more complicated situations and UI). In those situations, ARIA can be powerful, but understanding the differences between `aria-labelledby` and `describedby` is crucial.

For that, I found this post by Aaron Gustafson informative. He describes the differences in the following way:<sup>1</sup>

> [`aria-labelledby` and `aria-describedby`] differ in when they are read. The `aria-labelledby` attribute replaces the associated `label` element (which is, of course, associated with the field via the label’s `for` attribute). The `aria-describedby` attribute, on the other hand, is read after the field type is stated.

## Conclusion

When it comes to labeling and describing form inputs we have multiple options.
We can use semantic HTML and use a label - either wrapping an input or tying it to the input through the `for` attribute.

Additionally, we have ARIA labelledby and describedby attributes for situations where there are multiple labels or if we need to augment a label with a description.

## Footnotes

- <sup>1</sup> [ARIA Quicktip: Labelledby vs. Describedby](https://codepen.io/aarongustafson/pen/dmuoe/)
- [Using the aria-labelledby attribute - Accessibility | MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute)
- [Using the aria-describedby attribute - Accessibility | MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute)
