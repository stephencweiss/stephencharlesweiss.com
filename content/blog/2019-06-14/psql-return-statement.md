---
title: 'Postgres `RETURNING` statement'
date: '2019-06-14'
category: ['programming']
tags: ['postgres', 'sql', 'return']
---

Often, after making a change to a database, we want to verify that the change was made and use the updated rows.

A naïve approach would be to run two queries:

1. Use an `INSTERT`/`UPDATE` statement to make desired changes.
2. Once that's finished run `SELECT` statement and filter to just the affected rows.

A better approach is to use the `RETURNING` statement that's available in Postgres to remit only the affected rows.

An example Javascript and the `sql-template-strings` library:

```javascript
import SQL, { SQLStatement } from "sql-template-strings";
...
async proposeChange({id, details}) {
...
  const [id, details] = proposal;
  const updateQuery = SQL(`
    WITH proposed_vals (id, details) as (values (${id}, ${details})
    UPDATE target_table as t
    SET t.details = proposed_vals.details
    FROM proposed_vals
    WHERE
      t.id = proposed_vals.id
    ;
  `);
  await db.query(updateQuery);

  //Construct a second query to get pertinent details back and validate change
  const returnQuery = SQL(`
    SELECT id, details
    FROM target_table
    WHERE id in (${id})`);

  const data = await db.query(returnQuery);
  return { data };
}
```

We can refactor this to use a `RETURN` statement in the following way:

```javascript
import SQL, { SQLStatement } from "sql-template-strings";
...
async proposeChange({id, details}) {
...
  const [id, details] = proposal;
  const updateQuery = SQL(`
    WITH proposed_vals (id, details) as (values (${id}, ${details})
    UPDATE target_table as t
    SET t.details = proposed_vals.details
    FROM proposed_vals
    WHERE
      t.id = proposed_vals.id
    RETURNING t.id, t.details
    ;
  `);
  const data = await db.query(updateQuery);
  return { data };
}
```
