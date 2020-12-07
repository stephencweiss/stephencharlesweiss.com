These scripts are designed to increase confidence that the data coming in from the submodule is conforming to the expected shape.

## Usage

tl;dr:

```
$ npm run build:scripts
$ npm run permission:scripts
$ npm run validate
```

Since the scripts are written in typescript, they must be compiled prior to running.

The `tsconfig.scripts.json` file in the root of the `scripts` directory is principally responsible for this process. That said, this config is an extension of the `tsconfig.json` in the root of the project - so any settings not explicitly set in the config should be reviewed there.

In `package.json`, there is a script for compilation:

```shell
$ npm run build:scripts
```

However, given that these are written as shell scripts, we also need to update the permissions on the transpiled files as the default file generated does not have execution rights.<sup>[1](#footnotes)<a id="fn1"></a></sup> To make this easier

## Footnotes

-   <sup>[1](#fn1)</sup> This, I admit, is a bit of a conceit and is not strictly necessary. Since these scripts will primarily be invoked via scripts in the `package.json`, we could just as easily prepend the script with `node`, however, the fact that they're written as scripts makes it clear that they're used procedurally.
