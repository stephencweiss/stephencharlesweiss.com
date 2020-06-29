---
title: 'Postgres Return Types In Node - Parse Strings To Whatever You Want'
date: '2019-11-13'
publish: '2019-11-28'
category: ['programming']
tags: ['psql', 'postgres', 'pg', 'node', 'types', 'typeparser']
---

By default the `node-postgres` returns everything from PostgreSQL as a string. Brian Carlson, the author of `pg`, provides a solution for fixing this with his package [pg-types](https://github.com/brianc/node-pg-types).

One of the examples in the README refers to using `moment` . This is exactly how we used it. For example:

```javascript
import * as moment from "moment-timezone";
import * as pg from "pg";

export const pool = new pg.Pool({});

// format timestamptz as a date with a timezone
pg.types.setTypeParser(1184, (val: string) => {
    const serverTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return val === null
        ? null
        : moment(new Date(Date.parse(val + “+0000”)))
              .clone()
              .tz(serverTz)
              .format(“YYYY-MM-DDTHH:mm:ss.SSSZZ”);
});
```

Note: `1184` is type `timestamptz`

```sql
<database_name>=> select typname, oid, typarray from pg_type where oid='1184' order by oid;
   typname   | oid  | typarray
-------------+------+----------
 timestamptz | 1184 |     1185

```

Curious about what else is available? You can see the full list of data-types available for parsing, with one command. Brian provided it in the README for `pg-types` (which is what inspired the above query).

Unfortunately when I gave it a try, I got an error:

```shell
$ psql -c "select typname, oid, typarray from pg_type order by oid;"
2019-11-13 14:50:45.206 EST [19753] FATAL:  database "stephen" does not exist
psql: FATAL:  database "stephen" does not exist
```

The fix was to log into the `psql` interactive shell. Once I did that, when I executed the query, everything worked as expected:

```sql
<database_name>=> select typname, oid, typarray from pg_type order by oid;
```

The result is a list of 384 different types to parse to your heart’s desire.

![type results](https://res.cloudinary.com/scweiss1/image/upload/v1593203549/type-results_vfy4tf.png)
