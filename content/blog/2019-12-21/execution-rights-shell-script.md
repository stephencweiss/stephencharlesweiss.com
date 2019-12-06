---
title: 'Shell Scripting & Execution Rights'
date: '2019-11-19'
publish: '2019-12-21'
category: ['programming']
tags: ['bash scripting','shell script','execution rights','chmod']
---

I was writing a small bash script the other day when I wanted to test it.

I went to try to execute the script and received a permission denied error:

```shell
$ ./setup.sh
zsh: permission denied: ./setup.sh
```

Looking at permissions, I could see that there were not execution rights for the file:

```shell
$ ls -la
-rw-r--r--     1 stephen  staff   671B Nov 19 13:28 setup.sh
```

It turns out that’s not a default right for a file. To fix that, you can change the file’s permissions with CHMOD<sup>1</sup>:

```shell
$ chmod +x setup.sh
$ ls -la
-rwxr-xr-x     1 stephen  staff   671B Nov 19 13:28 setup.sh
```

## Footnotes

-   <sup>1</sup> While I used the `-x` flag only, there are [other flags](https://www.poftut.com/chmod-x-command-linux-unix/). The flags are: user (`u`), group (`g`), other (`o`), and all (`a`). For example, to change the execution rights for only users, you could do:

```shell
$ chmod u+x setup.sh
```
