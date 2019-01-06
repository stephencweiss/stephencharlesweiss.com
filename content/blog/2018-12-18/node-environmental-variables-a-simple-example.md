---
title: "Node Environmental Variables: A Simple Example"
date: '2018-12-18'
category: ['programming']
tags: ['dynamic programming','environmental variables','node']
---
This is not going to be a deep dive into Node's environmental variables, but rather a quick look at how you may use environmental variables. I wanted to test load balancing an application. This meant I needed a way to dynamically set the port my server would listen on. This, it turns out, is a great example of how to use environmental variables provisioned from the command line. These can then be referenced from within the app to set variables - in my case `port`. 

# Example: Running multiple instances of the same app on multiple ports

In my server file, `index.js`, I defined my port as: `const port = process.argv[2] || 8081`. This says that if I fail to pass an explicit port, I will use the default 8081. However, I can also pass in a variable _after_ node (process.argv[0]), the file node is running (process.argv[1]) and it will be mapped to my port variable. 

```shell
// sh
# In one terminal window
$ node server/index.js 8082
listening on port 8082

# In a different terminal window
$ node server/index.js 8083
listening on port 8083
```
This is a simple use case. It was also one of the first use cases I came across that helped me see how the process arguments worked in Node.js. 

# Additional Resources
  * [Process | Node.js v11.3.0 Documentation](https://nodejs.org/docs/latest/api/process.html#process_process_argv)
  * [process.env: What it is and why/when/how to use it effectively](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7)