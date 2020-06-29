---
title: 'Testing - Chai Tests And Database Connection Pools'
date: '2019-06-17'
publish: '2019-06-17'
category: ['programming']
tags: ['chai', 'testing', 'pool', 'postgres']
---

I’m writing some integration tests for an app that is confirming database queries are working the way I’m expecting.

In order to prep the database and not corrupt the environment, I’m creating test rows, testing those rows, and then deleting them before and after each tests.

Unfortunately, I’d also lumped my database connection in and was creating a new pool with each test.

The result was that my tests didn’t seem to run.

```bash
$ npm run test
  Test Suite - Description of the test suite
    ✓ should do something when something happens (501ms)
$
```

What? Where are my other tests?

```javascript
import * as chai from "chai";
import * as pg from "pg";
import * as chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Test Suite - Description of the test suite", () => {
    let svc: MetadataVersionServer;
    let newFieldClassesEnabled: services.UpdateFieldParams[];
    before(() => {

;
    });

    beforeEach(async function() {
        const query = SQL`
        /* create a temporary table the copies two test values from metadata_fields */
        CREATE TEMP table temp_table as
          SELECT *
          FROM og_table
        ;
      `;
        svc = pg.Pool
        await svc.query(query);
    });

    it("should do something when something happens", async () => { /* ... */ });

    it("should do something else when something else happens", async () => { /* ... */ });

    it("should do a final thing when something happens", async () => { /* ... */ });

    afterEach( async () => {
        const query = SQL`
          /* tear down test data */
          DROP temp_table;
        `;
        await svc.query(query);
    });
```

It turns out, the reason was that I was creating a new `pool` for each test and that was creating problems. The solution was to move the `pool` out into its own `before` and then run the tests.

```javascript
...
describe("Test Suite - Description of the test suite", () => {
  let svc: MetadataVersionServer;
  let newFieldClassesEnabled: services.UpdateFieldParams[];
  before(() => {
    svc = pg.Pool;
  });

  beforeEach(async function() {
    const query = SQL`
      /* create a temporary table the copies two test values from metadata_fields */
      CREATE TEMP table temp_table as
        SELECT *
        FROM og_table
      ;
    `;
    await svc.query(query);
   });
```

Voila - all the tests now pass!

```bash
$ npm run test
  Test Suite - Description of the test suite
    ✓ should do something when something happens (501ms)
    ✓ should do something else when something else happens (501ms)
    ✓ should do a final thing when something happens
$
```

Bottom line, if using database connections in your tests and you’re finding that not all of your tests are running - try refactoring so that you only have one connection per group.
