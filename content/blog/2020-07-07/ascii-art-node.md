---
title: 'Building ASCII Art For the Command Line With Node'
date: '2020-05-20'
publish: '2020-07-07'
category: ['programming']
tags: ['serverless', 'node', 'os', 'eol']
---

I was digging through the source code of the [Serverless CLI](https://github.com/serverless/serverless) recently when I came across this little nugget that I thought was really cool - an [asciiGreeting](https://github.com/serverless/serverless/blob/master/lib/classes/CLI.js#L344) method:

```javascript:title=lib/classes/CLIs.js
  asciiGreeting() {
    let art = '';
    art = `${art} _______                             __${os.EOL}`;
    art = `${art}|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.${os.EOL}`;
    art = `${art}|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|${os.EOL}`;
    art = `${art}|____   |_____|__|  \\___/|_____|__| |__|_____|_____|_____|${os.EOL}`;
    art = `${art}|   |   |             The Serverless Application Framework${os.EOL}`;
    art = `${art}|       |                           serverless.com, v${version}${os.EOL}`;
    art = `${art} -------'`;

    this.consoleLog(chalk.yellow(art));
    this.consoleLog('');
  }
```

I thought this was a great example of how to use template literals. I also hadn't heard of the [OS](https://nodejs.org/api/os.html) module before - so that was a nice introduction -- the [EOL method](https://nodejs.org/api/os.html#os_os_eol) standardizes the end of line across operating systems:

> The operating system-specific end-of-line marker.
>
> -   `\n` on POSIX
> -   `\r\n` on Windows
