---
title: 'Select And Calculate With Postgres Using Subqueries'
date: '2019-06-28'
publish: '2019-06-28'
category: ['programming']
tags: ['postgres', 'subquery', 'entity relationship']
---

I wanted to be able to retrieve a set of records from a database along with specific details from a related table. I knew SQL could accommodate this use-case, but I’d never actually done it — so, today I learned.

Imagine the following situation. Two tables, `my_table`, and `my_related_table`, are related through a foreign-key relationship (whether formal or not is not relevant here).

![ERD for My Table](https://res.cloudinary.com/scweiss1/image/upload/v1593195238/code-comments/erd-my-table_tvlqnt.png)

My desired row data will be:

```json
[
  {
    id: string,
    name: string,
    has_custom: boolean,
    num_enabled: number,
    num_related: number
  },
...
]
```

In this case, `has_custom` is derived by looking at all related records and identifying if _any_ are labeled as `is_custom`. Similarly, `num_enabled` is the _count_ of related records where `is_enabled` is true.

```SQL
SELECT t.id, t.name,
  EXISTS( SELECT * FROM my_related_table AS r WHERE r.lookup_id = t.id AND is_custom = TRUE) AS has_custom,
  ( SELECT COUNT(*) FROM my_related_table AS r WHERE r.lookup_id = t.id AND r.is_enabled = TRUE) AS num_enabled,
  ( SELECT COUNT(*) FROM my_related_table AS r WHERE r.lookup_id = t.id) AS num_related
FROM my_table AS t;
```

One thing to note - just as a column could be relabeled using as - so too can subquery results. Note the `AS xxx` following the subqueries on the `my_related_table` labels the columns in a more readable / communicative way versus the default `exists`/`count`.

![PSQL Query Return](https://res.cloudinary.com/scweiss1/image/upload/v1593195238/code-comments/psql-query-return_qk4kht.png)
