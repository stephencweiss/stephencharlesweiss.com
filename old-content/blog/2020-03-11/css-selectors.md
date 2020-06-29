---
title: 'CSS Selectors'
date: '2020-02-21'
publish: '2020-03-11'
category: ['programming']
tags: ['css', 'selectors', 'mdn']
---

Yesterday, I wrote about [what the comma means in CSS](../../2020-03-10/css-comma-group).

In doing so, I realized that it's not actually considered a CSS selector.

What the selectors _are_ is another thing I find myself constantly looking up.

I found MDN's [reference table of selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) a concise summary of the different selectors (copied below).

| Selector                    | Example             | Learn CSS tutorial                                                                                                                                                   |
| --------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type selector               | `h1 { }`            | [Type selectors](https://developer.mozilla.org/en-US/docs/user:chrisdavidmills/CSS_Learn/CSS_Selectors/Type_Class_and_ID_Selectors#Type_selectors)                   |
| Universal selector          | `* { }`             | [The universal selector](https://developer.mozilla.org/en-US/docs/user:chrisdavidmills/CSS_Learn/CSS_Selectors/Type_Class_and_ID_Selectors#The_universal_selector)   |
| Class selector              | `.box { }`          | [Class selectors](https://developer.mozilla.org/en-US/docs/user:chrisdavidmills/CSS_Learn/CSS_Selectors/Type_Class_and_ID_Selectors#Class_selectors)                 |
| id selector                 | `#unique { }`       | [ID selectors](https://developer.mozilla.org/en-US/docs/user:chrisdavidmills/CSS_Learn/CSS_Selectors/Type_Class_and_ID_Selectors#ID_Selectors)                       |
| Attribute selector          | `a[title] { }`      | [Attribute selectors](https://developer.mozilla.org/en-US/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Attribute_selectors)                                     |
| Pseudo-class selectors      | `p:first-child { }` | [Pseudo-classes](https://developer.mozilla.org/en-US/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Pseuso-classes_and_Pseudo-elements#What_is_a_pseudo-class)    |
| Pseudo-element selectors    | `p::first-line { }` | [Pseudo-elements](https://developer.mozilla.org/en-US/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Pseuso-classes_and_Pseudo-elements#What_is_a_pseudo-element) |
| Descendant combinator       | `article p`         | [Descendant combinator](https://developer.mozilla.org/en-US/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Combinators#Descendant_Selector)                       |
| Child combinator            | `article > p`       | [Child combinator](https://developer.mozilla.org/en-US/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Combinators#Child_combinator)                               |
| Adjacent sibling combinator | `h1 + p`            | [Adjacent sibling](https://developer.mozilla.org/en-US/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Combinators#Adjacent_sibling)                               |
| General sibling combinator  | `h1 ~ p`            | [General sibling](https://developer.mozilla.org/en-US/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Combinators#General_sibling)                                 |
