---
title: 'Express Routers'
date: '2019-11-08'
publish: '2019-11-22'
category: ['programming']
tags: ['express','node','router']
---
As apps grow, the number of routes can balloon. More than that, you may need custom middleware for certain routes and not others - whether that’s a different logger, authentication, or something else. 

Express makes it easy to separate out routes by defining them within a `Router` and then mounting the router back to the main application. 

The convention is to call the main Express application, `app` - and it’s defined as `const app = express()`. 

In the example below, we create a separate router, with a `cors` middleware that’s _not_ present on the main app. 

We then mount the router on the `/api` path. 

``` javascript
export const app = express()

const port = process.env.PORT || 3000

app.disable('x-powered-by')

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get(‘/‘ (req, res) => {
  res.send({ data: ‘root router’ })
})

const router = express.Router()
router.use(cors())
router.get('/', (req, res) => {
  res.send({ data: ‘api router’ })
})

app.use(‘api’, router)
```

If I were to start this server and send a `GET` request to the root, I would get the JSON object `{ data: ‘root router’}` in response. However, if I were to do the same request, but to the `/api` route, I would receive `{ data: ‘api router’ }` because I mounted the router to the `api` path. 

More commonly, you will see routers split into separate files and then imported back in - but for this simple example, I thought it was easier to see it all on one page. 

