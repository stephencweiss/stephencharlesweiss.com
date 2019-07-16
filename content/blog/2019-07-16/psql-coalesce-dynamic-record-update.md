---
title: 'Using COALESCE And Dynamic Updates To Multiple Records In Postgres'
date: '2019-07-16'
category: ['programming']
tags: ['postgres', 'coalesce', 'dynamic update', 'update with']
---

I wanted to update multiple fields on multiple records and handle the case that _not all_ of the information is present in the update for each record.

Basically, I want to `patch` not `put` and when it gets to Postgres, I don’t want those empty values to be set to `null`.

A regular `UPDATE`, however, would do exactly that - overwrite my values with null if I didn't supply them. Fortunately, Postgres comes with `COALESCE` which can accommodate this sort of situation. Let's take a look.

I’ll use the same example as I did [Using Typescript’s `Pick` to Improve Communication and Decrease Maintenance](../../2019-06-25/typescript-pick-interface-partials/)

A refresher, the table is defined as:

```typescript
interface IMyTable {
  id: string
  foreign_id: string
  name: string

  is_enabled: boolean
  is_custom: boolean
  display_order?: number

  name_en: string
  name_sp?: string
  name_fr?: string

  description_en?: string
  description_sp?: string
  description_fr?: string
}
```

The columns I’m looking to update again are `is_enabled` and `display_order`

An example request body for the `patch` might be:

```json
[
  {
    "id": "427001",
    "is_enabled": true
  },
  {
    "id": "427002",
    "display_order": 2
  },
  {
    "id": "427003",
    "is_enabled": true,
    "display_order": 3
  }
]
```

# Single Record Update

If I was just trying to update one record at a time, I would have more options about conditional statements to append to my query.

```typescript
async changeMyTable(proposal: readonly MyTableProposal): Promise<...> {

  const updateQuery = SQL`
    WITH proposed_vals (id, is_enabled, display_order) AS (VALUES (${proposal.id}, ${proposal.is_enabled}, ${proposal.display_order})`
    UPDATE my_table AS t
    SET `;
  if( proposal.is_enabled ) updateQuery.append(SQL`is_enabled = COALESCE( CAST (p.is_enabled as bool), CAST(t.is_enabled as bool) )`)
  if( proposal.display_order ) updateQuery.append(SQL`, display_order = COALESCE( CAST (p.display_order as int4), CAST (t.display_order as int4) )`)
  updateQuery.append(SQL`
    FROM proposed_vals AS p
    WHERE
      t.id = p.id
      and t.end_version is null
    RETURNING
       t.*
    `);

  const data = await this._pool.query(updateQuery);
  return data.rows;
}
```

**NB**: this _will_ throw a syntax error if `display_order` is present _without_ an `is_enabled`

# Handling Multiple Records With Ambiguity

So, how could this work with multiple records?

With multiple records, I’m using the `update...with` syntax:

This is where the `COALESCE` statement comes in. Instead of having to understand _in advance_ if the element is present, we can use the initial value as a fail-safe. If the field is _not_ present, we will use the value that’s in place.

My initial attempt to use `COALESCE` led to:

```javascript
async changeMyTable(proposal: readonly MyTableProposal[]): Promise<...> {
  const valuesToUpdate = helpers.SQLJoinStatement( /* ... */ )
  const updateQuery = SQL`WITH proposed_vals (id, is_enabled, display_order) AS (VALUES `
  .append(valuesToUpdate)
  .append(SQL` )
     UPDATE my_table AS t
     SET is_enabled = COALESCE( p.is_enabled, t.is_enabled )
     , display_order = COALESCE( p.display_order, t.display_order )
     FROM proposed_vals AS p
     WHERE
       t.id = p.id
       and t.end_version is null
     RETURNING
        t.*
     ;`);

  const data = await this._pool.query(updateQuery);
  return data.rows;
}
```

This, however, threw the error: `500 COALESCE types text and boolean cannot be matched`.

Researching, I found that I could get past this problem with a `CAST` to ensure the type. I felt comfortable doing this because I knew my proposal was typed appropriately and I’d built the table.

```javascript
async changeMyTable(proposal: readonly MyTableProposal[]): Promise<...> {
  const valuesToUpdate = helpers.SQLJoinStatement( /* ... */ )
  const updateQuery = SQL`WITH proposed_vals (id, is_enabled, display_order) AS (VALUES `
  .append(valuesToUpdate)
  .append(SQL` )
     UPDATE my_table AS t
     SET is_enabled = COALESCE( CAST (p.is_enabled AS BOOL), CAST(t.is_enabled AS BOOL) )
     , display_order = COALESCE( CAST (p.display_order AS INT4), CAST (t.display_order AS INT4) )
     FROM proposed_vals AS p
     WHERE
       t.id = p.id
       AND t.end_version IS NULL
     RETURNING
        t.*
     ;`);

  const data = await this._pool.query(updateQuery);
  return data.rows;
}
```

With another set of eyes, I was able to refine this again. The issue is that the values in my `proposed_vals` implicitly have a type of text or number. If I wanted it to be something separate, I needed to alert Postgres of that.

Instead of the `CAST (value AS type)` I can use the more terse notation of the double colon `::` and apply it only to the proposed values.

```SQL
UPDATE metadata_lookupvalues AS luv
  SET is_enabled = COALESCE( p.is_enabled::BOOL, luv.is_enabled )
    , display_order = COALESCE( p.display_order::INT4, luv.display_order )
  FROM proposed_vals AS p
  WHERE
    luv.id = p.id
    AND luv.end_version IS NULL
  RETURNING
    luv.*
```

# Related

- [Double colon (::) notation in SQL | Stack Overflow](https://stackoverflow.com/questions/5758499/double-colon-notation-in-sql)
- [What does :: do in PostgreSQL? | Stack Overflow](https://stackoverflow.com/questions/15537709/what-does-do-in-postgresql)
