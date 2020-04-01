---
title: 'Automating Linting: Using Husky To Lint On Commit'
date: '2020-04-01'
publish: '2020-04-22'
category: ['programming']
tags: ['lint', 'husky', 'commit lint', 'git hooks']
---

Yesterday I discussed updating a [prettier script in your project](../../2019-09-07/adding-prettier) to [handle multiple file types](../../2020-04-21/globbing-multiple-file-types).

And before that, I'd writting about using [git hooks to ensure better commit messages](../../2020-02-23/adopt-conventional-commits-and-use-commitlint)

Is there a way to combine these concepts to automate linting?

No need to bury the lede any further: the answer is yes and it's a fairly straightforward process!

Let's take a look.

Assuming we already have [husky](https://github.com/typicode/husky) installed in the project, we can add our lint to the `pre-commit` hook<sup>[1](#footnotes)</sup><a id="fn1"></a>:

```json:title="package.json"
{
    "scripts": {
        "lint": "prettier --check \"src/**/*.{css, json, ts, jsx?}\""
    },
    "husky": {
        "hooks": {
            "pre-commit": "yarn lint" //highlight-line
        }
    }
}
```

Now, if you try to commit a file that blatantly ignores the very simple rule that all ends should terminate with a semicolon (or not depending on your settings) - Husky will reject your submission:

```shell
$ gc
husky > pre-commit (node v12.16.1)
$ prettier --check "src/**/*.{css, json, ts, jsx?}"
Checking formatting...
src/models/Schedulizer.ts
Code style issues found in the above file(s). Forgot to run Prettier?
error Command failed with exit code 1.//highlight-line
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
husky > pre-commit hook failed (add --no-verify to bypass)
```

At this point, you have only one choice: conform and format your code.

If, as a team, you'd rather automate the process instead of reminding everyone whenever they try to commit that formatting is hard and it's best to just let the machines do it, try converting the hook from a check into an automatic fix:

```json:title="package.json"
{
    "scripts": {
        "lint": "prettier --check \"src/**/*.{css, json, ts, jsx?}\"",
        "lint:fix": "yarn lint --write" //highlight-line
    },
    "husky": {
        "hooks": {
            "pre-commit": "yarn lint:fix" //highlight-line
        }
    }
}
```

Et voilá - now every commit conforms to the law of the land and brain cells can be dedicated to solving problems, not tabs vs. spaces (or worst: a combination!)

## Footnotes

-   <sup>[1](#fn1)</sup> Alternatively, we could use standard git hooks - but Husky makes them so simple that I haven't felt the need to explore git hooks directly yet.
