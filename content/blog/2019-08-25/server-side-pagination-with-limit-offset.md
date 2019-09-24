---
title: 'Server-Side Pagination With Limit/Offset'
date: '2019-08-25'
category: ['programming']
tags: ['server side', 'pagination', 'postgres']
---

How do you limit the number of rows returned from a query?

Let's consider a basic example with a members table.

You're building a front end that will display ten members at a time. You have 1,000 members.

Sometimes you'll filter for only member's whose first name begins with S, but most of the time, you just want the whole list.

If you query the whole table, and send that to the client, you can then slice, dice, and filter the results however you'd like with Javascript.

This is not terribly efficient, however, and while 1,000 records may not be a problem, what about 1,000,000 or a 1,000,000,000? At some point, the numbers get big enough that load times balloon and the user sits while a spinner goes round and round.

What is a solution? Instead of querying the _entire_ table and sending the results to the client, we can use `LIMIT` and `OFFSET` to get a limited set of results with each page (which will control the offset).

To use the `LIMIT` and `OFFSET` within a select statement:
```sql
SELECT select_list
    FROM table_expression
    [ ORDER BY … ]
    [ LIMIT { number | ALL } ] [ OFFSET number ]
```

For example to select the 101st to 110th most recently modified records from `my_table`, the query would be:
``` sql
select * from my_table order by date_modified desc limit 10 offset 100;
```

Caveat emptor: Whenever using `LIMIT`/`OFFSET`, if consistent results is desirable, enforce it using an `ORDER BY` clause. From the documentation:
> The query optimizer takes `LIMIT` into account when generating query plans, so you are very likely to get different plans (yielding different row orders) depending on what you give for `LIMIT` and `OFFSET`. Thus, using different `LIMIT`/`OFFSET` values to select different subsets of a query result*will give inconsistent results*unless you enforce a predictable result ordering with `ORDER BY`.

While both of these attributes could theoretically be flexed by the client, for pagination purposes, the _necessary_ one is `OFFSET` (`LIMIT` could be adjusted to change the number of records displayed on a page, but unless you do _all_ records / remove the limit, `OFFSET` will still be needed).

With that in mind, we could generate the query using a service `getRecords` like so:
``` javascript
public async getRecords(opts) {
  const query = SQL`
    select * from my_table
    where true
  `;
  const sortOrder = opts.sortOrder || “ date_modified”;
	const limit = opts.limit || 10;
  const offset = opts.offset || 0;
  query.append(` order by ${sortOrder}`);
  query.append(` limit ${opts.limit}`);
	query.append(` offset ${opts.offset}`);

  const { rows } = await this._pool.query(query);
  return rows;
}
```

Now, we have a dynamic way to set our pagination from the client and the client won't receive a number of undesired records.

Returning to our initial question: We now know how to limit the number of rows returned from a query by using `LIMIT` and `OFFSET`. We know it's important to include an `ORDER BY` clause to maintain consistency. We've also seen how we might generate a query to achieve server side pagination.

# Footnotes:
* <sup>1</sup> [LIMIT and OFFSET | PostgreSQL](https://www.postgresql.org/docs/current/queries-limit.html)

