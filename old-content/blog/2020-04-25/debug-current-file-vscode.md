---
title: 'Debugging The Current File In VSCode'
date: '2020-04-04'
publish: '2020-04-25'
category: ['programming']
tags: ['vscode', 'debugging', 'current file']
---

When I have very modularized applications and want to be able to debug a single file, it's useful to be able to swtich from a workspace context to debug just that file.

This is a one line change in the `launch.json` of VSCode.

Where a configuration may have been:

```json:title=launch.json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
-     "program": "${workspaceFolder}/start", //highlight-line
+     "program": "${file}", //highlight-line
      "outFiles": ["${workspaceFolder}/**/*.js"]
    },
  ]
}
```

Now, to invoke the Debugger, navigate to the Run explorer (`⇧⌘D`) and select "Launch Program" (or press `fn5`).
