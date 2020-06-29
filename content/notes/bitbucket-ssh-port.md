---
title: 'SSH And Bitbucket: Connection Closed'
date: '2020-05-13'
publish: '2020-07-01'
category: ['programming']
tags: ['bitbucket', 'ssh', 'port', 'config', 'remote host', 'error handling']
---

I wrote recently about managing multiple SSH configurations for various services. One of the services I use ssh for is Bitbucket. Interestingly, while my initial set up was working smoothly for several weeks, today it stopped.

```shell
$ git pull
ssh_exchange_identification: Connection closed by remote host
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Some internet sleuthing brought up several threads. One in particular, a [ticket](https://jira.atlassian.com/browse/BCLOUD-6331) on a public Jira board for Bitbucket Cloud, proved to hold the key thanks to [Anandia Misari’s answer](https://jira.atlassian.com/browse/BCLOUD-6331?focusedCommentId=2216373&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-2216373) (u/amisari). The issue was due to a misconfigured ssh key. This can be remedied in the `~/.ssh/config` file:

```diff:title=config
Host bitbucket.org
-  HostName bitbucket.org
+  HostName altssh.bitbucket.org
   AddKeysToAgent yes
   IdentityFile ~/.ssh/id_rapp_bitbucket_rsa
   UseKeychain yes
+  Port 443
```

Those two changes and I’m back up and running! Along the way I also realized that you could specify ports in a SSH config! Good to know!
