---
title: 'Undo And Redo In Vim'
date: '2019-09-17'
category: ['programming']
tags: ['vim','learn vim']
---

Sometimes Vim is simultaneously impossible opaque and extraordinarily intuitive. That’s the case with the undo and redo.

To undo the last change, type `u`.
To redo the last change, type `ctrl+r`.

These make plenty of sense as keybindings once you think about it - but until you’re told, it’s unlikely you’d come up with them on your own.

There’s _also_ a `U` keybinding which returns the last line modified to its original state (i.e. it reverses all the changes made). `U`, however, is not a true undo, but actually a change. That means it can be undone itself.

To access the vim manual enter a vim editor and while in the command mode, type `:help undo`.

## Resources
*  [Undo and Redo | FANDOM](https://vim.fandom.com/wiki/Undo_and_Redo)

