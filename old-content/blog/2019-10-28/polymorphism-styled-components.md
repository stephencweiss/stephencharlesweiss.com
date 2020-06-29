---
title: 'Polymorphic Presentations With Styled-Components '
date: '2019-10-28'
publish: '2019-10-28'
category: ['programming']
tags: ['polymorphism', 'styled-components', 'react']
---

Let’s say we’re building a simple web form with a twist: we want the submit to only appear if all of the fields are valid. In all other cases, we want a simple message to the user communicating that the form’s incomplete.

How would we do that? One of the simpler ways is to use [conditional rendering](../../2019-10-26/conditional-render-react-basic), but if we’re already using `styled-components`, we could use the `as` property to create a polymorphic component.<sup>[1](#footnotes)</sup><a id="fn1"></a>

## What Is Polymorphism?

So, what exactly _is_ polymorphism? Generally, it’s a biology term that means “there are two or more possibilities of a trait or gene.” There are lots of examples. From human hemoglobin and blood types to the way more awesome: jaguar coloring ([light](https://en.wikipedia.org/wiki/Polymorphism_%28biology%29#/media/File:Jaguar_head_shot.jpg) and [dark](https://en.wikipedia.org/wiki/Polymorphism_%28biology%29#/media/File:Black_jaguar.jpg) examples).<sup>[2](#footnotes)</sup><a id="fn2"></a>

It’s also a common term in coding texts and it’s another example of a term I’ve read dozens of times before it finally clicked.<sup>[3](#footnotes)</sup><a id="fn3"></a> The simplest definition I found for the programming variant is:

> Polymorphism is an object-oriented programming concept that refers to the ability of a variable, function or object to take on multiple forms. A language that features polymorphism allows developers to program in the general rather than program in the specific.<sup>[4](#footnotes)</sup><a id="fn4"></a>

That is: Polymorphism allows our target to take on different shapes depending on the presence of _something_. In our case, that _something_ is the value of `as`.

## Styled-Component’s As Attribute

Sometimes, the two states we’re toggling between are very similar and it’s just a styling change - a blue button vs a red one.

Other times, we want the entire element to change.

In both cases, the `as` prop can help.

Consider the following:

```javascript
// import styled from "styled-components";

const Component = styled.div`
  color: red;
`;

const StyledButton = styled.button`
  color: blue;
`;


Const MyComponent = () => {

return(
    <>
      <Component
        as={StyledButton}
        onClick={() => alert('It works!')}
      >
        Hello World!
      </Component>
      <Component
        as="button"
        onClick={() => alert('It works!')}
      >
        Hello World!
      </Component>
      <Component
        onClick={() => alert('It works!')}
      >
        Hello World!
      </Component>
    </>
  );
}
```

The first `<Component>` is a _blue_ `button`.
The second `<Component>` is a _red_ `button`.
The third `<Component>` is the default, a _red_ `div`.

And all three have an `onClick` event (for accessibility purposes, the `div` probably shouldn’t unless its role were set to `button`, but that’s for a different post).

## Conclusion

In most cases I’ve seen the `as` prop is not necessary, but simply _helpful_. It makes the code more readable by eliminating unnecessary lines and conditionals.

I consider the role of the `as` prop in `styled-components` as one which continues the trend of making it easy to conditionally update the presentation of your application. Just like styled-components provide access to props passed in to update styles, the as can be set to determine different styling paradigms. It’s a powerful tool to have in your arsenal. Use it wisely.

## Footnotes

-   <sup>[1](#fn1)</sup> [as - Polymorphic Prop | styled-components](https://www.styled-components.com/docs/api#as-polymorphic-prop)
-   <sup>[2](#fn2)</sup> [Polymorphism | Wikipedia](https://en.wikipedia.org/wiki/Polymorphism_%28biology%29)
-   <sup>[3](#fn3)</sup> Reminiscent of my experience with Type Guards which I wrote about in the context of [using React’s useReducer](../../2019-10-21/usereducer-typescript/).
-   <sup>[4](#fn4)</sup> [What is Polymorphism in Programming? - Definition from Techopedia](https://www.techopedia.com/definition/28106/polymorphism-general-programming)
