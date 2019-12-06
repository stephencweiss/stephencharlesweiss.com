# Updating A Homebrew Cask

I recently started using [FSNotes](https://github.com/glushchenko/fsnotes), an open source notes manager for MacOS and iOS.

It's been amazing seeing the work that [@glushchenko](https://github.com/glushchenko) is putting into the app and fun to contribute in the little ways that I'm able. 

While the app is distributed via the App Store, it's also available via homebrew on MacOS.

Updating the cask on Homebrew, however, is not an automated process, so it's possible that changes pushed to the App Store are not available via Homebrew.

That said, updating the cask is simple and the very first section of [Homebrew's guide on contributing](https://github.com/Homebrew/homebrew-cask/blob/master/CONTRIBUTING.md#updating-a-cask):

> # Updating a Cask
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
> If there is a more complicated change, or there is a case where cask-repair fails (for example, where a Cask uses a url do block or the language stanza), you can also follow the steps in Adding a Cask to do the same thing manually. Remember to update the version and shasum values.

Maybe one day I'll need to actually add a cask to the registry, but in the mean time, it's good to know how I can help keep things up to date!
