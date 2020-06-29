---
title: 'Initializing A Class'
date: '2019-11-01'
publish: '2019-11-12'
category: ['programming']
tags: ['javascript', 'class', 'oop', 'babel', 'eslint']
---

Continuing the trend of learning more about Javascript classes of late, I found the following recently and thought it was quite interesting.

Historically, when we created a class, we would instantiate it like so:

```javascript
class Details extends Base {
    constructor(props){
        super(props)
        this.foo = ‘bar’;
    }
}
```

A recent proposal to TC39 regarding static class features, however, suggests that in the future we’ll be able to do something as simply as:

```javascript
class Details extends React.Component {
  foo = ‘bar’;
}
```

No need for the constructor at all!

This is also true even if the class does not extend a subclass.

For example:

```javascript
class Details {
    constructor(){
        this.foo = ‘bar’;
    }
}
```

Becomes:

```
class Details extends Base {
    foo = ‘bar’;
}
```

You can start using this syntax today if you transpile with Babel.

To do so, you will need to add the following to your `babelrc` or `babel` config object:

```json
{
    "presets": ["preset-react", "preset-env"],
    "plugins": ["plugin-propsal-class-properties"]
}
```

Note: all of these are scoped to `@babel` - so the package to install would be `@babel/preset-react` for example. To install these you can do the following:

```shell
$ npm i @babel/preset-react @babel/preset-env @babel/plugin-proposal-class-properties
```

And, if you are using `eslint`, you will need to tell it which parser to use - so add the following to your `.eslintrc`:

```json
{
    /* ... */
    "parser": "babel-eslint"
}
```

## Additional Reading

-   [Class Fields Proposal | TC39](https://github.com/tc39/proposal-class-fields)
-   [@babel/plugin-proposal-class-properties | Babel](https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties.html)
