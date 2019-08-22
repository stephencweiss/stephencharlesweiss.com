---
title: 'Markdown Image Titles and Alt Text'
date: '2019-08-22'
category: ['programming']
tags: ['markdown', 'syntax', 'gatsby', 'remark']
---

I continue to be impressed by the simplicity and power of Markdown.

Today, while exploring the API for Gatsby’s Remark Images, I noticed the option: `showCaptions`. <sup>1</sup>

> Add a caption to each image with the contents of the title attribute, when this is not empty. If the title attribute is empty but the alt attribute is not, it will be used instead. Set this option to true to enable this behavior. You can also pass an array instead to specify which value should be used for the caption — for example, passing `[‘alt’, ‘title’]` would use the alt attribute first, and then the title. When this is set to `true` it is the same as passing `[‘title’, ‘alt’]`. If you just want to use the title (and omit captions for images that have alt attributes but no title), pass `[‘title’]`.

It was the inclusion of “Title” that caught me off guard. I’d never seen / used that before.

I’d always imported my images as: `![Alt](/path/to/img.jpg)`.

It turns out, however, that there’s a second argument that can be passed in _after_ the path: the title.<sup>2</sup>

`![Alt](/path/to/img.jpg “image title”)`.

## Example

I wanted to see what this would look like in a blog post - so, I tried adding the following image in a Gatsby blog: `![hello!](~./images/adam-solomon-hello.jpg~ "adam solomon's hello”)`.

As expected, we see the `alt` and `title` properties present on the `img` tag in the HTML:
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202019-08-19%20at%206.17.19%20AM.png)

```html
<img
  class="gatsby-resp-image-image"
  src="/static/0006f3a2fe907f8d0b63c65e51983802/a111b/adam-solomon-hello.jpg"
  alt="hello!"
  title="adam solomon's hello"
/>
```

Here’s the relevant `gatsby-config` — the images are a plugin as a part of the options for `gatsby-plugin-mdx` — which is what I’m using to compile the Markdown into HTML.

```javascript
module.exports = {
  plugins: [
    ‘gatsby-plugin-sharp’,
    ‘gatsby-transformer-sharp’,
    {
      resolve: ‘gatsby-plugin-mdx’,
      options: {
        extensions: [‘.mdx’, ‘.md’],
        defaultLayouts: {
          default: require.resolve(‘./src/components/layout.js’),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: ‘gatsby-remark-images’,
            options: {
              markdownCaptions: true,
              linkImagesToOriginal: false,
              showCaptions: [‘title’, ‘alt’],
              withWebp: true,
              tracedSVG: { color: ‘#F00’, turnPolicy: ‘TURNPOLICY_MAJORITY’ },
            },
          },
        ],
      },
    },
  ],
};
```

Note: The `showCaptions` option will only show either Title _or_ Alt in the body of the document. Not both. Though, both are present in the HTML for screen readers.

For additional styling, I also found this blog post by xaprb informative.<sup>3</sup>

# Resources

- <sup>1</sup> [Remark Images | Gatsby](https://www.gatsbyjs.org/packages/gatsby-remark-images/)
- <sup>2</sup> [Markdown Syntax Documentation | Daring Fireball](https://daringfireball.net/projects/markdown/syntax#img)
- <sup>3</sup> [How to Style Images With Markdown](https://www.xaprb.com/blog/how-to-style-images-with-markdown/)
