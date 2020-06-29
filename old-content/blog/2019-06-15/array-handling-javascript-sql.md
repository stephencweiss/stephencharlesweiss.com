---
title: 'Array Handling: JavaScript to SQL'
date: '2019-06-15'
category: ['programming']
tags: ['postgres', 'sql', 'return']
---

Yesterday we updated a Postgres record’s details based on the `id` and returned the update in a [single query](../../2019-06-14/psql-return-statement).

What if the details was not a string value, but an array?

That's the topic for today.

Let’s start with what query might look like in SQL. It's worth noting that the use of `WITH…FROM` is because of how it can be extended to handle updating _multiple_ records at once, without the need to execute multiple `UPDATE` queries. That, however, is a topic for another day.

```SQL
WITH proposed_vals (id, details) as (values
	('123', Array['Pepsi','Coke'])
)
UPDATE target_table as t
SET details = proposed_vals.details
FROM proposed_vals
WHERE t.id = proposed_vals.id
RETURNING t.id, t.details;
```

The important thing to keep in mind is that the `Array[]` syntax isn’t accomplished by simply wrapping our `details` variable in Javascript. Using the same example as yesterday:

```javascript
import SQL, { SQLStatement } from "sql-template-strings";
...
async proposeChange({id, details}) {
...
  const [id, details] = proposal;
  const updateQuery = SQL(`
    WITH proposed_vals (id, details) as (values (${id}, Array[${details}])
...
    RETURNING t.id, t.details
    ;
  `);
  const data = await db.query(updateQuery);
  return { data };
}
```

This will be properly typed and so the query will execute, however, instead of passing an array of `['Pepsi', 'Coke']`, you’ll get `["{Pepsi, Coke}"]`.

A solution is to map over the details (which can be extracted into a helper function):

```javascript
import SQL, { SQLStatement } from "sql-template-strings";
...
async proposeChange({id, details}) {
...
  const [id, details] = proposal;
  const updateQuery = SQL(`
    WITH proposed_vals (id, details) as (values (${id}, `
        .append(SQL`Array[ `)
        .append(details.map(detail => SQL`${detail}`)))
        .append(` ]) `
        .append(SQL`
    UPDATE target_table as t
    SET t.details = proposed_vals.details
    FROM proposed_vals
    WHERE
      t.id = proposed_vals.id
    RETURNING t.id, t.details
    ;`);
  const data = await db.query(updateQuery);
  return { data };
}
```
