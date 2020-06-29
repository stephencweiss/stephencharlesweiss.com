---
title: 'VSCode - Reenable Settings When "Exclude Settings And Ignore Files Are Disabled"'
date: '2019-08-06'
category: ['programming']
tags: ['vscode', 'tools', 'settings', 'bugs', 'error handling']
---

Filing this one under annoying bugs that shouldn’t be an issue but end up taking up way more of your time than you’d like.

VSCode offers the ability to filter out certain directories from being searched - which I find very handy. Unfortunately, recently, I started getting an alert that my setting had been disabled.

![](./search-with-settings-disabled.png)
Just underneath the "files to exclude" input is a results message indicating that my results included files I’ve set to ignore because I disabled the setting.

The problem was that I had no idea _how_ I did that.

It turns out, I’d accidentally (de)selected the cog with the small minus sign and that’s what did it.

![](./search-with-settings-enabled.png)
Turning it back on (notice the blue outline around the cog) and my results are much closer to what I’d expect!

This is a known issue for the VSCode team and I was happy to find that I wasn’t alone in struggling to figure out the cause… <sup>1</sup> though where others spent 10 minutes, I suffered through it for days. <sup>2</sup>

Ah well, now I know.

## Footnotes

-   <sup>1</sup> [Make it more obvious when "Use Exclude Settings and Ignore Files" is not applied · Issue #46353 · microsoft/vscode · GitHub](https://github.com/microsoft/vscode/issues/46353)
-   <sup>2</sup> [Search shows excluded files · Issue #46269 · microsoft/vscode · GitHub](https://github.com/microsoft/vscode/issues/46269#issuecomment-375200113)
