---
title: 'Highlight The Focused Element In Web Development'
date: '2020-01-03'
publish: '2020-01-13'
category: ['programming']
tags: ['a11y', 'accessibility', 'focus', 'chrome', 'tools']
---

When testing a website for its accessibility, one thing I'm often interested in looking at is _what_ is in focus.

The browser of course needs to track this. Chrome makes it easy to surface this with "Live Expressions".

The steps are straightforward:

1. Open the console (Cmd `⌘` + Shift `⇧` + J)
2. Click on the eye to open the Expression window

    ![Open Live Expressions](https://res.cloudinary.com/scweiss1/image/upload/v1593200612/open-live-expressions_kdbe43.png)

3. Type `document.activeElement`

    ![Add Live Expressions](https://res.cloudinary.com/scweiss1/image/upload/v1593200612/add-live-expressions_wzefsk.png)

4. Click or tab within the browser UI to see which element is active

    ![See live Expressions](https://res.cloudinary.com/scweiss1/image/upload/v1593200612/see-live-expressions_kf3inn.png)

I originally found this solution on [Google's Developer site](https://developers.google.com/web/tools/chrome-devtools/accessibility/focus).
