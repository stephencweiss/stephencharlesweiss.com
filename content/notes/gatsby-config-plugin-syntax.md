---
title: 'Gatsby Config Plugin Syntax'
date: '2019-07-14'
publish: '2019-07-14'
category: ['programming']
tags: ['gatsby', 'configuration', 'jason lengstorf']
---

I often struggle with the syntax of config files. What are resolvers? How do options work? etc.

As a result, while making my way through Jason Lengstorf’s Introduction to Gatsby on Frontend Masters, I found the following interesting<sup>1</sup>:

Within my `gatsby-config.js` file in the root of a Gatsby project, I have two plugins:

```javascript
module.exports = {
	...
  plugins: ['gatsby-plugin-emotion', 'gatsby-plugin-react-helmet']
  ...
}
```

That, however, is functionally equivalent to:

```javascript
module.exports = {
	...
  plugins: [ {resolve: 'gatsby-plugin-emotion' }, {resolve: 'gatsby-plugin-react-helmet'}]
  ...
}
```

The former is just shorthand because for those, I didn’t need to add any configuration. What happens if I install a plugin that _does_ require more detail about how it will be used? That’s where the fact that writing just `gatsby-plugin-emotion` is shorthand for an object starts to matter.

Using the `gatsby-mdx` as an example, we can see this in practice:

```javascript
module.exports = {
  ...
  plugins: [
    {
      resolve: 'gatsby-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js'),
        },
      },
    },
  ],
  ...
};

```

What this is saying is that for any `mdx` files that I load, the files will be loaded into the layout template I defined in our `src/components/layout.js`.

There’s still the question of what options the `gatsby-mdx` will accept. For that, the docs are quite helpful in specifying the configuration options.<sup>2</sup>

Resources:

-   <sup>1</sup> [Learn Gatsby with Jason Lengstorf | Frontend Masters](https://frontendmasters.com/courses/gatsby/)
-   <sup>2</sup> [gatsby-plugin-mdx#configuration | Github](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx#configuration)
