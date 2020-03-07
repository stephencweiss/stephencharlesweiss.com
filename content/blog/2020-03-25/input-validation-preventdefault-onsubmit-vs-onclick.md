---
title: 'Form Validation: preventDefault And onSubmit Vs onClick'
date: '2020-03-07'
publish: '2020-03-25'
category: ['programming']
tags:
  [
    'javascript',
    'react',
    'events',
    'input',
    'client side validation',
    'validation',
    'forms',
    'onclick',
    'onsubmit',
  ]
---

A little over a year ago, I first discovered the power of `Event.preventDefault` and `HTMLFormElement.reset` and wrote about it [here](https://stephencharlesweiss.com/blog/2019-01-04/better-form-submissions-with-event-preventdefault-and-htmlformelement-reset/).

Despite having that post as a reference, I found myself struggling to understand why my form wasn't behaving as I expected today.

I was playing around with an email submission. After getting the initial wiring hooked up, I decided to add [client side form validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Client-side_validation) by adding a pattern to my `input` tag to catch basic violations.<sup>[1](#footnotes)</sup><a id="fn1"></a>

Per [MDN's page on the `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input):

> **pattern**The pattern attribute, when specified, is a regular expression that the input's [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-value) must match in order for the value to pass [constraint validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) . It must be a valid JavaScript regular expression, as used by the [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) type, and as documented in our [guide on regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) ; the 'u' flag is specified when compiling the regular expression, so that the pattern is treated as a sequence of Unicode code points, instead of as ASCII. No forward slashes should be specified around the pattern text.
> If the pattern attribute is present but is not specified or is invalid, no regular expression is applied and this attribute is ignored completely. If the pattern attribute is valid and a non-empty value does not match the pattern, constraint validation will prevent form submission. > **Tip:** If using the pattern attribute, inform the user about the expected format by including explanatory text nearby. You can also include a [title](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-title) attribute to explain what the requirements are to match the pattern; most browsers will display this title as as a tooltip The visible explanation is required for accessibility). The tooltip is an enhancement.
> See [Client-side validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Client-side_validation) for more information.

This seemed straight forward enough. Add a pattern. Use the title to assist in providing an explanation. No matter what I did though - my pattern didn't seem to be validating! I tried simpler patterns. I opened up code sandboxes and they worked. What was going on?

The issue, it turned out, was where I'd placed the logic. Instead of attaching the form logic to the form's `onSubmit` handler like I had [in my example a year ago](https://stephencharlesweiss.com/blog/2019-01-04/better-form-submissions-with-event-preventdefault-and-htmlformelement-reset/#example-time), I placed it in the form button's `onClick`.

While this works for _most_ basic use cases, the `preventDefault` will _disable_ the native validation when attached to the `onClick` event, but _not_ `onSubmit`.<sup>[2](#footnotes)</sup><a id="fn2"></a>

TIL.

## React Example

At a high level, my form looked like:

```javascript
function MyForm() {
  const handleClick = () => {
    event.preventDefault()
    /* ... */
  }
  return (
    <form>
      <input />
      <button onClick={handleClick}>Submit</button>
    </form>
  )
}
```

Once I moved the handler to the appropriate event (`onSubmit`) everything started working as desired:

```javascript
function MyForm() {
  const handleSubmit = event => {
    /* ... */
  }
  return (
    <form onSubmit={handleSubmit}>
      <input />
      <button>Submit</button>
    </form>
  )
}
```

I put together a [CodeSandBox](https://codesandbox.io/s/form-validation-click-vs-submit-nwyeu) to help me see these differences.

https://codesandbox.io/s/form-validation-click-vs-submit-nwyeu

Note: It's worth noting that in the example, there's no need to use the `ref` in the `handleSubmit` version (FormOne), however, in practice, this was useful because the submission was asynchronous. By having this ref, I could prevent the automatic submission of the form - which loads a new page and is why we use `preventDefault` in the first place - until function had resolved. Once that happened, I would know what to display - which in my case _wasn't_ a new page, but a status update on the form that the form had been successfully submitted.

## Vanilla JS Example

If you're working with vanilla JS, you can apply custom validation too. Here's an [example I found from the W3 Spec](https://www.w3.org/TR/html52/sec-forms.html#the-constraint-validation-api) helpful in seeing _how_ you might attach a validator function:

```html
<label>Feeling: <input name="f" type="text" oninput="check(this)"/></label>
<script>
  function check(input) {
    if (
      input.value == 'good' ||
      input.value == 'fine' ||
      input.value == 'tired'
    ) {
      input.setCustomValidity('"' + input.value + '" is not a feeling.')
    } else {
      // input is fine -- reset the error message
      input.setCustomValidity('')
    }
  }
</script>
```

## Conclusion

While knowing about `preventDefault` and the form `reset` are powerful tools - it's equally important to understand _which_ events they are best coupled with.

Before today, I had no idea that the `preventDefault` disabled the native validation functionality of the HTML5 `input` components _when_ attached to the `onClick`, but _not_ the `onSubmit` events!

## Footnotes

- <sup>[1](#fn1)</sup> Validating email is _hard_. My real goal was to catch 90%+ of the cases and not get into the category of what Jeff Atwood calls [Regex abuse](https://blog.codinghorror.com/regex-use-vs-regex-abuse/).
- <sup>[2](#fn2)</sup> I found this nugget when reviewing this conversation on Stack Overflow about [Preventing Form Submission](https://stackoverflow.com/a/39841238) in React.
