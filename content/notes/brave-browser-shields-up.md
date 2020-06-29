---
title: 'Brave Browser: Shields Up & Embedded Code'
date: '2020-03-14'
publish: '2020-04-01'
category: ['programming']
tags: ['brave', 'browser security', 'chromium', 'cookies', 'code sandbox embed']
---

Yesterday, I published a blog post describing a recent experiment. Included in that post was an embedded Code Sandbox - a relatively recently added feature for my website.

When I was testing it locally, however, I noticed that it was stuck as a “black box” in my browser.

![black box](https://res.cloudinary.com/scweiss1/image/upload/v1593199904/black-box_ajlq0u.png)

I use Brave as my default browser and most of the time it works really well. Except when it doesn’t.

## Digging In

So what was happening here?

My website is very simple and has no analytics or trackers at the moment, so you can typically get a full experience _without_ the use of cookies.

| ![](https://res.cloudinary.com/scweiss1/image/upload/v1593199904/shields-up-network_kn5npu.png) |
| :---------------------------------------------------------------------------------------------: |
|                            Network requests when cookies are blocked                            |

The Code Sandbox embed, however, is an exception. It requires a cookies to run properly.

It sets a cookie and then goes to fetch the rest of the application referenced in the sandbox.

|                                                 ![](https://res.cloudinary.com/scweiss1/image/upload/v1593199905/shields-down-network_fyhfev.png)                                                 |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| When cookies are allowed, you can see there are many more fetch requests. Inspecting them, however, you’ll notice they’re the requirements _for_ the Code Sandbox itself. Nothing malicious here! |

## Getting Cookies In Brave

You can tell if Brave is blocking something when the Brave Lion is lit up and has a badge number.

![](https://res.cloudinary.com/scweiss1/image/upload/v1593199904/shields-protection_nzxe3w.png)

Clicking on the image, you can turn the Shield on / off (or, if you’re so inclined, tweak the settings more specifically under the advanced menu).

| ![](https://res.cloudinary.com/scweiss1/image/upload/v1593199904/shield-config_yhbrsl.png) |
| :----------------------------------------------------------------------------------------: |
|                                   Brave shields are up!                                    |

The easiest thing to do is to turn the shield off. However, if all you want to enable is the Code Sandbox, the only hard requirement is cookies.

| ![](https://res.cloudinary.com/scweiss1/image/upload/v1593199904/shield-config-tweaked_kjqkh1.png) |
| :------------------------------------------------------------------------------------------------: |
|                                      Making cookies available                                      |

## Conclusion

Brave is based on the Chromium web browser and as such acts _very_ similarly to Chrome, Edge, and other Chromium based browsers.

Some of the differences, however, can be confusing until you understand why they’re occurring (and how to fix them).

In this particular case, I was benefitting from Brave’s default security posture. Tweaking it is as simple as a few clicks. The best part is the changes are site specific! So, turning it on for one site doesn’t mean they’re on for _every_ site.

Hopefully this helps you if you ever run across rendering issues like I have (though, to be fair, the few places I’ve noticed them are in online editor environments - and now I have a better appreciation for _why_).
