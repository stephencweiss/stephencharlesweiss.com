---
title: 'Adding Columns To Postgres Tables After Creation'
date: '2019-08-18'
category: ['programming']
tags: ['postgres', 'alter table', 'add column']
---

If you already have a table created in Postgres, how can you modify it to add a new column?

Similar to [adding constraints after a table has been created](../../2019-08-17/psql-alter-table-unique-constraint), adding a column after table creation also takes advantage of the `ALTER TABLE` command - this time using `ADD COLUMN` instead of `ADD CONSTRAINT`.

Credit to Postgres Tutorial for the great tutorial which served as inspiration for the examples in this post<sup>1</sup>

# Command

```sql
ALTER TABLE table_name
ADD COLUMN new_column_name data_type [constraint];
```

To add multiple columns, comma separate the rows

```sql
ALTER TABLE table_name
ADD COLUMN new_column_name_1 data_type [constraint],
ADD COLUMN new_column_name_2 data_type [constraint],
[…]
ADD COLUMN new_column_name_n data_type [constraint],
```

In this way - each row is added very similarly to how you might within a `CREATE` statement.

The major difference is that unlike the `CREATE` - each column is prefixed with its own `ADD COLUMN` command:

```sql
CREATE TABLE customers (
id SERIAL PRIMARY KEY,
customer_name VARCHAR NOT NULL
);
```

## Example - Not Null Constraint

Imagine we had a `customers` table with only an `id` column. Now we want to add `customer_name` as a required field for each new record we add to our table. If we remembered to include the column on create, we would do something like above, where we mark it as `NOT NULL`.

In this case, however, we now have records in the table, and adding that constraint at this point will result in violations.

To handle this situation, two good options are available:

1. Add the column, update our records, and then _add_ the constraint
2. Add the column with the constraint and a default, update the records to replace all of the defaults

Personally - I prefer the former approach because it will be more clear whether the updates were sufficient, since Postgres will reject the constraint if they weren’t.

For example:

```sql
ALTER TABLE customers
ADD COLUMN customer_name VARCHAR NOT NULL
```

If we do _just_ this, we’ll get the error discussed above:

```sql
ERROR:column "contact_name" contains null values
```

### Option 1: Add constraint _after_ updating data

```sql
ALTER TABLE customers
ADD COLUMN customer_name VARCHAR NOT NULL

UPDATE customers
SET contact_name = ‘John Doe’
WHERE
ID = 1;

UPDATE customers
SET contact_name = ‘Mary Doe’
WHERE
ID = 2;

[…]
ALTER TABLE customers
ALTER COLUMN contact_name SET NOT NULL;
```

### Option 1: Add default

```sql
ALTER TABLE customers
ADD COLUMN customer_name VARCHAR NOT NULL DEFAULT ‘UNKNOWN’

UPDATE customers
SET contact_name = ‘John Doe’
WHERE
ID = 1;

UPDATE customers
SET contact_name = ‘Mary Doe’
WHERE
ID = 2;

[…]
ALTER TABLE customers
ALTER COLUMN contact_name
DROP DEFAULT;
```

# Summary

Returning to the original question, do we know how to answer it?

How do we modify an existing Postgres table to add a new column? When you need to add a column to a table in Postgres that already exists, use the `ALTER TABLE … ADD COLUMN` syntax.

Furthermore, if the new column requires a constraint - two approaches can help:

1. Add a default that will meet the constraint prior to updating the records or
2. Add the columns, update the columns, then add the constraint (my preference)

# Footnotes

-   <sup>1</sup> [PostgreSQL ADD COLUMN | Postgres Tutorial](http://www.postgresqltutorial.com/postgresql-add-column/)
