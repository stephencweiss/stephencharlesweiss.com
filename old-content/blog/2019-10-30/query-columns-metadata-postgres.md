---
title: 'Postgres: How To Query Column Labels For A Table'
date: '2019-10-30'
category: ['programming']
tags: ['postgres', 'metadata', 'information_schema', 'columns']
---

What if, instead of a table’s _data_, you wanted to see the table’s metadata? That is, instead of querying all of the rows within a table where x or y are true, you wanted to see a list of all of the columns where z is true.

How would you do that?

It’s actually quite simple:

```sql
SELECT *
FROM information_schema.columns
WHERE table_name = 'target_table'
AND table_schema = 'target_schema';
```

The `table_schema` is required only if you have multiple schemas you’re choosing between. If all tables are in the `public` schema or if there’s only a single table with the name, it can be excluded .

If you’re using the command line, it appears that `\d+ <target_table>` would also work.
