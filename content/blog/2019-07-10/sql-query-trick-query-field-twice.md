---
title: 'SQL Tricks: Querying The Same Table Twice'
date: '2019-07-10'
category: ['programming']
tags: ['sql', 'tips']
---

I recently came across a creative solution to finding the relationships between different values within a table using SQL. This may be standard practice, but it was the first time I had to think about the problem. As I worked my way through understanding the query, I realized that it’s a stellar application of using SQL to solve real problems.

The solution was to query the same field on a table _twice_ and compare it against itself.

Before we get into _why_ you might want to do that, let’s look at how it works.

Imagine you have a table (`my_table`), which has five values. And now, imagine you want to see how all of these relate to one another - let’s say by subtracting one from the others. Notably, however, we do not want to calculate a row against itself (i.e. no `a-a`).

| name | val |
| ---- | --- |
| a    | 1   |
| b    | 2   |
| c    | 3   |
| d    | 4   |
| e    | 5   |

So, a row for `a` might look like:

| value subtracted from | b   | c   | d   | e   |
| --------------------- | --- | --- | --- | --- |
| a                     | -1  | -2  | -3  | -4  |

How can you do that programmatically with SQL?

Instead of trying to _visualize_ it with SQL, let’s just get the data in order. We’re trying to extract unique tuples from the table (I.e. `[a,b]` is different from `[b,a]`).

```sql
SELECT name as name1, name as name2 FROM my_table table1, my_table table2
    WHERE table1.name != table2.name
```

What this ends up doing is looking at _each_ name in `my_table` and returning a n-1 rows for each.

We’ve got our tuples! Here’s a [SQL Fiddle](http://sqlfiddle.com/#!17/e3156/8) demonstrating this.

So, why would we actually want to use it?

The above example is absolutely contrived, but the need to do something like this is more common than might appear at first blush. For example, the first time I saw this was in an application looking at the relationships between different statuses and the flows that were possible between them.

A simplified example might be envisioned as:

| From \ To | Coming | Active | On Hold | Done | Canceled |
| --------- | ------ | ------ | ------- | ---- | -------- |
| Coming    | -      | ✓      | ✓       | ✓    | ✓        |
| Active    | x      | -      | ✓       | ✓    | ✓        |
| On Hold   | x      | ✓      | -       | ✓    | ✓        |
| Done      | x      | ✓      | ✓       | -    | ✓        |
| Canceled  | x      | ✓      | ✓       | ✓    | -        |

✓ = available
\- = not applicable
x = not available

While that sort of relationship is useful for visualizing, it’s not how we would store it in SQL since the number of columns could quickly get out of hand and most of the time, we’re interested in a particular relationship - defined by its tuple (e.g., answer the question can Active transition to On Hold?).

Using the technique of querying the table twice against the same field can create this matrix quickly and easily.
