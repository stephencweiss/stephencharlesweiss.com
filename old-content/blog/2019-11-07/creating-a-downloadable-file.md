---
title: 'Creating A Downloadable File'
tags:
    [
        'javascript',
        'html',
        'window',
        'document',
        'download',
        'URL.createObjectURL',
    ]
category: ['programming']
date: '2019-10-29'
publish: '2019-11-07'
---

I thought this was pretty cool. Imagine you want to create a file programmatically and allow a user to download it.

For the sake of this example, let’s assume that by the time we _try_ to download the file (i.e. click the button), we’ve already stored the data in a `Blob`.<sup>[1](#footnotes)</sup><a id="fn1"></a>

```html
<body>
    <!-- … -->
    <button id="download">download</button>
</body>
<script>
    // handleDownload to go here…
    document
        .getElementById('download')
        .addEventListener('click', handleDownload)
</script>
```

We don’t know _which_ file they’re going to create in advance, so we can’t prepare it on page load (nor would we want to in the event that the user is satisfied with the web view).

One way to solve this is to create a new Element on the DOM, attach a few key properties to it, and then remove it once done.

That might look something like this:

```javascript
const downloadFile = (blob, fileName) => {
    const temporary = document.createElement('a') // create a temporary a tag element
    document.body.appendChild(temporary) // attach it to the body
    const url = window.URL.createObjectURL(blob) // generate a URL
    temporary.href = url // attach the URL to the temporary element
    temporary.download = fileName // assign a name to download property
    temporary.click() // "click" the temporary element

    setTimeout(() => {
        window.URL.revokeObjectURL(url) // remove the generated url
        document.body.removeChild(temporary) // remove the temporary object from the DOM
    }, 0) // I don’t believe the setTimeout is strictly necessary, but _may_ help if `click()` hangs
}
```

Note that I am creating temporary urls which is then attached to the anchor tag’s `href`. I say temporary because the URL created from `createObjectURL` is automatically removed when the document is unloaded (however, for memory management purposes, it’s recommended that the URL is manually removed when safe to do so -- this is why I have `revokeObjectURL`).<sup>[2](#footnotes)</sup><a id="fn2"></a>

While I’m obviously aware that you can download files from the internet, I don’t have a lot of experience exploring the Window or Document APIs. As a result, this felt like a pretty simple solution to a problem that’s bound to come up.

For an interactive version (in React), I put together a [CodeSandBox](https://codesandbox.io/s/downloadable-file-ij2dg) to play with.

## Footnotes

-   <sup>[1](#fn1)</sup> The [`Blob` MDN page](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
-   <sup>[2](#fn2)</sup> The [`createObjectURL` MDN page](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
