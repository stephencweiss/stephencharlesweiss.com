---
title: 'Bring The Background Job Back To The Foreground'
date: '2020-01-23'
publish: '2020-02-13'
category: ['programming']
tags: ['command line', 'terminal', 'bash', 'unix', 'fg']
---

If you [start running processes in the background](../../2020-02-12/shell-background-processes), at some point, you may find you want to bring it back into focus.

The `fg` utility seems designed to do exactly this: bring the indicated process into the foreground.

In other OS's you may be able to specify which job you bring to the foreground, but so far, it seems like on MacOS it pops the most recent job off the stack to the foreground. Perhaps, however, I just need more practice with the API.

I found this utility from this [StackExchange](https://unix.stackexchange.com/a/104825) answer on how to kill background processes.

You can also see what's running in the background by using the `jobs` utility. In fact, that's how I got on this path initially, because my terminal had a new symbol in the Powerlines part of the theme (I use the `agnoster` theme in `oh-my-zsh`).

Included in that was this little function:

```vi
prompt_status() {
  local -a symbols

  [[ $RETVAL -ne 0 ]] && symbols+="%{%F{red}%}✘"
  [[ $UID -eq 0 ]] && symbols+="%{%F{yellow}%}⚡"
  [[ $(jobs -l | wc -l) -gt 0 ]] && symbols+="%{%F{cyan}%}⚙"

  [[ -n "$symbols" ]] && prompt_segment black default "$symbols"
}
```

And just like that, I found `jobs`!
