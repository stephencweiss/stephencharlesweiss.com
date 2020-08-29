This site is currently built nightly with a Gatsby build process and then deployed to Netlify's CDNs for hosting.

If this ever fails, it's possible to build the site manually and deploy it using the Gatsby and Netlify CLIs respectively.

The following steps assumes [Netlify's CLI](https://github.com/netlify/cli) is globally installed. Alternatively, install the cli as a dev dependency and then it can be accessed as `./node_modules/.bin/netlify`.

Steps:

1. Build with Gatsby

```shell
$ npm run build
```

2. Test deploy with Netlify

```shell
$ netlify deploy
? Publish directory(.)
```

The directory is only asked for if the `.netlify/state.json` hasn't been configured for the site.

It may be necessary to add a timeout, e.g.,

```shell
$ netlify deploy --timeout 6000
```

3. Use the "public" directory.

```shell
$ netlify deploy
? Publish directory public
```

4. This will then attempt to deploy the built site. If successful, re-run with a production flag:

```shell
$ netlify deploy --prod
? Publish directory public
```
