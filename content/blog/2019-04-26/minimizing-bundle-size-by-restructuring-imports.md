---
title: 'Minimizing bundle sizes by restructuring your imports'
date: '2019-04-26'
category: ['programming']
tags: ['bundle size', 'javascript modules', 'lodash', 'material-ui']
---

Using the example of importing the `material ui` into a file, we can see how this works.

```javascript
import * as materialUI from '@material-ui/core';
```

is equivalent (at least in terms of bundle size) to
```javascript
import { Step, StepConnector } from '@material-ui/core';
```

But, if we split the imports into more specific lines mCan become
```javascript
import Step from '@material-ui/core/Step'
import StepConnector from '@material-ui/core/StepConnector';
```

I saw this in a merge request from one of my peers who broke out the `{}` into distinct lines and I wasn’t clear on *why* — turns out it’s because of Webpack.

This article ([The Correct Way to Import Lodash Libraries - A Benchmark](https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark)) does a nice job of explaining *how* and *why* the different methods affect the bundle size using `lodash` as the basis.

I’d heard that `lodash` was built in a modular style to help minimize bundle sizes, but until I saw this in practice, I actually didn’t understand *how* it worked.

The tl;dr is that by only importing the `Step` and the `StepConnector`, Webpack doesn’t have to bundle the *entire* Material-UI library — only what I use. This *can* result in significantly smaller bundles  (like only *using* a small portion of a *large* library).

Whether or not savings are realized, knowing *how* it works can help me ask the right questions — which may ultimately speed up my website / app and improve user experience.