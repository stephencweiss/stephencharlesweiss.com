---
title: 'AWS IAM In 30 Seconds'
date: '2020-04-28'
publish: '2020-05-27'
category: ['programming']
tags:
    [
        'aws',
        'aws in 30 seconds',
        'amazon web services',
        'identity and access management',
        'iam',
        'beginner',
    ]
---

> _Preamble:_ I am exploring different areas of AWS and am finding the jargon overwhelming. To help myself, I'll be writing up summaries of some of the different services I come across, what they are, some core concepts, and links to resources for future reference.
>
> All entries in the series are tagged with `aws in 30 seconds` and can be found [here](../../../tags/aws-in-30-seconds/).

[Introduction to AWS Identity and Access Management | AWS Training](https://www.aws.training/learningobject/video?id=16448)

High level: Identity & Access Management (IAM) is a service provided by AWS to manage individual and group access to AWS resources. This is accomplished by authenticating and authorizing users based on IAM users, roles and/or groups.

## Authentication

There are three different ways that a user can authenticate (a prerequisite to accessing any AWS resources):

1. AWS CLI
2. AWS SDKs
3. AWS Management Console.

## Authorization

By default, all resources are private to a user's account. To grant permissions IAM users and groups must be granted access via IAM policies.

## Policies

An IAM Policy is a JSON document that records the effects, actions, resources and optional conditions for what API calls a policy holder may invoke.

Anything not _explicitly_ listed is not permitted. Here's a sample policy:
![](https://res.cloudinary.com/scweiss1/image/upload/v1588091883/code-comments/aws-iam-30-seconds/sample-iam-policy.png)

## Roles

In addition to Groups, Policies, and Users, there are also IAM Roles.

Roles are similar to Users in that they can be used to determine which resources are accessible, however they are _not_ uniquely associated with an individual and they have no standard login credentials.

They are used to delegate access to a user temporarily. When a user assumes a role, they give up their own permissions and take on the permissions of the role.

Utilizing IAM Roles avoids the need to modify a specific user's permissions each time a change is required.

## Wrap Up

Putting this into practice. Imagine setting up the permissions for an organization.

1. Create an IAM Group or groups
2. Create IAM Policy (or policies) and assign them to the group(s)
3. Create IAM Users for each individual and assign them to their respective IAM Group
   In this way, user permissions are efficiently managed.

If a user only needs temporary access to certain resources, IAM Roles are a good bet. They are also helpful in avoiding embedding credentials directly into an application.

## Resources

-   [AWS Identity & Access Management User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
-   [IAM Identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html)
-   [IAM in the context of s3](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html)
