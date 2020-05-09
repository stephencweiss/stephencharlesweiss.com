---
title: 'Referencing Other Blocks (And Other Variables) In Terraform'
date: '2020-04-30'
publish: '2020-06-01'
category: ['programming']
tags: ['terraform', 'aws', 'infrastrcuture-as-code']
---

Terraform allows the configuration of infrastructure through code. It's cross-platform and declarative. You tell terraform what you want, it goes and stands up the infrastructure.

One of the first hurdles I came across when trying to understand an existing terraform document was how resources, data, etc. were recognized in other parts of the configuration.

For example, I had this snippet of terraform code:

```
resource "aws_sns_topic" "file-create" {
  name = "file-create"
}
```

Here we're creating a new AWS SNS Topic with terraform that we're naming `file-create`. The original authors of this code also labeled it as `file-create`.

This `file-create` was then referenced in the creation of an SNS Topic Policy for the policy's ARN:

```
resource "aws_sns_topic_policy" "file-create-topic-policy" {
  arn = aws_sns_topic.file-create.arn //highlight-line
  policy = data.aws_iam_policy_document.sns_topic_policy.json
}
```

But _which_ `file-create` was it?

Here, it will help to take a step back and note that what we're looking at is the basics of [terraform's syntax](https://www.terraform.io/docs/configuration/index.html#arguments-blocks-and-expressions), which includes block types, block labels, arguments, and expressions.

From the docs:

> The syntax of the Terraform language consists of only a few basic elements:
>
> ```
> resource "aws_vpc" "main" {
>   cidr_block = var.base_cidr_block
> }
>
> <BLOCK TYPE> "<BLOCK LABEL>" "<BLOCK LABEL>" {
>   # Block body
>   <IDENTIFIER>=<EXPRESSION> # Argument
> }
> ```

What I was looking at then was a [reference to a named value](https://www.terraform.io/docs/configuration/expressions.html#references-to-named-values) - which meant it was the _block label_ not the identifier being used in the topic policy.

While resource types, like the AWS SNS Topic are referenced directly, there are many other values that can be referenced, including:

> [var.<NAME>](https://www.terraform.io/docs/configuration/expressions.html#var-lt-name-gt-) is the value of the [input variable](https://www.terraform.io/docs/configuration/variables.html) of the given name.
>  [local.<NAME>](https://www.terraform.io/docs/configuration/expressions.html#local-lt-name-gt-) is the value of the [local value](https://www.terraform.io/docs/configuration/locals.html) of the given name.
>  [module.<MODULE NAME>.<OUTPUT NAME>](https://www.terraform.io/docs/configuration/expressions.html#module-lt-module-name-gt-lt-output-name-gt-) is the value of the specified [output value](https://www.terraform.io/docs/configuration/outputs.html) from a [child module](https://www.terraform.io/docs/configuration/modules.html) called by the current module.
>  [data.<DATA TYPE>.<NAME>](https://www.terraform.io/docs/configuration/expressions.html#data-lt-data-type-gt-lt-name-gt-) is an object representing a [data resource](https://www.terraform.io/docs/configuration/data-sources.html) of the given data source type and name. If the resource has the count argument set, the value is a list of objects representing its instances. If the resource has the for_each argument set, the value is a map of objects representing its instances.
>  [path.module](https://www.terraform.io/docs/configuration/expressions.html#path-module) is the filesystem path of the module where the expression is placed.
>  [path.root](https://www.terraform.io/docs/configuration/expressions.html#path-root) is the filesystem path of the root module of the configuration.
>  [path.cwd](https://www.terraform.io/docs/configuration/expressions.html#path-cwd) is the filesystem path of the current working directory. In normal use of Terraform this is the same as path.root, but some advanced uses of Terraform run it from a directory other than the root module directory, causing these paths to be different.
>  [terraform.workspace](https://www.terraform.io/docs/configuration/expressions.html#terraform-workspace) is the name of the currently selected [workspace](https://www.terraform.io/docs/state/workspaces.html) .

Additionally, it's worth noting that I wasn't referencing the _entire_ resource, but [a specific attribute of a named resource](https://www.terraform.io/docs/configuration/expressions.html#references-to-resource-attributes), in this case the `arn` that's [exported by terraform](https://www.terraform.io/docs/providers/aws/r/sns_topic.html#attributes-reference).

An SNS Topic policy requires a policy itself:

```
resource "aws_sns_topic_policy" "file-create-topic-policy" {
  arn = aws_sns_topic.file-create.arn
  policy = data.aws_iam_policy_document.sns_topic_policy.json //highlight-line
}
```

So, elsewhere, we defined the [IAM policy document as a data source](https://www.terraform.io/docs/providers/aws/d/iam_policy_document.html), which could be accessed.

```
data "aws_iam_policy_document" "sns_topic_policy" {
  policy_id = "__default_policy_ID"
  /* ... */
}
```

Like the SNS topic, the policy document has specific exports, in this case, [it's the JSON generated](https://www.terraform.io/docs/providers/aws/d/iam_policy_document.html#attributes-reference).

## Conclusion

Understanding _how_ to reference blocks is critical to understanding how to construct your infrastructure with terraform. Overcoming this hurdle helped to clarify a lot about how terraform works!
