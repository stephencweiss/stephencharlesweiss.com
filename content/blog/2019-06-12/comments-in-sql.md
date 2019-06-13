---
title: 'Adding Comments to a SQL statement'
date: '2019-06-12'
category: ['programming']
tags: ['postgres', 'sql', 'comments']
---

There are two ways to add a comment to a SQL query - using `/* */` and `--`. The differences are as follows:

With a comment surrounded by `/*` and `*/`, the comment can span multiple lines. That is not the case for the two-hyphen approach where each new line would require a repeat of the hyphens.

In both cases, however, there is no need for a space between the asterisk and the first/last character.

Example:

```sql
select * from my_table /*Select every field from my_table*/
where
  last_name = 'jones' /* for people with
                      the last name jones */
  and age > 30 -- where they are greater than 30 years of age
               --but not 30 years
```

# Resources

[Comments | Oracle](https://docs.oracle.com/cd/B12037_01/server.101/b10759/sql_elements006.htm)
