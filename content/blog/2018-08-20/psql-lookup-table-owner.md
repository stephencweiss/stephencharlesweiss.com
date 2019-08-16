---
title: 'Postgres: Getting The Owner Of Tables'
date: '2019-08-20'
category: ['programming']
tags: ['postgres', 'table owner', 'information schema', 'pg catalog']
---

I was trying to modify a table today when I hit an error: `SQL Error [42501]: ERROR: must be owner of table XXX`.

To figure out _who_ the owner was so that I could ask them to modify the table on my behalf, I started searching and found a blog post addressing exactly my use case written by KCully six years ago. <sup>1</sup>

``` SQL
SELECT t.table_name, t.table_type, c.relname, c.relowner, u.usename
FROM information_schema.tables t
JOIN pg_catalog.pg_class c ON (t.table_name = c.relname)
JOIN pg_catalog.pg_user u ON (c.relowner = u.usesysid)
WHERE t.table_schema=‘public’;
```

The internet’s a beautiful place.

The results, however, were a little bit peculiar and while the table I was interested _was_ displayed, many of the others in our database were not present.

The issue was that joins.

Interestingly, the solution was quite simple:
```sql
select tablename, tableowner from pg_catalog.pg_tables where schemaname = ‘public’ ;
```

All of the schemas in our db are the default `public`, so to eliminate some of the tables Postgres provides, I included that filter. Other than that - the details I needed were present in the `table owner` column.

Note, if I wanted to look up the owner for a _single_ table, I could add that condition to the query _or_ by [using psql in the terminal](../../2018-08-19/access-psql-via-shell), I could use: `\dt <table name>`

```psql
postgres=> \dt metadata_rules
             List of relations
 Schema |      Name      | Type  |  Owner
--------+----------------+-------+---------
 public | metadata_rules | table | fmalone
(1 row)
```

# Footnotes
* <sup>1</sup> [PostgreSQL: Getting the owner of tables | Thoughts by CULLY](http://cully.biz/2013/12/11/postgresql-getting-the-owner-of-tables/)
* <sup>2</sup> [The Information Schema | PostgreSQL: ](https://www.postgresql.org/docs/9.1/information-schema.html)
