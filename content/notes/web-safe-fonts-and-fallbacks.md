---
title: 'Web-Safe Fonts and Font Fallbacks'
date: '2019-09-28'
publish: '2019-09-28'
category: ['programming']
tags: ['fonts', 'web-safe', 'styled-components']
---

Today, I had a colleague mention that the font we are using is “web-safe” in response to why it was so weird that it wasn’t showing up correctly on my screen.

I didn’t actually know what “web-safe” meant, so I looked it up. Turns out it’s shorthand and simply refers to the group of fonts that are _likely_ to be installed on the client machine and so will be rendered appropriately.

CoffeCup Software has a nice graphic in their article explaining what web-fonts are:<sup>1</sup>
![Web safe font venn-diagram](https://res.cloudinary.com/scweiss1/image/upload/v1593206631/web-safe-font-venn_diagram_ih9jda.png)

So, how does this relate to fallbacks? Because _if_ a font isn’t available (imagine we like the serf Didot on our site, and our user is on a Windows machine), then we want to control what they see.

In our `index.css` file we have some basic styling set up, including fallbacks for fonts:

```css
body {
    margin: 0;
    font-family: Tahoma, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

Notice, however, that all of those are san serif fonts and we want this component to _have_ serifs!

Easy enough, we can use a `styled-component`:

```javascript
import styled from ‘styled-components’;

export const StyledDiv = styled.div`
    font-family: Didot;
`
```

What’s the problem with the above code? If the client _doesn’t_ have `Didot` then there’s no telling which font will be used.

You might think (as I did) that it would fall back to the `font-family` setting we applied in the `index.css` but the styled component is actually _overwriting_ that attribute in this case, so falling-back isn’t possible — there’s simply nothing to fall back to.

Okay, what about `inherit`? Inherit is one of my favorite attributes because it allows you to say that you’d like to inherit the initial value.<sup>2</sup> We can’t _just_ use inherit, however, since we want it to start as `Didot`.

You may be tempted to do the following (as I was):

```javascript
import styled from ‘styled-components’;

export const StyledDiv = styled.div`
    font-family: Didot, inherit;
`
```

Unfortunately, that’s not valid CSS, and so, while you’ll end up getting the inherited values, it’s because we never even _try_ to apply `Didot` .

So what’s the solution? Create your own fallback thread and focus on web-safe fonts as the base. Here’s what I came up with:

```javascript
import styled from ‘styled-components’;

export const StyledDial = styled.div`
    font-family: Didot, Georgia, serif;
`
```

## Footnotes

-   <sup>1</sup> [What is a Web-Safe Font? | CoffeeCup Software](https://www.coffeecup.com/help/articles/what-is-a-web-safe-font/)
-   <sup>2</sup> [inherit - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/inherit)
