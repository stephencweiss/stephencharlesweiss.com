---
title: 'Error Handling: 502 Bad Gateway With Netlify Build'
date: '2020-05-30'
publish: '2020-07-15'
category: ['porgramming']
tags: ['netlify', 'error handling', 'debugging', '502', 'bad gateway']
---

The root cause of this problem appears to be varied as it's been reported in a number of different tickets ([484](https://github.com/netlify/cli/issues/484), [745](https://github.com/netlify/cli/issues/745), and on [Netlify's Forum](https://community.netlify.com/t/all-of-a-sudden-netlify-deploy-throws-the-following-error-warning-texthttperror-502-bad-gateway/12973/6)).

Ultimately though, the issue is that Netlify is timing out during the build process.

For ad hoc changes, I'm building locally, so the best solution I've found is to increase the allowed time.

Where this fails:

```shell
$ netlify deploy
Deploy path: ~/code/blog/public
Deploying to draft URL...
✔ Finished hashing 4799 files
⊷ CDN diffing files... ›   Warning: TextHTTPError: 502
 ›   Warning:
 ›   TextHTTPError: Bad Gateway
 ›
```

I'm able to get it to pass if I set a `timeout` of ~10 minutes (which I never get close to using):

```shell
$ netlify deploy --timeout 6000 --message "with a timeout"
Deploy path: ~/code/blog/public
Deploying to draft URL...
✔ Finished hashing 4799 files✔ CDN requesting 2417 files
✔ Finished uploading 2417 assets✔ Draft deploy is live!
```

This is not an ideal solution, but until Netlify fixes it, it's the best I've found -- particularly since it continues to happen to me even after I've culled the number of files to ~2800 (which is far fewer than some people using Netlify).
