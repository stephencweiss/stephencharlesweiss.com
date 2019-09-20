---
title: 'HTML: Name vs. Id'
date: '2019-09-20'
category: ['programming']
tags: ['html', 'web forms', 'id', 'name']
---

In looking into labels for web forms recently, I stumbled on a question I really didn’t know the answer to: What’s the difference between a name and an id attribute in HTML?<sup>1</sup>

After some research, the way I’m thinking about it is: Names are used for naming a thing (duh). But like a name for a person, it doesn’t have to be unique. IDs, on the other hand, _should_ be unique.

This was greatly informed by the discussion on StackOverflow.<sup>2</sup>

There’s no relationship implied between a name and an id. The fact that many examples across the web have the same name and id is an artifact of the example. It’s not required.

Consider a form to determine a user’s favorite color via radio buttons. Only one radio can be selected at a time, but each element would refer to the favorite color on submission. So the `name = "favorite"` while the `id` is unique.

In that way, names can be used to group like things.

```html
<form>
	<label> Name <input name="name" id="name" type="text"></label><br />
  <label> Favorite Color <br/>
    <input name="favorite" id="favorite-red" type="radio" label="red">red <br/>
    <input name="favorite" id="favorite-blue" type="radio" label="blue">blue <br/>
  </label>
  <input type="submit" value="submit">
</form>
```
Here's a sample codepen<sup>3</sup>

## Resources
* <sup>1</sup> [Web Forms Basics: Labels](../../2019-09-19/a11y-web-forms-basics-labels)
* <sup>3</sup> [Difference between id and name attributes in HTML | StackOverflow](https://stackoverflow.com/questions/1397592/difference-between-id-and-name-attributes-in-html)
* <sup>2</sup> [Name vs Id | CodePen](https://codepen.io/stephenweiss/pen/bGbxOzB)

