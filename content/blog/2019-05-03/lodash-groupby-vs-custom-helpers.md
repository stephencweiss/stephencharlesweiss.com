---
title: 'Lodash `_groupBy` Vs. Custom Helper Functions'
date: '2019-05-03'
category: ['programming']
tags: ['lodash', 'groupBy', 'learning']
---

Yesterday, I wrote about using [Lodash’s `pickBy`](https://www.stephencharlesweiss.com/2019-05-02/objects-undefined-values-and-lodash-pickby-identity/) to solve a problem.

The issue was that that wasn’t the _first_ time Lodash proved helpful. My first taste of reinventing the wheel instead of thinking first that Lodash might have an answer came a few weeks before when I was trying to massage an object into a very different shape.

The rationale was that with a little preprocessing, I could save time later with more a more appropriate lookup.

The general shape of the data was something like the following…

```javascript
const theShapeOfData = [
  {
    uniqId: 12345,
    text: 'lorem 1',
    groupId: 'aaa',
  },
  {
    uniqId: 12346,
    text: 'lorem 2',
    groupId: 'aaa',
  },
  {
    uniqId: 12347,
    text: 'lorem 3',
    groupId: 'bbb',
  },
]
```

And I wanted to turn it into this…

```javascript
const theGroupedData = {
  'aaa': [...],
  'bbb': [...]
}
```

Where the array was populated with the full object.

Having recently learned about [currying](https://www.stephencharlesweiss.com/2019-04-13/currying-an-introduction-with-function-declarations-and-expressions/) and knowing the `reduce` method could accomplish this, I created a helper function called `consolidateArray`. It looked something like this (some details removed for clarity):

```javascript
// utils
export default function consolidateArray(arr) {
  return arr.reduce(collapseObject, {})
}

function collapseObject(obj, curVal) {
  if (obj[curVal.groupId]) {
    obj[curVal.groupId] = [...obj[curVal.groupId], curVal]
  } else {
    obj[curVal.groupId] = [curVal]
  }
  return obj
}
```

Which I could then import and use like this:

```javascript
...
import consolidateArray from "./utils/";

...
const array = await fetchContent(filters);
const consolidatedNotes = consolidateArray(array);
return consolidatedNotes;
...
```

Now, I should note — this _works_. It worked like a charm actually.

But, Lodash had already implemented this and it’s called `groupBy`. Moreover, they’ve tested and optimized their code. And, since we already use Lodash I wasn’t adding to the bundle size by reaching for it (which, in any case, can be [mitigated with smarter imports](https://www.stephencharlesweiss.com/2019-04-26/minimizing-bundle-size-by-restructuring-imports/)).

ThisI could remove the entire helper function and replace it with one line of code, turning the above into the following:

```javascript
...
import groupBy from "lodash/groupBy";

...
const array = await fetchContent(filters);
const consolidatedNotes = groupBy(array, "groupId");
return consolidatedNotes;
...
```

Voila — same result. Significantly less code to read, understand or maintain.

One of my first projects to learn how to code was to reimplement large portions of Underscore, so it’s not like these concepts or libraries are new to me. I just haven’t quite gotten used to reaching for the tools at hand. I suppose that’s one of the marks of experience — when you know when to build a new tool vs. knowing that there’s a suitable one already out there that can be picked up easily.

// ORIGINAL - DO NOT POST

```javascript
import { republicDb } from '../core'
import {
  MissingInformationError,
  NotFoundError,
  UnauthorizedError,
} from '../DAL'
import { RelaxContext } from '../models'

import consolidateNotes from './utils/userNotes'

// Private method for validating the user's access.
const getUserId = (ctx: RelaxContext): string => {
  const userId = getUserId(ctx)
  const filters = { userId, isActive: true }
  const notes = await republicDb.userNotes.getNotesByUser(filters)
  const consolidatedNotes = consolidateNotes(notes)
  ctx.body = consolidatedNotes
}
```

```javascript
//src/controllers/utils/userNotes.ts b/src/controllers/utils/userNotes.ts
import { UserNotes as UserNoteModel } from 'republic'

export default function consolidateNotes(arr: UserNoteModel.RowData[]) {
  return arr.reduce(collapseObject, {})
}

function collapseObject(
  obj: UserNoteModel.ConsolidatedRows,
  curVal: UserNoteModel.RowData
) {
  if (obj[curVal.itemId]) {
    obj[curVal.itemId] = [...obj[curVal.itemId], curVal]
  } else {
    obj[curVal.itemId] = [curVal]
  }
  return obj
}
```

```javascript
/src/controllers/userNotes.ts
import { republicDb } from "../core";
 import { MissingInformationError, NotFoundError, UnauthorizedError } from "../DAL";
 import { RelaxContext } from "../models";
 import { groupBy } from "lodash";

 // Private method for validating the user's access.
 const getUserId = (ctx: RelaxContext): string => {
 export const getAllActiveNotes = async (ctx: RelaxContext) => {
     const userId = getUserId(ctx);
     const filters = { userId, isActive: true };
     const notes = await republicDb.userNotes.getNotesByUser(filters);

     const consolidatedNotes = groupBy(notes, "itemId");
     ctx.body = consolidatedNotes;
 };
```
