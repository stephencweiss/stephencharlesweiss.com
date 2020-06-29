---
title: 'Adding Prettier To A Project'
date: '2019-09-07'
updated: ['2020-04-01']
category: ['programming']
tags: ['prettier', 'vscode', 'config']
---

The steps to adding Prettier to a project are very simple:

1. Install Prettier (`npm i --save-dev prettier`)
2. Create a `.prettierrc` file in the root directory
3. Add an empty object `{}` to the `.prettierrc` file -> this imports the default `prettier` configurations

## Helpful scripts

Within the `package.json`, I tend to add the following scripts:

```JSON:title=package.json
{
    "scripts": {
        "lint": "prettier --check src/**/*",
        "lint:fix": "yarn lint --write"
    },
}
```

The latter can be used _if_ the editor is not configured to format on save. When run, Prettier will look at every file in the `src` directory and every one of the `src` directory's subdirectories and run prettier on _all_ files. This can be made more precise with a more nuanced pattern match.

The `--write` makes sure that Prettier actually _modifies_ the files, instead of simply writing the formatted version to the shell.

Integrating the `lint` script with a CI tool like Travis / CircleCI can be useful to alert if code is trying to be committed that doesn't match the formatting style.

(Another way to manage this, however, would be to not allow unformatted code to be committed in the first place using a [git hooks](../../2020-02-23/adopt-conventional-commits-and-use-commitlint))

## Preferred Setup In VSCode

In VSCode open up `settings.json` - the JSON file that stores all of your custom settings for VSCode

Make sure the following two lines are present:

```json:title=/Library/Application/Support/Code/User/settings.json"
"prettier.requireConfig": true,
"editor.formatOnSave": true,
```

The former simply requires that there is a `.prettierrc` file in the application’s root directory. This is particularly useful in making sure that you don't accidentally modify a project that doesn't have a Prettier configuration set up and change every line in every file.

The latter is a preference of mine to apply prettier on save - rather than waiting for a git commit or to run the `format` script (or with [git hooks](../../2020-02-23/adopt-conventional-commits-and-use-commitlint)).

## Alternative Formats

While I prefer to use just a `.prettierrc` file which can be written in YAML or JSON, it's also possible to use `.toml` or `.js`.

The Prettier site has a helpful page for how to set these other formats up.<sup>1</sup>

## Footnotes

-   <sup>1</sup> [Prettier](https://prettier.io/docs/en/configuration.html)
