---
title: 'Salt & Hash: A Password Recipe'
date: '2020-04-20'
publish: '2020-05-19'
category: ['programming']
tags: ['node', 'crypto', 'passwords', 'salt', 'hash', 'bcrypt']
---

When it comes to properly managing passwords, I think of breakfast. Okay, that's not true. I always think of breakfast. But it _is_ true that breakfast foods can be instructive for understanding some of the details needed to securely store user's sensitive information (like their passwords).

Let's see how.

Imagine we want to open a restaurant. I like breakfast, so the restaurant will be a diner. Really, I'd like to open a restaurant like Winona's in Steamboat, CO. (If you ever visit, don't skip it. And be sure to grab a cinnamon roll... or 6!)

I'm not a very creative chef, however, so I'll have a pretty simple menu to start with:

1. Plain toast
2. (Corned beef) Hash
3. (Corned beef) Hash with salt

Plain toast is a staple. Everyone's had it. It will work in a pinch, but really, I don't expect too many people to buy it. It's more there to fill out the menu and provide an alternative to my hash so I'm not accused of having only one item on my menu!

I'm planning to make a mean hash and I expect this to be good for most people (though some might suggest different ingredients than corned beef - the point is that they're coming for my hash). But you know what makes a hash even better? Salt. Just a little bit goes a long way. The best part is, it's not hard to add!

This menu is effectively our options for securely storing our passwords for our users. There's a plain text option. There, cheap, but probably _shouldn't_ be used. It's more there for completeness than anything else. Then there's the good stuff. That's the hashing. And finally, we can make a hashed password even better with a little salt.

The rest of this article will dive into some of the ins and outs of how to do that with Node's [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) package. Buckle up!

## Password Encryption

I'm not going to go too far into the encryption details for a password because, frankly, it's a lot of math that I don't understand.

When it comes to encryption, I have two rules of thumb I follow:

1. Never try to roll your own encryption
2. Encryption works when brute-force strategies are untenable.

Side note: Interestingly, this is one reason folks fear quantum computers: they may invalidate contemporary encryption processes.

Here's the [MIT Review on how a quantum computer could break 2048-bit RSA encryption in 8 hours](https://www.technologyreview.com/2019/05/30/65724/how-a-quantum-computer-could-break-2048-bit-rsa-encryption-in-8-hours/) :

> These encryption systems have never been unbreakable. Instead, their security is based on the huge amount of time it would take for a classical computer to do the job. Modern encryption methods are specifically designed so that decoding them would take so long they are practically unbreakable.
>
> But quantum computers change this thinking. These machines are far more powerful than classical computers and should be able to break these codes with ease.

([Not everyone is convinced of the quantum threat](https://techbeacon.com/security/waiting-quantum-computing-why-encryption-has-nothing-worry-about) though the it seems to be more a matter of _which_ encryption methods are used, not whether quantum computers can actually crack previously uncrackable problems.)

Okay - back to the regularly scheduled programming.

The act encrypting a password is, like one of my favorite foods, called hashing. Before we can get started cooking, we need an algorithm (aka a [recipe](coffee-algorithm)). This brings us to rule #1 above - don't try to make up your own, pull from a published list of recipes, like the RSA -- [here are others](https://www.globalsign.com/en/blog/glossary-of-cryptographic-algorithms).

And, just like a hash, it can be a really good start, but a little salt can go a long way.

Hashed passwords on their own are susceptible due to password reuse through the use of [rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table).

Salt, however, can help with that.

Just like the spice, salt in passwords is a little something extra added to the dish to make it better.

From [Wikipedia](<https://en.wikipedia.org/wiki/Salt_(cryptography)>):

> In cryptography, a salt is random data that is used as an additional input to a one-way function that hashes data, a password or passphrase. Salts are used to safeguard passwords in storage. Historically a password was stored in plaintext on a system, but over time additional safeguards developed to protect a user's password against being read from the system. A salt is one of those methods.

Salt then doesn't make a _single_ password more secure, but makes the _system_ more secure.

## Implementing In Node

Now that we know that a well-salted corned-beef hash is the best breakfast around, we can get around to implementing a secure way to store (and retrieve) our users' passwords.

For simplicity's sake, I'll be ignoring most of the application flow _surrounding_ these processes (e.g., a user has already signed up with a particular email address, managing failed attempts, etc.) to focus on:

1. How to salt and hash a password
2. How to _reverse_ the process and look it up

### Use Case: New User Signs up

When aunt Jane comes to my new site, she says to herself, "How have I lived without Stephen's AwesomeWebService in my life before?" and immediately begins to sign up (and not just because she's my aunt).

She enters her email, `crochetpro74@yahoo.com`, and a password, `Mitsy`, the name of her 14 year old wire haired Dachsund who never stops barking.

After the program alerts her that a password must be at least 8 characters long ([because entropy](https://xkcd.com/936/)) and probably shouldn't be the same password she uses elsewhere ([because reuse](https://xkcd.com/792/)), Jane gets creative and uses `ItsyBitsyMitsy.`

Now, imagine a basic sign up flow looks like like this:

1. The sign up form sends a `POST` request to a `/signup` endpoint on submit.
2. The server receives the request, accesses the `email` and `password` from the body, and passes those into a `createUser` function.
3. The `createUser` function saves the necessary information to a persistent data layer (e.g., saves a new record for the user in the database). We can imagine that `createUser` handles the checks for whether a user already exists with that email.
4. Once the `createUser` function returns we send back a response to the client as a JSON. (I'm imagining an [Express server which gives us access to the `res.json([body])` method](https://expressjs.com/en/api.html#res.json)).

```javascript:title=src/index.js
app.post(`/signup`, async (req, res) => {
    const { email, password } = req.body
    /*...*/
    const user = await createUser({ email, password })
    res.json(user)
})
```

In this case, however, we're just forwarding along the password in plain text to be stored in our database. This is the plain toast equivalent. Something to know how about, but to never actually use.

Let's spice things up a bit and make a hash.

```javascript:title=src/index.js
const { encryptPassword } = require('./utils/encryptPassword')
app.post(`/signup`, async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = encryptPassword(password)
    const user = await createUser({ email, password: hashedPassword })
    res.json(user)
})
```

The overall flow hasn't changed one iota, but how does `encryptPassword` work?

It's not a native Node API... it's a custom utility function built upon Node's Crypto package.

```javascript:title=src/utils/encryptPassword.js
const crypto = require('crypto')

function encryptPassword(plaintextPassword) {
    return crypto
        .createHash('RSA-SHA512')
        .update(plaintextPassword)
        .digest('hex')
}

module.exports = { encryptPassword }
```

Let's test this out by adding a few calls to the bottom of our file and then running it:

```javascript:title=src/utils/encryptPassword.js
//...
console.log(encryptPassword('ItsyBitsyMitsy'))
console.log(encryptPassword('ItsyBitsyMitsy'))
console.log(encryptPassword('ADifferentPassword'))
```

From the command line:

```shell
$ node src/utils/encryptPassword.js
e3143cc29d37a049d8e028ed4f5a0f270ab1e5bdb9e4f32b6625658f2a5f972c
e3143cc29d37a049d8e028ed4f5a0f270ab1e5bdb9e4f32b6625658f2a5f972c
64114a95f589fdd04f70872f101e42dc60557d670ede698dfe6fd84a7c3824af
```

As expected - `ItsyBitsyMitsy` is consistently hashed (`e314...972c`) whereas a different string results in an altogether different hash. Sweet! That's some good cookin'!

The consistency is key. If the result was random, our Aunt Jane would never be able to get back into her account!

You might have noticed that we used the `RSA-SHA512` algorithm. Think of this as the corned beef in a corned beef hash. It's an ingredient, which means it can be swapped out with others based on preference. (I suggest doing some due diligence before picking your preferred algorithm, but as of this writing RSA appears to be one of the most popular algorithms in the world. On the other hand, most of what I've seen [suggests avoiding SHA-1](https://en.wikipedia.org/wiki/SHA-1). All of which is to reiterate [Rule #1: Never roll your own encryption](#password-encryption))

As a final step for preparing our passwords for storage, let's add a pinch of salt to make it extra tasty.

While we _could_ pass in a predefined salt, this would mean that every user in our system would have the same salt - and while this helps a bit, adding a degree of protection, it's better if we give each person their own.

One way to do that is to generate it. For this, we can use the `randomBytes` method (also part of the Crypto package):

```javascript:title=src/utils/generateSalt.js
const crypto = require('crypto')

function generateSalt(length) {
    if (length < 8)
        throw new Error('Make sure salt is sufficiently long! At least 8 bytes')
    return crypto
        .randomBytes(Math.ceil(length / 2)) // ensure even number
        .toString('hex')
        .slice(0, length) // fix the length
}

modules.export = { generateSalt }
```

We might be tempted to now use this salt like so:

```javascript:title=src/utils/encryptPassword.js
const crypto = require('crypto')
const { generateSalt } = require('./generateSalt')

// DON'T DO THIS
function encryptPasswordWithSalt(plaintextPassword) {
    const salt = generateSalt(8)
    return crypto
        .createHash('RSA-SHA512')
        .update(plaintextPassword + salt)
        .digest('hex')
}

module.exports = { encryptPassword }
```

Can you see the problem here?

We're generating a random salt every time we use this and the _discarding_ it. Bye-bye consistency!

In order for the salt to be useful then, it needs to be stored. Let's tweak the return signature to help:

```diff:title=src/utils/encryptPassword.js
const crypto = require('crypto')
const { generateSalt } = require('./generateSalt')

function encryptPasswordWithSalt(plaintextPassword) {
    const salt = generateSalt(8)
-    return password = crypto
+    const password = crypto
        .createHash('RSA-SHA512')
        .update(plaintextPassword + salt)
        .digest('hex')
+    return { password, salt }
}

module.exports = { encryptPasswordWithSalt }
```

Running our tests again, this time with salt:

```javascript:title=src/utils/encryptPassword.js
//...
console.log(`ItsyBitsyMitsy -->`, encryptPasswordWithSalt('ItsyBitsyMitsy'))
console.log(`ItsyBitsyMitsy -->`, encryptPasswordWithSalt('ItsyBitsyMitsy'))
console.log(
    `ADifferentPassword -->`,
    encryptPasswordWithSalt('ADifferentPassword')
)
```

We see that the impact of salt:

```shell
$ node src/utils/encryptPassword.js
ItsyBitsyMitsy --> {
  password: 'efca426559bdcfd9b369f1e806fd25bff62bec6dd04e89076f151d0a9ea09dc4',
  salt: 'c21b55bb7e160449'
}
ItsyBitsyMitsy --> {
  password: '03a22279d9a2e906d731e8cad4cbf9bb48238a5dc75b2bf02b9445d53ad72187',
  salt: '19470202669f8ae2'
}
ADifferentPassword --> {
  password: '0c818bdc687fa047f5f762c6439b9f9a70d9973e40ed7ebb5e7de715fb0ef49a',
  salt: 'dc51822edba771ee'
}
```

Whereas previously, every time we encrypted `ItsyBitsyMitsy` it was the same password, now we get totally different results thanks to the salt.

Note, an alternative to appending the salt to the password is to replace the hash with an HMAC, a _keyed_ hash which takes advantage of the salt that's provided. (See [this StackExchange conversation for more on hash vs HMAC](https://crypto.stackexchange.com/questions/6493/what-is-the-difference-between-a-hmac-and-a-hash-of-data).)

```diff:title=src/utils/encryptPassword.js
const crypto = require('crypto')
const { generateSalt } = require('./generateSalt')

function encryptPasswordWithSalt(plaintextPassword) {
    const salt = generateSalt(8)
    const password = crypto
-        .createHash('RSA-SHA512')
+        .createHmac('RSA-SHA512', salt)
-        .update(plaintextPassword + salt)
+        .update(plaintextPassword)
        .digest('hex')
    return { password, salt }
}

module.exports = { encryptPasswordWithSalt }
```

(For the rest of this post, we'll be using this HMAC approach)

Returning to our server code now, we need to make a slight update to account for the new return:

```diff:title=src/index.js
const { encryptPasswordWithSalt } = require('./utils/encryptPassword')
app.post(`/signup`, async (req, res) => {
    const { email, password } = req.body
-    const hashedPassword = encryptPassword(password)
+    const {password: hashedPassword, salt} = encryptPasswordWithSalt(password)
-    const user = await createUser({ email, password: hashedPassword })
+    const user = await createUser({ email, password: hashedPassword, salt })
    res.json(user)
})
```

This will also necessitate a change to our data layer to make sure that we can store the salt alongside the password. This will be important for the next section where we'll be verifying Aunt Jane's credentials when she returns to sign in to our application.

### Use Case: User Returns To Log In

Before we can call it a day, let's see how our service would _retrieve_ Aunt Jane's account in our different scenarios.

First, the plain text approach, might have an endpoint like this:

```javascript:title=src/index.js
app.post(`/signin`, async (req, res) => {
    const { email, password } = req.body
    const { password: storedPassword } = await fetchCreds(email)
    if (storedPassword === password) {
        res.status(200).send()
    } else {
        res.status(401).send()
    }
})
```

In this case, the client sends along the `email` and `password` in the body of a request. Our service uses `fetchCreds` to retrieve the password we'd saved on sign up from our data base based on the email.

If we find a password, we compare it to the one in the request body. If they match we send back a `200` - everything's A-okay. Otherwise `401`: [unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1).

What about if we're in our middle scenario? The one where our user's password is encrypted with a hashing function?

Well, the encryption is the same every time, so if the user provided the right password, we can just hash the one our user supplied and _then_ compare it to the stored password:

```javascript:title=src/index.js
const { encryptPassword } = require('./utils/encryptPassword')
app.post(`/signin`, async (req, res) => {
    const { email, password } = req.body
    const { password: storedPassword } = await fetchCreds(email)
    const hashedPassword = await encryptPassword(password)
    if (storedPassword === hashedPassword) {
        res.status(200).send()
    } else {
        res.status(401).send()
    }
})
```

Notice that we're reusing the same `encryptPassword`. This is one of the benefits of consistent hashing!

And finally, we get to the salt. We know that hashing is consistent, but only if the inputs are the same. Since we're "cooking" with salt now, we need to make sure we retrieve the _right_ salt _before_ we hash the supplied password.

Now, we need to change the return of `fetchCreds` to include the user's salt. Like so:

```javascript:title=src/index.js
const { encryptPasswordWithSalt } = require('./utils/encryptPassword')
app.post(`/signin`, async (req, res) => {
    const { email, password } = req.body
    const { password: storedPassword, salt } = await fetchCreds(email)
    const hashedPassword = await encryptPasswordWithSalt(password, salt)
    if (storedPassword === hashedPassword) {
        res.status(200).send()
    } else {
        res.status(401).send()
    }
})
```

Note, however, that we've just changed the signature of `encryptPasswordWithSalt` - before we only took one argument.

We _could_ write a whole new function for this workflow, or we could modify our previous `encryptPasswordWithSalt` to accept a second, optional argument and reuse it for both signing up and signing in. That might look like:

```diff:title=src/utils/encryptPassword.js
const crypto = require('crypto')
const { generateSalt } = require('./generateSalt')

- function encryptPasswordWithSalt(plaintextPassword) {
+ function encryptPasswordWithSalt(plaintextPassword, salt) {
-    const salt = generateSalt(8)
+    salt = salt || generateSalt(8)
    const password = crypto
        .createHmac('RSA-SHA512', salt)
        .update(plaintextPassword)
        .digest('hex')
    return { password, salt }
}

module.exports = { encryptPasswordWithSalt }
```

Now, if we call it without a salt provided, the function will still create its own, but if salt _is_ provided, it will be used -- allowing for predictable hashing:

For example, let's see how it works on Aunt Jane's password:

```javascript
//...
console.log(`ItsyBitsyMitsy -->`, encryptPasswordWithSalt('ItsyBitsyMitsy'))
console.log(
    `ItsyBitsyMitsy -->`,
    encryptPasswordWithSalt('ItsyBitsyMitsy', '2a3241467a677bca')
)
console.log(
    `ItsyBitsyMitsy -->`,
    encryptPasswordWithSalt('ItsyBitsyMitsy', '2a3241467a677bca')
)
```

When I ran it, this yielded:

```shell
$ node src/utils/encryptPassword.js
ItsyBitsyMitsy --> {
  password: 'fa99f4e40dc9fe5573ca911b2ffa7be96ff8a8ab54168330449608ffe7efeaa9',
  salt: '9e608e765580cefc'
}
ItsyBitsyMitsy --> {
  password: '83450389ce0e84229b1d3bbff7aa25e05f580b865334f4d92839bc8c920f4b11',
  salt: '2a3241467a677bca'
}
ItsyBitsyMitsy --> {
  password: '83450389ce0e84229b1d3bbff7aa25e05f580b865334f4d92839bc8c920f4b11',
  salt: '2a3241467a677bca'
}
```

Notice that the second two are identical.

## Closing Thoughts

We covered a lot of ground today.

We learned about some of the basics of password management, some "best practices" and recipes for storing and retrieving passwords.

Armed with all of this information, you might be tempted to go use this in production. Don't. Listen to [Coda Hale](https://codahale.com/how-to-safely-store-a-password/) and use a tool purpose built for this like [bcrypt](https://www.npmjs.com/package/bcrypt).

Why? Remember rule #2? "Encryption works when brute-force strategies are untenable."

Well, computers today are _fast_ making brute-force strategies _very_ tenable.

`bcrypt` "uses a variant of the Blowfish encryption algorithm’s keying schedule, and introduces a work factor, which allows you to determine how expensive the hash function will be. Because of this, bcrypt can keep up with Moore’s law. As computers get faster you can increase the work factor and the hash will get slower." (source: Coda Hale).

So, with that, I've learned a thing or two, understood how I _might_ implement my own salt and hash, and know enough not to.

With that, I guess all that's left is to go make myself some hash!
