---
title: 'AWS S3 In 30 Seconds'
date: '2020-04-28'
publish: '2020-05-26'
category: ['programming']
tags:
    [
        'aws',
        'aws in 30 seconds',
        'amazon web services',
        'simple storage solution',
        's3',
        'beginner',
    ]
---

> _Preamble:_ I am exploring different areas of AWS and am finding the jargon overwhelming. To help myself, I'll be writing up summaries of some of the different services I come across, what they are, some core concepts, and links to resources for future reference.
>
> All entries in the series are tagged with `aws in 30 seconds` and can be found [here](../../../tags/aws-in-30-seconds/).

The Simple Storage Solution (S3) offered by Amazon Web Services (AWS) is designed to make data storage easy and scalable.

## Core Concepts

To understand S3, it's useful to know what buckets, access points, and objects are.

There are multiple strategies for managing access to s3 and this can be configured at various levels:

1. The resource level (e.g., Access Control Lists)
2. The bucket level (e.g., Access Points)
3. The user level (e.g., IAM)

If S3 is about storage, the **bucket** is the container for said storage. Any files that you store in S3 go into buckets. For more on buckets, see [Working with Amazon S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html).

**Objects** are the files being stored and other valuable information. In fact, the file itself is just the `value` within the object. Objects are key-value stores and includes the following:

1. `key` - the label assigned to the object. This is analogous to a file name in a local file system.
2. `version id` - S3 offers [object versioning](https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectVersioning.html). With the key, the version id uniquely identifies an object within a bucket.
3. `value` - the actual data being stored. Individual objects can be huge (up to 5TB, though above 160GB, you cannot use the console)
4. `metadata` - more key-value pairs that include data _about_ the data, e.g., `content-type`
5. `subresources` - mostly used to manage `acl` ([access control lists](https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html)), which are alternative ways of managing access from IAM. For more, see [Object Subresources](https://docs.aws.amazon.com/AmazonS3/latest/dev/ObjectAndSoubResource.html).
6. `access control information` - S3 supports both resource-based access control (i.e. policies set for the bucket and via access control lists), as well as user-based access control (i.e. IAM).

**Access points** are named network endpoints attached to buckets which can receive object operations (e.g., `GetObject`, `PutObject`). Access points offer another level of control over who can request/modify bucket resources. For example, they can be configured to only accept requests from specific virtual private clouds (VPC).
