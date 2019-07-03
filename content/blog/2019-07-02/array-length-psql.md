---
title: 'Array Lengths In Postgres'
date: '2019-07-02'
category: ['programming']
tags: ['postgres', 'array', 'length']
---

Yesterday, I wrote about the [intersecting of Arrays in Postgres](../../2019-07-01/array-intersection-in-psql). Today, I wanted to go a step further and think about finding the maximum number of elements in an array for a table.

In my case, this was relevant because the largest number would dictate the number of columns I’d display client-side. Rather than fixing the number of columns, if a user only had three columns possible, I’d only show three. On the other hand, if they had 10, they could see up to ten.

Since, I didn’t have a master list for what’s available, and so the data determined what would be shown.

For example, building on yesterday’s example of `classes_enabled`, imagine a table with the following data:

+-----+------------------+-----------------+
| id | classes_available | classes_enabled |
+=====+==================+=================+
| 1 | { a, b, c} | {a} |
+-----+------------------+-----------------+
| 2 | { a, c, d } | { a, b, c} |
+-----+------------------+-----------------+
| 3 | { a, b, c, d, e} | { a } |
+-----+------------------+-----------------+
| 4 | { a, b} | { b } |
+-----+------------------+-----------------+

What I was looking for was the value 5 - the number of columns (`{a,b,c,d,e}`) present in the row, `id = 3`.

(Yet again, Reuven Lerner provided a great write-up to introduce the topic. Highly recommend his post which was my first stop.¹)

# PostgreSQL Array Function: `Array_Length()`

On the same page where I found the Array Operators in the Postgres Documentation, they also list Array Functions.² Among the latter is the `array_length( anyarray, int)`. As the name suggests, `array_length` will return the length of the array passed into the first argument position. The integer in the second position defines with dimension is being measured - more on this in a moment.

The biggest thing to be aware of when looking at the documentation is that when it says `anyarray` that can include the name of the column.

For example:

```sql
SELECT id, classes_available, classes_enabled, array_length(classes_available, 1)
FROM my_table
```

Will return:

+-----+------------------+-----------------+-----------------+
| id | classes_available | classes_enabled | array_length |
+=====+==================+=================+=================+
| 1 | { a, b, c} | {a} | 3 |
+-----+------------------+-----------------+-----------------+
| 2 | { a, c, d } | { a, b, c} | 3|
+-----+------------------+-----------------+-----------------+
| 3 | { a, b, c, d, e} | { a } | 5 |
+-----+------------------+-----------------+-----------------+
| 4 | { a, b} | { b } | 2 |
+-----+------------------+-----------------+-----------------+

## Using `Array_Length()` In The Order Position

And as a result, you can order the results as well. For example:

```sql
SELECT id, classes_enabled, array_length(groups_reso, 1)
FROM my_table
ORDER BY array_length(groups_reso, 1) DESC;
```

This returns:

+-----+------------------+-----------------+-----------------+
| id | classes_available | classes_enabled | array_length |
+=====+==================+=================+=================+
| 3 | { a, b, c, d, e} | { a } | 5 |
+-----+------------------+-----------------+-----------------+
| 1 | { a, b, c} | {a} | 3 |
+-----+------------------+-----------------+-----------------+
| 2 | { a, c, d } | { a, b, c} | 3|
+-----+------------------+-----------------+-----------------+
| 4 | { a, b} | { b } | 2 |
+-----+------------------+-----------------+-----------------+

## Returning Max Only

Or, if the situation is like mine, and all you want to return is the maximum number present in the entire column, order and limit the results. For example:

```sql
SELECT array_length(groups_reso, 1)
FROM my_table
ORDER BY array_length(groups_reso, 1) DESC
LIMIT 1;
```

To get:
+-----------------+
| array_length |
+=================+
| 5 |
+-----------------+

## Array Dimensions

Though, not relevant in my case, if you’re analyzing a multi-dimensional array, the support within Postgres may be useful.

If the field were not one dimensional, but two, you can use `array_length( array, 2)` to see the length.

For example: `array_length( { {a, b, c}, {d, e, f} } , 2)` would return `3`.

# Resources

- ¹ [PostgreSQL array indexes and length | Reuven Lerner](https://lerner.co.il/2014/05/20/postgresql-array-indexes-and-length/)
- ² [Array Functions and Operators | PostgreSQL](https://www.postgresql.org/docs/current/functions-array.html)
