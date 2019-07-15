---
title: 'Copying Data From One Column To Another With SQL'
date: '2019-03-08'
category: ['programming']
tags: ['mysql', 'postgres', 'queries', 'common commands']
---

If you need to copy all data from one column to another column in SQL, use the `UPDATE` method.

If it’s a simple copy for copy, without conditionals, across tables, etc., the query is simply:

```sql
UPDATE `table_name` SET
	`destination_column` = `source_column`
```

The full set of options :

```sql
[ WITH [ RECURSIVE ] with_query [, …] ]
UPDATE [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    SET { column_name = { expression | DEFAULT } |
          ( column_name [, …] ) = [ ROW ] ( { expression | DEFAULT } [, …] ) |
          ( column_name [, …] ) = ( sub-SELECT )
        } [, …]
    [ FROM from_list ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, …] ]
```

Full documentation on `UPDATE` in Postgres for the current version (11), is here: [PostgreSQL: Documentation: 11: UPDATE](https://www.postgresql.org/docs/current/sql-update.html)

For more discussions, see StackOverflow:

- Postgres discussion: [How can I copy data from one column to another in the same table](https://stackoverflow.com/questions/6308594/how-can-i-copy-data-from-one-column-to-another-in-the-same-table)
- MySQL discussion: [mysql - Copy values from one column to another in the same table - Stack Overflow](https://stackoverflow.com/questions/9001939/copy-values-from-one-column-to-another-in-the-same-table)

Turns out that at least in the simplest case, Postgres and MySQL are identical.
