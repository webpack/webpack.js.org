---
title: NpmInstallWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/npm-install-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/npm-install-webpack-plugin/edit/master/README.md
---
# npm-install-webpack-plugin

> Speed up development by **automatically installing & saving dependencies** with Webpack.
>
> [![npm-install-webpack-plugin mp4](https://cloud.githubusercontent.com/assets/15182/12540538/6a4e8f1a-c2d0-11e5-97ee-4ddaf6892645.gif)](https://dl.dropboxusercontent.com/u/55764/npm-install-webpack-plugin.mp4)

## Features

- [x] Works with both Webpack `^v1.12.0` and `^2.1.0-beta.0`.
- [x] Auto-installs `.babelrc` plugins & presets.
- [x] Supports both ES5 & ES6 Modules.
  (e.g. `require`, `import`)
- [x] Supports Namespaced packages.
  (e.g. `@cycle/dom`)
- [x] Supports Dot-delimited packages.
  (e.g. `lodash.capitalize`)
- [x] Supports CSS imports.
  (e.g. `@import "~bootstrap"`)
- [x] Supports Webpack loaders.
  (e.g. `babel-loader`, `file-loader`, etc.)
- [x] Supports inline Webpack loaders.
  (e.g. `require("bundle?lazy!./App"`)
- [x] Auto-installs missing `peerDependencies`.
  (e.g. `@cycle/core` will automatically install `rx@*`)
- [x] Supports Webpack's `resolve.alias` & `resolve.root` configuration.
  (e.g. `require("react")` can alias to `react-lite`)

[![travis build](https://img.shields.io/travis/ericclemmons/npm-install-webpack-plugin.svg)](https://travis-ci.org/ericclemmons/npm-install-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/ericclemmons/npm-install-webpack-plugin/badge.svg?branch=master&service=github)](https://coveralls.io/github/ericclemmons/npm-install-webpack-plugin?branch=master)
[![version](https://img.shields.io/npm/v/npm-install-webpack-plugin.svg)](http://npm.im/npm-install-webpack-plugin)
[![downloads](https://img.shields.io/npm/dm/npm-install-webpack-plugin.svg)](http://npm-stat.com/charts.html?package=npm-install-webpack-plugin)
[![MIT License](https://img.shields.io/npm/l/npm-install-webpack-plugin.svg)](http://opensource.org/licenses/MIT)

- - -

### Why?

It sucks to <kbd>Ctrl-C</kbd> your
build script & server just to install
a dependency you didn't know you needed until now.

Instead, use `require` or `import` how you normally would and `npm install`
will happen **automatically to install & save missing dependencies** while you work!

### Installation

```shell
$ npm install --save-dev npm-install-webpack-plugin
```

### Usage

In your `webpack.config.js`:

```js
plugins: [
  new NpmInstallPlugin();
],
```

**This is equivalent to**:

```js
plugins: [
  new NpmInstallPlugin({
    // Use --save or --save-dev
    dev: false,
    // Install missing peerDependencies
    peerDependencies: true,
    // Reduce amount of console logging
    quiet: false,
  });
],
```

You can provide a `Function` to the `dev` to make it dynamic:

```js
plugins: [
  new NpmInstallPlugin({
    dev: function(module, path) {
      return [
        "babel-preset-react-hmre",
        "webpack-dev-middleware",
        "webpack-hot-middleware",
      ].indexOf(module) !== -1;
    },
  }),
],
```


### License

> MIT License 2016 © Eric Clemmons
