---
title: 'Error Handling: App can’t be opened because Apple cannot check it for malicious software'
date: '2019-09-01'
category: ['programming']
tags: ['security', 'malicious code', 'apple']
---

Recently upgraded an application and got this warning
![](./error-cannot-be-opened.png)

In the past, I used to be able to "right" click on the app, but Apple’s UI makes it so easy to use Launchpad instead of going into the applications folder.

Since there’s no way to override the setting from that window, to actually be able to open the application we need to allow it in System preferences: Security & Privacy > General

![](./system-preferences.png)

![](./security-and-privacy.png)

That’s it. Hit that button and it’ll open until you upgrade it / reinstall (at which point you’ll have to go through these steps again.
