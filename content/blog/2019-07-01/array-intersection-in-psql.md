---
title: 'Array Intersection In Postgres'
date: '2019-07-01'
category: ['programming']
tags: ['postgres', 'array', 'constraint', 'ddl']
---

Recently, I was building an API to modify the data in a database.

The field I was modifying happened to be an array, and I wanted to make sure that what the client was suggesting be added to the database was a valid value.

Each row happened to a pre-defined set of “available” classes — classes that _could_ be enabled or disabled. For example:
| id | classes_available | classes_enabled |
| -- | ----------------- | --------------- |
| 1 | { a, b, c} | {a} |
| 2 | { a, c, d } | { a, b, c} |
| 3 | { a, b, c, d, e} | { a } |
| 4 | { a, b} | { b } |

This was good news: I had the data readily available. The question was _how do I make use of it_? What I wanted to do was throw an error if the client tried to enable a class of `d` on any of the rows or even a class `c` on row ID 4.

Fortunately, PostgreSQL has a concept of array intersection built into the API for Array Operators¹.

The constraint formulation used the “contains” syntax (`@>`), though reversing the order I could easily have used the “is contained by” (`<@`).

To add the constraint, I added the `CONSTRAINT` to the DDL file for the table using the array operator.²

```sql
CREATE TABLE IF NOT EXISTS my_table (
    id text
    ...
    , classes_available text[]
    , classes_enabled text[]

    -- Constraint
    CONSTRAINT allowed_classes CHECK (classes_available @> classes_enabled)
);
```

Now, if a client were to try to send a value that wasn't contained by the `classes_available`, postgres would throw an error that would be sent back via the API call. This is great because I don't need to manage it separately.

# Resources

- ¹ [Array Functions and Operators | PostgreSQL](https://www.postgresql.org/docs/current/functions-array.html)
- ² [Data definition language | Wikipedia](https://en.wikipedia.org/wiki/Data_definition_language)
