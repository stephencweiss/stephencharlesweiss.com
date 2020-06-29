---
title: 'Using Callbacks To Reverse Data Flow In React'
date: '2019-09-05'
publish: '2019-09-05'
category: ['programming']
tags: ['react', 'forms', 'validation', 'controller-presentation']
---

React’s one way data flow makes it easy to reason through, but sometimes the controlling component needs to know what’s going on inside.

For example, imagine a form comprised of multiple pieces

![Form Sketch](https://res.cloudinary.com/scweiss1/image/upload/v1593196445/code-comments/form-sketch_lxnndf.png)

While form validation is often handled by the enclosing component, in this case, the `PhoneInput` component has standardized validation.

Since it’s a shared component, it made sense to not have to repeat it with every instance.

But if the logic for validating the input is _inside_, how do we get it back out? Callbacks.

Imagine a `FormContainer` even simpler than the drawing above. It’s just a phone number and a submit. We don’t want to be able to submit the form if the phone number is invalid (according _to_ the `PhoneInput` itself.

```javascript
function FormContainer() {
  const [value, setValue] = useState(‘’);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleBlur = (e, isValid) => {
    value && setIsInvalid(!isValid);
  };
  return (
    <>
      <PhoneInput value={value} error={isInvalid} setValue={setValue} onBlur={handleBlur} />
      <button disabled={isInvalid}>Submit</button>
    </>
  );
}
```

To implement the `PhoneInput` itself, we created a wrapper around the [`intl-tel-input` library](https://github.com/jackocnr/intl-tel-input) which gave us access to their utility functions, including `isValidNumber`.

To use it, we needed to use refs, which make this a more complicated component (at least to me), however, below, I’ve tried to focus only on the parts that are relevant:

```javascript
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils.js';
import React, { useRef, forwardRef } from 'react';

const InputWithRef = forwardRef((props, ref) => <input ref={ref} {…props} />)

export default function PhoneInput({ error, onBlur, onError, options, setValue, value, ...rest }: IPhoneInput) {
  const refContainer = useRef(null);
  const iti = useRef(null);
  //[…]
  const handleBlur = e => {
    const { intlTelInputUtils } = window; // Unorthodox approach, but using the utils attached to the window object
    onBlur && onBlur(e, intlTelInputUtils.isValidNumber(value));
  };

  return (
    <InputWithRef
      as="input"
      error={error}
      onBlur={handleBlur}
      ref={refContainer}
      type="text"
      {...rest}
      />
    );
```

Here, we can see that the _when_ the `InputWithRef` component emits an `onBlur` event, it will hit the `onBlur` event handler passed down from `FormContainer` if one exists.

In that way, we will be able to control the `<button>` element without wrapping the button within the `PhoneInput` _or_ having the validation logic in the container level.

The React Docs on [refs](https://reactjs.org/docs/refs-and-the-dom.html) and [forwardingRefs](https://reactjs.org/docs/forwarding-refs.html) are helpful, albeit somewhat confusing. A task for a future date is to try to explain them myself.
