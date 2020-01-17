---
title: 'PostgreSQL: User vs Role'
date: '2020-01-09'
publish: '2020-01-25'
category: ['postgres']
tags: ['psql','user','role','group']
---

I was working in Postgres recently and realized that I was confused about whether or not to use the `alter user` or `alter role` command.

Heading to StackOverflow, I found an interesting conversation: [What is the difference between a user and a role](https://stackoverflow.com/questions/27709456/what-is-the-difference-between-a-user-and-a-role).

The [top answer was fascinating](https://stackoverflow.com/a/27709582). The tl:dr; in PostgreSQL a `role` combines two other concepts: `user` and `group`. As a result, `ALTER USER` and `ALTER GROUP` are just aliases for `ALTER ROLE`.

Full answer copied below:

> Previous versions of Postgres, and some other DB systems, have separate concepts of "groups" (which are granted access to database objects) and "users" (who can login, and are members of one or more groups).
>
> In modern versions of Postgres, the two concepts have been merged: a "role" can have the ability to login, the ability to "inherit" from other roles (like a user being a member of a group, or a group being a member of another group), and access to database objects.
>
> For convenience, many tools and manuals refer to any user with login permission as a "user" or "login role", and any without as a "group" or "group role", since it is useful and common practice to keep roughly to that structure. This is entirely a convention of terminology, and to understand the permissions, you need only understand the options available when [creating roles](http://www.postgresql.org/docs/current/interactive/sql-createrole.html) and [granting them access](http://www.postgresql.org/docs/current/interactive/sql-grant.html).
>
> Again purely for convenience, Postgres still accepts commands using the old terminology, such as [`CREATE USER`](https://www.postgresql.org/docs/current/sql-createuser.html) and [`CREATE GROUP`](https://www.postgresql.org/docs/current/sql-creategroup.html) which are both aliases for [`CREATE ROLE`](https://www.postgresql.org/docs/current/sql-createrole.html). If you write `CREATE USER`, the `LOGIN` permission will be added to the new role by default, to emulate the old behaviour when that was a separate command.
