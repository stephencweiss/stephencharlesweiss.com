---
title: 'Streaming Data From AWS S3 To Box'
date: '2020-06-18'
draft: true
category: ['programming']
tags: ['box sdk', 'aws sdk', 'tutorial']
---

Today, I want to talk about Box.com and how to take advantage of some of the programmatic access they make available via their API.

I recently had the opportunity to build an application that would take a report we generate and store it for archival purposes in Box.

This is a story in parts. I'll begin with the motivation for this project, followed by my early attempts to solve the problem with Python (where I'll also discuss some of the lessons learned as they relate both to Python and to Box's API). At this point, I'll pivot to discussing a Node implementation - and more lessons learned. Specifically diving into how Box treats "native" Node streams and how that is different from other streams which implement the Node API. Finally, I'll wrap up with a full example for future reference and some parting thoughts on the entire experience.

Hope you enjoy the ride!

## Background And Motivation Details

Before getting to the nuts and bolts of _how_ I ended up achieving this, some context.

The original design for the application to modify an existing lambda (a lambda written in Python that was already creating the report and storing it in S3), to _also_ save to Box.com.

![Initial aws to box diagram](https://res.cloudinary.com/scweiss1/image/upload/v1593270673/AWS-To-Box-Initial_w5gi7h.svg)

This meant including Box's SDK as a dependency in the lambda - which immediately blew the size of the function well past the 3mb limit to edit in line on the online console. The size wasn't a deal breaker because of some nice solutions like [AWS Lambda Layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html).

## Python Hurdles

Unfortunately, the with Box's SDK there are a few things that you need to know up front to make things go smoothly (of which I was aware of neither):

1. The SDK only works with `OAuth` apps
2. To use JWTs with the SDK, requires a different package specification.

This led to two different sources of confusion:

Firstly, when creating an application / following the guides, there's either no notice that the SDK can only work with the `OAuth` apps (or I missed it completely). As a result, since I was consulting the guides before reading the SDK documentation, I created the wrong type of application. The only remedy to which, of course, is to create a new one. (Certainly seems to me that an App Token application _seems_ appropriate in this case, but it won't work if you're using the SDK.)

![box create app documentation](https://res.cloudinary.com/scweiss1/image/upload/v1593270673/box-create-app_iwlkt2.png)

Secondly, since I was using JWTs and since I was using Python, my requirements document needed to be updated from:

```txt:title=requirements.txt
box-sdk
```

to:

```txt:title=requirements.txt
box-sdk["jwt"]
```

This was when the _real_ fun began. Note that above is what _should_ have happened, but not what I did for a while. Unfamiliar with this syntax, my initial `requirements.txt` (upon learning of the more specific `jwt` dependency) was the following (don't do this):

```txt:title=requirements.txt
box-sdk
box-sdk["jwt"]
```

If you don't have the `box-sdk["jwt"]` or if you try to do both, [things will not go as expected](https://github.com/box/box-python-sdk/issues/387#issuecomment-644344864). Specifically, if trying to use the `JWT` module, Python will throw a `NoneType` error:

```python
from boxsdk import JWTAuth, Client
config = JWTAuth.from_settings_file('.config.json')
client = Client(config)
```

## Pivot To Node

At this point, I might have been able to get Python to work, _if_ I understood more about the governance model for Box.com. In fact, I could likely go back and do this all within Python now that I know more. However, at the time, I decided to simiplify the lambda by trying to do fewer things.

Now, instead of having a lambda that:

1. Creates a report
1. Saves it to S3
1. Saves it to Box

I split that into two distinct functions so I could focus exlcusively on the Box side.

| ![Final Aws to box diagram](https://res.cloudinary.com/scweiss1/image/upload/v1593270673/AWS-To-Box-Final_wwgzze.svg) |
| :-------------------------------------------------------------------------------------------------------------------: |
|                           Don't worry about the `HEAD` request yet, I'll come back to that.                           |

Now that I'd configured successfully, What was it about the experience that I couldn't figure out and thought another language could fix? Back to the governance model. When I signed up for Box, I apparently signed up _outside_ of my organization -- though I had full access to the company's files. Not terribly familiar with the Box UI, I didn't notice / appreciate this fact for a long time.

![Box Root](https://res.cloudinary.com/scweiss1/image/upload/v1593270673/root-folder_u5ixt4.png)

For example, when I first started, my root folder (the home directory for Box.com) had _just_ the two grey folders in them.

The first "Yellow" folder was created when I created a "Box Note" -- so I thought it was special. It was only later when I continued to test that I realized there was something fundamentally different about Folders I created (in my organization of 1) and those that were shared with me (again, I wasn't actually "part" of my company's Box org, more like a visitor with access).

Why does any of this matter?

Because what I was trying to do was verify that I could _access_ a specific folder before trying to write to it -- but every time I did, I received a 404. This generally means that a resource is not found, but Box [expanded the definition](https://developer.box.com/reference/get-folders-id/#param-404-application/json):

> 404 `application/json` Client error
> Returned if the folder is not found, or the user does not have access to the folder.

This of course seems due to the decision to use a `403`, instead of a `401` to indicate Unauthorized as is more traditional while `403` is for Forbidden.<sup>[1](#footnotes)</sup><a id="fn1"></a>

## Footnotes

-   <sup>[1](#fn1)</sup> [HTTP Status Codes | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)).

See, here's another part of the Box experience that is rather confusing and not particularly well documented by the API: signing

while I could _invoke_ the function, I couldn't modify the

Problem Statement: Move a file from AWS S3 To Box

Step by step

1. Create a new Box App
    1. The types are not altogether clear - specifically, it should note that if you are using the SDK, you need to use OAUTH
2. Authorize box app
    1. "who is your admin?" is not the easiest question to answer
    2. the documentation on what you're supposed to do here is inconsistent -- I was an admin of my own account, but needed to
3. Service Account vs User Account
    1. [JWT Access To Shared Directories · Issue #513 · box/box-node-sdk · GitHub](https://github.com/box/box-node-sdk/issues/513)
    2. Errors - 404 not found or no access (though a 403 would be a much more helpful response since it would indicate that the issue was access is denied due to permissions, it might be argued that you, as an unauthorized person, should not receive confirmation that the file exists? Similar to how password authentication often doesn't indicate whether the email is wrong or the password)
4. Finally ready to upload a file
    1. Start with a node file system example using a readStream
    2. Move to AWS stream
        1. This is where two things happen: 1. Box needs to know the entire file size in advance - something that appears to be natively included Node's `stream` - which I can't verify, but in practice seems to be the case, which means we need add some additional details to the stream
        2. There's a chunk uploader, but this only works if the file is large enough -- alternative approach

[Cannot upload files with unspecified length/No way to specify file size in simple upload · Issue #144 · box/box-node-sdk · GitHub](https://github.com/box/box-node-sdk/issues/144)
@mattwiller - for what it's worth, the `Chunked Uploader` is not a panacea.

I tried refactoring to the `Chunked Uploader`, but my file is too small for it (a measly 871 bytes if I recall correctly) -- which meant I needed to use @joedski 's solution from https://github.com/box/box-node-sdk/issues/143

> My workaround was to do this:
>
> -   to whatever readable stream I'm passing to the Box Client, I add these properties:
>
>     -   `myStream.httpVersion = '1.0'` (Actual value is irrelevant, but might as well use a valid one.)
>     -   `myStream.headers = { 'content-length': fileSizeForMyStream }`
>     -   `myStream.name = fileNameForMyStream`

For example:

```
fileToUpload.name = fileName;
fileToUpload.httpVersion = "1.0";
fileToUpload.headers = { "content-length": size };
await client.files
.uploadFile(FOLDER_ID, fileName, fileToUpload)
.then((file) => {
  console.log(`Successfully Uploaded`);
  uploaded = file;
})
.catch(async (err) => {
  if (err.response.body.status == 409) {
    const fileId = err.response.body.context_info.conflicts.id;
    await client.files
    .uploadNewFileVersion(fileId, fileToUpload)
    .then((file) => {
      console.log(`New Version Uploaded`);
      uploaded = file;
    })
    .catch((err) => {
      throw new Error(`New Version Error: ${err}`);
    });
  } else {
    console.log(`Generic Error ${err}`);
    throw new Error(err);
  }
});
return uploaded;
```

(This got more complicated as I wanted to upload a new version if it was already present)
