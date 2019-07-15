---
title: Aliases and the .bash_profile
date: '2018-09-05'
category: ['programming']
tags: ['aliases','bash basics', 'config files', 'git', 'learning to code', 'terminal']
---

# .gitconfig follow-up with .bash_profille

In my previous Git posts ([here](https://wp.me/p6u9oI-eG) and [here](https://wp.me/p6u9oI-eK)), I noted that one of the things I found really helpful was creating aliases to move around more quickly within Git.

Extending beyond the `.gitconfig`, I moved to my .bash_profile and added some more global shortcuts that fall into three buckets:

1. Git
2. Navigation
3. Commands

# Git Shortcuts

`$ git ci` and `$git st` are nice ways to commit and check the status of my Git repo based on aliases I defined in my `.gitconfig` file, but I was curious if I could go even faster.

I decided to dedicate my g-key to git and added several additional keyboard shortcuts that I’ve found myself using even more frequently than the aliases in my `.gitconfig` file.

My current set up is:
```bash
#Git Shortcuts
alias gs='git status '
alias ga='git add '
alias gb='git branch '
alias gc='git commit'
alias gh="git log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"
alias gd='git diff'
alias go='git checkout '
alias gk='gitk --all&'
alias got='git '
alias get='git '
```
Note: the aliases for `got` and `get` are just common typos for `git`, so it’s just a little guard rail for me. (I find I am more prone to make these errors if I’m saying the command in my head…)

# Navigation Shortcuts
As I get comfortable with the terminal, the hardest part for me is navigating through my directory tree. Since I had some pretty common destinations, I decided to make shortcuts using an alias. I updated my `~/.bash_profile` file to include the following Directory shortcuts.

```bash
#Directory Shortcuts
alias goHome='cd ~/' #Home directory
alias goDocs=' cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Documents' #iCloud Documents
alias goCode='cd ~/Documents/_Coding' #A directory with all of my projects
```

# Command Shortcuts
The shortest section of my `.bash_profile` right now is my command shortcuts section. I imagine it will grow in time as i realize more and more things that I can do with the terminal and find myself typing the same command in over and over.

Right now, the only thing I have saved is a command to reload my profile when I make changes.

Since any time you make a change to your `.bash_profile`, in order for those changes to be accessible within the terminal, you need to either:
1. Close and reopen your terminal for the changes to be accessible, or
2. Manually reload your profile

To help me with the following, I added a `bashReload` command in a `#Command Shortcuts` section of the `~/.bash_profile` file:

```bash
alias bashReload=' . ~/.bash_profile'
```

# Notes about .bash_profile and Mac
Your `.bash_profile` file is located in your user’s directory, but as the `.` indicates, it’s hidden.

To find and edit it, you can use the following three commands:
```bash
$ cd ~/ # This takes you to your user's home directory (in case you were currently located
$ ls -a # Lists all of the contents within the directory; the -a option means that it will not ignore entries starting with .
$ open .bash_profile # Opens the file using the default application for text documents
```

When you run the `$ ls -a` command, you may see multiple different bash files. For example, I see the following:
```bash
.bash_history
.bash_profile
.bash_profile-anaconda.bak
.bash_profile.pysave
.bash_sessions
.bashrc
```

It appears that I have separate profiles for anaconda, which is a program for python and pysave. Then there’s `.bashrc`. I found [Josh Staiger’s](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html) write up on the difference between `.bash_profile` and `bashrc` to be really easy to follow.

Quoting from the [bash manual](https://linux.die.net/man/1/bash) page:

> When bash is invoked as an interactive login shell, or as a non-interactive shell with the --login option, it first reads and executes commands from the file /etc/profile, if that file exists. After reading that file, it looks for ~/.bash_profile, ~/.bash_login, and ~/.profile, in that order, and reads and executes commands from the first one that exists and is readable. The --noprofile option may be used when the shell is started to inhibit this behavior.
>
> When a login shell exits, bash reads and executes commands from the files ~/.bash_logout and /etc/bash.bash_logout, if the files exists.
>
> When an interactive shell that is not a login shell is started, bash reads and executes commands from ~/.bashrc, if that file exists. This may be inhibited by using the --norc option. The --rcfile file option will force bash to read and execute commands from file instead of ~/.bashrc.

As Josh notes, however, MacOS defaults to a login shell by default, and therefore first looks at `.bash_profile`.

All of this means that I might optimize later, should I use Linux, by migrating my config commands to `.bashrc`, but for now, `.bash_profile` works well because I’m on a Mac.