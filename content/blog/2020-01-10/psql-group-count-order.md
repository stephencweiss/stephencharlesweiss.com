---
title: 'Group, Count, and Order A Table in Postgres'
date: '2019-12-31'
publish: '2020-01-10'
category: ['programming']
tags: ['postgres','psql','group','count','alias','order']
---

I have a table that represents a many to one relationship. How, then, do I find out which of the "ones" have the most "manys"?

Postgres has a few built in utilities that when combined make this quite simple.

Consider the example of a table that tracks all media (images, videos, etc.) that are owned by a particular user.

The `media` table might look something like this:

| media_id | media_type | user_id  | ...other details |
| -------- | ---------- | -------- | ---------------- |
| 1        | image      | 'abc123' |                  |
| 2        | image      | 'abc123' |                  |
| 3        | image      | 'abc123' |                  |
| 4        | image      | 'abc123' |                  |
| 5        | pdf        | 'abc123' |                  |
| 6        | video      | 'abc123' |                  |
| ...      | ...        | ...      |                  |
| 10000001 | image      | 'xyz789' |                  |
| 10000002 | video      | 'xyz789' |                  |

How might I figure out _which_ user has the most images?

[TutorialsPoint.com](https://www.tutorialspoint.com/postgresql/postgresql_group_by.htm) describes the "Group By" clause in the following way:
> The PostgreSQL GROUP BY clause is used in collaboration with the SELECT statement to group together those rows in a table that have identical data. This is done to eliminate redundancy in the output and/or compute aggregates that apply to these groups.
>
> The GROUP BY clause follows the WHERE clause in a SELECT statement and precedes the ORDER BY clause.

Note: a `GROUP BY` clause requires an aggregate function (e.g., `SUM`, `COUNT`, etc.).

So, a simple use of `GROUP BY` would look like:
```sql
SELECT COUNT(*) FROM media GROUP BY user_id;
```

The results would look something like:

| count |
| ----- |
| 1     |
| 72    |
| 24    |
| 13    |
| ...   |
| 9     |


Okay! This is a good start. We've aggregated all of the media entries by the user, but have failed to do some useful things like:
1. Sort or organize them in any useful way
2. Show _which_ user is associated with each row
3. Limit to only images

Let's fix these issues now.

In my case, I want to sort the counts in a descending fashion. To do that, we'll alias the count and then order by (note, ORDER BY follows the GROUP BY clause per the TutorialsPoint description above):
```sql
SELECT COUNT(*) as media_count FROM media GROUP BY user_id ORDER BY media_count;
```

| media_count |
| ----- |
| 72    |
| 24    |
| 13    |
| 9     |
| ...   |
| 1     |

Better! We're in order - and we have some useful context for _what_ we're counting because of the alias.

One issue down, two to go. Let's identify the user next:

```sql
SELECT user_id, COUNT(*) as media_count FROM media GROUP BY user_id ORDER BY media_count;
```

|user | media_count |
| --- | ----- |
| 'abc123' | 72    |
| 'def827' | 24    |
| 'has879' | 13    |
| 'zed127' | 9     |
| ... | ...    |
| 'xyz789' | 1     |

Okay! Last step, let's limit the type of media to only be images!

```sql
SELECT user_id, COUNT(*) as image_count FROM media WHERE media_type='image' GROUP BY user_id ORDER BY image_count;
```

| user     | media_count |
| -------- | ----------- |
| 'abc123' | 41          |
| 'has879' | 13          |
| 'def827' | 5           |
| 'zed127' | 5           |
| ...      | ...         |
| 'xyz789' | 1           |

Et voilá! I now have a sorted list grouped by user and filtered to only include the relevant records.

It's worth noting that this is not a particularly optimized query and can take a while when the tables are big.


