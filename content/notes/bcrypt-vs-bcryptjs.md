---
title: 'Package Comparison: bcrypt vs bcryptjs'
date: '2020-04-21'
publish: '2020-05-20'
category: ['programming']
tags: ['bcrypt', 'crypto', 'node', 'javascript', 'package discovery']
---

In learning more about password management and salting/hashing (which I wrote about [here](salt-hash-password-recipe)) - I found [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) (which I wrote about using [here](safer-passwords-bcrypt)).

Since I work in Javascript, I went looking for a package to use so that I didn't violate rule #1 of cryptography (never roll your own).

This was when things became typical Javascript-y. There are _two_ fairly popular packages for `bcrypt`:

1. [bcrypt](https://www.npmjs.com/package/bcrypt)
2. [bcryptjs](https://www.npmjs.com/package/bcryptjs)

The latter hasn't been updated in 3 years, but it's still being downloaded 700k+ / week.

Which begs the question: what's the difference?

From the [bcrypt wiki](https://github.com/kelektiv/node.bcrypt.js/wiki/bcrypt-vs-bcrypt.js)

> [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) is a pure js implementation version of bcrypt hashing algorithm. It has a similar interface to bcrypt and in most cases used as a drop-in replacement.
>
> Since v2.x of bcrypt, the versions are not entirely compatible. We have an additional parameter to force the generation of 2a or 2b hashes.
>
> [Roman Stylman in #500](https://github.com/kelektiv/node.bcrypt.js/issues/500#issuecomment-325265402)
>
> > While bcrypt.js has the same API surface on the JS side; it does not actually implement background work in the same way as the c++ bindings. The c++ bindings use a background thread pool while bcrypt.js will block your main thread pool.
>
> > This may have implications for your services so make sure you understand what you are doing and how it will impact your services before switching dependencies.
>
> On an average, c++ bcrypt will be 30% faster than the plain js implementation.
>
> If you are having a small scale project, then bcrypt.js will easily suffice for you. Also, c++ bcrypt will not work in browser environments, the only choice there is bcrypt.js.
