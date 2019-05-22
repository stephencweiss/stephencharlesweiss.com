---
title: 'Unzipping A File From The Command Line'
date: '2019-05-17'
category: ['musings']
tags: ['unzip', 'command-line', 'shell']
---

I should start with the observation that I hate using my mouse.

Yet, that was exactly what I was about to do today to unzip a file. The reason was simple, I didn't (yet) know how to unzip files from the command line.

So, I learned - and it turns out it's pretty simple.

Steps:

1. Make sure you have an Unzip program installed
2. Look at the documentation to see what you might need to do
3. Run the program

# Make sure you have an `unzip` program installed

MacOS comes with an `unzip` program pre-installed, but if you don't have one, this would be the first step.

For example, with Homebrew, you could `brew install unzip`. This, it turns out, is how I found out MacOs came with its own.

Once, I installed `unzip`, I received this message in the logs:

```
unzip is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have unzip first in your PATH run:
  echo 'export PATH="/usr/local/opt/unzip/bin:$PATH"' >> ~/.zshrc
```

Okay, fair enough. How do I _use_ `unzip` though?

# How to use `unzip`

Pulling up the manual page, I could see the different options and put together the case I needed.

The key part for me was that the .zip file was in my Downloads and I wanted to unzip directly to a specific directory.

For this, use the `-d` flag.

```sh
$ unzip --man
UnZip 6.00 of 20 April 2009, by Info-ZIP.  Maintained by C. Spieler.  Send
bug reports using http://www.info-zip.org/zip-bug.html; see README for details.

Usage: unzip [-Z] [-opts[modifiers]] file[.zip] [list] [-x xlist] [-d exdir]
  Default action is to extract files in list, except those in xlist, to exdir;
  file[.zip] may be a wildcard.  -Z => ZipInfo mode ("unzip -Z" for usage).

  -p  extract files to pipe, no messages     -l  list files (short format)
  -f  freshen existing files, create none    -t  test compressed archive data
  -u  update files, create if necessary      -z  display archive comment only
  -v  list verbosely/show version info       -T  timestamp archive to latest
  -x  exclude files that follow (in xlist)   -d  extract files into exdir
modifiers:
  -n  never overwrite existing files         -q  quiet mode (-qq => quieter)
  -o  overwrite files WITHOUT prompting      -a  auto-convert any text files
  -j  junk paths (do not make directories)   -aa treat ALL files as text
  -C  match filenames case-insensitively     -L  make (some) names lowercase
  -X  restore UID/GID info                   -V  retain VMS version numbers
  -K  keep setuid/setgid/tacky permissions   -M  pipe through "more" pager
See "unzip -hh" or unzip.txt for more help.  Examples:
  unzip data1 -x joe   => extract all files except joe from zipfile data1.zip
  unzip -p foo | more  => send contents of foo.zip via pipe into program more
  unzip -fo foo ReadMe => quietly replace existing ReadMe if archive file newer
```

3. Example: Unzipping to a specific folder
   `$ unzip file -d destination_dir`

You should be greeted by a log of contents unzipping.

```sh
$ unzip ~/Downloads/js-recent-parts.zip -d .
Archive:  /Users/stephen/Downloads/js-recent-parts.zip
   creating: ./destructuring/
  inflating: ./destructuring/ex.fixed.js
  inflating: ./destructuring/ex.js
   creating: ./template-strings/
  inflating: ./template-strings/ex.fixed.js
  inflating: ./template-strings/ex.js
   creating: ./async-await/
  inflating: ./async-await/ex.fixed.js
  inflating: ./async-await/ex.js
   creating: ./regex/
  inflating: ./regex/ex.fixed.js
  inflating: ./regex/ex.js
   creating: ./__MACOSX/
   creating: ./__MACOSX/regex/
  inflating: ./__MACOSX/regex/._ex.js
   creating: ./iterators-generators/
  inflating: ./iterators-generators/ex.fixed.js
  inflating: ./iterators-generators/ex.js
```

You can then verify that all of the contents are where you expect, with `ls`:

```sh
$ ls -lah
total 0
drwxr-xr-x  8 stephen  staff   256B May 22 08:18 .
drwxr-xr-x  8 stephen  staff   256B May 22 08:12 ..
drwxrwxr-x@ 3 stephen  staff    96B Mar  9 14:20 __MACOSX
drwxr-xr-x@ 4 stephen  staff   128B Mar  9 06:53 async-await
drwxr-xr-x@ 4 stephen  staff   128B Mar  9 06:53 destructuring
drwxr-xr-x@ 4 stephen  staff   128B Mar  9 06:53 iterators-generators
drwxr-xr-x@ 4 stephen  staff   128B Mar  9 06:54 regex
drwxr-xr-x@ 4 stephen  staff   128B Mar  9 06:54 template-strings
```

Voila - that's it! Now you can unzip files directly from the command line.
