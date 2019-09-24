---
title: 'Reusing CSS With Styled Components'
date: '2019-09-25'
category: ['programming']
tags: ['css', 'styled-components']
---

Styled components are really nice in compartmentalizing styling and keeping it close to the components that use it.

I wasn't around for the “good old days” when we had a single master CSS file, but I can imagine how challenging it would be.

That's why I thought it was interesting when I came across an example where I wanted to share styling across different components in a sudo-object-oriented way.

In this example, I have two components. They're both inputs, but they're built off of different bases (we'll take this as granted for the sake of this example). The styling, however, is nearly identical with the second one building on the base of the first.

How could I re-use the styling with Styled-Components without duplicating code and potentially diverging in the future when I forget to update one?

What follows is a simple example demonstrating how I used css helper function within `styled-components` to effortlessly reuse my css _without_ duplicating code.<sup>1</sup>

My original styled input:

```javascript
import styled from ‘styled-components';

export const DefaultInput = styled.input`
  border: 1px solid ${({error})=>( error ? `red` : `grey` )};
  border-radius: 4px;
  outline: none;
  padding: 0.5em;
`;
```

Since my second component actually _isn't_ an `input`, I unfortunately can't just do:

```javascript
import styled from ‘styled-components';

export const SecondInput = styled(DefaultInput)`
  /* make changes as needed*/
`;
```

Enter the CSS helper function from styled components!

```javascript
import styled, { css } from ‘styled-components';

const baseInputStyles = css`
  border: 1px solid ${({error})=>( error ? `red` : `grey` )};
  border-radius: 4px;
  outline: none;
  padding: 0.5em;
`;

export const DefaultInput = styled.input`
  ${baseInputStyles}
`;

export const SecondInput = styled(DefaultInput)`
  ${baseInputStyles}
	/* make changes as needed*/
`;

```

## resources

- <sup>1</sup> [api: css | Styled Components](https://www.styled-components.com/docs/api#css)
