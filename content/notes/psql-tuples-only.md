---
title: 'Postgres Tuples Only'
date: '2019-11-11'
publish: '2019-11-25'
category: ['programming']
tags: ['postgres', 'psql', 'interactive terminal', 'tuples only']
---

If you’re just learning how to use Postgres from the terminal (as I am), sometimes you click the wrong button and don’t know what it does, then later, you realize something’s not quite right but don’t know how to fix it.

That’s what happened recently when I accidentally turned tuples only on (`\t`).

When I queried a table, only the results printed - not the column headers.

So, when querying a user table, I got the following:

```shell
onething=> select * from users;
  1 | stephen   | stephen@me.com |
  2 | fake user | fake@user.com  |
```

It’s not a complicated table, and it’s test data - so I could put the pieces together, but I knew one day, I’d want to see the headers.

That’s when I found that I’d accidentally fat-fingered turning Tuples only on.

Once I reversed it:

```shell
db=> \t
Tuples only is off.
```

My query produced the table headers as expected:

```shell
db=> select * from users;
 id |   name    |     email      | password
----+-----------+----------------+----------
  1 | stephen   | stephen@me.com |
  2 | fake user | fake@user.com  |
(2 rows)
```

To see the full list of options us the `\?` option from the command line, but for more, you can see the [documentation on the interactive terminal](https://www.postgresql.org/docs/current/app-psql.html) on the Postgres site.

And now I know about tuples only mode in Postgres! Won’t make that mistake again.
