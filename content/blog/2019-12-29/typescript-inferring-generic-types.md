---
title: 'Inferring Generics With Typescript'
date: '2019-12-12'
publish: '2019-12-29'
category: ['typescript']
tags: ['generics', 'types', 'react', 'hooks']
---

Recently, I needed the ability to track which items within a collection had been selected. As I thought about the problem, it felt like a great candidate for a custom hook. The specifics of the _type_ of item didn't matter, I just wanted to know which ones had been selected by the client (via a check box, drag and drop, etc.).

Writing the hook in Typescript, and because I didn't know the specific type, I used a [generic](https://www.typescriptlang.org/docs/handbook/generics.html) type for the basis of all of the typings within the hook.

Eventually, it looked something like:

```javascript
function useSelected<T>(items?: T[], key?: keyof T) {
    const [allItems, setAllItems] = useState(keyBy(items, key));
    const [keyName, setKeyName] = useState(key)

    const resetAllItems = (items: T[], key: keyof T) => {
        setAllItems(keyBy(items, key));
        setKeyName(key);
    };

    return {
        allItems,
        resetAllItems,
        // ...
    }
}
```

When it came time to actually use it, I invoked the hook in the following way<sup>1</sup>:

```javascript
const { resetAllItems } = useSelected()
```

This approach, however, results in errors:

![](/i/Screen%20Shot%202019-12-12%20at%204.14.58%20PM.png)
Caption: `Argument of type '"MediaKey"' is not assignable to parameter of type 'never'.ts(2345)`

My first question was, "Why is the the type `never` even though I assigned a type when I define the function?"

![](/i/Screen%20Shot%202019-12-12%20at%204.17.05%20PM.png)

It turns out it's because Typescript is trying to infer based on the invocation of the hook<sup>2</sup>:

![](/i/Screen%20Shot%202019-12-12%20at%204.20.19%20PM.png)

As a result, Typescript infers the types based on the `items` prop that's passed in (which is undefined). As a result, key, which is of `keyof T` is now `never`.

With the problem diagnosed, I now needed to figure out hwo to fix it!

## How To Fix This

I've found three different solutions to this problem of varying complexity.

1.  Pass arguments and allow Typescript to infer the types
2.  Declare the type of the generic up front
3.  Reassign the generic within the code

### Passing Props

Definitely the easiest way to get around this problem is to stop it before it starts. The hook takes two optional parameters, which if supplied, provide Typescript sufficient information to complete the inference.

What that means is ... replace:

```javascript
const { resetAllItems } = useSelected()
```

with:

```javascript
const list = [
  { key: 'abc', val: 123 },
  { key: 'def', val: 456 },
]
const keyLabel = 'key'
const { resetAllItems } = useSelected(list, keyLabel)
```

Voilà - errors begone! Typescript now knows what `T` is by looking at the shape of an individual item in `list` and the `key` since it's supplied as `keyLabel`.

### Declaring The Generic

Alternatively, instead of passing in the argument, let Typescript know the type of the generic it will receive.

Remember, the hook definition is all based on a generic type `T`:

```javascript
function useSelected<T>(items?: T[], key?: keyof T) {
    // ...
}
```

So, when it's called, even if no values are passed, it's possible to declare `<T>` like so:

```javascript
interface IItem {
    key: string,
    val: number
}

const { resetAllItems } = useSelected<IItem> ();
```

Do this and the errors will be gone because Typescript can now infer what `items`, and consequently `key`, will be ... and it's not `never` but an array of the objects defined by `IITem` and one of its keys.

### Reassigning The Generic

A third approach to the problem is to effectively have multiple generics and deferring the inference as long as possible.

For example, modify the function definition of `resetAllItems` to be:

```javascript
function resetAllItems<U=T>(items: U[], key: keyof U) => {
    setAllItems(keyBy(items, key));
    setKeyName(key);
};
```

This would change the hook to be:

```javascript
function useSelected<T>(items?: T[], key?: keyof T) {
    const [allItems, setAllItems] = useState(keyBy(items, key));
    const [keyName, setKeyName] = useState(key)

    function resetAllItems<U=T>(items: U[], key: keyof U) => {
        setAllItems(keyBy(items, key));
        setKeyName(key);
    };

    return {
        allItems,
        resetAllItems,
        // ...
    }
}
```

Of course, this fixes one problem only to create another. Now `setAllItems` and `setKeyName` have typing issues - but they too could be modified.

So on, and so forth. In my case, this approach required more refactoring than I felt was reasonable. Particularly because I already had reasonable solutions that communicated the intent to future developers who might come across this code later. None the less, knowing that it's possible to reassign generics in this way will surely be useful at some point.

## Conclusion

My journey with Typescript still feels like it's in its infancy. Writing this hook was the first time that I reached for a generic type intentionally and could even conceive of _why_ it would be useful. Of course, once I did so, I uncovered an entirely new class of issues requiring consideration and new patterns for solving them!

## Footnotes

- <sup>1</sup> This is a stylized exmaple. In actual use, I used more of the functions and state returned by the hook, though it is accurate that I called the hook without passing in any of the optional parameters.
- <sup>2</sup> One of my colleagues noted that this is a limitation of Typescript's inference model due to the constraints (or really, lack thereof) imposed by Javascript. Simply put, because of Javascript's dynamism, type checking in Typescript is at the function level. Consequently, type checking occurs much earlier than in more functional languages like Haskell.
