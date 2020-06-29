---
title: 'Check For Duplicates - COUNT, CASE, and EXIST In Postgres'
date: '2019-07-16'
publish: '2019-07-16'
category: ['programming']
tags: ['postgres', 'exist', 'duplicates', 'commands']
---

Before I write to a database, I want to make sure that I don’t create a duplicate record based on the name and parent record id.

To accomplish that, I want to abort early and alert the client if the name they’ve provided is a duplicate.

The pseudocode looks something like:

```javascript
const createNewRecord({name, parent_id}) => {

const duplicate = await checkForDuplicate({name, parent_id})
if (duplicate) throw new Error(`Oy! A duplicate. Try a different name. We already have a value for --> `, ${name})

const data = await this.pool.query(SQL`
-- insert query
`);
return data.rows;
```

I’ve written previously about [how to insert values into tables with Postgres](psql-insert-multiple-values/), but what I wasn’t sure about was how to write a query that would return a boolean value for duplicates (i.e. SQL query to use in `checkForDupcliate`)
(Note: I’m writing in Javascript and interpolating SQL statements using `sql-template-string`)

## Start With COUNT(\*)

One way to figure out if any records exist would be to count the total that meet a condition using `COUNT(*)`.

For example:

```sql
SELECT COUNT(*) FROM my_table
  WHERE parent_id = ${parent_id}
  AND name ILIKE ${name};
```

This _is_ asking a different question, however. Instead of asking a true/false question, I’m now asking how many.
My conditional in Javascript would no longer be `if (duplicate)` but more reasonably `if (count > 0)`.

From a purely computational perspective, counting is more expensive than checking for the existence of something.

## Move On To Conditionals

Instead of the count, we can use the `CASE` conditional. The `CASE` is a generic conditional expression in Postgres.

The [Postgres documentation for CASE](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-CASE) provides the following definition:

```sql
CASE WHEN condition THEN result
     [WHEN ...]
     [ELSE result]
END
```

Great, but what is my condition?

In this case, all I care about is if something exists… which is convenient, because [Postgres’ EXIST](https://www.postgresql.org/docs/current/functions-subquery.html#FUNCTIONS-SUBQUERY-EXISTS) checks for exactly that.

`EXIST` is one of several subquery expressions (similar to `IN`, `NOT IN`, `ALL`, etc.).

It takes a subquery and evaluates to `true` if rows are returned by the subquery and `false` otherwise.

The resulting query might look like:

```sql
SELECT CASE WHEN EXISTS (
  SELECT * FROM my_table
  WHERE parent_id = ${parent_id}
  AND name ILIKE ${name}
  ) THEN TRUE::bool
  ELSE FALSE::bool
END `;
```

## Refactoring Time: Dropping Case

This `CASE` approach works. But, it’s unnecessary. If I wanted to return something _other_ than a boolean I could use `CASE`. E.g.,

```sql
SELECT CASE WHEN EXISTS (
  SELECT * FROM my_table
  WHERE parent_id = ${parent_id}
  AND name ILIKE ${name}
  ) THEN 'exists'::text
  ELSE 'does not exist'::text
END `;
```

But that’s not what I’m looking for. I just need `TRUE`/`FALSE` which is what the `EXIST` returns natively.

As a result, I simplified the query to the following:

```sql
SELECT EXISTS (
  SELECT * FROM my_table
  WHERE parent_id = ${parent_id}
  AND name ILIKE ${name}
  ) AS exists `
```

## Additional Reading

-   [Avoid Using COUNT() in SQL When You Could Use EXISTS() | jOOQ.](https://blog.jooq.org/2016/09/14/avoid-using-count-in-sql-when-you-could-use-exists/)
-   [Fastest check if row exists in PostgreSQL | Stack Overflow](https://stackoverflow.com/questions/7471625/fastest-check-if-row-exists-in-postgresql)
