---
title: 'Handling Empty Arrays With Postgres'
date: '2019-06-18'
category: ['programming']
tags: ['postgres', 'sql', 'return', 'error handling']
---

A few days ago, I wrote about handling arrays from [Javascript to SQL](../../2019-06-15/array-handling-javascript-sql).

Turns out, I missed an edge case - empty arrays.

If you try to set an array to be empty in Postgres without casting its type, you’ll receive an error:

> error: cannot determine type of **empty array** at character xx...

The best solution I’ve found is to cast the array explicitly. For example, if the field is an array of strings normally, set the value equal to `Array[]::text[]`.

When I wrote the original function a few days ago, I mentioned it’d be a good candidate to extract as a helper.

Let’s look at that here and assign a default `arrayType` - but allow it to be flexed based depending on the table / use case.<sup>1</sup>

```javascript
import SQL, { SQLStatement } from "sql-template-strings";

const arrayHelper = (statements: any[], arrayType: string = “text”): SQLStatement => {
    const result =
        statements.length > 0
            ? SQL`Array[ `.append(statements.map(element => SQL`${element}`)).append(` ] `)
            : SQL`Array[]::${arrayType}[]`;
    return result;
};

...
async proposeChange({id, details}) {
...
  const [id, details] = proposal;
  const updateQuery = SQL(`
    WITH proposed_vals (id, details) as (values (${id}, `
        .append(arrayHelper(details))
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

Voila. Edge case handled.

<sup>1</sup> There may be a slight nuance here in how these statements are mapped and joined. In practice, I also used a separate helper for that as well which is abstracted away here.
