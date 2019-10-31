---
title: 'Setting Persistent Environment Variables'
date: '2019-10-30'
publish: '2019-11-10'
category: ['programming']
tags: ['unix','environment variables','bash','zsh']
---

To make an environment variable available in Bash or Zsh, save the environment to `.bashrc` or `zshrc` respectively.

To set the variable, open the respective `.rc` file:
```shell
$ vim ~/.bashrc
```

Then edit the `.bashrc`:
```vim
# The rest of the .bashrc file…
export VARIABLE_NAME=variable-value
```

Save, quit, and reload your terminal.

You should now be able to access the environmental variable by name. For example:
```shell
$ echo ${VARIABLE_NAME}
variable-value
```

Related: If you’re using environment variables in scripts (e.g., an NPM install from a private registry) and you get an error:
```shell
Failed to replace env in config: ${AUTH_TOKEN}
```
It’s worth verifying that the variable `AUTH_TOKEN` is *exported*.

