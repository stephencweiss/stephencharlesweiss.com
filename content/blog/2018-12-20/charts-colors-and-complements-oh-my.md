---
title: 'Charts, Colors, and Complements: Oh my!'
date: '2018-12-20'
category: ['programming']
tags: ['chart.js','color conversion','color theory']
---

> Charts are the black hole of programming. 

I was warned, but I wanted to tackle charts anyway. That was my first mistake. Humans tend to understand graphical information better than text on average. But presenting information visually in a *compelling* way is not only *not* easy. It’s **hard**. If I wasn't convinced, my recent experience left me with little doubt. The process of adding simple charts took me down a number of rabbit holes to explore… and get lost in. 

![](./alice.webp)

This post is intended to document three major takeaways from the process: 

  1. Charts are hard; budget your time accordingly
  2. Purely random colors can be jarring; complementary colors can be derived using the Golden Ratio
  3. The math behind converting colors to / from RGB, HSV, HSL, and Hexidecimal representations is both fascinating, and something that should not need to be redefined every time.

# Drawing Charts

To draw my charts in my app, I used [chart.js](https://www.chartjs.org/). I’m building a React app, and there *is* [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2), a `chart.js` package for React. However, I ran into some strange errors trying to incorporate it into the project, so I went with the MVP approach and used the basic package. I plan to refactor in the future to use the React version as it seems to have better support for components, but in the mean time, I got it working. 

| ![](./doughnut-chart.png) |
|:---:|
| *One of the charts I eventually was able to render.* |

I used the [patternomaly](https://github.com/ashiguruma/patternomaly) package which helps to address accessibility concerns by including patterns on charts. 

# Randomizing Colors

At this point, I don’t have a designer helping me with the app. Nor do I have a style guide that can support dozens of colors. With that being the case, I should have just done the easiest thing possible to randomize colors for my chart. That would have looked something like: 

```javascript
const red = Math.rand() * 255
const green = Math.rand() * 255
const blue = Math.rand() * 255
return [red, green, blue]
```

This would have *totally* worked. The problem was that I wanted something slightly more … elegant. Thus, began my descent into rabbit hole number one: color theory. I read close a dozen articles about color theory before finding Martin Ankerl's post [How to Create Random Colors Programmatically](https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/). In it, Martin outlines *why* purely random colors aren't ideal and how to achieve complements with the Golden Ratio. Here's one of his snippets:

```javascript
# Credit: Martin Ankerl: How to Generate Random Colors Programmatically
# Source: https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/

# use golden ratio
golden_ratio_conjugate = 0.618033988749895
h = rand # use random start value
gen_html {
  h += golden_ratio_conjugate
  h %= 1
  hsv_to_rgb(h, 0.5, 0.95)
}
```

Okay, now we’re getting places! The problem was that function `hsv_to_rgb()`. How did it work? Queue rabbit hole number two. 

## HSV, HSL, and RGB

When it comes to computers, colors are just numbers. But which numbers we use and how they relate was a source of hours of learning this week. Starting with the the wikipedia page on [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) and branching out from there. Now that I had a bit of background on how the different color systems related, I needed to be able to go from one to the next. Two resources were intensely valuable on this front: 

  1. The [Converting To RGB](https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB) section on the Wikipedia page
  2. [RapidTables](https://www.rapidtables.com/) is a site that will convert these numbers for you one at a time. They also include the derivations on their page for the interested parties (like me!).
With those references, I was able to write my own `hsv_to_rgb` (as well as several others - see my full list at the end of the post) — and understand _why_ it worked the way it did. At least for the most part! 

## Putting Complements Into practice

Now that I had a my own color conversion functions, I could write a function that took an input of the number of color/pattern combinations I needed returned and would generate complements.
```javascript
function generateComplementaryColors ( numberToGenerate ) {
  /**
   * I: Three arguments are the number of complementary colors to generate (integer > 0), 
   * O: A set of color and pattern
   * Credit for the inspiration to use the golden ratio goes to Martin Ankerl who wrote:
   *  https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
   * NB: Definitions of helperfunctions `rgbFromHSL` and `hexFromRGB` can be found here:
   *  https://gist.github.com/stephencweiss/eab510dabb2ba50652434372e46b5980
   */

  const goldenRatio = 1.61803398749895;
  const colors = []
  const patterns = ['plus', 'cross', 'dash', 'cross-dash', 'dot', 'dot-dash', 'disc', 'ring', 'line', 'line-vertical', 'weave' , 'zigzag', 'zigzag-vertical', 'diagonal', 'diagonal-right-left','square', 'box', 'triangle', 'triangle-inverted', 'diamond', 'diamond-box']
  const saturation = 0.8;
  const lightness = 0.5;

  let hue = Math.random();
  for (let i = 0; i < numberToGenerate; i += 1) {
    hue = goldenRatio * hue;
    hue %= 1;
    const huePrime = Math.round(hue * 360)
    const [red, green, blue] = rgbFromHSL(huePrime, saturation, lightness)
    const color = hexFromRGB(red, green, blue);
    const pattern = patterns[Math.floor(patterns.length * Math.random())]
    colors.push({ color, pattern })
  }
  return colors;
}
```

# Color Conversions

Going back and forth between different color types is something that comes up with some regularity. While there are libraries out there that will handle these calculations for you, I wanted to understand how they worked. So, I wrote out functions for several common conversions. Here's a gist with some of the common conversions I found particularly useful.

```javascript
/**
  * This gist covers the conversion of color values.
  * It includes:
  *   1) hsvFromRGB
  *   2) rgbFromHSV
  *   3) hslFromRGB
  *   4) rgbFromHSL
  *   5) hexFromRGB
  *   6) rgbFromHex
  * 
  * The primary inspiration for this was the work done by https://gist.github.com/mjackson/5311256
  * Source I found helpful for understanding the details and deriving the values include:
  * [Wikipedia: HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
  * [CS StackExchange: Convert HSV to RGB Colors](https://cs.stackexchange.com/questions/64549/convert-hsv-to-rgb-colors)
  * [Rapid Tables](https://www.rapidtables.com/)
  * [MDN: parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
  * [MDN: toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
  */

function hsvFromRGB(r, g, b) {
  /**
   * I: Three arguments, red (r), green (g), blue (b), all ∈ [0, 255]
   * O: An array of three elements hue (h) ∈ [0, 360], and saturation (s) and value (v) which are both ∈ [0, 1]
   */
  r /= 255, g /= 255, b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  let h, s;
  
  // Value
  const v = max;

  // Saturation
  s = (max === 0) ? 0 : (diff / max);

  // Hue
  if (diff === 0) {
    h = 0;
  } else {
    // 1/6 is equivalent to 60 degrees
    if (max === r) { h = 1/6 * (0 + ((g - b) / diff)) }; 
    if (max === g) { h = 1/6 * (2 + ((b - r) / diff)) };
    if (max === b) { h = 1/6 * (4 + ((r - g) / diff)) };
  }
  h = Math.round(h * 360)

  return [h, s, v];
}

function rgbFromHSV(h, s, v) {
  /**
   * I: Three elements hue (h) ∈ [0, 360], and saturation (s) and value (v) which are both ∈ [0, 1]
   * O: An array of red (r), green (g), blue (b), all ∈ [0, 255]
   */

  hprime = h / 60;
  const c = v * s;
  const x = c * (1 - Math.abs(hprime % 2 - 1)); 
  const m = v - c;
  let rPrime, gPrime, bPrime;
  if (!hprime) {rPrime = 0; gPrime = 0; bPrime = 0; }
  if (hprime >= 0 && hprime < 1) { rPrime = c; gPrime = x; bPrime = 0}
  if (hprime >= 1 && hprime < 2) { rPrime = x; gPrime = c; bPrime = 0}
  if (hprime >= 2 && hprime < 3) { rPrime = 0; gPrime = c; bPrime = x}
  if (hprime >= 3 && hprime < 4) { rPrime = 0; gPrime = x; bPrime = c}
  if (hprime >= 4 && hprime < 5) { rPrime = x; gPrime = 0; bPrime = c}
  if (hprime >= 5 && hprime < 6) { rPrime = c; gPrime = 0; bPrime = x}
  
  const r = Math.round( (rPrime + m)* 255);
  const g = Math.round( (gPrime + m)* 255);
  const b = Math.round( (bPrime + m)* 255);

  return [r, g, b]
}

function rgbFromHSL(h, s, l) {
  /**
   * I: Three elements hue (h) ∈ [0, 360], and saturation (s) and lightness (l) which are both ∈ [0, 1]
   * O: An array of red (r), green (g), blue (b), all ∈ [0, 255]
   */
  const hprime = h / 60;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((hprime % 2) - 1)); 
  const m = l - (c / 2);
  let rPrime, gPrime, bPrime;
  if (h >= 0 && h < 60) { rPrime = c; gPrime = x; bPrime = 0}
  if (h >= 60 && h < 120) { rPrime = x; gPrime = c; bPrime = 0}
  if (h >= 120 && h < 180) { rPrime = 0; gPrime = c; bPrime = x}
  if (h >= 180 && h < 240) { rPrime = 0; gPrime = x; bPrime = c}
  if (h >= 240 && h < 300) { rPrime = x; gPrime = 0; bPrime = c}
  if (h >= 300 && h < 360) { rPrime = c; gPrime = 0; bPrime = x}
  
  const r = Math.round( (rPrime + m)* 255);
  const g = Math.round( (gPrime + m)* 255);
  const b = Math.round( (bPrime + m)* 255);

  return [r, g, b]
}

function hslFromRGB(r, g, b) {
  /**
   * I: Three arguments, red (r), green (g), blue (b), all ∈ [0, 255]
   * O: An array of three elements hue (h) ∈ [0, 360], and saturation (s) and lightness (l) which are both ∈ [0, 1]
   */
  
  r /= 255, g /= 255, b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  let h, s;
  
  //Lightness
  const l = (max + min) / 2;

  //Saturation
  s = (diff === 0) ? 0 : diff / (1 - Math.abs((2 * l) - 1));;

  //Hue
  if (diff === 0) {
    h = 0;
  } else {
    // 1/6 is equivalent to 60 degrees
    if (max === r) { h = 1/6 * (0 + ((g - b) / diff)) }; 
    if (max === g) { h = 1/6 * (2 + ((b - r) / diff)) };
    if (max === b) { h = 1/6 * (4 + ((r - g) / diff)) };
  }
  h = Math.round(h * 360)

  return [h, s, l];
}

function baseTenToHex(c) {
  /**
   * I: A number
   * O: A string representation of the number in base 16
   */
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function hexFromRGB(r, g, b) {
  /**
   * I: Three arguments, red (r), green (g), blue (b), all ∈ [0, 255]
   * O: A hexidecimal representation of the three numbers, concatenated as one string. 
   */
  return "#" + baseTenToHex(r) + baseTenToHex(g) + baseTenToHex(b);
}

function baseHexToTen(c) {
  /**
   * I: A string of a number in base 16
   * O: A number representation of the string in base 10
   */
  return parseInt(c, 16) 
}

function rgbFromHex(hexValue) {
  /**
   * I: A single hexidecimal value (without a leading `#`);
   * O: An array of red (r), green (g), blue (b), all ∈ [0, 255]
   */
  debugger;
  const r = baseHexToTen(hexValue.slice(0, 2))
  const g = baseHexToTen(hexValue.slice(2, 4))
  const b = baseHexToTen(hexValue.slice(4, 6))

  return [r, g, b]
}
```