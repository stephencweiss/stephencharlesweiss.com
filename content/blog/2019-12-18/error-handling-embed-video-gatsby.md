---
title: 'Trouble Shooting Embedding Video In A Gatsby Site'
date: '2019-12-03'
publish: '2019-12-18'
updated: ['2020-03-03']
category: ['gatsby']
tags: ['error handling','video','embed','plugin']
---

> Update: I found a more general embedder in the Plugin library: [gatsby-remark-embedder](https://www.gatsbyjs.org/packages/gatsby-remark-embedder/?=spotify)
> Replacing `gatsby-remark-embed-video` with it worked like a charm - and, at least so far, haven't had any issues with ordering.
> Here's the PR in which I replaced it.

One of the great parts about Gatsby is its plugin ecosystem. As of this writing, there are ~1500 different plugins offering easy integrations with dozens of services and tools to build a website.

I noticed recently that one of mine, the `gatsby-remark-embed-video` plugin had stopped working -- or maybe it never worked. Either way, I wanted to get it working, so I started with the [documentation on Github](https://github.com/borgfriend/gatsby-remark-embed-video).

At the time, my `gatsyb-config` configured `gatsby-transformer-remark` like so:
```javascript
module.exports = {
    plugins: [
    //...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: { bash: 'zsh' },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-plugin-facebook-pixel`,
            options: {
              pixelId: 'pixel id here',
            },
          },
          {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              //trackingId: `ADD YOUR TRACKING ID HERE`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframeBorder: true,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
  ],
}
```

Immediately, the first issue becomes apparent.

In the docs for `gatsby-remark-embed-video` it says:
> Note: if you also rely on gatsby-remark-responsive-iframe, you have to define the embed-youtube plugin first:
>
> ```
> plugins: [
>   "gatsby-remark-embed-video",
>   "gatsby-remark-responsive-iframe"
> ]
> ```

My first attempt to fix was to swap `gatsby-remark-embed-video` and `gatsby-remark-responsive-iframe`:
```javascript
module.exports = {
    plugins: [
    //...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: { bash: 'zsh' },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-plugin-facebook-pixel`,
            options: {
              pixelId: 'pixel id here',
            },
          },
          {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              //trackingId: `ADD YOUR TRACKING ID HERE`,
            },
          },
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
  ],
}
```

Sadly, this did not work. The reason was `gatsby-remark-images`, which was pointed out by the [Scotch.io tutorial on embedding videos in Gatsby](https://scotch.io/tutorials/embedding-videos-in-your-gatsbyjs-sites):

> See how I have used `gatsby-remark-embed-video` plugin before `gatsby-remark-images` & `gatsby-remark-responsive-iframe` plugins since it is the requirement.

I tried bringing the `embed-video` higher up the chain (and rearrange the plugins that do _not_ have options to the top):

```javascript
module.exports = {
    plugins: [
    //...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            // Using gatsby-remark-embed-video before gatsby-remark-images & gatsby-remark-responsive-iframe plugins.
            resolve: `gatsby-remark-embed-video`,
            options: {
              maxWidth: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframerder: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: { bash: 'zsh' },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-plugin-facebook-pixel`,
            options: {
              pixelId: 'pixel id here',
            },
          },
          {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              //trackingId: `ADD YOUR TRACKING ID HERE`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
  ],
}
```

This _did_ work. And now, I can embed Youtube (or other) videos easily into my website.

https://www.youtube.com/watch?v=3GwjfUFyY6M&feature=youtu.be