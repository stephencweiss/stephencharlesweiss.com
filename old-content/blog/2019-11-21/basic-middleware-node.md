---
title: 'Basic Middleware Concepts In Node'
date: '2019-11-08'
publish: '2019-11-21'
category: ['programming']
tags: ['node', 'express', 'middleware']
---

Middleware is software that sits between two other pieces of software and can augment, change, modify, or even respond to data it receives.

Normally, its purpose is to to receive data, add or modify it, and forward it along to the next piece of software that can determine how to handle it.

Let’s look at a basic node server and look at how we can import middleware and write our own:

```javascript
// import a server framework
import express from ‘express’
// import middleware
import { json, urlencoded } from ‘body-parser’
import Morgan from ‘Morgan’
import cors from ‘cors’

// define our port
const port = process.env.PORT || 3000

// create our server
export const app = express()

app.disable(‘x-powered-by’)

// use imported middleware
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(Morgan(‘dev’))

// define custom middleware
const log = (req, res, next) => {
  console.log(‘logging’)
  next() // next _with_ an argument is treated like an error
}

// apply a custom middleware solution (`log`) _before_ the callback controller on this route
app.get('/data', log, (req, res) => {
  res.send({ data: [1, 2, 3, 4] })
})

app.post(‘/data’, [log, log], (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

export const start = () => {
  app.listen(port, () => {
    console.log(`server running @${port}`)
  })
}
```

In the above example, we only apply our custom middleware `log` to the `.get` verb on the `/data` route and log _twice_ on the `.post` by passing in the middleware in an array. Another option would have been to add the middleware to every route, however, by using the `app.use` just like we did for the `cors`, `json`, etc. There are many other approaches. These are just some of the basics.

The important thing to remember is that controller functions (the functions passed into express’s app dot verb methods) are defined with three arguments (though the third is used primarily for middleware): `req` for request, `res` for response, and `next`. If next is defined, the controller looks for the next function to run. If it’s _not_, then the controller terminates the process and listens for another request.
