---
title: 'Validating Social Security Numbers'
date: '2019-10-01'
category: ['programming']
tags: ['regular expression', 'regex']
---

I continue to be enamored with the power of regular expressions — a feeling that only grows the more I understand them.

Today, for example, I needed to validate Social Security numbers. This, it turns out, is a fantastic use case for regular expressions: a somewhat complicated pattern that can be distilled into relatively simple rules. Let's see how.

So, what makes a valid Social Security number anyway? The rules per Wikipedia<sup>1</sup>

> Prior to June 25, 2011, a valid SSN could not have an area number between 734 and 749, or above 772, the highest area number the Social Security Administration had allocated. Effective June 25, 2011, the SSA assigns SSNs randomly and allows for the assignment of area numbers between 734 and 749 and above 772 through the 800s. [34](https://en.wikipedia.org/wiki/Social_Security_number￼#cite_note-34) This should not be confused with Tax Identification Numbers (TINs), which include additional area numbers. [35](https://en.wikipedia.org/wiki/Social_Security_number#cite_note-35)
>
> Some special numbers are never allocated:
>
> -   Numbers with all zeros in any digit group (`000-##-####`,`###-00-####`, `###-##-0000`). [36](https://en.wikipedia.org/wiki/Social_Security_number#￼cite_note-FAQInvalid-36) [37](https://en.wikipedia.org/wiki/Social_Security_number#cite_note-37)
>
> -   Numbers with 666 or 900–999 ( [Individual Taxpayer Identification Number](https://en.wikipedia.org/wiki/Individual_Taxpayer_Identification_Number) ) in the first digit group. [36](https://en.wikipedia.org/wiki/Social_Security_number#cite_note-FAQInvalid-36)  
>     Until 2011, the SSA published the last group number used for each area number. [38](https://en.wikipedia.org/wiki/Social_Security_number#cite_note-38) Since group numbers were allocated in a regular pattern, it was possible to identify an unissued SSN that contained an invalid group number. Now numbers are assigned randomly, and fraudulent SSNs are not easily detectable with publicly available information. Many online services, however, provide SSN validation.  
>     Unlike many similar numbers, no [check digit](https://en.wikipedia.org/wiki/Check_digit) is included.

Now, for validating. A simple checklist of rules. A valid SSN will:

1. Not start with `000`, `666` or a `9` (we’re only up through the 800s at this time)
2. Have be nine digits total
3. May be separated by dashes

So, a regex expression to capture these rules might look like this: `/^(?!(000|666|9))\d{3}-?(?!(00))\d{2}-?(?!(0000))\d{4}$/`.<sup>2</sup>

To use this as a quick validation of an SSN in Javascript, you might do the following:

```javascript
const validSsn = (value: string) =>
    value &&
    /^(?!(000|666|9))(\d{3}-?(?!(00))\d{2}-?(?!(0000))\d{4})$/.test(value)
        ? true
        : false
```

## Footnotes

-   <sup>1</sup> [Social Security number | Wikipedia](https://en.wikipedia.org/wiki/Social_Security_number#Valid_SSNs)
-   <sup>2</sup> For a full description of how this works, checkout the saved expression on [Regex101](https://regex101.com/r/EARUUc/2).
