---
title: 'Working With SSH-Keygen'
date: '2020-04-27'
publish: '2020-05-25'
updated: ['2020-05-07', '2020-05-15']
category: ['programming']
tags: ['ssh', 'github', 'gitlab', 'ssh-config', 'ssh-keygen', 'ssh-agent']
---

> **Update**: Adding a section on the PEM format as it was a particularly painful lesson recently and I burned a several hours tracking down the answer. Thank you to [Brian Redbeard on Stack Exchange](https://unix.stackexchange.com/a/30074/412503) for pointing me in the right direction!

SSH, also referred to as Secure Shell, is a protocol for authenticating services remotely. See SSH.com's [SSH Protocol](https://www.ssh.com/ssh/protocol/) article for more.

I've had to set up too many machines recently and each time, this is a learning curve. So, I'll be documenting my process for generating SSH keys on MacOS, with some attention toward the `ssh-config` toward the end:

## Generating A New SSH Key

The simplest way to generate a new SSH Key is to open a terminal and type:

```shell
$ ssh-keygen
```

The `ssh-keygen` utility "generates, manages and converts authentication keys for ssh."

The default key is generated using the [RSA Cryptosystem](<https://en.wikipedia.org/wiki/RSA_(cryptosystem)>).
This will prompt you with a few questions:

1. Enter the file in which to save the key (the default is `/Users/<your_username>/.ssh/id_rsa`)
2. Enter passphrase (empty for no response)
3. Enter same passphrase again
   If you just keep pressing Enter, eventually you'll see an output like:

```output
Your identification has been saved in /Users/stephen/.ssh/id_rsa.
Your public key has been saved in /Users/stephen/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:7hM+mb0BnOdCZpWssayBAvAay9uKgpCA1I/EZiROBeU stephen@Stephens-MBP-2.attlocal.net
The key's randomart image is:
+---[RSA 3072]----+
|.+B+             |
|+oo*     . .     |
|=.=Eo   . +      |
|+= . o o *       |
|+o. . . S .      |
|o o.   B.+       |
|o. .  ..o=o      |
|+ .    .*...     |
|o.      .o..     |
+----[SHA256]-----+
```

That means you successfully created a new public/private key.

### Passing Options

While the default approach will work fine, there are some convenient flags that are worth knowing:
`-C` adds a comment. This is appended to the public key, which can make it easier to identify. For example, [Github recommends adding your email address for use here](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
`-b` sets the bits in the key. The default is 3072, which is "generally [...] considered sufficient", however can be raised and lowered as needed.
`-f` sets the file name of the output key file
`-t` specifies the _type_ of key that's created (`rsa-sha2-512` is the default)
`-m` sets the key format (default is `Open SSH`, but some older systems may require that you use `PEM`)

So, for example, this can look like:

```shell
ssh-keygen -t rsa -b 4096 -C "This is a comment" -f <the_file_name>
```

### PEM Format And Converting SSH Keys

Some systems cannot process the Open SSH format and may require that the key is the PEM format.

If you know this in advance, you can create a new public/private key specifying the format upfront:

```shell
$ ssh-keygen -t rsa -b 4096 -m PEM -C "This is a comment" -f <the_file_name>
```

Alternatively, if you have to convert the public/private key _after_ it's been created, you can use the `-e` flag:

```shell
ssh-keygen -f <the_file_name> -e -m PEM
```

## Reviewing SSH Keys

Now that we've created it, let's make sure it exists. If you used the default `id_rsa`, then it's likely that your key is in the `.ssh` directory of your user (i.e., `~/.ssh`).

You can verify that you have both a public and private key by listing the contents of that directory:

```shell
$ ssh-keygen -t rsa -b 4096 -C "<personal@host.com>" -f id_github_rsa
$ ssh-keygen -t rsa -b 4096 -C "<work@host.com>" -f id_work_github_rsa
$ ssh-keygen -t rsa -b 4096 -C "<personal@host.com>" -f id_gitlab_rsa
$ ls -la ~/.ssh
total 48
drwx------   8 stephen  staff   256 Apr 27 13:47 .
drwxr-xr-x+ 49 stephen  staff  1568 Apr 27 16:58 ..
-rw-r--r--   1 stephen  staff    84 Mar 11 18:58 config
-rw-------   1 stephen  staff  3389 Mar 11 18:54 id_github_rsa
-rw-r--r--   1 stephen  staff   751 Mar 11 18:54 id_github_rsa.pub
-rw-------   1 stephen  staff  3389 Mar 11 18:54 id_work_github_rsa
-rw-r--r--   1 stephen  staff   751 Mar 11 18:54 id_work_github_rsa.pub
-rw-------   1 stephen  staff  3389 Mar 11 18:54 id_gitlab_rsa
-rw-r--r--   1 stephen  staff   751 Mar 11 18:54 id_gitlab.pub
-rw-------   1 stephen  staff  2635 Apr 27 13:47 id_rsa
-rw-r--r--   1 stephen  staff   589 Apr 27 13:47 id_rsa.pub
-rw-r--r--   1 stephen  staff  3353 Apr 24 16:47 known_hosts
```

## Setting Up the SSH Config

Now that we've created multiple accounts, it's time to set up the ssh config ([here's the manual page with all of the options](https://linux.die.net/man/5/ssh_config))

This might look like:

```txt:title=$HOME/.ssh/config
Host github.com
HostName github.com
AddKeysToAgent yes
UseKeychain yes
IdentityFile ~/.ssh/id_github_rsa
Host company.github.com
HostName github.com
AddKeysToAgent yes
UseKeychain yes
IdentityFile ~/.ssh/id_work_github_rsa
Host gitlab.com
HostName gitlab.com
AddKeysToAgent yes
UseKeychain yes
IdentityFile ~/.ssh/id_gitlab_rsa

```

Some notes and caveats:

1. If you don't know add the keys to the `ssh-agent`, it can be:
    ```txt:title=$HOME/.ssh/config
    Host github.com
      HostName github.com
      IdentityFile ~/.ssh/id_github_rsa
    ```
2. If the host is the same as the hostname (as the case for the personal account), you should be able to get away with:
    ```txt:title=$HOME/.ssh/config
    Host github.com
      HostName github.com
      IdentityFile ~/.ssh/id_github_rsa
    ```
3. Instead of a subdomain for the host, I've also seen appending the user name, for example:
    ```txt:title=$HOME/.ssh/config
    Host github.com-<company-user>
      HostName github.com
      IdentityFile ~/.ssh/id_work_github_rsa
    ```

([Remi Lavedrine put together a great walkthrough on Dev.To](https://dev.to/shostarsson/how-to-setup-multiple-ssh-keys-for-multiple-github-bitbucket-accounts-2ji0) which I found as I was pulling this together. )

## (Optional) Adding SSH Keys to ssh-agent

> ssh-agent is a program to hold private keys used for public key authentication (RSA, DSA, ECDSA, Ed25519). ssh-agent is usually started in the beginning of an X-session or a login session, and all other windows or programs are started as clients to the ssh-agent program. Through use of environment variables the agent can be located and automatically used for authentication when logging in to other machines using ssh(1).

Github has put together a nice step-by-step guide on [how to add a key to the ssh-agent](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent).

Make sure that the `ssh-agent` is running:

```shell
$ eval "$(ssh-agent -s)"
```

Then, once you're done setting up the SSH Config (the previous step), add the new id to the agent:

```shell
$ ssh-add -K ~/.ssh/id_rsa
```

## Wrap Up

That should be plenty for now. Typically, if a service has an option for connecting via SSH, it will provide documentation for _where_ to put your public key, but what to do with the private key is a little bit more of a mystery. Hopefully this answers some of those questions.

## Reference Material

-   [Linux SSH Keygen Manual](http://man7.org/linux/man-pages/man1/ssh-keygen.1.html)
