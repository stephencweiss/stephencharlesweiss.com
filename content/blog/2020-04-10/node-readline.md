---
title: 'Readline In Node For Processing STDIN & STDOUT'
date: '2020-03-22'
publish: '2020-04-10'
category: ['programming']
tags: ['node', 'readline', 'stdin', 'stdout']
---

I haven't had many opportunities to play around with building CLIs or reading data from STDIN with Node in a while, so today I decided to play around and found the `readline` module of Node.

Using it to process data fed into an application from the command line was much simpler than I expected!

```javascript:title=src/index.js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', input => {
  console.log(`the input is -->${input}`)
})

rl.on('close', () => {
  console.log(`That's all folks!`)
})
```

Then, to start the program,

```shell
$ node src/index.js
```

Then using it:

```
TESTING
the input is --> TESTING
MY STREAM WORKS!
the input is --> MY STREAM WORKS!
```

When you quit the application (`ctrl+c`), then the `readline` will emit the `close` event and print:

```shell
> That's all folks!
```

If typing the input by hand is annoying, this is a good opportunity to take advantage of piping in inputs:

```shell
$ cat mySampleInput.txt | node src/index.js
```

In this case, each new line of the `mySampleInput` text file will be fed into the Node app. When the last line is read, the `close` event will be emitted automatically and the farewell "That's all folks!" will be printed.

Finally, if instead of printing the output to the terminal, we wanted it in a file, it'd be a [matter of redirecting the output](../../2019-12-20/angled-brackets-bash-scripting).

```shell
$ mkdir -p output
$ touch output/mySampleOutput.txt
$ cat mySampleInput.txt | node src/index.js > output/mySampleOutput.txt
```

That's it for now! I've been looking at doing more scripting and digging around Python a little bit of late, so hope to have more opportunities to explore the space in the future. Until then, it's nice to know that I can handle many cases easily with Node. It simply requires stepping outside of my web app world and thinking about the problem a bit differently.

For more, check out the [Node documentation](https://nodejs.org/docs/latest-v12.x/api/readline.html#readline_readline_createinterface_options) which includes two tiny demos as well.
