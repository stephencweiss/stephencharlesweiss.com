---
title: 'Compression Basics: Zip, Tar, Rar, and Gz'
date: '2019-09-15'
tags: ['gzip', '.zip', '.tar', 'homebrew', 'macos', 'unix', 'compression']
category: ['programming']
---

What are the differences between a `.zip`, `.tar`, `.gz`., and `.rar`?

It turns out it’s both a lot and a little.

Some basics:

- `.zip` represents a compressed archive of the file(s). It uses a LZ77 algorithm and was one of the first compression techniques to market.<sup>1</sup>
- `.tar` is a way to stream data and is actually _not_ compressed. Though it can be easily GZipped (which is when you see the `.gz`) or passed through a different compression algorithm (`.bzip2`, etc.).
- `.rar` is a Windows specific compression. Files can be extracted on MacOS using the Homebrew formula `unrar`.

Sylvain Leroux wrote an informative article on the differences between tar, zip, and gz which I found very useful.<sup>2</sup>

As far as I can tell, the differences are largely the method of compression with associated trade-offs there. This Quora answer was helpful in spelling out some of the differences.<sup>3</sup>

## Compressing On MacOS

### Creating A Tar Gzip

Gzip is one of the more popular methods for compression in the Unix ecosystem as the Zip protocol was hindered by copyright limitations early on.

To create a gzip from the terminal, use the `tar` command. For example, to create gzip of a directory’s `.jpg` files:

```shell
$ tar -cvzf <name-of-tar>.tar.gz /path/to/directory/*.jpg
```

The wildcard (`*`) means that anything with an extension of `.jpg` in the directory will be compressed.

#### GZip Options

This example uses several flags in quick succession. Their definitions from the manual are:

```shell
-c
	Create a new archive containing the specified items.  The long option form is --create.
-v, --verbose
	Produce verbose output.  In create and extract modes, tar will list each file name as it is read from or written to the archive.  In list mode, tar will produce output similar to that of ls(1).  An additional -v option will also provide ls-like details in create and extract mode.
-z, --gunzip, --gzip
	(c mode only) Compress the resulting archive with gzip(1).  In extract or list modes, this option is ignored.  Note that, unlike other tar implementations, this implementation recognizes gzip compression automatically when reading archives.
-f file, --file file
	Read the archive from or write the archive to the specified file.  The filename can be - for standard input or standard output.  The default varies by system; on FreeBSD, the default is /dev/sa0; on Linux, the default is /dev/st0.
```

If we did _not_ include the `-z` flag, we would not have compressed the files, but still would have created the `.tar`. In that way, we’d be able to consolidate a group of files to easily identify them, but would have saved minimally on storage as they would not have been compressed.

### Creating A Zip

```shell
$ zip <name-of-archive>.zip /path/to/directory/*
$ zip <directory-archive>.zip /path/to/directory
```

The difference between the two examples is that the first will archive and compress all of the files _within_ the directory, without archiving the directory (and so the name of the directory will not persist). On the other hand, in the latter case, when you _extract_ the directory archive, it will contain a directory within it.

### Creating A Rar

While other options exist, if you’re so inclined so as to want a `.rar` archive, you can do it through the use of the `.rar` cask formula on Homebrew.

```shell
$ brew cask install rar
$ rar a <file-to-archive>
```

To see the options, access the help menu with the `-?` flag:

```shell
$ rar -?

RAR 5.71   Copyright (c) 1993-2019 Alexander Roshal   28 Apr 2019
Trial version             Type 'rar -?' for help

Usage:     rar <command> -<switch 1> -<switch N> <archive> <files...>
               <@listfiles...> <path_to_extract\>

<Commands>
  a             Add files to archive
  c             Add archive comment
  ch            Change archive parameters
  cw            Write archive comment to file
  d             Delete files from archive
  e             Extract files without archived paths
  f             Freshen files in archive
…
```

## Extracting On MacOS

### Extracting A Gzip

```shell
$ gunzip <filename>.gz
$ gzip -d <filename>.gz
```

These are synonymous as the `gunzip` application is the same as the `gzip` with the `-d` flag where `-d` is for decompression.

### Extracting A Zip

```shell
$ unzip <filename>.zip
```

### Extracting A Rar

Even though `.rar` is a Windows format, it is possible to extract it on a Mac using the `unrar` Homebrew formula.<sup>4</sup>

```shell
$ brew install unrar
$ unrar <filename>.rar
```

## Conclusion

The good news is that while I focused on the MacOS variant of a Unix system, most of these commands should work on a Linux OS. The purpose of this post was not to say which is better — there are plenty of posts about that. Rather it was to ensure a basic understanding of the differences (the differences are not _that_ big) and a working understanding one _how_ to use them.

## Footnotes

- <sup>1</sup> [LZ77 and LZ78 | Wikipedia](https://en.wikipedia.org/wiki/LZ77_and_LZ78)
- <sup>2</sup> [Tar Vs Zip Vs Gz : Difference And Efficiency](https://itsfoss.com/tar-vs-zip-vs-gz/)
- <sup>3</sup> [What’s The Difference Between Zip Rar Deb and Tar Files | Quora](https://www.quora.com/What-is-difference-between-zip-rar-deb-and-tar-files)
- <sup>4</sup> [unrar — Homebrew Formulae](https://formulae.brew.sh/formula/unrar)
