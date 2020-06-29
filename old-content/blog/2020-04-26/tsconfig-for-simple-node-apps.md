---
title: 'Standard TSConfig for Node Projects'
date: '2020-04-04'
publish: '2020-04-26'
category: ['programming']
tags: ['typescript', 'tsconfig', 'node']
---

The following is a simple TSConfig that I've found helpful when writing simple node applications.

```json:title=tsconfig.json
{
    "compilerOptions": {
        "outDir": "./dist",
        "target": "es5",
        "lib": ["esnext"],
        "baseUrl": ".",
        "moduleResolution": "node",
        "esModuleInterop": true
    },
    "include": ["./src/**/*"],
    "exclude": ["**/*.test.*"]
}
```

I've found myself copying and pasting it between projects, so sharing it here as a resource for the future.

Once this is in place, you can compile and run your Typescript applications from the command line like so:

```shell
$ tsc -b .
$ node dist/index.js
```

The `.` is not strictly necessary, but demonstrates that I'm compiling the current working directory.
The compiled application is saved to the `dist/` directory, so I can now invoke it with Node.

And just like that, I'm running a Node application written in Typescript!
