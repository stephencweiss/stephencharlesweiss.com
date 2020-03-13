---
title: 'File Permissions In Unix'
date: '2019-12-18'
publish: '2020-01-01'
category: ['programming']
tags: ['unix', 'chmod', 'file permissions']
---

When I first encountered file permissions in Unix, I was really intimidated. Why did permission 777 seem to solve all problems? What did 644 mean? What about 755?

As with most things, when you are able to break it down into the pieces, it gets much simpler.

The first thing to bear in mind is that each number (0 - 7) refers to a specific level of permission. Those permissions can be summarized in the table:

| Number | Permission Type | Symbol |
| ------ | ---------- | ------ |
| 0 | No Permission | --- |
| 1 | Execute | --x |
| 2| Write| -w- |
| 3| Execute + Write | -wx |
| 4| Read | r-- |
| 5 | Read + Execute | r-x |
|6| Read +Write |rw- |
|7 |Read + Write +Execute |rwx|

Perhaps one of the most common things you'll need to do from here is:

1.  See what the permissions are for a file
2.  Modify (`chmod`) the mode to set new permissions

Let's look at these in turn.

## Seeing File/Directory Permissions

The easiest way to see the mode of a file/directory (and consequently understand the permissions) is with with `ls -la`

Notes:

    - The `-a` option is for hidden files (e.g., `.` files and in the example below the directory and parent-directory).
    - The `-l` lists the files in a column and shows the permissions (the piece on the left)

Seeing this in action:

```shell
$ ls -la
total 56
drwxr-xr-x   7 stephen  staff   224 Dec 17 10:10 .
drwxr-xr-x  32 stephen  staff  1024 Dec 17 09:38 ..
-rwxr-xr-x   1 stephen  staff  9335 Dec 16 16:59 create-api.sh
-rwxr-xr-x   1 stephen  staff  1706 Dec 16 16:59 create-user.sh
-rwxr-xr-x   1 stephen  staff   425 Dec 16 16:59 setup-efs-deploy.sh
-rw-r--r--   1 stephen  staff   358 Dec 17 10:23 setup-repaint.sh
-rwxr-xr-x   1 stephen  staff   150 Dec 16 16:59 version-publish.sh
```

## Understanding Modes

Before we can get to modifying or changing the mode and permissions, let's pause quickly to understand what they mean.

There are four sections to the permissions 10 characters.

They would range from `----------` (though this is not valid) to `drwxrwxrwx`.

The first character is `d` or `-` and indicates whether it is a directory (`d`) or file (`-`).

The next nine places are three sets of three and represent different levels of permissions. I'd like to use the word "group" here, but as you'll see in a second, that can be confusing. The three levels are:

1.  User
2.  Group
3.  Other

So, if the file permission was `-rwxr-xrw-`:

-   the user, `rwx`, has read, write, and execution permissions.
-   the group, `r-x`, has read and execution permissions.
-   and finally, other, `rw-`, has read and write permissions.

## Change Mode

At this point we should understand:

1.  What the different permissions are
2.  Which levels have which permissions

So, we're ready to change these to fit our needs.

That's where `chmod` comes in.<sup>1</sup>

Two common permission levels are 644 and 755:

> 644 means that files are readable and writeable by the owner of the file and readable by users in the group owner of that file and readable by everyone else.
>
> 755 is the same thing, it just has the execute bit set for everyone. The execute bit is needed to be able to change into the directory. This is why directories are commonly set to 755.
>
> -   [sparek-3](https://forums.cpanel.net/threads/why-are-644-and-755-unix-permissions-ideal-for-files-directories-in-public-folders.136821/post-588273)

This is exactly what our table above indicates.

To set the permissions, the simplest api for `chmod` is: `chmod permissions filename`

So, let's say we want to get `setup-repaint.sh` to match the other shell scripts:

```shell
$ chmod 755 setup-repaint.sh
$ ls -la
total 56
drwxr-xr-x   7 stephen  staff   224 Dec 17 10:10 .
drwxr-xr-x  32 stephen  staff  1024 Dec 17 09:38 ..
-rwxr-xr-x   1 stephen  staff  9335 Dec 16 16:59 create-api.sh
-rwxr-xr-x   1 stephen  staff  1706 Dec 16 16:59 create-user.sh
-rwxr-xr-x   1 stephen  staff   425 Dec 16 16:59 setup-efs-deploy.sh
-rwxr-xr-x   1 stephen  staff   358 Dec 17 10:23 setup-repaint.sh
-rwxr-xr-x   1 stephen  staff   150 Dec 16 16:59 version-publish.sh
```

## Resources

-   [Guru99.com](https://www.guru99.com/file-permissions.html) has a great write up on file permissions
-   `chmod` is a utility to modify the file mode. To learn more type `man chmod` in your terminal or see below:
    > CHMOD(1) BSD General Commands Manual CHMOD(1)
    >
    > NAME
    > chmod -- change file modes or Access Control Lists
    >
    > SYNOPSIS
    > chmod [-fv]-R [-H | -L | -P]] mode file ...
    > chmod [-fv]-R [-H | -L | -P]] [-a | +a | =a] ACE file ...
    > chmod [-fhv]-R [-H | -L | -P]] [-E] file ...
    > drwxr-xr-x 7 stephen staff 224 Dec 17 10:10 .
    >
    > CHOWN(8) BSD System Manager's Manual CHOWN(8)
    >
    > NAME
    > chown -- change file owner and group
    >
    > SYNOPSIS
    > chown [-fhnv]-R [-H | -L | -P]] owner[:group] file ...
    > chown [-fhnv]-R [-H | -L | -P]] :group file ...
    >
    > DESCRIPTION
    > The chown utility changes the user ID and/or the group ID of the specified files. Symbolic links named by arguments are silently left
    > unchanged unless -h is used.
    >
    >      The options are as follows:
    >
    >      -f      Don't report any failure to change file owner or group, nor modify the exit status to reflect such failures.
    >
    >      -H      If the -R option is specified, symbolic links on the command line are followed.  (Symbolic links encountered in the tree traversal
    >              are not followed.)
    >
    >      -h      If the file is a symbolic link, change the user ID and/or the group ID of the link itself.
    >
    >      -L      If the -R option is specified, all symbolic links are followed.
    >
    >      -P      If the -R option is specified, no symbolic links are followed.  Instead, the user and/or group ID of the link itself are modified.
    >              This is the default. Use -h to change the user ID and/or the group of symbolic links.
    >
    >      -R      Change the user ID and/or the group ID for the file hierarchies rooted in the files instead of just the files themselves.
    >
    >      -n      Interpret user ID and group ID as numeric, avoiding name lookups.
    >
    >      -v      Cause chown to be verbose, showing files as the owner is modified.
    >
    >      The -H, -L and -P options are ignored unless the -R option is specified.  In addition, these options override each other and the command's
    >      actions are determined by the last one specified.
    >
    >      The owner and group operands are both optional; however, at least one must be specified.  If the group operand is specified, it must be pre-
    >      ceded by a colon (``:'') character.
    >
    >      The owner may be either a numeric user ID or a user name.  If a user name is also a numeric user ID, the operand is used as a user name.
    >      The group may be either a numeric group ID or a group name.  If a group name is also a numeric group ID, the operand is used as a group
    >      name.
    >
    >      For obvious security reasons, the ownership of a file may only be altered by a super-user.  Similarly, only a member of a group can change a
    >      file's group ID to that group.
    >
    > DIAGNOSTICS
    > The chown utility exits 0 on success, and >0 if an error occurs.
    >
    > COMPATIBILITY
    > Previous versions of the chown utility used the dot (`.'') character to distinguish the group name. This has been changed to be a colon (`:'') character, so that user and group names may contain the dot character
