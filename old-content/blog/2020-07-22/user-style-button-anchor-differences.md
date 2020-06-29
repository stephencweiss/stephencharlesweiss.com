---
title: 'A Difference In (Default) Style: Buttons Vs Links'
date: '2020-06-15'
publish: '2020-07-22'
category: ['programming']
tags:
    [
        'css',
        'user agent style sheet',
        'default style',
        'button style',
        'anchor style',
        'specificity',
    ]
---

I was working on a project the other day when I noticed something curious. My nav bar looked great until I added a new button.

![nav bar with mismatched styles](https://res.cloudinary.com/scweiss1/image/upload/v1592224380/code-comments/user-style-button-anchor-difference/nav-bar.png)

Inspecting all of the elements, everything was an anchor tag, _except_ Sign Out, which was a button. Looking at the styles, I didn't see any difference - which makes sense because both were wrapped in an unordered list component, `NavStyles`, which addressed child anchor and button tags the same way:

```javascript:title=NavStylesAbridged.js
import styled from 'styled-components'

const NavStyles = styled.ul`
    a,
    button {
        /*...*/
        &:hover,
        &:focus {
            /*...*/
        }
    }
    /*...*/
`
```

Still something was clearly wrong. It turned out that the issue lay elsewhere - in my global styles. At first this didn't make sense to me, nothing looks amiss:

```javascript:title=GlobalTheme.js
import { injectGlobal } from 'styled-components'

export const theme = {
    /*...*/
}

export default injectGlobal`
@font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2');
  format('woff2');
  font-weight: normal;
  font-style: normal;
}
/*...*/
body {
  font-family: 'radnika_next';
	/*...*/
}
a {
  text-decoration: none;
  color: ${theme.black};
}
button {
  color: ${theme.black};
}
`
```

The anchor and button tags were receiving effectively the same styling (ignoring the `text-decoration` which was intentional.

The problem had to do with specificity. Whereas the anchor tag _inherited_ the `font-family` from the `body` tag, the `button` did not thanks to the button's default styling (i.e. in the "[user agent stylesheet](https://www.w3.org/TR/UAAG20/#def-user-stylesheet)").

![button default styles](https://res.cloudinary.com/scweiss1/image/upload/v1592224386/code-comments/user-style-button-anchor-difference/button-defaults.png)

The anchor tag _does_ have its own default styles, they just don't happen to include a default font - which is why this bug was able to occur.

![anchor default styles](https://res.cloudinary.com/scweiss1/image/upload/v1592224389/code-comments/user-style-button-anchor-difference/anchor-defaults.png)

Once I figured this out, the fix was straight forward: declare a font-family for the `button`. This could be done in the global styles if I wanted all buttons to match the font of the rest of the site (which would make sense), or be very specific to the `NavStyles` and declare it there.

I opted to update the global style, which can be seen here:
![new button defaults](https://res.cloudinary.com/scweiss1/image/upload/v1592224542/code-comments/user-style-button-anchor-difference/button-with-new-defaults.png)

In the end, while buttons and links are similar, understanding where the differences lay can help to avoid bugs like this one!
