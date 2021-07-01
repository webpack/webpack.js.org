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

Instead, use `require` or `import` how you normally would and installation
will happen **automatically to install & save missing dependencies** while you work!



```bash
$ npm install --save-dev install-webpack-plugin
```

# Usage

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
    dependencies: {
      peer: true,
    },
    packageManager: {
      type: this.getDefaultPackageManager(),
      options: {
        dev: false,
        quiet: false,
      },
    },
    prompt: true,
  });
],
```

# Options

## dependencies

**Type:** `Object`

Dependencies related options.

### peer

**Type:** `Boolean`

**Default:** `true`

Install missing peer dependencies.

```js
plugins: [
  new InstallPlugin({
    dependencies: {
      peer: true,
    }
  }),
],
```

## packageManager

**Type:** `'npm' | 'yarn' | 'pnpm' | Object | Function`

Package manager to use for installing dependencies.

```js
plugins: [
  new InstallPlugin({
      packageManager: 'yarn'
    },
  }),
],
```

You can provide a `Function` to the `packageManager` to make it dynamic:

```js
plugins: [
  new InstallPlugin({
    packageManager: function(module, path) {
      return [
        "babel-preset-react-hmre",
        "webpack-dev-middleware",
        "webpack-hot-middleware",
      ].indexOf(module) !== -1;
    },
  }),
],
```

### type

**Type:** `'npm' | 'yarn' | 'pnpm'`

Name of package manager to use for installing dependencies.

### options

**Type:** `Object`

Package manager related options.

### arguments

**Type:** `Array`

Provide custom arguments to use with package manager.

```js
plugins: [
  new InstallPlugin({
      packageManager: {
        type: 'npm',
        options: {
          arguments: ['--ignore-scripts']
        }
      }
    },
  }),
],
```

### dev

**Type:** `Boolean`

**Default:** `false`

Install as development dependencies.

```js
plugins: [
  new InstallPlugin({
      packageManager: {
        type: 'npm',
        options: {
          dev: true,
        }
      }
    },
  }),
],
```

### quiet

**Type:** `Boolean`

**Default:** `false`

Reduce the amount of console logging.

```js
plugins: [
  new InstallPlugin({
      packageManager: {
        type: 'npm',
        options: {
          quiet: true,
        }
      }
    },
  }),
],
```

## prompt

**Type:** `Boolean`

**Default:** `true`

Show a prompt to confirm installation.

```js
plugins: [
  new InstallPlugin({
      prompt: true,
    },
  }),
],
```

# Demo

![install-webpack-plugin demo](https://cloud.githubusercontent.com/assets/15182/12540538/6a4e8f1a-c2d0-11e5-97ee-4ddaf6892645.gif)

# Features

- [x] Works with webpack `^v5.0.0`.
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
