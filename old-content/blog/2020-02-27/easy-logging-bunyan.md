---
title: 'Easy Logging With Bunyan'
date: '2020-02-07'
publish: '2020-02-27'
category: ['programming']
tags: ['javascript', 'node', 'logging', 'bunyan', 'package discovery']
---

Another entry in my [Package Discovery](../../../tags/package-discovery/) series. Today, I'm looking at logging with `bunyan`!

Two steps to easily generate more readable logs:

1. Install [bunyan](https://www.npmjs.com/package/bunyan) globally<sup>[1](#footnotes)</sup><a id="fn1"></a>
2. Pipe the output of a script into bunyan

For example:

```shell
$ node index.js | bunyan
```

You can customize the output pretty easily with the different options too. Level and output mode being the two that I've used most.

## Levels

To see only messages of warn _or above_ we can do<sup>[2](#footnotes)</sup><a id="fn1"></a>:

```shell
$ node index.js | bunyan --level warn
```

[Trent](https://github.com/trentm), Bunyan's author, also provides some useful heuristics on levels:

> Trent's biased suggestions for server apps: Use "debug" sparingly. Information that will be useful to debug errors post mortem should usually be included in "info" messages if it's generally relevant or else with the corresponding "error" event. Don't rely on spewing mostly irrelevant debug messages all the time and sifting through them when an error occurs.
>
> Trent's biased suggestions for node.js libraries: IMHO, libraries should only ever log at trace-level. Fine control over log output should be up to the app using a library. Having a library that spews log output at higher levels gets in the way of a clear story in the app logs.

## Output

Bunyan also offers different output formats configurable through the `--output` flag:

> ```
> OUTPUT FORMATS
> FORMAT NAME         DESCRIPTION
> long (default)      The default output. Long form. Colored and "pretty".
>                     'req' and 'res' and 'err' fields are rendered specially
>                     as an HTTP request, HTTP response and exception
>                     stack trace, respectively. For backward compat, the
>                     name "paul" also works for this.
> short               Like the default output, but more concise. Some
>                     typically redundant fields are ellided.
> json                JSON output, 2-space indentation.
> json-N              JSON output, N-space indentation, e.g. "json-4"
> bunyan              Alias for "json-0", the Bunyan "native" format.
> inspect             Node.js `util.inspect` output.
> ```

A basic example:

```shell
$ node index.js | bunyan --output short
```

## Conclusion

Using Bunyan as a catch for all of my server outputs has made sifting through logs significantly easier. Instead of trying to parse stack traces from a log that seems to be a wall of text, Bunyan pulls apart the information automatically.

It's a simple change to a workflow that makes everything else simpler.

H/t to [Krish Penumarty](http://krishpenumarty.com/) for the initial tip!

## Footnotes

-   <sup>[1](#fn1)</sup> Technically, global install is not required. You could also run it if installed in a project through the `node_modules` directory. This example is covered in the [CLI Usage section of Bunyan's README](https://www.npmjs.com/package/bunyan#cli-usage), but would look like: `shell> $ node index.js | ./node_modules/.bin/bunyan`.
-   <sup>[2](#fn2)</sup> This actually started an interesting thread of inquiry for me about the different levels of logging. At first blush, it appears that while there's no universal standard, there is a convention of the following levels:
    ```
    trace
    debug
    info
    warn
    error
    fatal
    ```
