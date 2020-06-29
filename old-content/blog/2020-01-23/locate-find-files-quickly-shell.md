---
title: 'Locate Files Quickly On Your Computer'
date: '2020-01-09'
publish: '2020-01-23'
category: ['programming']
tags: ['command line', 'shell', 'locate', 'find']
---

I was looking to find all instances of Postgres the other day in order to check the version. A web search led me to [this article](https://linuxize.com/post/how-to-check-postgresql-version/).

Interestingly, while the search came up empty (I believe the file's been deleted), I did learn about two new commands: `locate` and `find`.

Of the two, I will likely use `find` more often because `locate` works by building a database that it searches whereas `find` simply walks a file hierarchy looking for the search parameters.

The first time you run `locate`, you may be greeted by a message similar to this one:

> WARNING: The locate database (/var/db/locate.database) does not exist.
> To create the database, run the following command:
>
> sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist
>
> Please be aware that the database can take some time to generate; once
> the database has been created, this message will no longer appear.

Find is simpler (though it may require super user permissions).

## Find Example Usage

Here's one example of searching your file system using the `find` utility:

In this case, I was interested in all locations for Postgres on my machine and I used the glob pattern `*/` to search.

```shell
$ sudo find /usr -wholename '*/bin/postgres*'
/usr/local/bin/postgres
/usr/local/Cellar/postgresql/12.1/bin/postgres
```

Ét voila! A new way to quickly locate files on a computer!

## Resources

Manual pages posted below for posterity.

> ```shell
> NAME
>      find -- walk a file hierarchy
>
> SYNOPSIS
>      find [-H | -L | -P] [-EXdsx] [-f path] path ... [expression]
>      find [-H | -L | -P] [-EXdsx] -f path [path ...] [expression]
>
> DESCRIPTION
>      The find utility recursively descends the directory tree for each path listed, evaluating an expression (composed of the ``primaries'' and ``operands'' listed below) in terms of each file in the tree.
>
>      The options are as follows:
>
>      -E      Interpret regular expressions followed by -regex and -iregex primaries as extended (modern) regular expressions rather than basic regular expressions (BRE's).  The re_format(7) manual page fully describes
>              both formats.
>
>      -H      Cause the file information and file type (see stat(2)) returned for each symbolic link specified on the command line to be those of the file referenced by the link, not the link itself.  If the referenced
>              file does not exist, the file information and type will be for the link itself.  File information of all symbolic links not on the command line is that of the link itself.
>
>      -L      Cause the file information and file type (see stat(2)) returned for each symbolic link to be those of the file referenced by the link, not the link itself.  If the referenced file does not exist, the file
>              information and type will be for the link itself.
>
>              This option is equivalent to the deprecated -follow primary.
>
>      -P      Cause the file information and file type (see stat(2)) returned for each symbolic link to be those of the link itself.  This is the default.
>
>      -X      Permit find to be safely used in conjunction with xargs(1).  If a file name contains any of the delimiting characters used by xargs(1), a diagnostic message is displayed on standard error, and the file is
>              skipped.  The delimiting characters include single (`` ' '') and double (`` " '') quotes, backslash (``\''), space, tab and newline characters.
>
>              However, you may wish to consider the -print0 primary in conjunction with ``xargs -0'' as an effective alternative.
>
>      -d      Cause find to perform a depth-first traversal, i.e., directories are visited in post-order and all entries in a directory will be acted on before the directory itself.  By default, find visits directories
>              in pre-order, i.e., before their contents.  Note, the default is not a breadth-first traversal.
>
>              This option is equivalent to the -depth primary of IEEE Std 1003.1-2001 (``POSIX.1'').  The -d option can be useful when find is used with cpio(1) to process files that are contained in directories with
>              unusual permissions.  It ensures that you have write permission while you are placing files in a directory, then sets the directory's permissions as the last thing.
>
>      -f      Specify a file hierarchy for find to traverse.  File hierarchies may also be specified as the operands immediately following the options.
>
>      -s      Cause find to traverse the file hierarchies in lexicographical order, i.e., alphabetical order within each directory.  Note: `find -s' and `find | sort' may give different results.
>
>      -x      Prevent find from descending into directories that have a device number different than that of the file from which the descent began.
>
>              This option is equivalent to the deprecated -xdev primary.
>
> PRIMARIES
>      All primaries which take a numeric argument allow the number to be preceded by a plus sign (``+'') or a minus sign (``-'').  A preceding plus sign means ``more than n'', a preceding minus sign means ``less than n''
>      and neither means ``exactly n''.
>
>      -Bmin n
>              True if the difference between the time of a file's inode creation and the time find was started, rounded up to the next full minute, is n minutes.
>
>      -Bnewer file
>              Same as -newerBm.
>
>      -Btime n[smhdw]
>              If no units are specified, this primary evaluates to true if the difference between the time of a file's inode creation and the time find was started, rounded up to the next full 24-hour period, is n
>              24-hour periods.
>
>              If units are specified, this primary evaluates to true if the difference between the time of a file's inode creation and the time find was started is exactly n units.  Please refer to the -atime primary
>              description for information on supported time units.
>
>      -acl    May be used in conjunction with other primaries to locate files with extended ACLs.  See acl(3) for more information.
>
>      -amin n
>              True if the difference between the file last access time and the time find was started, rounded up to the next full minute, is n minutes.
>
>      -anewer file
>              Same as -neweram.
> ```

> ```shell
> NAME
>      locate -- find filenames quickly
>
> SYNOPSIS
>      locate [-0Scims] [-l limit] [-d database] pattern ...
>
> DESCRIPTION
>      The locate program searches a database for all pathnames which match the specified pattern.  The database is recomputed periodically (usually weekly or daily), and contains the pathnames of all files which are pub-
>      licly accessible.
>
>      Shell globbing and quoting characters (``*'', ``?'', ``\'', ``['' and ``]'') may be used in pattern, although they will have to be escaped from the shell.  Preceding any character with a backslash (``\'') elimi-
>      nates any special meaning which it may have.  The matching differs in that no characters must be matched explicitly, including slashes (``/'').
>
>      As a special case, a pattern containing no globbing characters (``foo'') is matched as though it were ``*foo*''.
>
>      Historically, locate only stored characters between 32 and 127.  The current implementation store any character except newline (`\n') and NUL (`\0').  The 8-bit character support does not waste extra space for
>      plain ASCII file names.  Characters less than 32 or greater than 127 are stored in 2 bytes.
>
>      The following options are available:
>
>      -0          Print pathnames separated by an ASCII NUL character (character code 0) instead of default NL (newline, character code 10).
>
>      -S          Print some statistics about the database and exit.
>
>      -c          Suppress normal output; instead print a count of matching file names.
>
>      -d database
>                  Search in database instead of the default file name database.  Multiple -d options are allowed.  Each additional -d option adds the specified database to the list of databases to be searched.
>
>                  The option database may be a colon-separated list of databases.  A single colon is a reference to the default database.
>
>                  $ locate -d $HOME/lib/mydb: foo
>
>                  will first search string ``foo'' in $HOME/lib/mydb and then in /var/db/locate.database.
>
>                  $ locate -d $HOME/lib/mydb::/cdrom/locate.database foo
>
>                  will first search string ``foo'' in $HOME/lib/mydb and then in /var/db/locate.database and then in /cdrom/locate.database.
>
>                        $ locate -d db1 -d db2 -d db3 pattern
>
>                  is the same as
>
>                        $ locate -d db1:db2:db3 pattern
>
>                  or
>
>                        $ locate -d db1:db2 -d db3 pattern
>
>                  If - is given as the database name, standard input will be read instead.  For example, you can compress your database and use:
>
>                  $ zcat database.gz | locate -d - pattern
>
>                  This might be useful on machines with a fast CPU and little RAM and slow I/O.  Note: you can only use one pattern for stdin.
>
>      -i          Ignore case distinctions in both the pattern and the database.
>
>      -l number   Limit output to number of file names and exit.
>
>      -m          Use mmap(2) instead of the stdio(3) library.  This is the default behavior and is faster in most cases.
>
>      -s          Use the stdio(3) library instead of mmap(2).
>
> ENVIRONMENT
>      LOCATE_PATH  path to the locate database if set and not empty, ignored if the -d option was specified.
>
> FILES
>      /var/db/locate.database                               locate database
>      /usr/libexec/locate.updatedb                          Script to update the locate database
>      /System/Library/LaunchDaemons/com.apple.locate.plist  Job that starts the database rebuild
>
> SEE ALSO
>      find(1), whereis(1), which(1), fnmatch(3), locate.updatedb(8)
>
>      Woods, James A., "Finding Files Fast", ;login, 8:1, pp. 8-10, 1983.
> ```
