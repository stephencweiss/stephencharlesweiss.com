---
title: 'RegEx In Javascript Strings: Remove numeric or alphabetic characters'
date: '2019-09-04'
tags: ['regex', 'javascript']
category: ['programming']
---

Built into Javascript’s `String` primitive are Regex methods such as `.match` and `.replace`.<sup>1</sup>

We can use the latter to sanitize inputs. A simply way to clean a phone number, for example is `phoneNumber.replace(/[^0-9]/g, "")`.

As you can see in this RegexPal<sup>2</sup>, the non-numbers are highlighted:
![](&&&SFLOCALFILEPATH&&&84A7585C-79E0-4644-84FD-6956C5317A0F.png)

To use this in a function, it’s as simple as:

```javascript
const phone = '+1 (123) 456-9800'
console.log(phone.replace(/[^0-9]/g, '')) // 11234569800
```

To replace alphabetic characters, we would modify the pattern. For example `/[^A-z]/g` would be all upper and lower case characters.

## Footnotes:

- <sup>1</sup> [String.prototype.replace() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- <sup>2</sup> [Finding non-numeric inputs | Regex Pal](https://www.regexpal.com/?fam=111143)
