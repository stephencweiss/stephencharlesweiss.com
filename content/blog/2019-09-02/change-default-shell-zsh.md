---
title: 'Changing the default shell to zsh'
date: '2019-09-02'
category: ['programming']
tags: ['shell', 'unix', 'macos', 'zsh', 'bash']
---

By default, the shell on a Mac is `bash`. Changing this should be a simple three step process:
1. Make sure that `zsh` is installed and is an accepted shell `$ cat /etc/shells`
2. Change the shell  `$ chsh -s $(which zsh)`
3. Restart your shell

## Install zsh and verify that it's listed among the accepted shells
Apple preinstalls `zsh` at `/bin/zsh`, however, if you use `homebrew`, you will have to take a few extra steps (see below).

```bash
$ cat /etc/shells
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

## Change Shells
Using the Change Shell and Which programs, you can change the default with a one line command:`$ chsh -s $(which zsh)`

The `-s` flag “Attempt[s] to change the user's shell to newshell.”

With this done - restart the terminal and you should be in the new shell.

## Homebrew specifics
If you use `homebrew` (like I do) you'll need to take a few extra steps.

1. Install `zsh` with `homebrew` -> `brew install zsh`.
2. Confirm it is installed with `zsh --version`.
3. Find where it's located with `which zsh`
4. Make sure that this location is listed in the `/etc/shells`

Step three and four is where things diverge from the default since `homebrew` installs `zsh` to `/usr/local/bin/zsh` not `/bin/zsh` as is default - so it *won't* be listed in `/etc/shells` by default.

When you try to run `$ chsh -s $(which zsh)`, you'll likely get the following:

```bash
$ chsh -s $(which zsh)
Changing shell for stephen.
Password for stephen:
chsh: /usr/local/bin/zsh: non-standard shell
```

The last line tells you what the problem is: `chsh: /usr/local/bin/zsh: non-standard shell`.  The location of `zsh` (`/usr/local/bin/zsh`) was not among our accepted list of locations in `/etc/shells`.

### Adding Homebrew's zsh to /etc/shells
To add `zsh` to `/etc/shells` start with the simple command: `$ echo "$(which zsh)" >> /etc/shells`.

You may run into permissions issues (as I did) and need to use a `sudo` variant:  `$ sudo sh -c "echo $(which zsh) >> /etc/shells"`.

I took this from the StackOverflow discussion, however, I believe the `sh -c` is unnecessary.<sup>1</sup>

What the `sh -c` says is the following: As a super user, use the shell and take commands from the following string. This is why we now include the  `echo` in the string where it was not previously.

None-the-less, it worked. When I restarted my shell, I was now in `zsh`.

## Other Notes: Changing Shells
The first time I installed `zsh`, I used `oh-my-zsh`. This got me up and running quickly, but also didn't give me as much exposure to *what* I was doing.

I bring that up, because I actually didn't know *how* to change back and forth between shells.

Not that there's a lot of reason to, but knowing *how* makes me feel more in control.

Now, if I *want* to use `bash`, I can do that with `$ chsh ($which bash)` and then return to `zsh` with `$ chsh ($which zsh)`.

This is changing the shell for the user — which is probably *not* the **most** efficient way, but it works. I'll keep an eye out for a better way in the future.

## Footnotes
* <sup>1</sup> [StackOverflow](https://stackoverflow.com/a/44549662/9888057) discussion
For more info look at the man pages for *how* this works.
`man chsh` and `man which`.

