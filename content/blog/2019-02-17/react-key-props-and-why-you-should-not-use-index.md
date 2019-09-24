---
title: 'React Key Props And Why You Shouldn't Be Using Index'
date: '2019-02-17'
category: ['programming']
tags: ['react', 'key-props', 'dynamic lists', 'performance']
---

If you've ever mapped over an array in React, you've likely seen this warning:

`Warning: Each child in a list should have a unique "key" prop.`

![](./warning-children-should-have-unique-key.png)

I wanted to understand _why_ React gives this warning. After all, I'd heard that using the index of the element was a poor choice _even though it is reliably unique_.

It's reliably unique in the sense that no two elements will ever have the same index. However, you have no guarantee that the index will be assigned to the _same_ element the next time the page renders.

Dan Abramov recently wrote about [React As A UI Runtime](https://overreacted.io/react-as-a-ui-runtime). When he gets to talk about lists, he has a provocative point:

> Comparing the element type at the same position in the tree is usually enough to decide whether to reuse or re-create the corresponding host instance.
>
> But this only works well if child positions are static and don't re-order. In our example above, even though message could be a “hole”, we still knew that the input goes after the message, and there are no other children.
>
> With dynamic lists, we can't be sure the order is ever the same.
>
> If the `list` of our shopping items is ever re-ordered, React will see that all `p` and `input` elements inside have the same type, and won't know to move them. (From React's point of view, the _items themselves_ changed, not their order.)

This helped me understand _why_ keys were helpful - they tell React whether two items are "conceptually" the same - even if their order has changed. But I needed to walk through some examples to see where the index fell in this.

Let's think about this from React's perspective as we render components in three separate ways.

For all examples, we'll imaging that we're rending a details component for animals.

We will start with three animals and then remove one - the second one in the list.

**Before**

```javascript
const animals [
{"name": "Albert", "breed": "English Bulldog", "age": 2},
{"name": "Lucy", "breed": "Labrador", "age": 7},
{"name": "Nimbus", "breed": "Havanese", "age": 12}
]
```

**After**

```javascript
const animals [
{"name": "Albert", "breed": "English Bulldog", "age": 2},
{"name": "Nimbus", "breed": "Havanese", "age": 12}
]
```

# No Key

If we do not use a key, we will receive the error above.
Why? Because every time we re-render, React won't have any sense for what's changed, and so it will have no choice but to re-render the each child in the list.

```javascript
render() {
  return (
    <div>
      <div className="container">
        {animals.map((animal, index) => (
          <Details
            name={animal.name}
            breed={animal.breed}
            age={animal.age}
          />
        ))}
      </div>
    </div>
  );
}
```

Don't do this. React will yell at you. Rightfully so. You'll

# Index As Key

What if we use an index for the key?
When we modify our list and drop Lucy, the key that doesn't get passed down to the children would be “2”. That key, however, referred to Nimbus - which is where React would focus its updating efforts. That's definitely not what we want.

```javascript
render() {
  return (
    <div>
      <div className="container">
        {animals.map((animal, index) => (
          <Details
          key={index}
          name={animal.name}
          breed={animal.breed}
          age={animal.age}
          />
        ))}
      </div>
    </div>
  );
}
```

Even if React does have magic built in to recognize you're using an index and not actually a unique property, you're not getting the speed benefits of only comparing differences in the virtual DOM.

# Unique Key

What about doing it right? In our case, the animal has an `id` property, but you could construct a unique ID as long as its reliably tied to that same entity (example: combining animal name, breed, age would likely get you most of the way there if the database wasn't too big).

```javascript
render() {
  return (
    <div>
      <div className="container">
        {animals.map((animal, index) => (
          <Details
            key={animal.id}
            name={animal.name}
            breed={animal.breed}
            age={animal.age}
          />
        ))}
      </div>
    </div>
  );
}
```

# More Examples

To see how this would work, imagine the following situation: we have a list of three animals:

```javascript
<Details>{animal}</Details>
<Details>{animal}</Details>
<Details>{animal}</Details>
```

If we _don't_ have a key, and we remove one of the elements, can you tell which one was removed?

```javascript
<Details>{animal}</Details>
<Details>{animal}</Details>
```

Probably not very easily.

What about if we used an index value for the key?

```javascript
<Details key="0">{animal}</Details>
<Details key="1">{animal}</Details>
<Details key="2">{animal}</Details>
```

becomes ...

```javascript
<Details key="0">{animal}</Details>
<Details key="1">{animal}</Details>
```

Do you know which one disappeared? Are you sure?

Now, when we use an id (format is `id-#`), we can see how much more quickly we can determine _with certainty_ which element disappeared.

```javascript
<Details key="id-0">{animal}</Details>
<Details key="id-1">{animal}</Details>
<Details key="id-2">{animal}</Details>
```

becomes ...

```javascript
<Details key="id-0">{animal}</Details>
<Details key="id-2">{animal}</Details>
```

It's readily apparent that `“id-1"` is what disappeared!

# Conclusion

> What's a good value for a key? An easy way to answer this is to ask:**when would** _you_ **say an item is the “same” even if the order changed?** > \- Dan Abramov

The problem with using the index then is not that they are not unique. They are. Reliably so. It is that they are not reliably attached to the same element - so if an array shifts, the index will shift what it's pointing to.

My gratitude to Nicolas Marcora for helping to firm up my understanding - any errors are mine alone.

# Additional Reading & Sources

[React as a UI Runtime — Overreacted](https://overreacted.io/react-as-a-ui-runtime/#lists)
