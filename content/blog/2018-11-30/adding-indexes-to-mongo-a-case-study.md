---
title: Adding Indexes To Mongo + A Case Study
date: '2018-11-30'
category: ['programming']
tags: ['benchmarks', 'databases', 'indexes', 'javascript', 'time complexity']
---

I've been working on projects with larger data sets recently and have begun to notice that not _all_ queries resolve in one or two milliseconds.

As I wrote in [Indexing Databases - A Postgres Example](../../2018-11-22/indexing-databases-a-postgres-example), adding indexes can speed up queries, but come at a cost of inserting / updating times.

This time around, I was working with javascript and wanted to understand how indexing worked. While the principles hold, the details vary.

Still - the conclusion's the same: if you're reading more than you're writing and can come up with a sound index target, it can be a valuable tool in your tool belt.

Let's dig in.

# Common Commands

The three most useful beginner commands I found were create, get, and drop.

```javascript
//mongo sh
db.collection.createIndex()
db.collection.getIndexes()
db.collection.dropIndexes(['<index_name>'])
```

## Create an Index

`javascript> db.collection.createIndex( { <field_name> : <order> [, <field_name> : <order> ...] } )`

When creating an index - you can specify the field(s) and the order.

The order is `1` for ascending and `-1` for descending.

The ordering is done sequentially, so the first field listed is sorted first, then the second, and so on.

```javascript
//mongo sh
> db.descriptions.createIndex( { productId: 1 } )
{
  "createdCollectionAutomatically" : false,
  "numIndexesBefore" : 1,
  "numIndexesAfter" : 2,
  "ok" : 1
}
```

## Review Indexes

`db.collection.getIndexes()`

To see the indexes on a collection, use the `getIndexes()` method.

This is helpful when confirming the index is on the expected attribute of the document and to see which queries have been optimized.

```javascript
// mongo sh
> db.descriptions.getIndexes()
[
  {
    "v" : 2,
    "key" : {
      "_id" : 1
    },
    "name" : "_id_",
    "ns" : "trailblazer.descriptions"
  },
  {
    "v" : 2,
    "key" : {
      "product_id" : 1
    },
    "name" : "product_id_1",
    "ns" : "trailblazer.descriptions"
  }
]
```

## Drop Indexes

`javascript> db.collection.dropIndexes(["<index_name>"])` If you want to remove an index, you can use the `dropIndexes()` method. The optional parameter allows for specifying *\_*which*\_* index should be dropped. The name can be retrieved using the `getIndexes()` method. If no name is specified, all _non_-`_id` indexes will be dropped.

```javascript
// mongo sh
> db.descriptions.dropIndex("product_id_1")
{ "nIndexesWas" : 2, "ok" : 1 }

> db.descriptions.dropIndexes()
{
  "nIndexesWas" : 2,
  "msg" : "non-_id indexes dropped for collection",
  "ok" : 1
}
```

# Case Study

So what do indexes actually get us?

To test this, I created a sample database (`trailblazers`) and collection (`descriptions`) and generated 10m rows of data.

I then compared the performance of the same lookup query on the database pre- and post-index. This is not a scientific study, but at least when querying on the indexed attribute, query times fell 99.99% from 15000+ ms to ~1 ms.

Let's take a look.

These times were found using the `.explain("executionStats")` method.

## Without An Index

```javascript
//mongo sh
db.descriptions.find( {productId: {$gt : 9999990 } } ).explain("executionStats")
{
  "queryPlanner" : {
    "plannerVersion" : 1,
    "namespace" : "trailblazer.descriptions",
    "indexFilterSet" : false,
    "parsedQuery" : {
      "productId" : {
        "$gt" : 9999990
      }
    },
...
  "executionStats" : {
    "executionSuccess" : true,
    "nReturned" : 10,
    "executionTimeMillis" : 15312,
    "totalKeysExamined" : 0,
    "totalDocsExamined" : 10452305,
...
}
```

## With An Index

```javascript
//mongo sh
db.descriptions.find( {productId: {$gt : 9999990 } } ).explain("executionStats")
{
  "queryPlanner" : {
    "plannerVersion" : 1,
    "namespace" : "trailblazer.descriptions",
    "indexFilterSet" : false,
    "parsedQuery" : {
      "productId" : {
        "$gt" : 9999990
      }
    },
...
  },
  "executionStats" : {
    "executionSuccess" : true,
    "nReturned" : 10,
    "executionTimeMillis" : 1,
    "totalKeysExamined" : 10,
    "totalDocsExamined" : 10,
...
}
```

## Conclusion

The index created a much more efficient query because Mongo knew exactly where to go to find the documents in question.

Without the index, the query reviewed all 10 million + documents. With the index, that number was cut to 10.

Another way to think about this is that the index changed the time complexity of the query from linear to constant.

As the database continues to grow, indexed fields can be found in constant time because the index offers a pointer.

That direction comes at a cost of a slower insert / update time, but if the database has more reads than writes, that trade off can be worth it quickly.

# Further Reading

[javascript docs](https://docs.javascript.com/manual/indexes/#create-an-index)
