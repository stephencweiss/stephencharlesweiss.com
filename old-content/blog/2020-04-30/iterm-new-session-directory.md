---
title: 'Customizing iTerm: Persisting Directories Between Sessions'
date: '2020-04-08'
publish: '2020-04-30'
category: ['programming']
tags: ['iterm', 'settings', 'session', 'directory']
---

I use a lot of aliases to help navigate to common directories within my terminal.

When I'm creating a new session, however, most of the time, I want to remain in the same directory and simply run another process. (I could run processes in the background, but for the most part, I like seeing the output, or at least having the option so that I can keep an eye on things easily.)

Finding this setting always takes me a few minutes on a new machine, so hopefully this helps in the future.

In preferences (`⌘+,`), go to Profiles.

Select the profile you're using.

Under the General tab, select which working directory you want to use for a new session. In my case, I prefer the "Reuse previous session's directory" generally.

![The preferences tab](./preferences.png)

The advanced configuration is also quite convenient if you want to dictate behavior based on _how_ you created the new session (new window vs tab vs split pane).

![The advanced configuration dialog](./advanced.png)
