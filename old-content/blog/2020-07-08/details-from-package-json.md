---
title: 'Extracting Details From Package.json'
date: '2020-05-20'
publish: '2020-07-08'
category: ['programming']
tags: ['node', 'package.json', 'global variables', 'import']
---

Yesterday, when I was writing about using Node to create ASCII art, there was a detail I overlooked - the `version` number.

As a reminder, the asciiGreeting method is:

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

In one of the last lines they reference `version` -- but where does that come from? It's not an argument to the function, but rather, it's imported as a global variable in the module... from the `package.json`.

```javascript:title=lib/classes/CLIs.js
const version = require('../../package.json').version;

/*...*/

asciiGreeting(){/*...*/}
```

That was what I found so interesting and while I haven't thought of many use cases for it (perhaps printing out available scripts or the package dependencies from the CLI rather than requiring a user to dive into the source code -- particularly if it's not open), it's interesting to remember that it's _possible_!
