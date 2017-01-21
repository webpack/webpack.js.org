---
title: Installation
contributors:
  - pksjce
  - bebraw
sort: 1
---

### Pre-requisites

Before getting started, make sure you have a fresh version of [Node.js](https://nodejs.org/en/) installed. The current LTS is an ideal starting point. You may run into a variety of issues with the older versions as they may be missing functionality webpack or related packages might need.

Note that this documentation is for webpack 2, for which there is not yet a stable release. You can get the most recent beta by installing with the `beta` tag (see below).

### Global Installation

``` bash
npm install webpack@beta -g
```

The `webpack` command is now available globally.

However, this is not a recommended practice. This locks you down to a specific version of webpack and might fail in projects that use a different version. The next section tells you how to install webpack locally in a project.

### Local Installation

``` bash
npm install webpack@beta --save-dev

npm install webpack@<version> --save-dev
```

If you are using npm scripts in your project, npm will try to look for webpack installation in your local modules for which this installation technique is useful.

```json
"scripts": {
	"start": "webpack --config mywebpack.config.js"
}
```

This is standard and recommended practice.

T> To run the local installation of webpack you can access its bin version as `node_modules/.bin/webpack`


### Bleeding Edge

If you are enthusiastic about using the latest that webpack has to offer (beware - may be unstable), you can install directly from the webpack repository using

``` bash
npm install webpack/webpack#<tagname/branchname>
```
