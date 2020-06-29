---
title: 'Pretty Print JSON With Python'
date: '2020-05-06'
publish: '2020-06-13'
category: ['programming']
tags: ['python', 'json', 'dumps', 'pretty print']
---

I like pretty things. Particularly when they hold the answer to my questions!

As a result, when working with objects (aka Dictionaries in Python), I prefer not to have to parse a wall of text (even if it's small like so:

```shell
my json is --> {'file_prefix': 'emm_leads_data', 'staging_schema': 'army_stage', 'stagi
ng_table': 'emm_leads_raw', 'has_header': False, 'write_mode': 'Append'}
```

With Javascript, I can use [JSON.Stringify's spacer argument](json-stringify-spacer/#with-jsonstringify-and-spacer) to convert the wall of text into a formatted object:

```javascript
console.log(`my json is --> ${JSON.stringify(myObj, null, 4)}`)
my json is --> {
    "file_prefix": "emm_leads_data",
    "has_header": false,
    "staging_schema": "army_stage",
    "staging_table": "emm_leads_raw",
    "write_mode": "Append"
}
```

Python has a similarly easy method for achieving this using the [json](https://docs.python.org/3/library/json.html) `dumps` method<sup>[1](#footnotes)</sup><a id="fn1"></a> and passing in an indent argument:

```python
def pretty_print_json(val):
  print(f"The pretty json is --> {json.dumps(val, indent=4)}")
```

Of course this can be simplified to:

```python
def pretty_print_json(val):
  print(json.dumps(val, indent=4)})
```

And just like that, I can read my outputs again!

## Footnotes

-   <sup>[1](#fn1)</sup> There's both a `json.dump` and `json.dumps` method. In this case we're using `dumps` (with an `s`). For more on the differences, this [PYnative article](https://pynative.com/python-json-dumps-and-dump-for-json-encoding/) seems useful.
