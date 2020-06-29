---
title: 'Entity Relationship Diagrams - What The Lines Mean'
date: '2019-06-29'
publish: '2019-06-29'
category: ['programming']
tags: ['design', 'entity relationship', 'entity relationship diagrams']
---

Yesterday, in talking about [Postgres and Subqueries](postgres-subquery-basics) I was trying to represent a relationship between tables. I knew intuitively what I was trying to communicate, but wasn’t sure about the syntax.

Digging into I found Lucidchart<sup>[1](#Footnotes)</sup><a id="fn1"></a> had put together a pretty useful cheatsheet on entity-relationship diagrams which the information I was looking for (images credit to Lucidchart).

![ERD Line Definitions](https://res.cloudinary.com/scweiss1/image/upload/v1593195273/code-comments/erd-line-def_bpfxj4.png)

Interestingly, I think one of the examples they have in the post doesn’t make a lot of sense _given_ that information.

![ERD Sample Relationship](https://res.cloudinary.com/scweiss1/image/upload/v1593195273/code-comments/erd-sample-relationship_r7sxjd.png)

In this example, the `BankId` is the primary key (which means it’s not nullable). As a result, the way I’m reading the above ERD is that we can have zero or one `BankId` associated with zero too many cars’ `FinancedBy`.

How you can have zero is beyond me, however, at least I now know _why_ it’s confusing because what the lines mean is no longer a mystery!

## Footnotes

-   <sup>[1](#fn1)</sup> [Entity-Relationship Diagram Symbols and Notation | Lucidchart](https://www.lucidchart.com/pages/ER-diagram-symbols-and-meaning)
