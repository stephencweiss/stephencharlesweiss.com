---
title: 'Configuring The AWS CLI'
date: '2020-04-28'
publish: '2020-05-29'
category: ['programming']
tags: ['aws', 'amazon web service', 'aws cli', 'authenticate']
---

## Prerequisites

Before we can configure the AWS CLI, we need to gather a few pieces of information first:

1. Access key ID
2. Secret Access Key ID

If you do not have these, you can generate them by going to the Identity and Access Management (IAM) service in your AWS Console.
From there, select Access management > Users in the menu.

Select the user for which you'd like to configure the AWS CLI.

Select Security credentials and then under Access keys select "Create access key".

This is the only time you'll be able to view the `Secret Access Key ID` so be sure to write it down or download the CSV.

Now that we have these IDs, we're ready to proceed.

## Simple Use Case: One User

If you only have one user that you need to configure, you can use the default process:

```shell
$ aws configure
AWS Access Key ID [None]: <Your Access Key ID>
AWS Secret Access Key [None]: <Your Secret Access Key ID>
Default region name [None]: us-west-2
Default output format [None]: json
```

This will store the settings in the default profile which is used every time an AWS CLI command is run _unless otherwise specified_.

## Command Line Options

`aws configure` can take three different options:

1. `--region` - referencing the AWS region to send data to. It defaults to the closest, however can be specified, e.g., `us-east-1`.
1. `--output` - specifies the format of the output. Options are `json`, `yaml`, `text`, and `table`.
1. `--profile` - adds a named profile to the AWS CLI configuration.

## Multiple Users

Imagine we have two users we need to switch between on a single machine (maybe they're in different regions): `user1` and `user2`

We can configure them with the following:

```shell
$ aws configure --profile user1 --region us-east-1 --output json
$ aws configure --profile user2 --region us-west-2 --output json
```

(Not shown is adding the Access and Secret Access Key IDs.)

Now, when we need to run an AWS CLI command, we can do so like:

```shell
$ aws s3 ls
```

to use the default user or with a specified profile like:

```shell
$ aws s3 ls --profile user1
$ aws s3 ls --profile user2
```
