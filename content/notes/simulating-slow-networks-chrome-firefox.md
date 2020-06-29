---
title: 'Simulating Slow Network Connections: Firefox vs. Chromium'
date: '2019-09-06'
publish: '2019-09-06'
tags:
    [
        'devtools',
        'chrome',
        'chromium',
        'firefox',
        'simulated networks',
        'slow3g',
    ]
category: ['programming']
---

Testing my app on a slower connection is a key part of my development cycle. That’s why when I recently found myself developing within Firefox, I was thrown off because the way to simulate a slow connection is not where I’d grown accustomed to it.

In Chromium flavored browsers, it’s a pick list within the Network tab of the Developer tools.

![Chromium Network Tab](https://res.cloudinary.com/scweiss1/image/upload/v1593196589/code-comments/chromium-network-tab_oryz59.png)

In Firefox? You have to go into the Responsive Mobile Design (`Ctrl + ⇧ + M`). According to Firefox, the only reason you’d care about network speeds is on mobile.

Step-by-step in Firefox:
![Firefox Hamburger Menu](https://res.cloudinary.com/scweiss1/image/upload/v1593196589/code-comments/firefox-hamburger_el8ila.png)
![Firefox Webdev Menu](https://res.cloudinary.com/scweiss1/image/upload/v1593196589/code-comments/firefox-webdev-menu_rjq4sy.png)
![Firefox Responsive Design Mode](https://res.cloudinary.com/scweiss1/image/upload/v1593196589/code-comments/firefox-responsive-design-mode_kkraqi.png)
