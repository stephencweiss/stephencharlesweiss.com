---
title: 'Logging Into User On Server: Permission Denied (publickey)'
date: '2019-11-03'
publish: '2019-11-14'
category: ['programming']
tags: ['ssh', 'server management', 'root', 'publickey']
---

I recently spun up a Digital Ocean droplet and almost immediately ran into problems logging into it.

For context - the steps I took were:

1. Log in as root:<sup>1</sup>

```shell
$ ssh -i ~/.ssh/mykey root@host
```

2. Create a new user<sup>2</sup>

```shell
$ adduser $USERNAME
```

3. Add that user to the super user group

```shell
$ usermod -aG sudo $USERNAME
```

4. I switched to the user to confirm that the user was created properly

```shell
$ su $USERNAME
```

5. Exit to get back to my local computer

```shell
$ exit
$ exit
```

Needed to exit twice because the first one exited the user to return to `root`, the second exit is from `root`.

6. Now, I tried to log into my user directly

```shell
$ ssh $USERNAME@host
```

This was when things started not working correctly.

```
$ ssh $USERNAME@host
$USERNAME@host: Permission denied (publickey).
```

I was expecting that I should be able to type in my password, my server seemed to be configured to _only_ accept login via a public/private key exchange.

## Allowing Direct Login Via SSH

To enable logging into my server _directly_ as a user (rather than `root` - since my goal is to disable root eventually), I needed to be able to configure the user’s SSH key.

To do that I followed the following steps:

1. Log into the server as `root`
2. Modify (temporarily) the `sshd_config` for the server:
    - `vim /etc/ssh/sshd_config`
    - Find the `PasswordAuthentication` section and set it to `yes`

```shell
# Change to no to disable tunnelled clear text passwords
PasswordAuthentication yes
```

3. Reload the `sshd`

```shell
$ service sshd reload
```

4. Exit the server and return to your local machine.
5. Use `ssh-copy-id`, a tool from OpenSSH, to copy your public key to the server for the user.<sup>3</sup>

```shell
$ ssh-copy-id -i ~/.ssh/mykey $USERNAME@host
```

If successful, you should see a printout that ends like:

```shell
Number of key(s) added:        1

Now try logging into the machine, with:   "ssh ‘$USERNAME@host’”
and check to make sure that only the key(s) you wanted were added.
```

6. Give it a go - you should see something like:

```shell
ssh -i ~/.ssh/mykey $USERNAME@host
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-166-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

0 packages can be updated.
0 updates are security updates.

New release '18.04.3 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


Last login: Sun Nov  3 15:55:34 2019 from xxx.xxx.xxx.xxx
```

## Quick Summary

The reason we couldn’t log into our user via `ssh` was because we:

1. Hadn’t configured the ssh public key for the user yet
2. The server did not allow password authentication for logging in.

The solution was:

1. Allow password authentication (temporarily) (in `sshd_config`)
2. Copy the public key to the server with `ssh-copy-id`

As a final step, I logged back into root for a moment to modify `sshd_config` to once again not accept password authentication, but that’s a user preference decision.

## Footnotes

-   <sup>1</sup> The `host` is the IP address for the server. I also am specifying _which_ key to use because I decided to _not_ use the default key for my droplet.
-   <sup>2</sup> Throughout this post, I refer to `$USERNAME` - this is a placeholder. In my case, for example, I typed `stephen` as the name of my user.
-   <sup>3</sup> Learn more about `ssh-copy-id` here: [Ssh-copy-id for copying SSH keys to servers | ssh.com ](https://www.ssh.com/ssh/copy-id). Digital Ocean also documented these approaches, including alternatives to `ssh-copy-id` here: [How to Upload an SSH Public Key to an Existing Droplet | DigitalOcean](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/).

## Resources

-   [How to Upload an SSH Public Key to an Existing Droplet :: DigitalOcean Product Documentation](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/)
