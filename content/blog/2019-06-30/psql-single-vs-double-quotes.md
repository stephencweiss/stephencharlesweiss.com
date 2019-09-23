---
title: 'The One About Quotes In Postgres - Single, Double, And Handling `non_snake_case` Fields'
date: '2019-06-30'
category: ['programming']
tags: ['postgres', 'error handling', 'syntax']
---

Imagine the following situation - you’re trying to select columns from a Postgres table

```sql
create table if not exists media (
    "MediaKey" text primary key
    , "ChangedByID" text
    , "MediaCategory" text
    , "MediaHTML" text
...
);
```

Let’s assume these are the only four fields you want to select and you want to do it where the `MediaCategory` is equal to Audio.

You might expect the following query to work:

```sql
SELECT MediaKey, ChangedByID, MediaCategory, MediaHTML
FROM media
WHERE MediaCategory = 'Audio';
```

In SQL, you’d be right.
If you’re using Postgres, you’d be wrong. Instead, you get a syntax error.

That’s because while SQL is _not_ case-sensitive, Postgres _is_. Even more confusingly, the engine will _automatically_ convert your strings to lower case, _unless_ instructed not too.

That’s where quotes can come in handy.

We already used single quotes to ensure that we match on the text literal, but trying that with `’MediaQuery’` is likely _not_ what you’re looking for. Instead, we need a Double Quotes.

```sql
SELECT "MediaKey", "ChangedByID", "MediaCategory", "MediaHTML"
FROM media
WHERE "MediaCategory" = 'Audio';
```

The best summary of the difference I found comes from Reuven Lerner’s blog<sup>1</sup>:

> Single quotes and double quotes in PostgreSQL have completely different jobs, and return completely different data types. Single quotes return text strings. Double quotes return (if you can really think of them as "returning" anything) identifiers, but with the case preserved.
> — Reuven Lerner

# Read More

- <sup>1</sup> [Teaching Python and data science around the world — Reuven Lerner](https://lerner.co.il/)
