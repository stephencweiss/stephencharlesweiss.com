---
title: 'Optional Params With JSON Stringify'
date: '2019-06-13'
category: ['programming']
tags: ['json', 'stringify', 'spacer', 'console', 'tips']
---

I've gotten in the habit recently of printing my variables as object literals. For example, if I have a variable, `myVar`, that I want to inspect, I'll print it using `console.log({ myVar })`.

When working in the browser, this helps in two key ways:

1. It makes it interactive and
2. It names the object (`myVar` becomes the key of the object), so I can avoid something more verbose like `console.log('my var --> ', myVar)`.

The terminal, however, does not have these advantages. It is not interactive and so objects will print as `[ [Object] [Object] ]` and array as `[Array]`.

`JSON.Stringify` addresses these shortcomings by exposing the details of the objects without relying on interactivity or a manual destructuring.

Let’s look at an example of stringify’ing a `proposal`. The `proposal`’s shape will be:

```javascript
`{
  resourceName: string,
  fields: {
    id: string,
    classes: string[],
  }
}
```

_Note_: The console log prefixes (e.g., `proposal: standard -->\n`) I've added are intended for clarity only - they are optional.

# Standard Approach

My preferred approach when printing objects on the front end is to create Objects.

```javascript
console.log(`proposal: standard -->\n`, { proposal })
```

This, however, leads to the common problem where Objects are obfuscated.

```bash
proposal: standard -->
 { proposal:
   { resourceName: 'Property',
     proposedFields: [ [Object], [Object] ] } }
```

And since the terminal isn’t interactive, there is no simple recourse… enter `JSON.Stringify`.

# With `JSON.Stringify`

`JSON.stringify` efficiently solves this problem of obfuscation.

```javascript
console.log(`proposal: json -->\n`, JSON.stringify(proposal))
```

This, however, leaves much to be desired from a readability perspective. Since the entire object is collapsed to a single string, as the object grows in size, this will become unwieldly

```bash
proposal: json -->
{"resourceName":"Property","proposedFields":[{"id":"100311","classesEnabled":["RESI"]},{"id":"100820","classesEnabled":["RESI","RLSE"]}]}
```

# With `JSON.Stringify` and Spacer

Fortunately, tackling legibility is as easy as using the optional `spacer` parameter that’s part of the `JSON.Stringify` API. The `spacer` parameter is in the third position (second position is for an optional `replacer` function or array) and takes a string or number.

The number refers to the number of leading space characters.

```javascript
console.log(
  `proposal: json + spacer -->\n`,
  JSON.stringify(proposal, undefined, 4)
)
```

This prints a readable version with all of the details spelled out.

```bash
proposal: json + spacer -->
{
    "resourceName": "Property",
    "proposedFields": [
        {
            "id": "100311",
            "classesEnabled": [
                "RESI"
            ]
        },
        {
            "id": "100820",
            "classesEnabled": [
                "RESI",
                "RLSE"
            ]
        }
    ]
}
```

## String Spacers

Strings do the same thing, however, they can be any string pattern. For example:

```javascript
console.log(
  `proposal: json + spacer -->\n`,
  JSON.stringify(proposal, undefined, '--')
)
```

Becomes :

```bash
proposal: json + spacer -->
{
--"resourceName": "Property",
--"proposedFields": [
----{
------"id": "100311",
------"classesEnabled": [
--------"RESI",
--------"RLSE"
------]
----},
----{
------"id": "100820",
------"classesEnabled": [
--------"RESI",
--------"RLSE"
------]
----}
--]
}
```

# Resources

- [JSON.stringify() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
