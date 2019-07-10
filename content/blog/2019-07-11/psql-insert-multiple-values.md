# Inserting Values Into A Table - Postgres
How do you insert _multiple_ values? I always find myself looking this up. I decided I’d jot it down here for future reference. Hopefully it helps you. 

In their book Practical PostgreSQL, John C. Worsley and Joshua D. Drake write the following pertaining inserting values in Postgres:¹

> The following is the syntax of the `INSERT INTO` command, when used to insert new values, which is subsequently described in detail:  
> `sql`  
> `INSERT INTO *table_name*`  
> `       [ ( *column_name* [, …] ) ]`  
> `       VALUES ( *value* [, …] )`  
>   
>  `*table_name*`  
> The `INSERT SQL` command initiates an insertion of data into the table called `*table_name*`.  
>   
> `(column_name[, …] )`  
> An optional grouped expression which describes the targeted columns for the insertion.  
>   
> `VALUES`  
> The SQL clause which instructs PostgreSQL to expect a grouped expression of values to follow.  
>   
> `(*value*[, …] )`  
> The required grouped expression that describes the values to be inserted. There should be one*value*for each specified column, separated by commas. These values may be expressions themselves (e.g., an operation between two values), or constants.  
>   
> Each `*value*` following the `VALUES` clause must be of the same data type as the column it is being inserted into. If the optional column-target expression is omitted, PostgreSQL will expect there to be one value for each column in the literal order of the table’s structure. If there are fewer values to be inserted than columns, PostgreSQL will attempt to insert a default value (or the `NULL` value, if there is no default) for each omitted value.  

The description alludes to the fact that the values can have multiple, but the demonstration doesn’t show how and the examples left me wanting. This is not a knock on the authors. The book’s excellent. It’s more my continuing struggles reading documentation and parsing out what’s _not_ explicit. 

So, as I tend to do, I came up with the following example to make it painfully obvious:
```sql
CREATE TABLE sample_table (
  id SERIAL PRIMARY KEY,
  name TEXT,
  favorite_color TEXT,
  age INT
  );

INSERT INTO sample_table
  (name, favorite_color, age)
  VALUES
  ('stephen', 'blue', 29),
  ('john', 'red', 18),
  ('bernard', 'yellow', 40);
```

Punch line: Just as you would to insert _one_ value, you do with multiple, except that they’re comma separated as part of the `VALUES` clause. I put together [SQL Fiddle demonstrating INSERT with multiple values](http://sqlfiddle.com/#!17/c5796/1).

# Resources
* ¹ [Adding Data with INSERT and COPY - Practical PostgreSQL Book](https://www.oreilly.com/library/view/practical-postgresql/9781449309770/ch04s03.html)
