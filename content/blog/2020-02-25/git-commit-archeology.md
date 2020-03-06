---
title: 'Git Commit Archeology: Digging In With Grep And Pickaxe'
date: '2020-02-05'
publish: '2020-02-25'
category: ['programming', 'git']
tags: ['git', 'git log', 'pickaxe', 'git diff', 'diffcore', 'patch', 'grep']
---

In his talk ["A Branch In Time"](https://tekin.co.uk/2019/02/a-talk-about-revision-histories) ([which I wrote about previously](../../2020-02-06/write-better-commits/), Tekin Süleyman discussed how an engineer can explore the git history to understand the context of changes (assuming her peers wrote meaningful commit messages).

Two tools that left me slackjawed when I saw them in action were `grep` and the `pickaxe`.<sup>[1](#footnotes)</sup><a id="fn1"></a>

I've been playing with both over the past few weeks and wanted to jot down the _how_ so that I wouldn't forget.

## Grep

If the team is writing useful commit messages, then grep'ing them will be a valuable exercise.<sup>[2](#footnotes)</sup><a id="fn2"></a>

Git's `grep` option in the `git log` allows searching of the entire commit history.

From the manual:

```shell:tiile="git log --help"
--grep=<pattern>
   Limit the commits output to ones with log message that matches the specified pattern (regular expression). With more than one --grep=<pattern>, commits whose message matches any of the given patterns are chosen (but see --all-match).
   When --show-notes is in effect, the message from the notes is matched as if it were part of the log message.
```

For example, looking through the commit history on this site for

```shell
$ git log --grep "feat:"
```

I can see a full list of all of the commits which include `feat` in the subject _or_ body.

This is particularly useful if used in conjunction with [Conventional Commits](../../2020-02-22/semantic-versioning-and-conventional-commits) or some other standard commit template.

As the manual suggests, you can also stack patterns to match.

```shell
$ git log --grep "feat:" --grep "major"
```

By default, the patterns are inclusive, however, they can be made exclusionary (that is all required) with the inclusion of the `--all-match` option:

```shell
$ git log --grep "feat:" --grep "major" --all-match
```

## Pickaxe

I think of the Pickaxe like grep, but for the diff itself. The [pickaxe actually comes from `diffcore`](https://www.git-scm.com/docs/gitdiffcore#_diffcore_pickaxe_for_detecting_addition_deletion_of_specified_string) (the family of commands that are used to compare two files), but is available for use within the `git log`.

Specifically, the two standard ways to use the pickaxe are with the `-S` and the `-G` flags.

- `-S` takes a string as an argument
- `-G` takes a regular expression

While this sounds intimidating. In practice it's not.

One key difference between the two options and noted in the manual is the scope of concern for the two options. Whereas the `-G` looks for changes in the pattern, the `-S` seems to be concerned only with the _number_ of changes of the pattern.

From the manual:

> To illustrate the difference between `-S<regex>` --pickaxe-regex and `-G<regex>`, consider a commit with the following diff in the same file:
>
> ```diff
>   +    return !regexec(regexp, two->ptr, 1, &regmatch, 0);
>   ...
>   -    hit = !regexec(regexp, mf2.ptr, 1, &regmatch, 0);
> ```
>
> While git log -G"regexec\(regexp" will show this commit, git log -S"regexec\(regexp" --pickaxe-regex will not (because the number of occurrences of that string did not change).

## Secret Weapon: Patch

While `grep` and the `pickaxe` are useful tools - they're made even more useful with the `--patch` option.

By default, the returned results for a search with `git log` is... just that: the git log.

However, you can see the full diff if you include the `--patch` option.

This is another good opportunity to see the differences between `--grep`, `-S` and `-G`.

```shell
git log --grep="cachePublic: true" --patch
```

This returns _nothing_. There are no git _commit_ messages (subject or body) with this string included in them.

What about the `-S` option though?

```shell
git log -S"cachePublic: true," --patch
```

This returns the full commit message (in this case, there wasn't much of one) and the changed file:

```diff
commit e01fcf867905f4bcb3eb5ad8c961524547a782eb (origin/285/caching-netlify-builds, 285/caching-netlify-builds)
Author: Stephen <stephencweiss@gmail.com>
Date:   Wed Dec 18 13:20:07 2019 -0600

    add netlify cache

diff --git a/gatsby-config.js b/gatsby-config.js
index 93d491e..c29b253 100644
--- a/gatsby-config.js
+++ b/gatsby-config.js
@@ -12,6 +12,12 @@ module.exports = {
   },
   plugins: [
     'gatsby-plugin-styled-components',
+    {
+      resolve: 'gatsby-plugin-netlify-cache',
+      options: {
+          cachePublic: true,
+      }
+    },
     {
       resolve: `gatsby-source-filesystem`,
       options: {
```

Finally, there's the `-G` option:

```shell
git log -G"cachePublic: true," --patch
```

Like the `-S` option, this returns the full commit message and the changed file(s). However, in this case it also pulled back a _second_ commit where the number of times `cachPublic: true,` was present didn't change, but it was reformatted: <sup>3</sup>

```diff
commit ee201712e254bfd300b77057344994c1c1bd7663
Author: Stephen <stephencweiss@gmail.com>
Date:   Thu Dec 19 09:35:37 2019 -0600

    adding global styles with styled-components

diff --git a/gatsby-config.js b/gatsby-config.js
index bacedc4..96f74db 100644
--- a/gatsby-config.js
+++ b/gatsby-config.js
@@ -15,8 +15,8 @@ module.exports = {
     {
       resolve: 'gatsby-plugin-netlify-cache',
       options: {
-          cachePublic: true,
-      }
+        cachePublic: true,
+      },
     },
     {
       resolve: `gatsby-source-filesystem`,
@@ -100,21 +100,21 @@ module.exports = {
       resolve: `gatsby-plugin-feed`,
       options: {
         feeds: [
-            {
-                serialize: ({ query: { site, allMarkdownRemark } }) => {
-                  return allMarkdownRemark.edges.map(edge => {
-                    return Object.assign({}, edge.node.frontmatter, {
-                      date: edge.node.frontmatter.date,
-                      publish: edge.node.frontmatter.publish,
-                      updated: edge.node.frontmatter.updated,
-                      draft: edge.node.frontmatter.draft,
-                      url: site.siteMetadata.siteUrl + edge.node.fields.slug,
-                      guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
-                      custom_elements: [{ 'content:encoded': edge.node.html }],
-                    })
-                  })
-                },
-                query: `
+          {
+            serialize: ({ query: { site, allMarkdownRemark } }) => {
+              return allMarkdownRemark.edges.map(edge => {
+                return Object.assign({}, edge.node.frontmatter, {
+                  date: edge.node.frontmatter.date,
+                  publish: edge.node.frontmatter.publish,
+                  updated: edge.node.frontmatter.updated,
+                  draft: edge.node.frontmatter.draft,
+                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
+                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
+                  custom_elements: [{ 'content:encoded': edge.node.html }],
+                })
+              })
+            },
+            query: `
                   {
                     allMarkdownRemark(
                       limit: 1000,
@@ -137,9 +137,9 @@ module.exports = {
                     }
                   }
                 `,
-                output: '/rss.xml',
-                title: 'Code-Comments RSS Feed',
-              },
+            output: '/rss.xml',
+            title: 'Code-Comments RSS Feed',
+          },
         ],
       },
     },
@@ -210,14 +210,14 @@ module.exports = {
         ],
       },
     },
-    `gatsby-plugin-offline`,
-    `gatsby-plugin-react-helmet`,
     {
-      resolve: `gatsby-plugin-typography`,
+      resolve: `gatsby-plugin-styled-components`,
       options: {
-        pathToConfigModule: `src/utils/typography`,
+        displayName: true,
       },
     },
+    `gatsby-plugin-offline`,
+    `gatsby-plugin-react-helmet`,
     {
       resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
       options: {

commit e01fcf867905f4bcb3eb5ad8c961524547a782eb (origin/285/caching-netlify-builds, 285/caching-netlify-builds)
Author: Stephen <stephencweiss@gmail.com>
Date:   Wed Dec 18 13:20:07 2019 -0600

    add netlify cache

diff --git a/gatsby-config.js b/gatsby-config.js
index 93d491e..c29b253 100644
--- a/gatsby-config.js
+++ b/gatsby-config.js
@@ -12,6 +12,12 @@ module.exports = {
   },
   plugins: [
     'gatsby-plugin-styled-components',
+    {
+      resolve: 'gatsby-plugin-netlify-cache',
+      options: {
+          cachePublic: true,
+      }
+    },
     {
       resolve: `gatsby-source-filesystem`,
       options: {
```

## Conclusion

Writing good commit messages is hard(er than not). It requires time and effort. However, the total cost is not that high. Practices like Conventional Commits and templates can make the writing easier. Best of all, useful commit messages help you and your team nearly immediately. Even more so if you learn about the tools that make digging through them easy!

## Footnotes

- <sup>[1](#fn1)</sup> See the [manual entry for `git log` for a full list of what's available](https://www.git-scm.com/docs/git-log#Documentation/git-log.txt--Sltstringgt). An interesting note is the difference between the `-G` and the `-S` options.
- <sup>[2](#fn2)</sup> It's so easy to forget, but `grep` is an acronym for "\_g_lobally search a \_r_egular \_e_xpression and \_p_rint". [Read more about the history of `grep` on Wikipedia](https://en.wikipedia.org/wiki/Grep).
- <sup>[3](#fn3)</sup> Worth noting that _if_ the `grep` had returned anything with the `--patch`, it would be the entire change set (which makes sense as it's looking at the commit message, not at any particular modified file).
