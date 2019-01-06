---
title: 'Deep and shallow copying - A tale of two friends'
date: '2018-08-20'
category: 'programming'
tags: ['array method', 'deep copy', 'object method', 'shallow copy']
---
I was recently using the slice method to copy an array and I ran into a few difficulties understanding why my copy was not shallow. From the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) page on the slice built-in method (emphasis my own): 

> The slice() method returns a **shallow copy** of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified. 

I thought I understood shallow and deep copying pretty well, but I was editing elements of one array and not seeing that reflected in the other.

I did some research into the issue and to help me understand the differences between shallow and deep copying, I found it useful to think in terms of two friends.

Friend A is trendy. She sets the standard. Friend B is lazy, but wants to be cool. Instead of doing the research, he just copies Friend A. He has two levels of skill - deep and shallow. 

# Deep Copying - The art of method acting

When Friend B decides to Deep Copy, it’s like a method actor who immerses themselves so deeply in the concept of what it was to live in a particular period that they come to represent that period in their own way when they act. It means that they know the material so intimately that even if it were to change, they would be able to pick and choose what to replicate. But, because they know the topic as well as they do, they have agency. It’s not a blind copying because they actually understand the difference.

Effectively, when Friend B deeply copies Friend A, it is a perfect replica. The upside is that with a deep copy, Friend A and Friend B can diverge. Once the copy is complete, Friend B is no longer reliant or tied to Friend A’s image of the world.

The downside of this approach is that we’ve duplicated efforts. Because Friend B is a perfect replica, they’ve had to literally re-learn all of the information that goes into being Friend A and store that in their mind. That is, there’s a memory space cost. 

# Shallow Copy - The superficial reflection

A Shallow Copy approach addresses this memory space concern, but comes with its own costs - namely that it’s a purely superficial copy.

When Friend B decides to shallow copy Friend A, they’re deferring their agency in pursuit of efficiency. If Friend A changes, Friend B changes because Friend B’s understanding of the world is derived from the same place in a collective memory that Friend A stores their information. In this way a shallow copy acts more like a mirror than a true replica. 

# Bringing this back to code - a caution and gotcha

## The caution

My friend example is of course an abstraction and a simple one at that. For the sake of illustration, I always had Friend A drives the change and Friend B always copy. In programming, however, the relationship is bidirectional.

If Object B shallow copies Object A and then is modified, Object A is *also* modified because they share the same space in collective memory. 

## The gotcha

The root of my problem was that I thought shallow and deep copying applied to all types of values. However, it really only applies to objects and arrays. If you keep this in mind, you should be just fine. 

# Further reading

I found this [StackOverflow](https://stackoverflow.com/questions/184710/what-is-the-difference-between-a-deep-copy-and-a-shallow-copy?page=1&tab=votes#tab-top) answer really helpful for understanding the language agnostic aspects of copying shallowly vs deeply. The [University of Texas](https://www.cs.utexas.edu/~scottm/cs307/handouts/deepCopying.htm) has some nice graphics demonstrating these concepts for arrays. And of course, Wikipedia on [Object Copying.](https://en.wikipedia.org/wiki/Object_copying)