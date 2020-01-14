---
title: 'Handling Incompatible PostgreSQL Versions'
date: '2020-01-09'
publish: '2020-01-24'
category: ['postgres']
tags: ['pg_upgrade','psql','version']
---

I tried to start a PostgreSQL database yesterday from the command line and I was greeted with the error:
```shell
$ pg_ctl -D /usr/local/var/postgres start
waiting for server to start....2020-01-09 09:13:57.308 EST [49293] FATAL:  database files are incompatible with server
2020-01-09 09:13:57.308 EST [49293] DETAIL:  The data directory was initialized by PostgreSQL version 11, which is not compatible with this version 12.1.
 stopped waiting
pg_ctl: could not start server
Examine the log output.
```

I'm not sure _how_, but it seems that PostgreSQL was upgraded and while my data's safe, I need to update it to work with the new version of Postgres.

First, the good news: Postgres provides `pg_upgrade`<sup>1</sup> which makes fixing this problem _relatively_ straight forward.

## Steps
These steps are adapted by [10ninox](http://blog.10ninox.com/2015/01/psql-database-incompatible/)'s summary:
1. Make a backup of your existing library: `$ mv /usr/local/var/postgres /usr/local/var/postgres.backup`
2. Initialize a new database: `$ initdb /usr/local/var/postgres`
3. Make sure all Postgres servers are stopped and upgrade: `$ pg_upgrade -b /usr/local/Cellar/postgresql/11/bin -B /usr/local/Cellar/postgresql/12.1/bin -d /usr/local/var/postgres.backup -D /usr/local/var/postgres`<sup>2</sup>

The pattern here, from the docs, is: `$ pg_upgrade -b oldbindir -B newbindir -d olddatadir -D newdatadir`

At this point, you should be able to start your Postgres server and continue working!

## Footnotes and Resources
- <sup>1</sup> The `pg_upgrade` manual page has a good tutorial and explanation. The options are copied below for 12.1.
- <sup>2</sup> This is where I ran into problems. I couldn't actually locate the old executable (the `-b` option). In my case, I'm in a fortunate position where I don't actually need to retain the data, so, I could wipe everything and be okay. That won't always be the case though. With that in mind, I"m trying to dig into what actually happened and hope to have an update in the future.

> ```shell
> initdb --help
> initdb initializes a PostgreSQL database cluster.
>
> Usage:
>   initdb [OPTION]... [DATADIR]
>
> Options:
>   -A, --auth=METHOD         default authentication method for local connections
>       --auth-host=METHOD    default authentication method for local TCP/IP connections
>       --auth-local=METHOD   default authentication method for local-socket connections
>  [-D, --pgdata=]DATADIR     location for this database cluster
>   -E, --encoding=ENCODING   set default encoding for new databases
>   -g, --allow-group-access  allow group read/execute on data directory
>       --locale=LOCALE       set default locale for new databases
>       --lc-collate=, --lc-ctype=, --lc-messages=LOCALE
>       --lc-monetary=, --lc-numeric=, --lc-time=LOCALE
>                             set default locale in the respective category for
>                             new databases (default taken from environment)
>       --no-locale           equivalent to --locale=C
>       --pwfile=FILE         read password for the new superuser from file
>   -T, --text-search-config=CFG
>                             default text search configuration
>   -U, --username=NAME       database superuser name
>   -W, --pwprompt            prompt for a password for the new superuser
>   -X, --waldir=WALDIR       location for the write-ahead log directory
>       --wal-segsize=SIZE    size of WAL segments, in megabytes
>
> Less commonly used options:
>   -d, --debug               generate lots of debugging output
>   -k, --data-checksums      use data page checksums
>   -L DIRECTORY              where to find the input files
>   -n, --no-clean            do not clean up after errors
>   -N, --no-sync             do not wait for changes to be written safely to disk
>   -s, --show                show internal settings
>   -S, --sync-only           only sync data directory
>
> Other options:
>   -V, --version             output version information, then exit
>   -?, --help                show this help, then exit
>
> If the data directory is not specified, the environment variable PGDATA
> is used.
>
> Report bugs to <pgsql-bugs@lists.postgresql.org>.
> ```