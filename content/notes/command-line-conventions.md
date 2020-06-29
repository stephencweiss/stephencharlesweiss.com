---
title: 'Conventions For The Command Line'
date: '2019-10-24'
publish: '2019-10-24'
category: ['programming']
tags: ['cli', 'command line', 'syntax', 'posix']
---

The goal of most writing is to communicate a point to the reader.

This is where conventions and rules come in handy. They create a shared understanding of what characters, symbols, and collections of the same mean.

There’s an old maxim that was repeated in every English class I ever took: “Learn the rules before you break them.”<sup>[1](#footnotes)</sup><a id="fn1"></a>

I would go a step further and say that ignorance of the rules is no excuse. We should be seeking out the knowledge so that we can use them effectively… and break them when necessary.

When writing how to utilize a command line utility, we have the standards set forth by the Open Group (and adopted widely, including by Microsoft).<sup>[2](#footnotes)</sup><a id="fn2"></a> Some of the more common syntax is summarized below:

| Symbol                                   | Meaning                                                                             |
| ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `<parameter_name>` or `<parameter name>` | Names of parameters that require substitution by actual values.                     |
| `[ ]`                                    | The square brackets mean that the argument is optional and can be omitted.          |
| `|`                                      | Arguments separated by the `|` (vertical bar or pipe) are mutually exclusive        |
| `(…)`                                    | Ellipses are used to denote that one or more occurrences of an operand are allowed. |

_Personal aside_: It’s interesting to see the evolution in my own blog as I began to intuit these rules through exposure. One of my very first posts which made use of code blocks covered the use of git branches. I wrote:

```shell
$ git checkout [new branch name]
```

But that’s actually syntactically incorrect. I should have used the angled brackets instead of the square brackets because checking out a branch requires a branch name.<sup>[3](#footnotes)</sup> <a id="fn3"></a>

## Footnotes

-   <sup>[1](#fn1)</sup> Variations of this quote are attributed to Pablo Picasso, the Dalai Lama, and others, however, none seem authoritative or confirmed. None the less, it is sound advice and fits nicely in the maxim category.
-   <sup>[2](#fn2)</sup> The full chapter on [Utility Conventions](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html) as described by the Open Group. Microsoft’s version varies and makes use of **bold** and _italics_. You can read more about Microsoft’s approach here: https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc737438(v=ws.10)?redirectedfrom=MSDN#formatting-legend.
-   <sup>[3](#fn3)</sup> I’ve since updated the post to use the more conventional angled brackets. I'm sure other examples exist where I've mistyped them. I'll continue to update them as I find them - one of the beautiful features of blogs.
