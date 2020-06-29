---
title: 'JSON Operators And Functions In Postgres'
date: '2019-11-12'
publish: '2019-11-25'
category: ['programming']
tags:
    [
        'postgres',
        'psql',
        'json',
        'jsonb',
        'syntax',
        'operators',
        'postgres functions',
    ]
---

I wrote in the past about [Array Intersections in Postgres](../../2019-07-01/array-intersection-in-psql/), which alluded to operators and functions available for arrays within Postgres.

Today, I came across a Postgres function dealing with JSON and found a whole suite of _new_ syntax to learn.

It’s actually pretty cool!

Here’s an example function.

```sql
create or replace function generate_log(
    target_op text,
    newj jsonb,
    oldj jsonb
) returns audit_log as $body$
declare
    audit_row audit_log;
    dkey text;

begin
    audit_row = row (
      # …
        );

    if (target_op = ‘DELETE’) then
        audit_row.root_resource_name = oldj ->> root_resource_name;
        audit_row.root_resource_id = oldj ->> root_resource_id;
        audit_row.resource_id = oldj ->> resource_id;
        audit_row.from_data = jsonb_strip_nulls(oldj);
    else
      # ...
    end if;
    # ...
    return audit_row;

end;
$body$ language plpgsql;
```

The gist of the function is that it takes in an operation type (e.g., `DELETE`) and two json objects and returns the delta between them.

Before we get there, however, we define a few of the return values based on the old JSON’s keys. That is, our new row will have the `root_resource_name` value that was the `root_resource_name` of the `oldj` JSON. That’s what the `->>` operator does.

For space considerations, we also remove any _null_ keys using the `jsonb_strip_nulls` method of Postgres.

There are several standard operators for `json` and `jsonb`. From the [Postgres Documentation](https://www.postgresql.org/docs/current/functions-json.html): <sup>[1](#footnotes)</sup><a id="fn1"></a>
| operator | Right Operand Type | Return Type | Description | Example | Example Result|
| --- | ----------------- | --------------- | ------------ |------------ |------------ |
| -> | int | json or jsonb | Get JSON array element (indexed from zero, negative integers count from the end) | '[{"a":"foo"},{"b":"bar"},{"c":"baz"}]'::json->2 | { "c":"baz"}|
| -> | text | json or jsonb | Get JSON object field by key |'{"a": {"b":"foo"}}'::json->'a' | {"b":"foo"} |
| ->> | int | text | Get JSON array element as text |'[1,2,3]'::json->>2 |3 |
| ->> | text | text | Get JSON object field as text |'{"a":1,"b":2}'::json->>'b'| 2|
| #> | text[] | json or jsonb | Get JSON object at the specified path | '{"a": {"b":{"c": "foo"}}}'::json#>'{a,b}'| {"c": "foo"} |
| #>> | text[] | text | Get JSON object at the specified path as text |'{"a":[1,2,3],"b":[4,5,6]}'::json#>>'{a,2}'| 3|

## Footnotes

-   <sup>[1](#fn1)</sup> There are additional operators specifically for `jsonb` operators that are worth knowing as well.
