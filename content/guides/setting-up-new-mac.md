---
title: 'Setting Up A New Macintosh Computer'
date: '2020-05-07'
publish: '2020-07-01'
category: ['guide']
tags:
    [
        'macos',
        'ssh',
        'vscode',
        'browser',
        'chrome extensions',
        'vscode extensions',
        'homebrew',
        'tools',
    ]
---

Setting up a new machine can take a lot of time. I prefer to document the tools I like / use. This is a blend of a [/uses](uses.tech) and a step-by-step guide to getting up and running with a new machine the way I like it.

Much of this is _personalized_, so, if you adopt it, your mileage may vary.

## Upgrade The Terminal

I like iTerm2. It can be [downloaded here](https://www.iterm2.com/downloads.html).

I've [blogged](https://stephencharlesweiss.com/tags/iterm/) about some of the changes I like to make. They include:

-   [Persisting Directories Between Sessions](https://stephencharlesweiss.com/blog/2020-04-30/iterm-new-session-directory/)
-   [Displaying The Current Working Directory Path](https://stephencharlesweiss.com/blog/2020-04-29/iterm-terminal-window-display-path/)

# Set Up SSH Keys for Common Resources

The pattern I'm following for ssh keys is `id_[company]_<service>_<encryption type>`

For example:

-   A personal github ssh key using rsa would be: `id_github_rsa`
-   A work gitlab using sha512 would be (company's name is Acme Co. in this example): `id_acme_gitlab_sha512`

For tips on managing multiple ssh keys, check out [Setting Up SSH On MacOS](../../../blog/2020-05-25/setting-up-ssh-macos-multiple).

I store an example of my `.ssh/config` file in my [dotfiles repo on Github](https://github.com/stephencweiss/dotfiles).

## Applications To Install Manually

### IDE
[VSCode](https://code.visualstudio.com/)
    ```shell
    $ brew cask install visual-studio-code
    ```

### Browsers
[Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en) / [Firefox](https://www.mozilla.org/en-US/firefox/developer/) / [Brave](https://brave.com/download/)

### Applications
[Spotify](spotify.com)
    ```shell
    $ brew cask install spotify
    ```

[Slack](slack.com)
    ```shell
    $ brew cask install slack
    ```

[Bear](https://bear.app/) -
### Utilities
[Homebrew](https://brew.sh/)
    ```shell
    $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    ```
[Homebrew Bundle](https://github.com/Homebrew/homebrew-bundle) - This one's more aspirational. If I end up using this, it can obviate the need for much of this document!
    ```shell
    $ brew bundle
    ```

[nvm: Node Version Manager](https://github.com/nvm-sh/nvm)
    ```shell
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    ```

[pyenv: Simple Python version management](https://github.com/pyenv/pyenv)

```shell
$ brew update
$ brew install pyenv
```

Alternatively [poetry: Dependency Management for Python](https://github.com/python-poetry/poetry)
```shell
$ curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
```

Exercism

```shell
brew update && brew install exercism
```

# Configuration Settings

## VS Code

[[Prettier configurations]]
[[Debugging The Current File In VSCode]]

[dotfiles/vscode-preferences.json at master · stephencweiss/dotfiles · GitHub](https://github.com/stephencweiss/dotfiles/blob/master/vscode-preferences.json)

### VS Code Extensions

Quality of Life

-   [advanced-new-file - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=patbenatar.advanced-new-file)
-   [Auto Close Tag - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
-   [Auto Rename Tag - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

*   [Better Comments - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
*   [Bracket Pair Colorizer 2 - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
*   [Code Spell Checker - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
*   [Color Highlight - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
*   [Debugger for Chrome - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
*   [Debugger for Firefox - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)
*   [DotENV - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
*   [EditorConfig for VS Code - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

-   [GitLens — Git supercharged - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

*   [Material Icon Theme - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
*   [reStructuredText - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=lextudio.restructuredtext)
*   [Toggle Quotes - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=BriteSnow.vscode-toggle-quotes)
*   [XML Tools - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml)

Javascript Specific

-   [Prettier - Code formatter - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Language / DevOps Support

-   [AWS CLI Configure - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mark-tucker.aws-cli-configure)
-   [Docker - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
-   [GitHub Actions - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=cschleiden.vscode-github-actions)
-   [Go - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go)
-   [GraphQL for VSCode - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)
-   [Jest - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
-   [Kubernetes - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools)
-   [Prisma Dev - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma-dev)
-   [Python - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
-   [Rust (rls) - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)
-   [Terraform - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mauve.terraform)

#.who/tre ammatuna#
Tre from HRR posted this list:

-   Babel JavaScript - Syntax highlighting helper

-   Browser preview - Browser inside your editor! Now can do multiple device sizes too
-   ESLint
-   [Formatting Toggle - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle)
-   Git History
-   Github Pull Requests - Create/Review/Comment/etc on PRs inside VSC!
-   GitLens - AHMAZING git features
-   Indent Rainbow
-   JS Refactor - Tools fo refactoring code
-   [Live Share - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
-   [npm Intellisense - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
-   [Path Autocomplete - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)
-   [Path Intellisense - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
-   [Settings Sync - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

-   [Turbo Console Log - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log)

# iTerm Configurations

# Browser Extensions

1. React Dev Tools

Onboarding environment setup for Mac

# Xcode

`xcode-select —install`

# Homebrew

`ruby -e “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”`

# Git

```
brew update
brew install git
```

# NVM

```
touch ~/.bash_profile
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
export NVM_DIR=“$HOME/.nvm”
[ -s “$NVM_DIR/nvm.sh” ] && . “$NVM_DIR/nvm.sh”
```

# Node

```
nvm install 10.12
nvm use 10.12
```

# Setup SSH

https://help.github.com/articles/connecting-to-github-with-ssh/

# pgAdmin

https://www.postgresql.org/ftp/pgadmin/pgadmin4/v1.5/macos/

# Git Client

-   SOURCETREE: HTTPS://WWW.SOURCETREEAPP.COM/
-   GITKRAKEN: HTTPS://WWW.GITKRAKEN.COM/
-   SMARTGIT: HTTP://WWW.SYNTEVO.COM/SMARTGIT/DOWNLOAD
-   GITUP: HTTP://GITUP.CO/
-   TIG: HTTPS://GITHUB.COM/JONAS/TIG

# Editor

-   VSCODE: HTTPS://CODE.VISUALSTUDIO.COM/

# Other Recommendations

Recommended extensions

```
# set up brew cask (https://caskroom.github.io/)
brew tap caskroom/cask


# set up common programs
brew cask install google-chrome
brew cask install iterm2 # better terminal emulator
brew cask install spectacle # better window management shortcuts for osx
brew cask install hyperswitch # better window switching functionality (brings windows alt tab previews to osx)
brew cask install slack
brew cask install visual-studio-code



# set up development tools
brew install postgresql
brew install curl
brew install tree
brew install jq # (command line json parsing/filtering)
brew install httpie # (better http command line app than curl)

# setup docker/kubernetes
# install docker via https://download.docker.com/mac/stable/Docker.dmg
brew install kubernetes-cli
# install kops
brew install kops
# install minikube requires virtualbox
brew cask install virtualbox
# install minikube via https://github.com/kubernetes/minikube/releases

# bash auto-completion (will prompt you to add line(s) to ~/.bash_profile)
brew install bash-completion
# kubectl auto-complete (requires bash-completion)
cat “source <(kubectl completion bash)” >> ~/.bash_profile
```

# Backend Development/Data Access

`brew cask install dbeaver-community # (good database viewer/query tool)`
`pgadmin` is a good alternative for `Postgres`

# Troubleshooting

## Issue:

Running npm run start or npm run configure-<environment> results in SyntaxError: Unexpected token u in JSON at position 0
Solution:
In the terminal, run brew install jq

## Issue:

Running npm run configure-development results in aws: error: argument operation: Invalid choice, valid choices are:
Solution:
In the terminal, run brew install awscli jq

#.remine/new_hire/machine config#
