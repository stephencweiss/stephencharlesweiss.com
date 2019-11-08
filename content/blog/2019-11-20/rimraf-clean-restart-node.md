---
title: `Rimraf To Clean Restart A Node Server`
date: '2019-11-08'
publish: '2019-11-20'
category: ['programming']
tags: ['node', 'package.json', 'npm', 'rimraf']
---

One of the challenges of using `nodemon` to monitor changes to a node server and restart is if some changes get cached.

I came across [rimraf](https://www.npmjs.com/package/rimraf) in a project recently and it seems capable of handling this issue nicely.

Instead of having an npm script of

```json
"scripts": {
  "dev": "nodemon dist/index.js",
},
```

The project had the following chain:

```json
"scripts": {
  "build": "babel src —out-dir dist",
  "dev": "nodemon —exec npm run restart",
  "restart": "rimraf dist && npm run build && npm run start",
  "start": "node dist/index.js"
```

I thought this was clever. It’s an easy way to ensure that when you run your server, it’s a clean install of packages and you’re not looking at outdated code.
