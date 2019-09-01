---
title: 'Adding Prettier To A Project'
date: '2019-09-07'
category: ['programming']
tags: ['prettier', 'vscode', 'config']
---

The steps to adding Prettier to a project are very simple:
1. Install Prettier (`npm i --save-dev prettier`)
2. Create a `.prettierrc` file in the root directory
3. Add an empty object `{}` to the `.prettierrc` file -> this imports the default `prettier` configurations

## Helpful scripts
``` javascript
"scripts": {
  "format": "prettier --write \"src/**/*.{js, jsx, css,json} \"",
  "format:check": "prettier --list:different \"src/**/*.{js, jsx, css,json} \""
},
```

The former can be used *if* the editor is not configured to format on save.
The latter is something that can be used with a CI tool like Travis / CircleCI to throw an error if the code is *not* formatted

## Preferred Setup In VSCode
In VSCode open up `settings.json` - the JSON file that stores all of your custom settings for VSCode

Make sure the following two lines are present:
```
"prettier.requireConfig": true,
"editor.formatOnSave": true,
```

The former simply requires that there is a `.prettierrc` file in the application’s root directory.
The latter is a preference of mine to apply prettier on save - rather than waiting for a git commit or to run the `format` script.

## Alterntative Formats

While I prefer to use just a `.prettierrc` file which can be written in YAML or JSON, it's also possible to use `.toml` or `.js`.

The Prettier site has a helpful page for how to set these other formats up.<sup>1</sup>

## Footnotes
* <sup>1</sup> [Prettier](https://prettier.io/docs/en/configuration.html)