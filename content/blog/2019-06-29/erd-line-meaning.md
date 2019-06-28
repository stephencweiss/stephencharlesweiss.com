# Entity Relationship Diagrams - What The Lines Mean

Yesterday, in talking about [Postgres and Subqueries](../../2019-06-28/postgres-subquery-basics) I was trying to represent a relationship between tables. I knew intuitively what I was trying to communicate, but wasn’t sure about the syntax.

Digging into I found Lucidchart¹ had put together a pretty useful cheatsheet on entity-relationship diagrams which the information I was looking for (images credit to Lucidchart).

![](./erd-line-def.png)

Interestingly, I think one of the examples they have in the post doesn’t make a lot of sense _given_ that information.

![](./erd-sample-relationship.png)
In this example, the `BankId` is the primary key (which means it’s not nullable). As a result, the way I’m reading the above ERD is that we can have zero or one `BankId` associated with zero too many cars’ `FinancedBy`.

How you can have zero is beyond me, however, at least I now know _why_ it’s confusing because what the lines mean is no longer a mystery!

# Resources

- ¹ [Entity-Relationship Diagram Symbols and Notation | Lucidchart](https://www.lucidchart.com/pages/ER-diagram-symbols-and-meaning)
