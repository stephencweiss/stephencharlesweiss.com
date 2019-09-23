---
title: 'Reminder: Logging Into Postgres With Shell Commands'
date: '2019-08-19'
category: ['programming']
tags: ['terminal', 'shell', 'psql']
---

PGAdmin, Dbeaver, etc. are useful GUIs for managing and reviewing Postgres databases. Sometimes, however, there’s a desire to login via the CLI.

Every time I have this happen, I need to look it up again - so, I’m writing it down to hopefully make that search shorter in the future: `psql -h <db host name> -U <your username> -d postgres`.

Note, I’m using `psql` here - which is a "terminal-based front-end to Postgres."<sup>1</sup>

# Footnotes
* <sup>1</sup> For more about `psql`, see the manual page in your terminal with `man psql`
