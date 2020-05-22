---
title: 'Delete Vs Truncate In SQL'
date: '2020-05-20'
publish: '2020-07-06'
category: ['programming']
tags: ['sql','truncate','delete','performance']
---

I was fiddling with some test databases recently when a colleague suggested I could wipe the entire database (without dropping the table) using a `TRUNCATE` command.

This got me wondering though - what's the _difference_ between `TRUNCATE` and `DELETE`?

The major differences seem to be:
1. **Performance**: `TRUNCATE` is typically _faster_ than `DELETE`
2. **Visibility**: `TRUNCATE` does _not_ log the records deleted, whereas `DELETE` does.
3. **Locking**: `TRUNCATE` locks the entire table. `DELETE` locks the _rows_ before deleting them. `DELETE` then is a better choice for a table with many concurrent users (since they'll still be able to transact with rows that are not being actively deleted)
4. **Conditions**: `TRUNCATE` doesn't take any conditions, whereas `DELETE` can accept a `WHERE` clause. The consequence - `TRUNCATE` can only "reset" a table to its empty state. `DELETE` can be used for more fine-tooth'd removal of rows.

```sql
TRUNCATE employees;
```

Is approximately the same as (though the _mechanisms_ differ):

```sql
DELETE employees;
```

Whereas there's no `TRUNCATE` equivalent to:
```sql
DELETE employees e
  WHERE e.firstName = 'John';
```

Sources:
- [Difference between Delete and truncate in sql query](https://www.tutorialspoint.com/difference-between-delete-and-truncate-in-sql-query)
- [SQL Truncate and Delete - Essential SQL](https://www.essentialsql.com/what-is-the-difference-between-truncate-and-delete-in-sql-server)
