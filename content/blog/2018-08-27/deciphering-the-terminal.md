---
title: 'Deciphering the terminal'
date: '2018-08-27'
category: ['programming']
tags: ['basics', 'command line', 'terminal', 'tutorial']
---
My goal is to be a competent command line programmer.

I knew that in order to make that happen, I would have to get very comfortable reading guides that are not geared toward novices at all.

In fact, it's pretty amazing how nearly everyone assumes some knowledge of the command line when they're *teaching* about the command line.

It's worth noting that I find myself in this boat now too after only a few short weeks.

What do I mean?

When a command is written as `$ cd <directory>` every part of that will be confusing to someone who's never had anyone explain the syntax of a command.

Let's start at the beginning - the `$` -> All this means is that everything that you see in your terminal *before* this… can be ignored.

For example, if the command that you're told to run is `$ cd ~/`, then the person typing it will see something like this:

![](/wp-content/uploads/2018/08/89EEDDFE-7075-4924-A697-7CD996968D49.png)

Reading through that first line, piece by piece, here's how I play out a conversation with my computer to understand what's going on:

> Me: “Hey computer, what's `Stephens-MBP`?”
>
> Computer: “That's the name of your computer”
>
> Me: “And what about `Documents`?”
>
> Computer: “Documents is the current directory. If you think about opening Finder, it's as if you've navigated to your documents folder. From here, we have access to all of the files and directories inside.”
> ![](./img1.png)
>
> Me: “Why does it say my name, `Stephen`?”
>
> Computer: “That is your user name.”
>
> Me: ”Okay, and what about the `$`?”
>
> Computer: “Everything up to this point was just telling you where you are, the `$` separates that from the command that you now want to execute.”
>
> Me: “Ah, so the `cd ~/` is a command?
>
> Computer: “Exactly. It's a command to change directory. In this case, you have specified to change the directory *to* `~/`, which really means the home directory of the root drive. In your case it will be `/Users/Stephen/`.”

More to come...