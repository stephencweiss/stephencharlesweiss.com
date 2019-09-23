---
title: 'Postgres Constraints And Arrays'
date: '2019-07-12'
category: ['programming']
tags: ['postgres', 'array', 'constraint']
---

I wrote in the past about using [constraints in the context of array operators in Postgres](../../2019-07-01/array-intersection-in-psql/). Today, however, I didn’t have a pre-defined array. So, when I tried to create rule that would limit my ability to insert values that were inappropriate, I leaned on the previous learnings and tried something like:

```sql
CHECK (related_date @> ARRAY['val1', 'val2', ...])
```
Where the `val1`, `val2`, etc. represented the hard coded values I was trying to check against.

That didn’t work, however, as Postgres threw an error: `ERROR: operator does not exist: text @> text[] Hint: No operator matches the given name and argument type(s). You might need to add explicit type casts.`

Okay, I can take a hint, let’s try explicit type casts:
```sql
CHECK ( related_date = ANY(ARRAY['val', 'other']::text[]) )
```

Notice that I’m no longer using the `@>` operator, however.

Good news: This works! But, it feels verbose and clumsy. Fortunately, I kept digging and I found a much simpler solution.

Because what I’m really asking is to check whether the value for `related_date` is _in_ an array, that’s the same as:
```sql
CHECK ( related_date in ('val', 'other') )
```

The same restriction functionality, but much much simpler.

The only thing left is to see if I can _reference_ a list defined elsewhere. Time will tell.

The latter solution was inspired by a lot of digging around the internet and particularly a conversation on StackOverflow.<sup>1</sup>

My favorite part about learning this was less about the specifics but the fact that it solves a problem elegantly by reframing _how_ I'm thinking about it.

## Footnotes
* <sup>1</sup> [Check if value exists in postgres array | StackOverflow](https://stackoverflow.com/questions/31695205/check-if-value-exists-in-postgres-array-for-partitioning-via-check-constraint)