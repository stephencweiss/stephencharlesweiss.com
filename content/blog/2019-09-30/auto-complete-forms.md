---
title: 'Auto-Complete In HTML Forms'
date: '2019-09-30'
category: ['progamming']
tags: ['html','autofill','autocomplete','whatwg']
---
Starting around 2015, browsers started treating the attribute `autocomplete` on `<input>` fields differently. Instead of honoring what had become a tradition of disabling autocomplete by setting it to `off`, browsers simply ignored that. 

Based on the Chromium team’s response to a bug report, the spirit of the change seems to be two-fold:<sup>1</sup>
1. Setting `autocomplete=off` had become a de facto standard and done without much thought
2. The Chromium team found that folks, particularly on mobile, used autocomplete heavily to fill out forms that would otherwise be annoying or too tedious to complete. 

The result is actually pretty clever. While you can’t simply turn off autocomplete anymore, you _can_ tell the input value what you want it to autocomplete _with_. 

From the WHATWG spec<sup>2</sup>, an example of how this is used:
```html
<fieldset>
 <legend>Ship the blue gift to…</legend>
 <p> <label> Address:     <textarea name=ba autocomplete=“section-blue shipping street-address”></textarea> </label>
 <p> <label> City:        <input name=bc autocomplete=“section-blue shipping address-level2”> </label>
 <p> <label> Postal Code: <input name=bp autocomplete=“section-blue shipping postal-code”> </label>
</fieldset>
<fieldset>
 <legend>Ship the red gift to…</legend>
 <p> <label> Address:     <textarea name=ra autocomplete=“section-red shipping street-address”></textarea> </label>
 <p> <label> City:        <input name=rc autocomplete=“section-red shipping address-level2”> </label>
 <p> <label> Postal Code: <input name=rp autocomplete=“section-red shipping postal-code”> </label>
</fieldset>
```

The spec seeks to provide out a standard set of form values that might be autofilled. In the example above, we have two separate addresses (identified by the `section-` token).

My understanding is that if the user gets to this form and has saved values for a `street-address`, `address-level2` (a city in the US), or a `postal-code`, the browser autofill them. 

Interestingly, because these are space separated, ordered tokens, you could also provide fall-backs. For example:
```html
 <p> <label> City:        <input name=bc autocomplete=“section-blue shipping address-level2 city town village locality”> </label>
```

The biggest thing to keep in mind with this new way to use autocomplete, however, is that if the value is _not_ found, the browser will not try to autofill. Therefore, if by alerting the browser to how we’d like a field to be autocompleted, we can simultaneously ensure that it won’t be inappropriately autofilled. 

## Footnotes
* <sup>1</sup> [Issue 468153 | Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=468153#c164)
* <sup>2</sup> [Autofill - HTML Standard | WHATWG](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)

