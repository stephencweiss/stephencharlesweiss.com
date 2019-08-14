---
title: 'Typescript Generics: A Basic Use Case'
date: '2019-08-13'
category: ['programming']
tags: ['typescript','generics','interfaces']
---

When does it make sense to use a Generic in a Typescript type?
How do you create a type that takes a Generic?

I’ve read through the Typescript documentation on Generics a few different times.<sup>1</sup> Each time, I glean a little more, but using Generics never really clicked until I had an opportunity to see it in practice thanks to the guidance to a colleague. 

Below is a summary of some of the lessons I learned and how it helped things fall in place.

# Context
The problem began with trying to extend an API to return some additional information. In this case, I wanted to include what we’ll call Auditable fields that include a modified timestamp and modifying user. 

These fields were already part of a larger Auditable interface in the app:
``` typescript
export interface Auditable {
  …
  _modifiedAt: Date;
  _modifiedBy: string;
  …
}
```

The point of the query was to return the changes made to several different tables - `resources`, `fields`, etc.

The general shape of the data would look like: 
``` typescript
export interface ChangeLog {
  _startversion?: number;
  _endversion?: number;
  resources?: {
    Property: StartEndBox<…> 
  };
  fields?: {
    [resource_name: string]: {
      [standard_name: string]: StartEndBox<…> 
    };
  };
  …
}
```

The point here is not `StartEndBox` (which is an interface for picking the fields that we’re comparing the differences for), but that each of the different tables could ultimately have a different structure. 

Fortunately, whichever level it was at - I knew that once I got there, that’s where my auditable fields would live and I could append my data there - so, for the interface, that’s where I added it. For example: 
``` typescript
export interface ChangeLog {
  _startversion?: number;
  _endversion?: number;
  resources?: {
    Property: StartEnd<…> &
      Pick<metadata.resources.Resource, "_modifiedAt" | "_modifiedBy">;
  };
  fields?: {
    [resource_name: string]: {
      [standard_name: string]: StartEndBox<…> &
       Pick<metadata.fields.Field, "_modifiedAt" | "_modifiedBy">;
    };
  };
  …
}
```

Notice, in this incarnation, I’m picking only the fields I want from the model, but I’m duplicating the text for each instance. 

If I want to add a field in the future, I’ll have to update each Pick statement - increasing the chances I miss one or fat-finger it. 

# Refactoring To A Generic Approach
Generics are Typescripts answer to enabling reusable components. Because the _input_ can change, the Type needs to be able to accommodate that. If the type is too-tightly coupled to component, then it will only work for that instance.

Looking back at the example above, the _reason_ that I was able to pick the same Auditable fields from `Resource` and `Field` is because both of those models _extend_ `Auditable` already.

Armed with that knowledge,  we’ll use it to our advantage to create the generic.  
``` typescript
export type AuditableFields<T extends Auditable> = Pick<T, “_modifiedAt” | “_modifiedBy”>
```

Defining an `AuditableFields` type like the above I can now reference it in `ChangeLog`:
``` typescript
export interface ChangeLog {
  _startversion?: number;
  _endversion?: number;
  resources?: {
    Property: StartEnd<…> &
      AuditableFields<metadata.resources.Resource>;
  };
  fields?: {
    [resource_name: string]: {
      [standard_name: string]: StartEndBox<…> &
       AuditableFields<metadata.fields.Field>;
    };
  };
  …
}
```

Now, instead of repeating myself, I’m specifying _which_ Type I want in the context. Using a Generic like this makes the code more declarative. Instead of intuiting that I’m picking certain fields from a model, I’m declaring that I want the AuditableFields from X, Y, or Z (or T as it were). 

# Summary
Let’s return to the two questions we started with. Do we know how to answer them yet?

1. When does it make sense to use a Generic in a Typescript type? 
If you find yourself typing the same interface over and over but swapping out only its reference - that’s a _good_ indication that you could benefit from a Generic type. 

2. How do you create a type that takes a Generic? 
Like a variable definition, defining a Generic type means pulling the pieces apart in a way that abstracts the logic a bit. However, in doing so, you have a centralized point of configuration that can be shared and reduce repetition and the opportunity for mistakes. 


# Footnotes
* <sup>1</sup> [Generics | TypeScript](https://www.typescriptlang.org/docs/handbook/generics.html)
