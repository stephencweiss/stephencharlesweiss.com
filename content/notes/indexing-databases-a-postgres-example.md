---
title: 'Indexing Databases - A Postgres Example'
date: '2018-11-22'
publish: '2018-11-22'
category: ['programming']
tags: ['benchmarks', 'databases', 'indexes', 'postgresql']
---

A short review of when and how to index a Postgres database.

# Common Commands

```sql
CREATE INDEX <index_name> ON <table_name> (<field(s)>) # Add an index
DROP INDEX index_name; # Drop an index
\d <table_name>; # See all indexes on a table
\di; # See all indexes in a database
```

# Why Index Your Postgres Table

The two most common reasons to index a database are:

1. A table is large and queries take a long time
2. A program consistently searches the same attribute

## Speed Benefits - A Practical Example

The easier of the two to see is time to execute a query.

Situation: I have a product descriptions table with 10m+ records. In order to serve my website, I need to find and retrieve descriptions for a specific description quickly.

```sql
//psql
sdc=# EXPLAIN ANALYZE SELECT * FROM descriptions WHERE product_id = 98242;
                                                             QUERY PLAN
------------------------------------------------------------------------------------------------------------------------------------
 Gather  (cost=1000.00..671780.94 rows=1 width=461) (actual time=28182.350..28187.140 rows=1 loops=1)
   Workers Planned: 2
   Workers Launched: 2
   ->  Parallel Seq Scan on descriptions  (cost=0.00..670780.84 rows=1 width=461) (actual time=19120.669..28177.305 rows=0 loops=3)
         Filter: (product_id = 98242)
         Rows Removed by Filter: 33334
 Planning time: 0.187 ms
 Execution time: 28187.219 ms
(8 rows)

sdc=# CREATE INDEX desc_prod_id_index ON descriptions (product_id);
CREATE

sdc=# EXPLAIN ANALYZE SELECT * FROM descriptions WHERE product_id = 98242;
                                                        QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on descriptions  (cost=4.30..8.31 rows=1 width=461) (actual time=0.022..0.023 rows=1 loops=1)
   Recheck Cond: (product_id = 98242)
   Heap Blocks: exact=1
   ->  Bitmap Index Scan on desc_prod_id_index  (cost=0.00..4.30 rows=1 width=0) (actual time=0.016..0.016 rows=1 loops=1)
         Index Cond: (product_id = 98242)
 Planning time: 2.790 ms
 Execution time: 3.579 ms
(7 rows)
```

Before adding an index, it took `28k+ ms` to find my product. After adding an index, the time to complete the same query fell to `3.579ms`. That's equivalent to 99.99% reduction!

Not bad for a single line of code!

# Types Of Indexes

The default index type for Postgres is the B-tree, which is also the default and well suited for common situations. There are other types available, however, including:

-   Hash
-   GiST,
-   SP-GiST, and
-   GIN

# The Cost Of Indexing

While indexing has benefits, it comes with costs too. Specifically, indexing will slow down inserting / updating records on a table.

# When To Avoid Indexes

Indexing is not for every situation. Some scenarios in which you should pause before creating an index include:

-   If your table is small
-   Tables that have frequent, large updates / insertions of records
-   On fields where _null_ is a common value
-   Fields are that are commonly updated

# Other Note Worthy Points Regarding Indexes

## Implicit Indexes

Implicit indexes are automatically created by Postgres for fields that have a primary key or unique constraint.

## Partial Indexes

Partial indices are built on a subset of a table based on a conditional statement. Therefore, the index only applies to the rows which satisfies the conditional.

To create a partial index, use the following: `sql> CREATE INDEX <index_name> ON <table_name> (<conditional_expression>)`

# Further Reading

[Postgres Docs](https://www.postgresql.org/docs/9.1/sql-createindex.html)

[Tutorials Point: PostgreSQL Indexes](https://www.tutorialspoint.com/postgresql/postgresql_indexes.htm)
