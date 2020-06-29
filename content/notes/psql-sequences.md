---
title: 'Sequences in Postgres'
date: '2019-07-19'
publish: '2019-07-19'
category: ['programming']
tags: ['postgres', 'sequence', 'nextval']
---

The `SEQUENCE` in Postgres is a number generator.<sup>1</sup> Once created, they can be managed with sequence operators.<sup>2</sup>

So, why use them? One reason would be to auto-increment a text based field.

For example, imagine you want to create a new record in a row, but the IDs for that row are not auto-generated to allow for prefixes.

Imagine you have a standard database table that you roll out to all of your clients with the the following records in the table, `cars`:

| id  | make       | is_custom |
| --- | ---------- | --------- |
| '1' | 'Acura'    | false     |
| '2' | 'Honda'    | false     |
| '3' | 'Ford'     | false     |
| '4' | 'Chrysler' | false     |

When a user gets their hands on the table, they’re not satisfied with only four options and want to add a new row.

Rather than use a `MAX` statement to get the current max and increment the value, maintaining a sequence enables Postgres to manage that on our behalf.

As part of the creation sequence for the database, run

```sql
CREATE SEQUENCE IF NOT EXISTS car_custom_ids;
```

Now, instead of having to run a separate query to calculate the new `id` value, we can use `nextval()` on insert like so:

```sql
INSERT INTO test_data
        (id, make, is_custom)
VALUES
   ( (nextval('car_custom_ids')), 'Batmobile', true )
 RETURNING *
;
```

This will add a new row to the database exactly where you’d like it:

| id  | make        | is_custom |
| --- | ----------- | --------- |
| '1' | 'Acura'     | false     |
| '2' | 'Honda'     | false     |
| '3' | 'Ford'      | false     |
| '4' | 'Chrysler'  | false     |
| '5' | 'Batmobile' | true      |

The biggest lesson I had in learning about Sequences is: if you choose to use a sequence - it’s better to _always_ use it. By creating a Sequence, Postgres keeps track of where I am — but in order for that to work as expected, I shouldn’t do math that’s hidden from Postgres.

For example - I thought that I could just insert records into the table and Postgres would pick up where I left off — this wasn’t the case (which makes sense). That’s why the initial load of the table should use the sequence, just like all future `INSERT` calls.

I’ve also put together a DB-Fiddle to show how it works.<sup>3</sup>

## Footnotes

-   <sup>1</sup> [CREATE SEQUENCE | PostgreSQL](https://www.postgresql.org/docs/current/sql-createsequence.html)
-   <sup>2</sup> [Sequence Manipulation Functions | PostgreSQL](https://www.postgresql.org/docs/current/functions-sequence.html)
-   <sup>3</sup> [DB Fiddle - SQL Database Playground](https://www.db-fiddle.com/f/bZCdYdjeSJMxToQsDXPwi2/1)

```sql
CREATE TABLE test_data (
  id TEXT PRIMARY KEY,
  make TEXT,
  is_custom BOOL
);

CREATE SEQUENCE IF NOT EXISTS car_custom_ids;

-- INITIAL LOAD
INSERT INTO  test_data (id, make, is_custom) VALUES
( (nextval('car_custom_ids')), 'Acura', false),
( (nextval('car_custom_ids')), 'Honda', false),
( (nextval('car_custom_ids')), 'Ford', false),
( (nextval('car_custom_ids')), 'Chrysler', false);

-- INSERT WITH SEQUENCE
INSERT INTO test_data
        (id, make, is_custom)
VALUES
   ( (nextval('car_custom_ids')), 'Batmobile', true )
 RETURNING *
;

-- QUERY RESULTS
SELECT * FROM test_data;

```
