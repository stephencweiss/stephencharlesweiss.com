---
title: 'Adding a Unique Constraint To Postgres Tables After Creation'
date: '2019-08-17'
category: ['programming']
tags: ['postgres','alter table', 'unique', 'constraint']
---

How do you add a unique constraint to a table in Postgres if it’s already been created?

Most of the time, we add unique constraints to a table when we create them. Sometimes, we forget or don’t realize we need one until after the fact.

In those cases, we can use the `Alter Table` command to add a constraint. Let’s take a look at how we might do that.

# Commands
`ALTER TABLE <table_name> ADD CONSTRAINT <constraint_name> UNIQUE (<field> [,...]);`
This will add a unique constraint to the field(s) listed in the parentheses at the end of the command with the "name" of what’s put in the `<constraint_name>` part of the command.

## Example
```psql
sdc=# ALTER TABLE descriptions ADD CONSTRAINT uniq_prod_id UNIQUE (product_id);
ALTER TABLE
sdc=# \d descriptions;
                                        Table "public.descriptions"
    Column    |           Type           | Collation | Nullable |                 Default
--------------+--------------------------+-----------+----------+------------------------------------------
 id           | integer                  |           | not null | nextval('descriptions_id_seq'::regclass)
 product_name | character varying(255)   |           | not null |
 product_id   | integer                  |           | not null |
 features     | text[]                   |           | not null |
 tech_specs   | text[]                   |           | not null |
 created_at   | timestamp with time zone |           |          | CURRENT_TIMESTAMP
 updated_at   | timestamp with time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "descriptions_pkey" PRIMARY KEY, btree (id)
    "uniq_prod_id" UNIQUE CONSTRAINT, btree (product_id)
    "desc_id" btree (product_id)
```
NB: Adding a unique constraint is one of the ways in which to add an index. So, in this particular case, I added a unique constraint to the field `product_id`, and named it `uniq_prod_id`, but already had set a btree index on that field named `desc_id`.

## Caveat Emptor
If adding a constraint will result in violations, Postgres demands that the data be cleaned up before adding the constraint.

For instance, in the above example, we added a unique constraint on `product_id`. If, prior to adding that constraint, we’d added two records with a `product_id = 2`, then Postgres would reject alter table until the duplicates had been resolved and no violations would occur.

# Summary
Returning to the original question: How do you add a unique constraint to a table in Postgres if it’s already been created? Using the `ALTER TABLE` command gives us a convenient way as long as we have cleaned up our data in advance to ensure no violations exist to the new constraint.

## Footnotes
`\h ALTER TABLE` or [Alter Table | Postgres Docs](http://www.postgresql.org/docs/current/static/ddl-alter.html#AEN2303)for more on the Alter Table command.


