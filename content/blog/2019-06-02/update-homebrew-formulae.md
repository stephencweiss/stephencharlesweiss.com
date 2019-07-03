---
title: 'Keep Homebrew Formulae Up To Date'
date: '2019-06-02'
category: ['computers']
tags: ['macos', 'homebrew', 'upgrade', 'cleanup']
---

In the same vein as [cleaning up my git branches](../../2019-05-26/local-git-stale-branch-cleanup), today I recalled that I can easily update my Homebrew formulae with the command `brew upgrade`.

This kicks off the process which may take a minute or two depending on how long it’s been since your last upgrade and how many formulae you have.

The upgrade process will:

1. Update Homebrew if it needs it.
2. Add new formulae
3. Delete formulae
4. Upgrade outdated packages
5. Run `brew cleanup` if it’s been 30+ days

```zsh
$ brew upgrade
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 2 taps (homebrew/core and homebrew/cask).
==> New Formulae
catch2                     deno                       include-what-you-use       pprint
clzip                      erlang@21                  lizard                     spice-gtk
csvq                       heatshrink                 molten-vk                  spirv-tools
==> Updated Formulae
harfbuzz ✔                       fluxctl                          mailutils                        raylib
imageoptim-cli ✔                 fn                               mame                             re2
node ✔                           fobis                            mat2                             rebar3
```

While this is easy enough to do every few weeks (and I’ve set a reminder in my Things list, right next to sharpen my kitchen knives), my next challenge is to schedule it using a “chron job” — something I’ve never done before!

Also worth noting, if there’s a specific formula you want to upgrade, you can use `brew upgrade <formula>` (which you may notice is out of date by checking the version (`brew <formula> -v`).
