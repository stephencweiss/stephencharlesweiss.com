---
title: 'Writing Better Commit Messages'
date: '2020-01-21'
publish: '2020-02-05'
category: ['programming']
tags:
  [
    'git',
    'commit',
    'rebase',
    'interactive',
    'log',
    'collaboration',
    'david thompson',
    'tekin süleyman',
    'joel chippindale',
    'conference talk',
  ]
---

In a recent sprint retrospective, a teammate mentioned that we could help ourselves by adding more context to our pull requests. This got me thinking and I started reading about how other teams handled this problem. This search led me to three resources which are changing the way I'm thinking about commits:

1. ["My favourite Git commit" by David Thompson | Fatbusinessman.com](https://fatbusinessman.com/2019/my-favourite-git-commit) - A blog post which breaks down one particularly noteworthy commit
2. ["A Branch In Time" by Tekin Süleyman | tekin.co.uk](https://tekin.co.uk/2019/02/a-talk-about-revision-histories) - A conference talk recorded at RubyConf AU 2019
3. ["Telling stories through your commits" by Joel Chippindale | Mocoso.co.uk](https://blog.mocoso.co.uk/talks/2015/01/12/telling-stories-through-your-commits/) - A conference talk from The Lead Developer UK 2016

Joel Chippindale's talk, "Telling stories through your commits," presented a three pronged framework for writing effective commits which I intend to use as a bit of a checklist for the near future:

1. Atomic commits
2. Meaningful commit messages
3. Revise history _before_ sharing

What do they mean?

**Atomic commits** are the "minimum viable commit." It's the smallest chunk of code that together means something. Here, the `--patch` flag (also `-p`) of [`git add`](https://git-scm.com/docs/git-add) is particularly useful. A heuristic to use: If you need to use "and" to describe the commit, it may be too big.

**Meaningful commit messages** are described in four parts:

1. Short one line title,<sup>[1](#footnotes)</sup><a id="fn1"></a> e.g., "Fix Widget Bug."
2. (As necessary) a longer description of what the change _does_. This can include a reference to the project management software, though as Tekin pointed out in his talk, this can backfire when the tracking software changes (e.g., move from Trello to Jira to RoadmapAllstar<sup>[2](#footnoes)</sup><a id="fn2"></a>)
3. _Why_ the change was made
4. (Optional) Discussion of alternative approaches evaluated

**Revising history before sharing** was probably the most eye opening for me. It was an argument for using `get rebase --interactive` in a way to help organize commits to tell a story. If the point of the commit is to communicate to a future developer _what_ happend and _why_, then eliminating noise of commits like `fix typo` and `linting` makes that easier.

While these are trivial examples, Joel provided really interesting ones - like reorganizing the order of commits and merging them to be more complete units (e.g., combining a change with the test case written to cover it rather than leaving those as two separate commits).

I thought I was doing alright with my commits, but what David, Tekin, and Joel showed me was that there's so much more I can do - not just to help myself, but to help my team.

There are things I can start doing _today_ that will help me and my team be more productive that cost me very little.

## Footnotes

- <sup>[1](#fn1)</sup> While he didn't reference it explicitly, the examples Joel provided reminded me of Google's [Engineering Practices Documentation](https://google.github.io/eng-practices/).
- <sup>[2](#fn2)</sup> Okay, I made that one up, but admit it, you weren't sure for a moment!
