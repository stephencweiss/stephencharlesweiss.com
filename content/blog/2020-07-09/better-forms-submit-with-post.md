---
title: 'Better Form Submissions: Submit With POST'
date: '2020-04-26'
publish: '2020-07-09'
category: ['programming']
tags: ['forms','html','preventdefault','onsubmit','form submission']
---
The standard behavior of a `form` tag on submit is to send a `GET` request with all of the form's values passed as query parameters.

There are a number of ways to prevent this, some of which I've even written about before, like using [preventDefault](https://stephencharlesweiss.com/blog/2019-01-04/better-form-submissions-with-event-preventdefault-and-htmlformelement-reset/) to halt this behavior.

But, if Javascript fails then you run the risk of exposing the user form in the URL. If the form is benign, then it may not be such a big deal, but if it's a user's password, or personal information, it's probably worth taking extra precautions - particularly when they're easy - as is the case here!

Imagine the following HTML:

```html:title=index.html
<body>
    <form id="sign-up-form" onSubmit={handleSubmit}>
		<!--...-->
 		<button type="submit">Submit</button>
    </form>
    <script>
		const formTag = document.querySelector('#sign-up-form');
      function handleSubmit(){/*...*/}
		formTag.addEventListener('submit',handleSubmit)
    </script>
</body>
```

At this point we have a form, with some fields (not shown here), and on submit, we fire the `handleSubmit` function.

In normal circumstances, this would send a GET request and off we'd go. Using `event.preventDefault()` is good from a user experience here, because it allows us to manage what happens next - but again, what if that fails?

Let's use a `POST` request! To do this, we make one small change and use [the `method` attribute of HTML Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form): 
```diff:title=index.html
<body>
-    <form id="sign-up-form" onSubmit={handleSubmit}>
+    <form method="POST" id="sign-up-form" onSubmit={handleSubmit}>
		 <!--...-->
 		 <button type="submit">Submit</button>
    </form>
    <script>
		const formTag = document.querySelector('#sign-up-form');
      function handleSubmit(){/*...*/}
		formTag.addEventListener('submit',handleSubmit)
    </script>
</body>
```

With the method in place, the form data will be sent as part of the request body, instead as query parameters. This one line change can help avoid a major headache later!
