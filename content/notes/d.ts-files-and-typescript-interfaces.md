---
title: '`.d.ts` Files And Typescript Interfaces'
date: '2019-03-08'
publish: '2019-03-08'
category: ['programming']
tags: ['typescript', 'error handling', 'declaration files']
---

The `.d` file is a declaration file. In this case, it’s a declaration file for Typescript files.

What does that actually mean though? The declaration file acts as an interface with other Javascript files so that they do not _need_ to be re-written in typescript while still getting the benefits of having _some_ parts of the code base be typed.

In my case, I came across a `updateUserPreferences` method that relied on accessing the entity `UserPreferences`.

```javascript
import { entities } from "entitySourceLibrary";
import UserPreferences = entities.userPreferences;
...
export const updateUserPreferences = async (userId: string, preferences: UserPreferences, referer: string): Promise<UserPreferences | undefined> => {
	...
	const displayFullName = preferences.displayFullName;
	const anUnknownField = preferences.anUnknownField;
}
```

![Unknown Property Error](https://res.cloudinary.com/scweiss1/image/upload/v1593194059/code-comments/unknown-property-error_fmfcgx.png)

When I tried to access a field that _didn’t_ exist in the entity, however, Typescript alerted me. Even more to the point, this is a fatal error and the code will not compile correctly until this is addressed.

Fortunately, defining the entity is pretty straightforward:

```typescript
export interface UserPreferences {
    userId: string;
    ...
    displayFullName?: string;
    ...
}
```

If I wanted to be able to use the `anUnknownField` in my program, I would add it to the entity file.

```typescript
export interface UserPreferences {
    userId: string;
    ...
    displayFullName?: string;
	  anUnknownField?: string;
    ...
}
```

StackOverflow on the topic: [About "\*.d.ts" in TypeScript](https://stackoverflow.com/questions/21247278/about-d-ts-in-typescript)
