---
title: 'Supporting Submit On Enter'
date: '2019-10-09'
category: ['programming']
tags: ['html', 'react', 'javascript', 'event listeners', 'webforms']
---

When asking users for their input, it’s often a pleasant user experience to allow them to submit the form by pressing "Enter".

In fact, that’s the default behavior if using the `<form>` element:

```html
<body>
  <div>
    <form>
      <div>
        <span id="empty"></span>
        <label for="first-name">Your Name</label>
        <input name="first-name" type="text" />
      </div>
      <button id="submitBtn">
        Click to see the magic!
      </button>
    </form>
  </div>
</body>
<script>
  function handleSubmit(e) {
    e.preventDefault()
    console.log(`clicked`)
    document.getElementById("empty").innerHTML = ‘filled!’
  }
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
</script>
```

With the above form, you could press enter in the `first-name` input or the button - in both cases, you’ll get to "filled!" Appear.

Unfortunately, breaking this default behavior is rather easy to do - particularly for the sake of design.

So, imagine instead that you have a `<form>` with its inputs and a button that lives outside of that form.

How do you allow the user the same ease of input?

Very similarly to how we added the event listener for click - except now we’re going to look for `keyup` and we’re going to be listening on the entire form.

```html
<body>
  <div>
    <form id="awesome-form">
      <!-- ... no changes -—>
    </form>
  </div>
</body>
<script>
  // ... no changes
  document.getElementById("awesome-form").addEventListener("keyup", handleSubmit);
</script>
```

This works… too well.

There are two problems:

1. We’re firing `handleClick` for _any_ keyup. We only want it to happen on `Enter`.
2. The form currently has no validation, so even if the form had errors, by pressing a key (or ‘Enter’ if the above is addressed), we’d try to submit.

For the former, we should add a condition to our `handleSubmit` to only fire if we press the `Enter` key<sup>2</sup>, for example:

```javascript
  function handleClick(e) {
    e.preventDefault()
    if (e.keyCode === 13 ) {
      console.log(`clicked`)
      document.getElementById("empty").innerHTML = ‘filled!’
    }
  }

```

Remember how I said I like React? This same thing in react would just be:

```javascript
function handleClick(e) {
    e.preventDefault()
    if (e.key === ‘Enter ) {
      console.log(`clicked`)
      // do whatever you want here, but it probably won’t be getting a document by its ID.
    }
  }
```

And then you could pass this function as a prop to the `keyUp` value.

For the latter, it’s good practice to validate your form.

If validation is present, then it would be a matter of adding that as a condition to firing the function. E.g.,

```javascript
  const valid = true // put in the conditions here
  function handleClick(e) {
    e.preventDefault()
    if (e.keyCode === 13 && valid) {
      console.log(`clicked`)
      document.getElementById("empty").innerHTML = ‘filled!’
    }
  }
```

For form management (including validation), I like Formik. It took me a few forms worth of practice to understand how the validation works, but once I did I realized how intuitive and pleasant it is.

Now, I can just check to make sure there are no errors in my form and if everything’s good, fire off my handle submit if the user presses the enter key.

## Footnotes

- Since v0.11, React supports event normalization. Instead of having to type in the key id, you can say `event.key === ‘Enter’` or `enter.key === ‘ArrowLeft’`, etc. [React v0.11 – React Blog](https://reactjs.org/blog/2014/07/17/react-v0.11.html#improved-keyboard-event-normalization)
- <sup>2</sup> Each key has a code. Enter happens to be number 13 in Javascript. [Javascript Char Codes (Key Codes) | Cambia Research](https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes)
