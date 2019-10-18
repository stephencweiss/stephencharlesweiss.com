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

Within the `package.json`, I tend to add the following scripts:

```JSON
"scripts": {
  "format": "prettier --write \"src/**/*.{js, jsx, css, json} \"",
  "format:check": "prettier --list:different \"src/**/*.{js, jsx, css, json} \""
},
```

The former can be used _if_ the editor is not configured to format on save. When run, Prettier will look at every file in the `src` directory and every one of the `src` directory's subdirectories. If the file has a `.js`, `.jsx`, `.css`, or `.json` file extension, it will run.

The `--write` makes sure that Prettier actually _modifies_ the files, instead of simply writing the formatted version to the shell.

The second script, `format:check` is something that can be used with a CI tool like Travis / CircleCI to throw an error if the code is _not_ formatted

## Preferred Setup In VSCode

In VSCode open up `settings.json` - the JSON file that stores all of your custom settings for VSCode

Make sure the following two lines are present:

```
"prettier.requireConfig": true,
"editor.formatOnSave": true,
```

The former simply requires that there is a `.prettierrc` file in the application’s root directory. This is particularly useful in making sure that you don't accidentally modify a project that doesn't have a Prettier configuration set up and change every line in every file.

The latter is a preference of mine to apply prettier on save - rather than waiting for a git commit or to run the `format` script.

## Alternative Formats

While I prefer to use just a `.prettierrc` file which can be written in YAML or JSON, it's also possible to use `.toml` or `.js`.

The Prettier site has a helpful page for how to set these other formats up.<sup>1</sup>

## Footnotes

- <sup>1</sup> [Prettier](https://prettier.io/docs/en/configuration.html)
