---
title: 'Error Handling: permission denied for sequence _id_seq…'
date: '2018-11-20'
publish: '2018-11-20'
category: ['programming']
tags: ['error handling', 'postgres', 'sequence']
---

Recently, I was using NodeJS to write directly to a Postgres database when I got an error beginning with: `{ error: permission denied for sequence descriptions_id_seq ...}`

What follows are the steps I took to resolve it as well as a little background on sequences, why it happened, and context for how it happened.

# The Solution

Let's start with the important stuff. Fixing this is a simple three step process:

1. Log into the `psql` shell as a superuser (`shell> $ psql postgres`)
2. Connect to the database in question (`sql> \connect <database>`)
3. Grant privileges on the sequence to the user who needs them. (`sql> <database>=# grant all on sequence <table_name>_id_seq to <user>;`)

```sql
sdc=# GRANT ALL ON SEQUENCE descriptions_id_seq TO sdc;
GRANT
```

How I read this command:

-   `sdc=#` means that I'm connected to the database `sdc` and the `=#` means that I have superuser privileges
-   `GRANT ALL ON SEQUENCE descriptions_id_seq` means that I'm granting all privileges on sequence, which is a table
-   `TO sdc` the user(role) that is being granted the privileges is _also_ named sdc.

# What Are Sequences?

Sequences are useful for auto-incrementing fields and use `bigint` arithmetic by default. However, sequences are not fields, but are actually special, [single-row tables](https://www.postgresql.org/docs/current/sql-createsequence.html).

As a table, access to the sequences’ functions can require explicit permission depending on the user.

That was the issue in my case. Even though my user, `sdc`, could modify / retrieve / delete rows that already existed in the table - it couldn’t add a new row because it didn’t have access to the Sequence functions.

# Background Details

I have a bias against using super users wherever possible, so before starting, I created a new user `sdc`, and granted access to my database and tables: Here's `sdc`'s access to the database using the `\l` list command with in `psql` shell.

```sql
postgres=# \l
                                 List of databases
    Name     |  Owner  | Encoding |   Collate   |    Ctype    |  Access privileges
-------------+---------+----------+-------------+-------------+---------------------
 my_database | sdc     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =Tc/sdc            +
             |         |          |             |             | sdc=CTc/sdc
 postgres    | Stephen | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 sdc         | Stephen | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =Tc/Stephen        +
             |         |          |             |             | Stephen=CTc/Stephen+
             |         |          |             |             | sdc=CTc/Stephen
 template0   | Stephen | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/Stephen         +
             |         |          |             |             | Stephen=CTc/Stephen
 template1   | Stephen | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/Stephen         +
             |         |          |             |             | Stephen=CTc/Stephen
(5 rows)
```

And here is `sdc`'s access to the table verified using the `\dp <tablename>` command).

```sql
sdc=# \dp descriptions
                                   Access privileges
 Schema |     Name     | Type  |    Access privileges    | Column privileges | Policies
--------+--------------+-------+-------------------------+-------------------+----------
 public | descriptions | table | Stephen=arwdDxt/Stephen+|                   |
        |              |       | sdc=arwdDxt/Stephen     |                   |
```

Finally, here's the code that I was using that threw the error:

```javascript
//insertToPostgres.js
const { client } = require('pg');
const config = require('../config.json');
...
const table = 'descriptions';
const fields = 'product_id, product_name, features, tech_specs'
const host = config.host;
const user = config.username;
const pw = config.password;
const db = config.database;
const port = config.port;
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`;

const client = new Client({
  connectionString: conString,
});
client.connect();

...
const insertQueryText = 'INSERT INTO descriptions (product_id, product_name, features, tech_specs) VALUES ($1, $2, $3, $4) RETURNING *';
const insertQueryValues = [record.productId, record.productName, record.features, record.techSpecs];
client.query(insertQueryText, insertQueryValues)
  .then(res => console.log(res))
  .catch(err => console.error(chalk.red(`There was an error! --> `), err))
...
```

Fortunately, it's a simple fix and now I understand more about Sequences!

![](https://media.giphy.com/media/3og0IMJcSI8p6hYQXS/giphy.gif)

# Further reading

[PostgreSQL: Documentation: 11: CREATE SEQUENCE](https://www.postgresql.org/docs/current/sql-createsequence.html)

[PostgreSQL: Documentation: 11: 9.16. Sequence Manipulation Functions](https://www.postgresql.org/docs/current/functions-sequence.html)

[postgresql - Explicitly granting permissions to update the sequence for a serial column necessary? - Database Administrators Stack Exchange](https://dba.stackexchange.com/questions/71528/explicitly-granting-permissions-to-update-the-sequence-for-a-serial-column-neces)

# Footnote

-   Confusingly, my user and database are _both_ named `sdc` — a lesson for the future!
