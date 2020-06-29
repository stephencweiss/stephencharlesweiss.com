---
title: 'Displaying Current Working Directory In iTerm Window'
date: '2020-04-08'
publish: '2020-04-29'
category: ['programming']
tags: ['iterm']
---

Understanding where you are in your terminal can be a useful piece of information.

While you can always find it by printing the working directory, certain terminals can provide that information for you in the UI.

For example, in iTerm, it can be the name of the window.

To set it, I used the `precmd` function in zsh: <sup>[1](#footnotes)</sup><a id="fn1"></a>

```shell:title=./zshrc
# use precmd to name the window:
# e.g., /Users/stephen/projects/dotfiles -> ~/p/dotfiles
function precmd() {
  window_title="\e]0;${${PWD/#"$HOME"/~}/projects/p}\a"
  echo -ne "$window_title"
}
```

Once you save this function and reload your terminal, you can start to see the results.

Before we made the change:

![The terminal before we added the precmd function](https://res.cloudinary.com/scweiss1/image/upload/v1593197346/code-comments/before_srulj9.png)

Once refreshed, the precmd function fired and updated our window immediately:
![Post change - blog](https://res.cloudinary.com/scweiss1/image/upload/v1593197346/code-comments/blog_m3eyac.png)

And it will change anytime the directory changes:
![Post change - root directory](https://res.cloudinary.com/scweiss1/image/upload/v1593197346/code-comments/root-dir_efw5tf.png)

## Footnotes

-   <sup>[1](#fn1)</sup> For more options take a look at the rest of the hook functions in section 9.3.1 of the [zsh manual](http://zsh.sourceforge.net/Doc/Release/Functions.html)
