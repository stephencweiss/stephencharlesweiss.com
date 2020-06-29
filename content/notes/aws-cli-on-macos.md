---
title: 'Setting Up AWS CLI version 2 On MacOS'
date: '2020-04-28'
publish: '2020-05-28'
category: ['programming']
tags: ['aws', 'amazon web services', 'cli', 'aws cli', 'macos']
---

The steps to install AWS CLI on MacOS (requires sudo permission):

1. Download `installer` via cURL
2. Run the standard `installer`
3. Confirm the installation

If only installing for a single user (or do not have sudo permissions), there are some additional steps which AWS documents in their [installation guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html#cliv2-mac-install-cmd).

## Download Installer Via cURL

```shell
$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
```

## Run The Standard Installer

```shell
$ sudo installer -pkg AWSCLIV2.pkg -target /
```

If the target remains `-target /`, the files will be installed at `/usr/local/aws-cli` with a symlink automatically created in `/usr/local/bin`. `sudo` is required to grant write access to those directories.

## Confirm Installation Was Successful

```shell
$ which aws
/usr/local/bin/aws
$ aws --version
aws-cli/2.0.10 Python/3.7.4 Darwin/19.4.0 botocore/2.0.0dev14
```
