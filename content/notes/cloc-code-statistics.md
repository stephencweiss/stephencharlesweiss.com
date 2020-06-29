---
title: 'Cloc: Code Base Analysis'
date: '2020-02-28'
publish: '2020-03-18'
updated: ['2020-05-30']
category: ['programming']
tags: ['npm', 'package discovery', 'counter', 'cloc', 'lines of code']
---

Today is another entry in my [Package Discovery](../../../tags/package-discovery/) series. The topic is project statistics with `cloc`.

Software is getting more complex. Look no further than headlines saying that the space shuttle had "only" 400,000 lines of (machine) code compared to 100,000,000 in an "average modern high-end car" ([Source](https://www.visualcapitalist.com/millions-lines-of-code/)).

I always wondered _how_ those numbers were calculated. Today, I found a tool that would make it possible: [`cloc`](https://github.com/AlDanial/cloc). `Cloc` is a "counter" application (of which [there are many alternatives](https://github.com/AlDanial/cloc#other-counters-)). It does what it says it will. It counts the numbers of files, lines of code, comments, and empty lines included in the target.

Testing it on my site, I installed it as a dev dependency and ran it from the root directory.

```shell
$ ./node_modules/.bin/cloc . --exclude-dir=node_modules
```

Note: I excluded `node_modules` for two reasons:

1. I am interested in how much code _I've_ contributed to the size
2. Because I installed `cloc` as a dev dependency, I hit a recursive loop when I didn't exclude it

The results as of today:

```shell
$ ./node_modules/.bin/cloc . --exclude-dir=node_modules
    4061 text files.
    4059 unique files.
     106 files ignored.
github.com/AlDanial/cloc v 1.85  T=69.89 s (56.6 files/s, 2179.5 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
HTML                           482           1210              0          55206
JSON                          2841              0              0          24235
XML                              1           1129              0          22718
Markdown                       417           7369              0          21559
JavaScript                     185           2391           4492          10514
JSX                             21             84              4            741
CSS                              5             84             55            494
YAML                             2              3              0             28
SVG                              2              0              1             10
-------------------------------------------------------------------------------
SUM:                          3956          12270           4552         135505
-------------------------------------------------------------------------------
```

Or, turning the numbers into percent of lines of code:

```shell
./node_modules/.bin/cloc . --exclude-dir=node_modules, .cache, public --by-percent c
    6096 text files.
    4059 unique files.
    2141 files ignored.

1 error:
Unable to read:  .cache,

github.com/AlDanial/cloc v 1.85  T=144.74 s (27.3 files/s, 1052.4 lines/s)
-------------------------------------------------------------------------------
Language                     files        blank %      comment %           code
-------------------------------------------------------------------------------
HTML                           482           2.19           0.00          55206
JSON                          2841           0.00           0.00          24235
XML                              1           4.97           0.00          22718
Markdown                       417          34.18           0.00          21559
JavaScript                     185          22.74          42.72          10514
JSX                             21          11.34           0.54            741
CSS                              5          17.00          11.13            494
YAML                             2          10.71           0.00             28
SVG                              2           0.00          10.00             10
-------------------------------------------------------------------------------
SUM:                          3956           9.06           3.36         135505
-------------------------------------------------------------------------------
```

The most interesting thing is the nearly 4500 lines (40%+ of all lines!) of comments I reportedly have in Javascript files... I'll be digging into that!

## Always On Statistics

I wanted to see if I could add these statistics to my build process and create a page automatically.

This made most sense to do at build time - which is good since the site's statically generated anyway.

It turns out that I already had learned all of the skills I needed to accomplish this - I just needed to put them together.

The first step was adding a new script to my `package.json`, which I then plugged into the build command:

```json
"scripts": {
  "pre-build": "cloc . --exclude-dir=node_modules --md > ./content/site-stats/current-state.md",
  "build": "yarn run pre-build && gatsby build",
}
```

> **Update**: I made a small tweak to my `pre-build` script (which now cleans _and_ compiles the stats). Instead of excluding a single directory, I wanted to exclude multiple, so I went in search of a way to do that.
>
> According to this conversation on Stack Overflow, it seems that the best way to do that is to list a series of files in a `.clocignore` file and then use a subshell to process them.
>
> The updated script is:
>
> ```json:title=package.json
> "scripts": {
> "site-stats": "cloc . --exclude-dir=$(tr '\n' ',' < .clocignore) --md > ./content/stats/current-stats.md",
>   "pre-build": "yarn clean && yarn site-stats",
>   "build": "yarn pre-build && gatsby build",
> }
> ```
>
> The `.clogignore` file is just a few lines:
>
> ```txt:title=.clogignore
> node_modules
> public
> .netlify
> .cache
> reduxcache*
> ```
>
> The results are quite different now that I'm excluding additional files (particularly the generated HTML):
>
> | cloc | github.com/AlDanial/cloc v 1.85 T=0.37 s (1637.0 files/s, 120469.9 lines/s) |
> | ---- | --------------------------------------------------------------------------- |
>
>
> | Language   |    files |    blank |  comment |     code |
> | :--------- | -------: | -------: | -------: | -------: |
> | Markdown   |      543 |    10077 |        0 |    30289 |
> | JavaScript |       22 |       85 |       29 |     1232 |
> | JSX        |       28 |       99 |        8 |     1136 |
> | JSON       |        2 |        0 |        0 |      810 |
> | CSS        |        3 |       70 |       56 |      434 |
> | YAML       |        2 |        3 |        0 |       28 |
> | SVG        |        3 |        0 |        2 |       19 |
> | --------   | -------- | -------- | -------- | -------- |
> | SUM:       |      603 |    10334 |       95 |    33948 |
>
> Also, I've gotten a new computer since I initially started this. Evidently it's 10x faster!

The `pre-build` script [redirects the output to `current-state.md` (via the `>`)](angled-brackets-bash-scripting/), which I then pull in from the file system like any other file.

Once the file was generated, I had access to it just like any other file through the `gatsby-source-filesystem` plugin.

I'm now serving the results on a new page [`/stats/current-stats`](../../../stats/current-stats) which is generated with each build. (At least until I decide that it's no longer worth the extra build time. As the output suggests, this analysis is taking upwards of 140 seconds - a rather steep cost for a daily build.)
