---
title: 'Updating A Homebrew Cask'
date: '2019-12-13'
publish: '2019-12-22'
updated: ['2020-01-21']
category: ['programming']
tags: ['homebrew', 'fsnotes']
---

I recently started using [FSNotes](https://github.com/glushchenko/fsnotes), an open source notes manager for MacOS and iOS.

It's been amazing seeing the work that [@glushchenko](https://github.com/glushchenko) is putting into the app and fun to contribute in the little ways that I'm able.

While the app is distributed via the App Store, it's also available via homebrew on MacOS.

Updating the cask on Homebrew, however, is not an automated process, so it's possible that changes pushed to the App Store are not available via Homebrew.

That said, updating the cask is simple and the very first section of [Homebrew's guide on contributing](https://github.com/Homebrew/homebrew-cask/blob/master/CONTRIBUTING.md#updating-a-cask):

> # Updating a Cask
>
> Notice an application that's out-of-date in Homebrew Cask? In most cases, it's very simple to update it. We have a script that will ask for the new version number, and take care of updating the Cask file and submitting a pull request to us:
>
> ```shell
> # install and setup script - only needed once
> brew install vitorgalvao/tiny-scripts/cask-repair
> cask-repair --help
>
> # use to update <outdated_cask>
> cask-repair <outdated_cask>
> ```
>
> If there is a more complicated change, or there is a case where cask-repair fails (for example, where a Cask uses a url do block or the language stanza), you can also follow the steps in Adding a Cask to do the same thing manually. Remember to update the version and shasum values.

Maybe one day I'll need to actually add a cask to the registry, but in the mean time, it's good to know how I can help keep things up to date!

> **Update**
> I [updated my very first cask](https://github.com/Homebrew/homebrew-cask/pull/73769)! Though it had already been updated, I ran into a [checksum error](<https://github.com/Homebrew/homebrew-cask/blob/master/doc/reporting_bugs/checksum_does_not_match_error.md>) when trying to upgrade it locally, so decided to try my hand at updating the cask myself. It worked!
>
> ```shell
> $ brew cask upgrade
> Updating Homebrew...
> ==> Auto-updated Homebrew!
> Updated 1 tap (homebrew/cask).
> No changes to formulae.
>
> ==> Casks with `auto_updates` or `version :latest` will not be upgraded
> ==> Upgrading 1 outdated package:
> fsnotes 4.0.9 -> 4.0.12
> ==> Upgrading fsnotes
> ==> Downloading https://github.com/glushchenko/fsnotes/releases/download/4.0.12/FSNotes_4.0.12.zip
> Already downloaded: /Users/stephen/Library/Caches/Homebrew/downloads/fe7d920e35eb927ddceafbd7e0b4ed441ab08d5b39af9668f1bfe5dcc2df6d54--FSNotes_4.0.12.zip
> ==> Verifying SHA-256 checksum for Cask 'fsnotes'.
> ==> Backing App 'FSNotes.app' up to '/usr/local/Caskroom/fsnotes/4.0.9/FSNotes.app'.
> ==> Removing App '/Applications/FSNotes.app'.
> unzip -o /Users/stephen/Library/Caches/Homebrew/downloads/fe7d920e35eb927ddceafbd7e0b4ed441ab08d5b39af9668f1bfe5dcc2df6d54--FSNotes_4.0.12.zip -d /var/folders/69/p2k36l7s555c8ss_7pk28c280000gn/T/d20191206-20876-momxap
> cp -pR /var/folders/69/p2k36l7s555c8ss_7pk28c280000gn/T/d20191206-20876-momxap/FSNotes.app/. /usr/local/Caskroom/fsnotes/4.0.12/FSNotes.app
> chmod -Rf +w /var/folders/69/p2k36l7s555c8ss_7pk28c280000gn/T/d20191206-20876-momxap
> ==> Moving App 'FSNotes.app' to '/Applications/FSNotes.app'.
> ==> Purging files for version 4.0.9 of Cask fsnotes
> 🍺  fsnotes was successfully upgraded!
> ```