---
title: 'Express Router’s Route Method'
date: '2019-11-08'
publish: '2019-11-23'
category: ['programming']
tags: ['restful', 'express', 'router', 'route']
---

When it comes to RESTful APIs, there’s not a ton of availability to be creative - at least in terms of the names of the APIs. You’re going to map pretty neatly to the CRUD methods with POST, GET, PATCH/PUT and DELETE.

That being the case, one of my favorite APIs on the Express Router is the `.route` method. Imagine a pretty standard API for houses.

We’ll want to be able to create, read, update, and delete. If it’s reading, updating, or deleting a house record we’ll need an id. If it’s creating one or more records or getting many - we won’t.

That means for most things we’ll have 5-6 routes that are all variants of: `/house` and `/house/:id`.

Instead of writing out each route and potentially fat-fingering a route, like so:

```javascript
const app = express.app();
const houseRouter = express.Router()
houseRouter.get(‘/‘, (req, res) => {/* ... */})
houseRouter.post(‘/‘, (req, res) => {/* ... */})
houseRouter.get(‘/:id‘, (req, res) => {/* ... */})
houseRouter.patch(‘/:id‘, (req, res) => {/* ... */})
houseRouter.put(‘/:id‘, (req, res) => {/* ... */})
houseRouter.delete(‘/:id‘, (req, res) => {/* ... */})

app.use(‘/house’, houseRouter);
```

We can simplify our lives with the `.route` method:

```javascript
const app = express.app();
const houseRouter = express.Router()
houseRouter.route(‘/‘)
  .get((req, res) => {/* ... */}))
  .post((req, res) => {/* ... */}))

houseRouter.route(‘/:id‘)
  .get((req, res) => {/* ... */}))
  .patch((req, res) => {/* ... */}))
  .put((req, res) => {/* ... */}))
  .delete((req, res) => {/* ... */}))

app.use(‘/house’, houseRouter);
```

This doesn’t necessarily save lines of code — but from a readability perspective and reduction of errors, it seems valuable to know about.

For more, check out the [Express documentation on the Router route method](https://expressjs.com/en/4x/api.html#router.route).
