---
title: 'Safer Passwords Using bcrypt'
date: '2020-04-21'
publish: '2020-05-20'
category: ['programming']
tags: ['crypto', 'passwords', 'salt', 'hash', 'bcrypt']
---

At the end of yesterday's post, [Salt & Hash: A Password Recipe](../../2020-05-19/salt-hash-password-recipe) , I alluded to the use of bcrypt as a _better_ solution than rolling your own.

If you don't believe me and/or want more information about _why_, please read:

1. [Coda Hale on "How to Safely Store A Password"](https://codahale.com/how-to-safely-store-a-password/)
2. [Auth0 on "Hashing in Action: Understanding bcrypt"](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)

But, since yesterday I walked through all of the details for how you might salt and hash a password for saving / retrieval, I thought I'd revisit the problem but use `bcrypt` this time.

Thanks to `bcrypt`, our story is significantly simpler.

Let's look at how:

```javascript:title=src/index.js
const bcrypt = require('bcrypt')
app.post(`/signup`, async (req, res) => {
    const { email } = req.body
    const password = await bcrypt.hash(req.body.password, 10)
    const user = await createUser({ email, password })
    res.json(user)
})
```

`bcrypt.hash` is asynchronous, so we need to await the result, but once it's ready, we can store _just_ the password.

Why don't we need to keep the `salt` around? Because that's all we need in order to compare it when we get to the sign in phase.

```javascript:title=src/index.js
const bcrypt = require('bcrypt')
app.post(`/signin`, async (req, res) => {
    const { email } = req.body
    const { password } = await fetchCreds(email)
    const match = await bcrypt.compare(req.body.password, password)
    if (match) {
        res.status(200).send()
    } else {
        res.status(401).send()
    }
})
```

Here's it all as once small node app to see it in action:

```javascript:title=src/index.js
const bcrypt = require('bcrypt')

function encryptPassword(plaintextPassword) {
    return bcrypt.hash(plaintextPassword, 10)
}

function compare(plaintextPassword, hashedPassword) {
    return bcrypt.compare(plaintextPassword, hashedPassword)
}
const password = 'itsybitsymitsy'

encryptPassword(password).then(hashedPassword => {
    console.log(`bcrypt.hash ==> `, hashedPassword)
    compare(password, hashedPassword).then(compared =>
        console.log(`matched --> ${compared}`)
    )
})
```

The result:

```shell
$ node src/index.js
bcrypt.hash ==>  $2b$10$g2EevpvEEsRkgty5EpO7EehBW4dRrNEkQJqQfbFDeI9Z4p3tDd5Zy
matched --> true
```
