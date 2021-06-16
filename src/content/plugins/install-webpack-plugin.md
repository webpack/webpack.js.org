---
title: InstallWebpackPlugin
group: webpack contrib
source: https://raw.githubusercontent.com/webpack-contrib/install-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/install-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/install-webpack-plugin
---


It is inefficient to <kbd>Ctrl-C</kbd> your
build script & server just to install
a dependency you didn't know you needed until now.

Instead, use `require` or `import` how you normally would and `npm install`
will happen **automatically to install & save missing dependencies** while you work!

## Install

```bash
$ npm install --save-dev install-webpack-plugin
```

## Usage

In your `webpack.config.js`:

```js
plugins: [
  new InstallPlugin()
],
```

**This is equivalent to**:

```js
plugins: [
  new InstallPlugin({
    // Use --save or --save-dev
    dev: false,
    // Install missing peerDependencies
    peerDependencies: true,
    // Reduce amount of console logging
    quiet: false,
    // npm command used inside company, yarn is not supported yet
    npm: 'npm'
  });
],
```

You can provide a `Function` to the `dev` to make it dynamic:

```js
plugins: [
  new InstallPlugin({
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

## Demo

![install-webpack-plugin demo](https://cloud.githubusercontent.com/assets/15182/12540538/6a4e8f1a-c2d0-11e5-97ee-4ddaf6892645.gif)

## Features

- [x] Works with both webpack `^v1.12.0` and `^2.1.0-beta.0`.
- [x] Auto-installs `.babelrc` plugins & presets.
- [x] Supports both ES5 & ES6 Modules.
      (e.g. `require`, `import`)
- [x] Supports Namespaced packages.
      (e.g. `@cycle/dom`)
- [x] Supports Dot-delimited packages.
      (e.g. `lodash.capitalize`)
- [x] Supports CSS imports.
      (e.g. `@import "~bootstrap"`)
- [x] Supports webpack loaders.
      (e.g. `babel-loader`, `file-loader`, etc.)
- [x] Supports inline webpack loaders.
      (e.g. `require("bundle?lazy!./App"`)
- [x] Auto-installs missing `peerDependencies`.
      (e.g. `@cycle/core` will automatically install `rx@*`)
- [x] Supports webpack's `resolve.alias` & `resolve.root` configuration.
      (e.g. `require("react")` can alias to `react-lite`)

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/install-webpack-plugin/blob/master/.github/CONTRIBUTING.md)

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/15182?v=3&s=150">
        </br>
        <a href="https://github.com/ericclemmons">Eric Clemmons</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/226692?v=3&s=150">
        </br>
        <a href="https://github.com/insin">Jonny Buchanan</a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/install-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/install-webpack-plugin
[deps]: https://david-dm.org/webpack-contrib/install-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/install-webpack-plugin
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[test]: https://travis-ci.org/webpack-contrib/install-webpack-plugin.svg?branch=master
[test-url]: https://travis-ci.org/webpack-contrib/install-webpack-plugin
[cover]: https://codecov.io/gh/webpack-contrib/install-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/install-webpack-plugin
