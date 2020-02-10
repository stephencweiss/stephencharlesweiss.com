---
title: 'Global Themes, Variants, And Modes With Styled-Components'
date: '2020-02-10'
publish: '2020-03-01'
category: ['programming']
tags: ['styled-components','javascript','css','light mode','dark mode','variants','css-in-js']
---

If I were to list my strengths, web design wouldn't top the list. None the less, I like learning about it and know that I'll continue to improve over time by chipping away.

One thing I've been struggling with since adding a dark mode to my site (I look forward to making this a much more _pleasant_ experience soon), was how the mode was intended to interact with the global theme. And then what happens if you want variants for components?

I put together a [CodeSandBox](https://codesandbox.io/s/adoring-shannon-0yt60?fontsize=14&hidenavigation=1&theme=dark) to play around with the concepts.

Because it's such a simple single page, I can see how all of the pieces come together and interact. It's also made clear why my coworker, Justin Connor, put together a library called `styled-variants`! 

Dealing with variants can _quickly_ become a hassle - particularly if you're duplicating the logic between modes.

The full code is below.

```javascript
import React from "react";
import "./styles.css";
import styled, { ThemeProvider } from "styled-components";

const theme = {
  light: {
    bg: "powderblue",
    fs: "72px",
    maxWidth: 1000
  },
  dark: {
    bg: "red",
    color: "white",
    fs: "72px",
    maxWidth: 1000
  }
};

const buttonVariant = {
  light: {
    primary: {
      boxShadowColor: "teal"
    },
    secondary: {
      boxShadowColor: "grey"
    }
  },
  dark: {
    primary: {
      boxShadowColor: "orange"
    },
    secondary: {
      boxShadowColor: "orange"
    }
  }
};

const Title = styled.h1`
  background-color: ${({ theme, mode }) => theme[mode].bg};
  font-size: ${props => props.theme[props.mode].fs};
  color: ${({ theme, mode }) => (mode === "dark" ? theme[mode].color : "")};
`;

const Button = styled.button`
  box-shadow: 0.25rem 0.25rem
    ${({ theme, mode, variant }) => theme[mode][variant].boxShadowColor};
`;

const Wrapper = styled.div`
  background-color: ${({ theme, mode }) => theme[mode].bg};
  padding: 1rem;
`;

function App() {
  const [mode, setMode] = React.useState("light");
  function handleClick() {
    const nextMode = mode === "light" ? "dark" : "light";
    return setMode(nextMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper className="App" mode={mode}>
        <Title mode={mode}>Hello CodeSandbox</Title>
        <h2>The current mode is: {mode}</h2>
        <Button
          mode={mode}
          variant={"primary"}
          theme={buttonVariant}
          onClick={handleClick}
        >
          Toggle Mode
        </Button>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

```
