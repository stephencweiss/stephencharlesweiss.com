---
title: 'Bubbling Up Exceptions And Throwing Objects'
date: '2019-10-08'
category: ['programming']
tags: ['javascript', 'throw', 'error handling', 'bubbling errors']
---

Every time I’ve thrown an error, I’ve used the `Error` object.

```javascript
  try {
    // do something
    if (/* something bad happens */) {
      throw new Error(‘whoops!’)
    }
  catch (error) {
    handleError(error)
  }
```

It turns out, however, you can throw anything. I probably knew this intuitively, but I hadn't recognized _why_ it would be valuable until I came across it in the wild: bubbling up errors.

First, let’s look at how to throw something _other_ than an `Error` object. MDN has a nice and simple example to illustrate how to throw an object: <sup>[1](#fn1)</sup><a id="sup1"></a>

> You can specify an object when you throw an exception. You can then reference the object's properties in the catch block. The following example creates an object of type UserException and uses it in a throw statement.
>
> ```javascript
> function UserException(message) {
>    this.message = message;
>    this.name = ‘UserException’;
> }
> function getMonthName(mo) {
>    mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
>    var months = [‘Jan’, ‘Feb’, ‘Mar’, ‘Apr’, ‘May’, ‘Jun’, ‘Jul’,
>       ‘Aug’, ‘Sep', 'Oct', 'Nov', 'Dec’];
>    if (months[mo] !== undefined) {
>       return months[mo];
>    } else {
>       throw new UserException(‘InvalidMonthNo’);
>    }
> }
>
> try {
>    // statements to try
>    var myMonth = 15; // 15 is out of bound to raise the exception
>    var monthName = getMonthName(myMonth);
> } catch (e) {
>    monthName = 'unknown';
>    console.error(e.message, e.name); // pass exception object to err handler
> }
> ```

Okay, so we’re throwing an object - but how does that help us with bubbling up?

Take another example, this one abstracted from a project I’m working on. I happen to be using an API that returns a tuple - a response and an error:

```javascript
const validate = async () => {
  try {
    const res = await asyncAPICall(opt);
    const response = { data: res[0], error: res[1] };
    if (error) throw new Error();
    if (response) {
      /* handle response */
    }
  } catch (error) {
    setIsError(true);
    setIsLoading(false);
    const errorCode = error && error.response && error.response.data.code
    handleUserStateError(errorCode, setActiveScreen)
    }
  };
}
```

The `asyncAPICall` has its own `try/catch`:

```javascript
export const asyncAPICall = async (opt) => {
  let result, error;
  try {
    const response = await backendService.post(‘/my/route’, {… opts});
    result = response.data;
  } catch (err) {
    error = err;
    handleUnauthorized(err);
  }

  return [result, error];
};
```

It only handles `401: Unauthorized` errors though. Any other type of error is just returned and passed along as a normal result.

There may be a reason to _not_ simply re-throw the error in the `asyncAPICall`, but I still needed to get the error it produced _into_ the catch block of `validate`. To get it there, I replaced `if (error) throw new Error()` with `if (error) throw error`. This is a straight forward way to bubble my errors up and allow them to be handled elsewhere and it works because you can `throw` anything.

As long as there’s a catch block, it will be caught. If there’s no catch, the program will stop.

## Footnotes:

-   <sup>[1](#sup1)</sup><a id="fn1"></a> [throw - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#Throw_an_object)
