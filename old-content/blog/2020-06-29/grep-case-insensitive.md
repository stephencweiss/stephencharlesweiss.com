---
title: 'Case Insensitive Grep (AKA Ignoring Case)'
date: '2020-05-13'
publish: '2020-06-29'
category: ['programming']
tags: ['unix', 'cli', 'grep', 'tips', 'case insensitive', 'ignore case']
---

“Grepping” a stream of data is a powerful way to cut through the noise (I've written previously about its role in [digging through git logs](../../2020-02-25/git-commit-archeology) for example). Unfortunately, it’s rather sensitive. It’s sensitive to case - at least by default. I ran into this problem recently looking through my `launchctl` list to see where Postgres was running (it seemed I had multiple instances based on behavior). The odd part was that when I looked, I saw nothing:

```shell
$ launchctl list | grep postgres
$
```

Sadness. But the facts didn’t add up, so I gave up on grep for a moment and inspected the list the old fashioned way - manually and line-by-line.

```shell
$ launchctl list
PID	Status	Label
901	0	com.apple.trustd.agent
-	0	com.apple.MailServiceAgent
-	0	com.apple.mdworker.mail
26910	-9	com.apple.FileProvider
...
58969	0	homebrew.mxcl.PostgreSQL
...
```

Pay dirt! There it was in all its glory. Process 58969. So why hadn’t it shown up? It was `Postgres`, not `postgres`.

That’s solvable! I just needed to tell grep to ignore the case, for which it has a `--ignore-case` flag or `-i` for short. Trying the search again, armed with this information:

```shell
$ launchctl list | grep -i postgres
58969	0	homebrew.mxcl.PostgreSQL
```

Et voilá! Now I can get on with my day.
