---
title: 'Styling Markdown Code Snippets With PrismJS'
date: '2019-12-24'
publish: '2020-01-15'
category: ['programming']
tags: ['prismjs','javascript','gatsby','styling','css']
---

There are a number of different syntax highlighters for Javascript, but the one I've been using lately is PrismJS (due in large part to its great Gatsby support).

I use PrismJS's highlighting primarily within the context of writing Markdown posts (like this one) on my Gatsby site.

Taking advantage of the different tools, however, requires adding additional detials to code that might otherwise not be there.

PrismJS has a ton of features, but understanding _how_ to use them was not immediately intuitive to me.

This post is mostly an exploration of working through the Gatsby PrismJS Plugin, its README, and documentation for PrismJS itself. It's meant as a guide for my future self (and anyone else who might use PrismJS with Gatsby)

Some of the features I've explored so far include:

1. Code Titles
2. Language Support
3. Line Highlighting
4. Line Numbering
5. Inline Code Styling

## Code Titles

````js:title="myFile.js"
```js:title="myFile.js"
// ... code goes here
````

Using with Gatsby: [Gatsby Remark Code Titles](https://github.com/DSchau/gatsby-remark-code-titles)

## Language

PrismJS will try to auto-detect which language is used. As the author, you can define the language by placing it in at the top of the code snippet.

For example:

````
```javascript
const meaningOfLife = 42;
```
````

Here, we're telling the code snippet to use javascript the language.

[Supported PrismJS languages](https://prismjs.com/#supported-languages)

## Line-Highlighting

Line highlighting allows specific lines to be highlighted in the code block.

There are several different options for this, but all of them require that additional CSS is added to your style sheet since the mechanism by which it works is to add a new class to the indicated lines. The [Gatsby docs have a nice example](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=gatsby-remark-#optional-add-line-highlighting-styles), particularly if your PrismJS theme is `solarized-light`

Also check out the [plugin README](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-prismjs#line-highlighting) for details on the different ways to highlight row(s) in code snippets. These include:

1. `highlight-line` to highlight the current line
2. `highlight-next-line` to highlight the enxt line
3. `highlight-start` and `highlight-end` to highlight a span of lines
4. `highlight-range{1, 4-6}` will highlight the _next_ line and 4th through 6th lines _relative_ to where the comment is included.

The code snippet below comes directly from the README referenced above. It demonstrates all of these in practice.

Of note, `highlight-next-line`, `highlight-start`, `highlight-end`, and `highlight-range{}` are treated as if the lines do not exist by the renderer.

So - whereas when writing the code snippet, there's a line between `super(props)` and `this.state = ...`, when rendered the latter immediately follows the former without a new line space.

```jsx{numberLines: true}
class FlavorForm extends React.Component {
  constructor(props) { //highlight-line
    super(props);
    //highlight-next-line
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // highlight-start
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  // highlight-end

  render() {
    return (
      { /* highlight-range{1,4-9,12} */ }
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

## Line Hiding

This is the exact same syntax as line highlighting, but with `hide-line` instead of `highlight-line`, etc.

See the [documentation for more info](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=gatsby-remark-#line-hiding).

This is often used in conjunction with embedding snippets.

## Line Numbering

To indicate that you want to use numberlines in a snippet you will need to:

1. Configure a global setting (in Gatsby, this would be adding `showNumberLines` to the resolver for the plugin in your `gatsby-config.js`
2. Indicate it for a specific snippet if you want something _other_ than what's set in the global config
3. Provide styling for the numbers

For more on adding line numbers, [see the Gatsby plugin docs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=gatsby-remark-#line-numbering)

Once all of this is setup, adding line numbers can be done by noting it at the top of the snippet with `{numberLines: true}`. For example:

````javascript{numberLines: true}
```javascript{numberLines: true}
const meaningOfLife = 42;
````

Alternatively, you can start at a specified line number (in this case, line 5):

````javascript{numberLines: 5}
```javascript{numberLines: 5}
const meaningOfLife = 42;
````

## Inline Code

Gatsby's PrismJS plugin also allows for styling of inline code blocks (single ticks) versus code fences (\`\`\`).

To do this, set an inlineCodeMarker in your `gatsby-config`:

```js
{
    resolve: `gatsby-remark-prismjs`,
    options: {
        inlineCodeMarker: '>',
    },
}
```

The recommendation is to use a non-ASCII character, such as the `>` recommended in the plugin (it's useful to use something that's not _too_ esoteric otherwise it will be difficult to actually use).

Once done, you can write an inline code like "css> .some-class { background-color: red }" (but wrapped in ticks) to get it styled as CSS, like so: `css> .some-class { background-color: red }`.

Alternatively, javascript can be done with "js> const variable = 42;", like so: `js> const variable = 42;`.

One thing I noticed while playing with the inline code styles is the styles will be applied similarly as to a fenced code block.

Specifically, I noticed this because of the `white-space` attribute in the `solarized-light` theme is `css> white-space: pre`. This was different behavior than my standard `html> <p>` tag. Refer to [MDN for more on the `white-space` attribute](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space).

## Resources

There's an example site for using snippets: https://using-remark.gatsbyjs.org/embed-snippets/
