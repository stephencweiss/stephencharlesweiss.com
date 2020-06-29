---
title: 'Using Non-Default And Multiple AWS Profiles With Boto3'
date: '2020-05-12'
publish: '2020-06-27'
category: ['programming']
tags:
    [
        'aws sdk',
        'aws profile',
        'boto3',
        'python',
        'multiple profiles',
        'non-default profile',
    ]
---

I was recently working on a Python script that needed to access AWS resources. Fortunately, that's exactly what the library [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/index.html) is for (boto3 is the name of the [AWS SDK for Python](https://aws.amazon.com/sdk-for-python/)).

In my particular case, however, I wanted to use a non-default profile for AWS.

Setting the Profile is now possible thanks to this 2015 [MR](https://github.com/boto/boto3/pull/69) which highlights two usecases:

1. Setting a profile _other_ than the default as the one for boto3 to use
2. Cycling through multiple profiles (as may be the case if you have to perform similar functions in various environments).

The API is actually quite nice. Imagine the following profiles:

```shell:title=$HOME/.aws/credentials
[personal]
aws_access_key_id = personal_access_key
aws_secret_access_key = personal_secret_key
[default]
aws_access_key_id = default_access_key
aws_secret_access_key = default_secret_key
[alt]
aws_access_key_id = alt_access_key
aws_secret_access_key = alt_secret_key
```

Now, let's run through the two situations!

## Setting Boto To A Non-Default Profile

For the first case, we'll say that this is a personal project, so instead of the `default` profile, we want to set it to `personal`:

```python:title=non_default_boto.py
import boto3

boto3.setup_default_session(profile_name='personal')

s3 = boto3.resource('s3')
for bucket in s3.buckets.all():
    print(f'personal buckets are -->{bucket.name}')
```

## Using Multiple Profiles Simultaneously

If the situation were slightly different and instead of different domains (work, personal), the AWS profiles referenced different environments (dev, qa, prod) , we can imagine doing the following:

```python:title=multiple_environments_boto.py
dev = boto3.session.Session(profile_name='dev')
qa = boto3.session.Session(profile_name='qa')
prod = boto3.session.Session(profile_name='prod')

for session in [dev, qa, prod]:
    s3 = session.resource('s3')
    for bucket in s3.buckets.all():
        print(f'{session} bucket is named --> {bucket.name})
```
