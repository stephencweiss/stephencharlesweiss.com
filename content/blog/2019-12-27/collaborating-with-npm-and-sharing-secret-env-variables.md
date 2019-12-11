---
title: '# Collaboration, Local Development, (Secret) Environment Variables, and NPM'
date: '2019-12-11'
publish: '2019-12-27'
category: ['programming']
tags: ['environment variables', 'shell scripting', 'npm', 'vault']
---

![Secrets](./secret.jpg)
At Remine, we have a [shared UI library, `repaint`](https://repaint-tools.remine.com). Recently, I had the opportunity to upgrade our icon library to `font-awesome-pro` so that we could use their awesome (see what I did there?) icon set and our designers could focus more on the things that are unique to our business.

What seemed like a fairly straight-forward assignment turned out to be quite the learning experience.

And, as is often the case - the learnings came from an unexpected area. While adding `font-awesome` had plenty of gotchyas - one of the more interesting lessons was related to how we would collaborate internally and managing environment variables required by NPM.

## Background

The Font Awesome team scopes their projects on NPM (`@fortawesome`<sup>[1](#footnotes)</sup><a id="fn1"></a>), and for the pro version, requires an `_authToken` in the `.npmrc` in order to download and install their packages. The effect is similar to configuring packages to be downloaded from private registries (something I've had to work with in the past as we use JFrog internally).

However, we have a global `.npmrc` to manage our connections to JFrog and because we have a dozen or so active contributors to the project, I wanted a solution that would mitigate any disruption to other's development efforts while enabling them to use `font-awesome` going forward.

Ideally, it wouldn't involve me needing to communicate to each and every contributor and walking them through the process.

Specifically, I needed a solution for _local_ development (deployment was handled through a shared secrets solution).

At a high level, my aims were:

1. Effectively distribute the `_authToken` to all of the engineers who need it _without_ committing it to our repository,<sup>[2](#footnotes)</sup><a id="fn2"></a>
2. Mitigate any communication burden related to _how_ to collaborate
3. Minimally disrupt the development experience of collaborating
4. Establish a repeatable procedure for other projects that may use the pro packages.

This doesn't feel like a unique problem, and yet, when I searched for an established best practice or pattern, I came up empty.

## Developing An Approach

With my aims clarified, I explored the landscape and tried multiple paths before settling on one.

Those roads explored were:<sup>[3](#footnotes)</sup><a id="fn3"></a>

- Gravel Road: The standard approch to managing environment variables. It's not fancy, and while it normally gets the job done, the ride can be bumpy, and sometimes you can pop a tire.
- Tree-Lined Road: In theory, this road is a joy to ride down. Not only does it function, but it's pretty. Unfortunately, sometimes a tree falls down and blocks traffic. So much for a relaxing ride in the countryside!
- Five-Lane Highway: It may not be the most beautiful ride, but once you're on, the scenery usually flies by en route to your destination. This mostly-automated solution steamrolls the bumps out of the ride, and any trees pass too quickly to be appreciated, but it's pragmatic.

![A country scene of a gravel road cutting through a soybean field with a lone oak tree just beside it on a sunny day.](./gravel-road.jpg)

## The Gravel Road: Standard Approaches To Dealing With Environment Variables

The easiest way to use environment variables in a Node application is to pass them in at the command line.

Say for example, you wanted to make the `authToken` available. You could do something like:

```shell
$ _authToken='abc123' node main.js
```

#### Bumpy Road: Security And Obfuscating The \_authToken

While this provides the `_authToken` to our application for use, it fails either our first or the second objective.

If we require that a developer enter in the auth token _before_ running the install script, the communication burden is high. I need to get them the information _and_ they need to use it every time.

On the other hand, if we commit this environment variable to our install script, we have committed the `_authToken` to our repository (a potential violation of the Font Awesome terms of service if the repository were to be made public).

#### Flat Tire: Missing Variables

There is an alternative to passing in the variable at the command line or saving it to the script which is very popular. Add it to a `.bash_profile` or a `.env` file (the latter works when they're pulled from a remote source).

These options can work quite well.

For example, if we have a `.bash_profile` with the line:

```
export FONTAWESOME_NPM_AUTH_TOKEN='abc123'
```

Then we would be able to add a `.npmrc` file to the root directory that referenced that variable:

```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${FONTAWESOME_NPM_AUTH_TOKEN}
```

This would work... until a developer didn't get the memo and failed to update their `.bash_profile`. If that happened, they'd be greeted by an error similar to the following:

```shell
$ npm
Error: Failed to replace env in config: ${FONTAWESOME_NPM_AUTH_TOKEN}
    at /Users/stephen/.nvm/versions/node/v12.13.0/lib/node_modules/npm/lib/config/core.js:415:13
    …
  var doExit = npm.config.loaded ? npm.config.get('_exit') : true
                          ^

TypeError: Cannot read property 'loaded' of undefined
    at exit (/Users/stephen/.nvm/versions/node/v12.13.0/lib/node_modules/npm/lib/utils/error-handler.js:97:27)
    at process.errorHandler (/Users/stephen/.nvm/versions/node/v12.13.0/lib/node_modules/npm/lib/utils/error-handler.js:216:3)
    at process.emit (events.js:210:5)
    at process._fatalException (internal/process/execution.js:150:25)
```

Effectively, because we're referencing a variable as part of the boot process for `npm` that's not defined (and `npm` doesn't allow default substitution - the reason for which appears due to the fact that `npm` locks down all config files _before_ running any scripts), the process exits without completing.

#### Last Ditch Effort

Before waving the white flag, I tried one last approach on the gravel road: a fake variable within the `.bash_profile`. This was actually inspired by the solution that we have for production deployments as it's similar to what we do with our Docker build in the CI.

As long as I had _something_ in place NPM wouldn't error, and since we are using `vault` (by HashiCorp) for secret management, in theory, I could pull it from there and replace it by the time `npm` needed it.

To make this work, though, I needed a way to ensure developers had even that dummy variable in place. So I wrote the (overly) simple script to help developers to modify their `.bash_profile`:

```shell
echo "export FONTAWESOME_NPM_AUTH_TOKEN='temporary'" >> ~/.bash_profile
```

Then, updated the `package.json` to include a "pre-install" script.

```json
"scripts": {
  "configure-development": "vaultinit --host vault.remine.com --path 'global'",
  "pre-install": "npm run configure-development && source .env && npm install",
}
```

While it works, this approach required more communication than was desireable.

![A beautiful pathway of village, Punjab Pakistan](./tree-lined-road.jpg)

### Goodbye Gravel, Hello Trees!

With the gravel road seemingly destined to cause problems, I left it in the dust. It did give me an idea though. What if we automated the whole process and made it so seamless for the developer that they never even knew that running `npm install` was doing something special? Effectively - what could happen if we could _automatically_ run the `pre-install` script?

I thought of this as a tree-lined road. In many ways, it's a normal road, but the trees provide plenty of eye candy - making what could be a mundane trip into a pleasant one.

To get there I would need to change the order of operations a bit. Instead of:

1. Manually define a variable and `.npmrc`
2. Replace the variable with one pulled from `vault`
3. Run install

We would:

1. Pull a variable from `vault` and make it available for `.npmrc`
2. Generate an `.npmrc` programattically
3. Run Install

And, the key: do it all with one script, `npm install`.

Through the combination of `npm-config`<sup>4</sup> and the use of the `preinstall` and `postinstall` hooks this seemed viable.<sup>5</sup>

From NPM:

> `npm` gets its config settings from the command line, environment variables, `.npmrc` files, and in some cases, the `package.json` file.

It’s that last part that suggests how we might fix the problem: `npm` can get environment variables from the `package.json` and `npm` can define it's own config through `npm run config set`.

So, in lieu of setting the environment variable in the `.bash_profile`, we set the variable directly in our `npm config` with `npm config set` from within the `preinstall` and `postinstall` scripts:

```json
"scripts": {
  "preinstall": "npm run configure-development && set -a && source .env && set +a && npm config set faauthtoken ${FONTAWESOME_NPM_AUTH_TOKEN:-temporary} && echo ${npm_config_faauthtoken} && npm config get faauthtoken && ./setup.sh",
  "postinstall": "echo ${npm_config_faauthtoken} && npm config get faauthtoken && rm -rf ./.npmrc",
}
```

Where `setup.sh` was defined as:

```shell
# creates an .npmrc file with an _authToken
if [[ -e "./.npmrc" ]]; then
    echo ".npmrc exists; proceeding to next step"
    else
    echo "Creating .npmrc file"
    touch ./.npmrc
    echo "@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=$(npm config get faauthtoken)" >> ./.npmrc
fi
```

The purpose of the `postinstall` hook is to ensure the `.npmrc` is never committed with the secret by removing it entirely (though, I have a secondary check by including `.npmrc` in the `.gitignore`).

Since the `.npmrc` is _only_ needed for installation, this is a reasonable solution. An alternative, if the variable were actually necessary in other parts of the app, would be to prepend other scripts with `npm config get faauthtoken`.

How did this actually perform against the goals I'd established?

1. Create a variable that’s accessible for use in the `.npmrc` - ✅ The `faauthtoken` is available throughout the entire installation process. (This is confirmed by the `postinstall` hook where it is echoed out.)
2. Create an `.npmrc` _after_ the variable is set - ✅ The `setup.sh` script writes the actual variable to the `.npmrc` (instead of trying to replace it again in the future, thereby removing any loss of context between scripts)
3. Install packages using that context - ❌ I alluded to this before in [Flat Tire: Missing Variables](#flat-tire-missing-variables), but it appears to be the case that `npm` locks down its context when running a script. This includes the `.npmrc` file. So, while the `.npmrc` _is_ updated as we expected, `npm` doesn't see the changes during the installation process and the initial installation fails. In support of this analysis - if we remove the `postinstall` hook and run `npm install` a second time (with `.npmrc` now having the `_authToken` defined), installation succeeds.

Tree lined roads are pleasant to drive until one of the trees falls and blocks the road, stopping all traffic. When that happens, you might regret taking the scenic route. And having a predictable disruption like a failed install is hardly the pleasant trip we wanted to provide to collaborators.

![Speedlight](./speedlight.jpg)

### Building An On Ramp To A Highway

With the scenic route giving me fits, I decided for the more direct approach: highways. They aren't pretty, but they're effective. There are no trees to look at, but when the whole goal is to get to where you're going, it's a price that can be worth paying.

The hardest part about the highway is getting on. In our case, that means that there's _some_ communication requirements so that engineers know what to do before they try to install dependencies. Otherwise they'll still hit the error we saw before about an unknown environment variable.

The on ramp for us is a `pre-install` (note, this has a hyphen and is _not_ the hook provided by `npm`) script in the `package.json`:

    "scripts": {
      "pre-install": "export $(vaultinit --host vault.remine.com --path 'global' --stdout | grep FONTAWESOME_NPM_AUTH_TOKEN) && ./setup.sh",
    }

This script begins with:

```shell
export $(vaultinit --host vault.remine.com --path 'global' --stdout | grep FONTAWESOME_NPM_AUTH_TOKEN)
```

`vaultinit` is an internal tool designed to retrieve secrets from `vault`. So, `vaultinit --host vault.remine.com --path 'global' --stdout` retrieves our global secrets from the global directory. But we don't need all of the secrets, only one. So, using grep the script retrieves the line for `FONTAWESOME_NPM_AUTH_TOKEN`.

If we were to print it at this point, we would see the familiar line:
`FONTAWESOME_NPM_AUTH_TOKEN='abc123'`

Event better, because now have access to the whole line, by exporting it we can reference it in our `setup` bash script directly:

```shell
#!/usr/bin/env bash

# creates an .npmrc file with a dummy variable
if [[ -e "./.npmrc" ]]; then
    echo ".npmrc exists; proceeding to next step"
    else
    echo "Creating .npmrc file"
    touch ./.npmrc
    echo "@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${FONTAWESOME_NPM_AUTH_TOKEN}" >> ./.npmrc
fi
```

Then, because the highway's new, we needed to add some signage (AKA updating the README).

Once that was done, however, an engineer who wanted to work on `repaint`  became aware of the new highway all they had to do was get on (run the `pre-install` script the first time to create a local `.npmrc`) and they were off to the races.

Everything else is handled for them and it's done in a way that eliminates any need for storing sensitive API keys locally or manually typing them in.

## Riding Off Into The Sunset

Adding `font-awesome` to a shared project turned out to be considerably more complex than I was expecting up front. And while the road isn't blessed with beautiful scenery, the solution I arrived at (with the help numerous friends and colleagues) gets us where we wanted to go by achieving most of the aims I established up front:

1.  **Managing Secrets**: By using `vault` to distribute the API token for `font-awesome`, the process mirrors all other secret management internally.
2.  **Mitigating Communication Requirement**: I wasn't able to _eliminate_ the communication burden (despite the glimmer of hope provided by the `preinstall` and `postinstall` hooks), but updating the README with only one additional step seems like a reasonable compromise.
3.  **Minimizing Disruption**: Sure, the first time a collaborator tried to run `repaint` and hit a new error would be disruptive, but by running one script they can get back on track.
4.  **Repeatable**: The setup script is easily reproducible for other projects that want to adopt `font-awesome` in the future.

Along the way, I learned a number of things about bash scripting generally as well as how npm works specifically.

That's all for now. Hope you enjoyed the trip!

![Riding into the sunset](./ride-into-the-sunset.jpg)

## Footnotes

- <sup>[1](#fn1)</sup> Not a typo!
- <sup>[2](#fn2)</sup> We probably _could_ have gotten away with simply commiting the `.npmrc` file to git with the `_authToken` in it, however, a) the Terms of Service explicitly restrict sharing the `_authToken` in any open source project, b) commiting any kind of secret to git doesn't feel like a best practice, and c) even though `repaint` is private, Fort Awesome recently discovered that it's still possible to leak secrets through the `package-lock.json` if precautions aren't taken. Mike Wilkerson, an engineer at Font Awesome, wrote [about the discovery of leaked secrets and how they addressed the problem.](https://blog.fontawesome.com/locking-the-vault-on-font-awesome-npm-tokens-2/)
- <sup>[3](#fn3)</sup> Warning! Tortured analogies coming up. Also, I don't drive.
- <sup>[4](#fn4)</sup> `npm` docs on [npm-config](https://docs.npm.red/cli/config).
- <sup>[5](#fn5)</sup> `npm` docs on [npm-scripts](https://docs.npmjs.com/misc/scripts). There's a long list of built-in hooks, however, none of the others seemed to overcome the issue of `npm` locking the configuration settings during execution.

## Photo Credits

- Photo by Kristina Flour on Unsplash
- [A country scene of a gravel road cutting through a soybean field with a lone oak tree just beside it on a sunny day.](https://unsplash.com/photos/WEfsBSEd_LE) by [Clint Patterson](https://unsplash.com/@cbpsc1) on Unsplash
- [A beautiful pathway of village, Punjab Pakistan](https://unsplash.com/photos/1fiuRIvsgZM) by [Ahsan S.](https://unsplash.com/@ahsan19) on Unsplash
- [Speedlight](https://unsplash.com/photos/F7Rl02ir0Gg) by [Florian Steciuk](https://unsplash.com/@flo_stk) on Unsplash
- [Ride Off Into The Sunset](https://unsplash.com/photos/tre7Jxi4f94) by [Mohamed Nohassi](https://unsplash.com/@coopery) on Unsplash
