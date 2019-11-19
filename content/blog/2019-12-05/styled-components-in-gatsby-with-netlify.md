# Styled-Components, Gatsby, Plugins, And Deploying Via Netlify

Recently, I decided to remove most of the inline styling I have on my website and use `styled-components` - a library I’ve grown very fond of.

The migration went smoothly and I found a number of opportunities to reuse components.

Unfortunately, when I went to deploy, I started noticing some discrepancies between what I was seeing locally and what was shipping.

Specifically - while classes were being applied, if the module was imported, the styles sometimes would be missing.

To try to narrow down the problem, I ran a few experiments:

1. [Three different styling paradigms](https://github.com/stephencweiss/personal-blog/pull/229/commits/750a8b918f97f8c730b43e6612bf537ae539b1ac) - inline, styled components defined in the same file, and imported styled components.
2. Deploying to [Netlify](https://5dd07e816260e80008cb4c9d--sad-darwin-8bd7fc.netlify.com/) vs Gatsby Cloud.

|                                           ![A side-by-side view of styled components](./styled-components-side-by-side.png 'A side-by-side view of styled components')                                           |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| _A side by side comparison mid-trouble shooting. On the left, the styles were not applied when the components were imported. On the right, behaving as expected, even **without** the Gatsby plugin configured._ |

That helped me narrow the problem down. There was something about the build process _in_ Netlify that wasn’t working.

From there, I started looking through the Netlify forums and found a thread that had the right tags: `deployment` and `gatsby`. It turns out there was already a [thread on the topic](https://community.netlify.com/t/home-page-displays-different-css/4071/13).

The part I was missing is that because I’m using Gatsby, I needed to add a plugin!

This is a standard part of the Gatsby flow - but it’s not something I think about regularly. After all, when you’re building a basic React app, all you need to do is ensure the package is installed in your package. There’s no extra `config` document that needs to be managed.

Fortunately, [Gatsby’s documentation on using `styled-components` is great](https://www.gatsbyjs.org/docs/styled-components/). The only point that seems to have been glossed over was how to use the `babel-plugin-styled-components`. Since Gatsby ships with a babel, in order to [customize the babel config](https://www.gatsbyjs.org/docs/babel/#how-to-use-a-custom-babelrc-file), I needed to install `babel-preset-gatsby`:

```shell
npm install —save-dev babel-preset-gatsby
```

Then create a new `.babelrc` in our root directory:

```shell
{
  "presets": [
    [
      "babel-preset-gatsby",
      {
        "targets": {
          "browsers": [">0.25%", "not dead"]
        }
      }
    ]
  ]
}
```

Now that I have the basics of a `.babelrc`, I am able to add the plugin for `styled-components`:

```shell
{
  "plugins": ["babel-plugin-styled-components"]
}
```

Here’s [the commit](https://github.com/stephencweiss/personal-blog/pull/229/commits/dd12af11f89feb22e3ed9c24f69a9d32db69f5a3) that put the final touches on everything.

With that in place, everything’s rendering as expected!
