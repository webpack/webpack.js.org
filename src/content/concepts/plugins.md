---
title: Plugins
sort: 4
contributors:
  - TheLarkInn
  - jhnns
  - rouzbeh84
  - johnstew
  - MisterDev
  - byzyk
  - chenxsan
---

**Plugins** are the [backbone](https://github.com/webpack/tapable) of webpack. webpack itself is built on the **same plugin system** that you use in your webpack configuration!

They also serve the purpose of doing **anything else** that a [loader](/concepts/loaders) cannot do.

T> When consuming [`webpack-sources`](https://github.com/webpack/webpack-sources) package in plugins, use `require('webpack').sources` instead of `require('webpack-sources')` to avoid version conflicts for persistent caching.

## Anatomy

A webpack **plugin** is a JavaScript object that has an [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) method. This `apply` method is called by the webpack compiler, giving access to the **entire** compilation lifecycle.

**ConsoleLogOnBuildWebpackPlugin.js**

```javascript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('The webpack build process is starting!!!');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```

The first parameter of the tap method of the compiler hook should be a camelized version of the plugin name. It is advisable to use a constant for this so it can be reused in all hooks.

## Usage

Since **plugins** can take arguments/options, you must pass a `new` instance to the `plugins` property in your webpack configuration.

Depending on how you are using webpack, there are multiple ways to use plugins.

### Configuration

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```

The `ProgressPlugin` is used to customize how progress should be reported during compilation, and `HtmlWebpackPlugin` will generate a HTML file including the `my-first-webpack.bundle.js` file using a `script` tag.

### Node API

When using the Node API, you can also pass plugins via the `plugins` property in the configuration.

**some-node-script.js**

```javascript
const webpack = require('webpack'); //to access webpack runtime
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function (err, stats) {
  // ...
});
```

T> Did you know: The example seen above is extremely similar to the [webpack runtime itself!](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292) There are lots of great usage examples hiding in the [webpack source code](https://github.com/webpack/webpack) that you can apply to your own configurations and scripts!
