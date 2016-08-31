---
title: How to Install webpack?
---

### Pre-requistes

We assume you have `node` and `npm` already installed.

### Global Installation

``` sh
npm install webpack -g
```

The `webpack` command is now available globally.

However, this is not a recommended practice. This locks you down to a specific version of webpack and might fail in projects that use a different version. The next section tells you how to install webpack locally in a project.

### Local Installation

``` sh
npm install webpack --save-dev

npm install webpack@<version> --save-dev

```

If you are using npm scripts in your project, npm will try to look for webpack installation in your local modules for which this installation technique is useful
```
package.json

scripts: {
	start: webpack --config mywebpack.config.js
}
```

This is standard and recommended practice.

### Bleeding Edge

If you are enthusiastic about using the latest that webpack has to offer (beware - may be unstable), clone the [webpack repository](https://github.com/webpack/webpack). You can follow the instructions at [this page](https://github.com/webpack/webpack/blob/master/CONTRIBUTING.md) to run the latest master and learn/test/use all the new exciting features!
