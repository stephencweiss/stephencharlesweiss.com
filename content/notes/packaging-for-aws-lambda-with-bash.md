---
title: Packaging Projects With Bash
date: 2020-06-27
draft: true
category: ['programming']
tags: ['bash', 'scripting', 'zip', 'pipeline']
---

As part of the build pipeline for a project I've been working on lately, we've been packaging up projects into zip files that are then stored on S3.

The benefit of this approach is that because the destination is known in advance, they can be referenced in a terraform build script.

Things might look different if we wanted to manage the lambdas in a different way. However, being the way things are, we came up with a shell script that packages up packages neatly.

We have both Node and Python projects. Below I'll walk through the (similar) process for packaging each (and noting the differences).

## Packaging A Node Project

So, say you have the following project:

```
my-project
├── config.json
├── .env
├── index.js
└── package.json
```

And you want to package up `index.js`, `config.json`, and all of the dependencies listed in `package.json` into a zip file `function.zip`. That could look like the following:

```
./package-js.sh my-project function.zip index.js config.json
```

(Note: we are _not_ including `.env`, but if we wanted to, we could just add another argument to script.)

How does this work? Well - let's look at what our `package-js` script includes:

```shell:title=package-js.sh
#!/usr/bin/env bash

PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "cd ${1}"
cd ${1}

if [ -d package ]; then
  echo "rm -rf package"
  rm -rf package
fi

if [ -e "package.json" ]; then
  echo "npm install"
  npm install
fi

if [ -e "${2}" ]; then
  echo "rm ${2}"
  rm "${2}"
fi

echo "zip -r9 \"${PROJECT_ROOT}/${1}/${2}\" node_modules"
zip -r9 "${PROJECT_ROOT}/${1}/${2}" node_modules

echo "rm -rf node_modules"
rm -rf node_modules

for file in "$@"
do
  if [ "$file" != "${2}" -a "$file" != "${1}" ]; then
    echo "zip -g -j \"${PROJECT_ROOT}/${1}/${2}\" \"${PROJECT_ROOT}/${1}/$file\""
    zip -g -j "${PROJECT_ROOT}/${1}/${2}" "${PROJECT_ROOT}/${1}/$file"
  fi
done
```

A fun thing to keep in mind: the initial script utilized `yarn` instead of `npm` to install the dependencies. That failed because the Docker container that we were using to run it _didn't have `yarn` installed_.

This was solved by running `apt-get` in _non-interactive_ mode first to install:

```yml:title=pipeline.yml
pipelines:
    default:
        - step:
              image: alpine:latest # alpine
              name: 'Package and copy to s3'

              script:
                  - export DEBIAN_FRONTEND=noninteractive
                  - apt-get update
                  - apt-get -yq install npm
                  # package
                  - bash ./package-js.sh my-js-project function.zip saveToBox.js config.json
                  - bash ./package-py.sh my-py-project function.zip distribute_daily_report.py
                  # configure aws
                  - aws configure set region ${AWS_REGION} --profile "${AWS_ACCOUNT_NAME}"
                  - aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID} --profile "${AWS_ACCOUNT_NAME}"
                  - aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY} --profile "${AWS_ACCOUNT_NAME}"

                  # copy to s3
                  - aws s3 cp dist/my-js-project/function.zip s3://my-s3-storage/my-js-project/function.zip
                  - aws s3 cp dist/my-py-project/function.zip s3://my-s3-storage/my-py-project/function.zip
```

The last line of that of course references our python projects

```shell:title=package-py.sh
#!/usr/bin/env bash

PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "cd ${1}"
cd ${1}

if [ -d package ]; then
  echo "rm -rf package"
  rm -rf package
fi

if [ -e "requirements.txt" ]; then
  echo "pip3 install -r \"requirements.txt\" -t package"
  pip3 install -r "requirements.txt" -t package
fi

if [ -e "${2}" ]; then
  echo "rm ${2}"
  rm "${2}"
fi

echo "cd package"
cd "package"

echo "zip -r9 \"${PROJECT_ROOT}/${1}/${2}\" *"
zip -r9 "${PROJECT_ROOT}/${1}/${2}" *

echo "cd \"${PROJECT_ROOT}/${1}\""
cd "${PROJECT_ROOT}/${1}"

echo "rm -rf package"
rm -rf package

for file in "$@"
do
  if [ "$file" != "${2}" -a "$file" != "${1}" ]; then
    echo "zip -g -j \"${PROJECT_ROOT}/${1}/${2}\" \"${PROJECT_ROOT}/${1}/$file\""
    zip -g -j "${PROJECT_ROOT}/${1}/${2}" "${PROJECT_ROOT}/${1}/$file"
  fi
done
```
