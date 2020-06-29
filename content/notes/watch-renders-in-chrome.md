---
title: 'Highlight Changes In Chrome'
publish: '2019-12-26'
date: '2019-12-07'
category: ['programming']
tags: ['chrome', 'dev tools', 'react dev tools', 'react']
---

When React Dev Tools v4 landed the feature to highlight updated components disappeared.

It's true that focusing only on re-renders can be inappropriate as [Dan Abramov explains on Reddit](https://www.reddit.com/r/reactjs/comments/cqx554/introducing_the_new_react_devtools/ex1r9nb/):

> [Highlight Updates] contributes to the wrong idea that re-renders by themselves are bad (they're not if they're cheap). So people spend time optimizing useless things and missing actual performance issues.

None the less - it can be useful to quickly check whether components are rendering as expected.

In looking for an alternative, I discovered that the Chrome dev tools actually have a very similar feature (albeit not React specific) as part of their [performance analyzing suite](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance).

Quick steps to use turn it on:

1. Open your dev tools (`⌥ Alt + ⌘ Cmd + I`)
2. Open the Command Palette (`⌘ Cmd + ⇧ Shift+P`) in the dev tools.

    ![Command Palette](https://res.cloudinary.com/scweiss1/image/upload/v1593203067/command-palette_kbu05w.png)

3. Turn on "Show Rendering"

    ![Rendering Options](https://res.cloudinary.com/scweiss1/image/upload/v1593203067/rendering-options_tpswgd.png)

4. Select the options you want

    ![Rendering In Action](https://res.cloudinary.com/scweiss1/image/upload/v1593203067/rendering-in-action_y6kzjb.png)

5. Update the page and watch it paint live.

(Update Highlights were brought back in [React Dev Tools v4.2](https://github.com/facebook/react/pull/16989). Woohoo!🎉)
