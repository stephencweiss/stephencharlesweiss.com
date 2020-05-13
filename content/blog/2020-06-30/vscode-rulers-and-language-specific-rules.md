---
title: 'Vertical Rulers And Language Specific Settings In VS Code'
date: '2020-05-13'
publish: '2020-06-30'
category: ['programming']
tags:
    ['vs code', 'language specific', 'rules', 'settings.json', vertical ruler']
---

Today, I decided to look into how to set up a vertical ruler for my IDE, VS Code. As with most things VS Code - once you know how, it seems trivial, but until then, it can seem daunting.

For example - I didn’t actually know what the rule would be called, so it took some searching the web to find [Stack Overflow thread](https://stackoverflow.com/questions/29968499/vertical-rulers-in-visual-studio-code) that held the answer.
```json:title=/Library/Application\/Support/Code/User/settings.json
{
  "editor.rulers": 120,
  "[git-commit]": {
    "editor.rulers": [
      50, 72
    ]
  },
  "[python]": {
    "editor.rulers": [79]
  },
}
```

More than finding the `editor.rulers` however, the cool part was finally understanding what the `"[python]"` meant — it’s a _language specific_ rule. I’d used them before, but didn’t _quite_ understand the significance. Now I do!

To see the full list of languages supported, start typing `"[` and see the drop down provided by VS Code (note, that it appears to _not_ show you values you’ve already used):

![](https://res.cloudinary.com/scweiss1/image/upload/v1589398649/code-comments/vscode-language-specific-rules/Screen_Shot_2020-05-13_at_2.35.18_PM_t5fx0g.png)
