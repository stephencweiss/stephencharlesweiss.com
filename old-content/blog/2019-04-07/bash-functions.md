---
title: 'Bash Functions & Git - How to wipe out changes made to a specific file'
date: '2019-04-07'
category: ['programming']
tags: ['bash', 'git', 'bash functions', 'git stash']
---

I find myself writing the following command multiple times daily.

```bash
git stash push pacakage-lock.json
git stash drop 0
```

I had been reading a little about bash functions and wanted to see if I couldn't automate the process.<sup>1</sup>

There are two files in particular that I was running these commands for due to our build process: `pacakge.json` and `package-lock.json`.

My first solution was a hard coded version called `cpkg`. I saved the function my `~/.zshrc` for easy access.

```bash
#cpkg = "clear changes to pacakge"
cpkg() {
  git stash push package-lock.json;
  git stash drop 0;
  git stash push package.json;
  git stash drop 0;
}
```

This function achieves my goal. It wipes out changes to the `package.json` and `package-lock.json`.

Still, I wanted to challenge myself to see if I could add some dynamism. Maybe I wouldn't want to clear my package, but drop changes from a different file.

This required a function that accepted arguments.

# Parameters And Bash Functions

The first place I looked, of course, was Stackoverflow.<sup>2</sup> This conversation was a good introduction of how functions pass parameters.

In my case, I only needed to handle a single parameter - so order wasn't important and I could use the `$1` without any type checking.

What I came up with was:

```bash
#gsdf = "git stash drop file"
gsdf() {
  git stash push $1;
  git stash drop 0;
}
```

It’s simple, but it does work as expected.

If I run `gsdf package.json` the file will be added to the stash (if there have been changes) and then dropped - letting me move on in peace.

This works by assigning `package.json` to the `$1` parameter during execution.

The next steps would be to handle _multiple_ arguments, so I could pass multiple files at once.

# Caveats

This will _not_ affect untracked or ignored files. It will only wipe out changes to files that have been previously tracked or committed.

The reason is that `git stash` does not stash untracked or ignored files by default.<sup>3</sup>

# Final Thoughts

Is this the _best_ way to achieve my goal? Probably not, but it’s been w working for me and I understand it. If you can point me to a more common pattern with git for this, I’m all ears.

I'd also be very interested if someone knows a good way of handling an unknown number of arguments to create a loop of repeating this process for each file passed into the gsdf function.

## Footnotes

-   <sup>1</sup> [Advanced Bash Scripting - Complex Functions | TLDP](http://tldp.org/LDP/abs/html/complexfunct.html)
-   <sup>2</sup> [Passing Parameters To Bash | StackOverflow](https://stackoverflow.com/questions/6212219/passing-parameters-to-a-bash-function)
-   <sup>3</sup> [Stash Untracked Files | StackOverflow](https://stackoverflow.com/questions/835501/how-do-you-stash-an-untracked-file)
