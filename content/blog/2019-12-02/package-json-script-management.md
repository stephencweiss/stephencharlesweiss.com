---
title: 'Package.Json Script Management Techniques'
date: '2019-11-15'
publish: '2019-12-02'
category: ['programming']
tags: ['package.json','npm','npm run']
---

When you have a lot of scripts in your npm package, it can get overwhelming. Recently a colleague introduced a new pattern in one of our repos to help with exactly this problem. Simply put: add fake scripts to create sections and have scripts pretty print.

Imagine a repository with a number of shell scripts and in a variety of settings you want to run the script with different patterns. Because you want to be helpful, instead of having the user put in their own flags, you create some of the most common examples.

It might look something like this:
``` json
 { "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "test-integration": "mocha —require ts-node/register test/integration/**/*.ts",
        "lint": "npm run lint:prettylint && npm run lint:tslint",
        "lint:tslint": "tslint -p tsconfig.json",
        "lint:prettylint": "prettylint ‘src/**/*.ts’",
        "lint:fix": "npm run lint:prettylint:fix && npm run lint:tslint:fix",
        "lint:tslint:fix": "tslint -p tsconfig.json —fix",
        "lint:prettylint:fix": "prettylint ‘src/**/*.ts’ —fix",
        "migration:ouids": "node lib/scheduled/sync-ouid.js",
        "migration:setup": "npm run migration:setup:init && npm run migration:setup:seed",
        "migration:setup:init": "cd src/manual/migration/ && ./migrate.sh --clean",
        "migration:setup:seed": "cd src/manual/migration/ && ./seed.sh",
        "seed": "npm run seed:download && npm run seed:generate-csv && npm run seed:load",
        "seed:download": "cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate",
        "seed:download:properties": "cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate -x properties,media,property_unit_types,property_green_verification,open_houses,history_transactional",
        "seed:download:non-properties": "cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate -x offices,office_media,agents,agent_media,teams,team_members",
        "seed:storage:clean": "cd src/manual/seed/ && ./storage-service.sh -a clean",
        "seed:storage:clean:properties": "cd src/manual/seed/ && ./storage-service.sh -a clean -x properties,media,property_unit_types,property_green_verification,open_houses,history_transactional",
        "seed:storage:clean:non-properties": "cd src/manual/seed/ && ./storage-service.sh -a clean -x offices,office_media,agents,agent_media,teams,team_members",
}
```
It's easy to see how following this pattern the scripts can quickly grow out of hand.

To address this, my colleague added empty commands to create natural section dividers.
``` json
 { "scripts": {
        "\nGeneral Scripts": "",
        "test": "echo \"Error: no test specified\" && exit 1",
        "test-integration": "mocha —require ts-node/register test/integration/**/*.ts",
        "lint": "npm run lint:prettylint && npm run lint:tslint",
        "lint:tslint": "tslint -p tsconfig.json",
        "lint:prettylint": "prettylint ‘src/**/*.ts’",
        "lint:fix": "npm run lint:prettylint:fix && npm run lint:tslint:fix",
        "lint:tslint:fix": "tslint -p tsconfig.json —fix",
        "lint:prettylint:fix": "prettylint ‘src/**/*.ts’ —fix",
        "migration:ouids": "node lib/scheduled/sync-ouid.js",
        "\nSetup Database - Initializes the database and seeds with meta data": "",
        "migration:setup": "npm run migration:setup:init && npm run migration:setup:seed",
        "migration:setup:init": "cd src/manual/migration/ && ./migrate.sh --clean",
        "migration:setup:seed": "cd src/manual/migration/ && ./seed.sh",
        "\nSample Data Seeding - Retrieve, process, and insert sample data": "",
        "seed": "npm run seed:download && npm run seed:generate-csv && npm run seed:load",
        "seed:download": "cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate",
        "seed:download:properties": "cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate -x properties,media,property_unit_types,property_green_verification,open_houses,history_transactional",
        "seed:download:non-properties": "cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate -x offices,office_media,agents,agent_media,teams,team_members",
        "\nGenerated CSV Storage - AWS S3 Management for Generated CSV files": "",
        "seed:storage:clean": "cd src/manual/seed/ && ./storage-service.sh -a clean",
        "seed:storage:clean:properties": "cd src/manual/seed/ && ./storage-service.sh -a clean -x properties,media,property_unit_types,property_green_verification,open_houses,history_transactional",
        "seed:storage:clean:non-properties": "cd src/manual/seed/ && ./storage-service.sh -a clean -x offices,office_media,agents,agent_media,teams,team_members",
}
```
Looking at it in the `package.json` provides a marginal improvement at best.

It's when we print the available scripts to the console, that the benefits become really clear:

```sh
npm run
Lifecycle scripts included in @revolution/tasks:
  test
    echo "Error: no test specified" && exit 1

available via `npm run-script`:

General Scripts

  test-integration
    mocha --require ts-node/register test/integration/**/*.ts
  lint
    npm run lint:prettylint && npm run lint:tslint
  lint:tslint
    tslint -p tsconfig.json
  lint:prettylint
    prettylint 'src/**/*.ts'
  lint:fix
    npm run lint:prettylint:fix && npm run lint:tslint:fix
  lint:tslint:fix
    tslint -p tsconfig.json --fix
  lint:prettylint:fix
    prettylint 'src/**/*.ts' --fix
  migration:ouids
    node lib/scheduled/sync-ouid.js

Setup Database - Initializes the database and seeds with meta data

  migration:setup
    npm run migration:setup:init && npm run migration:setup:seed
  migration:setup:init
    cd src/manual/migration/ && ./migrate.sh --clean
  migration:setup:seed
    cd src/manual/migration/ && ./seed.sh

Sample Data Seeding - Retrieve, process, and insert sample data

  seed
    npm run seed:download && npm run seed:generate-csv && npm run seed:load
  seed:download
    cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate
  seed:download:properties
    cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate -x properties,media,property_unit_types,property_green_verification,open_houses,history_transactional
  seed:download:non-properties
    cd src/manual/seed/ && ./pull-and-split-to-csv.sh --skip-generate -x offices,office_media,agents,agent_media,teams,team_members
  seed:generate-csv


Generated CSV Storage - AWS S3 Management for Generated CSV files

  seed:storage:clean
    cd src/manual/seed/ && ./storage-service.sh -a clean
  seed:storage:clean:properties
    cd src/manual/seed/ && ./storage-service.sh -a clean -x properties,media,property_unit_types,property_green_verification,open_houses,history_transactional
  seed:storage:clean:non-properties
    cd src/manual/seed/ && ./storage-service.sh -a clean -x offices,office_media,agents,agent_media,teams,team_members
  seed:storage:upload
```

It's a small thing, but it makes life much easier when you're dealing with a large volume of scripts. It's also a pattern I wouldn't have thought of until I had gotten well past the point of discomfort. Knowing about this approach as an option will hopefully save all of us some pain in the future.