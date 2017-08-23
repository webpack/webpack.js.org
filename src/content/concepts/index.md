---
title: Concepts
sort: 1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - johnstew
  - jimrfenner
---

*webpack* is a _module bundler_ for modern JavaScript applications. When webpack processes your application, it recursively builds a _dependency graph_ that includes every module your application needs, then packages all of those modules into a small number of _bundles_ - often only one - to be loaded by the browser.

It is [incredibly configurable](/configuration), but to get started you only need to understand **Four Core Concepts**: entry, output, loaders, and plugins.

This document is intended to give a **high-level** overview of these concepts, while providing links to detailed concept specific use cases.


## Entry

webpack creates a graph of all of your application's dependencies. The starting point of this graph is known as an _entry point_. The _entry point_ tells webpack _where to start_ and follows the graph of dependencies to know _what to bundle_. You can think of your application's _entry point_ as the **contextual root** or **the first file to kick off your app**.

In webpack we define _entry points_ using the `entry` property in our [webpack configuration object](/configuration).

The simplest example is seen below:

**webpack.config.js**

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

There are multiple ways to declare your `entry` property that are specific to your application's needs.

[Learn more!](/concepts/entry-points)


## Output

Once you've bundled all of your assets together, you still need to tell webpack **where** to bundle your application. The webpack `output` property tells webpack **how to treat bundled code**.

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

In the example above, we use the `output.filename` and the `output.path` properties to tell webpack the name of our bundle and where we want it to be emitted to.

T> You may see the term **emitted** or **emit** used throughout our documentation and [plugin API](/api/plugins). This is a fancy term for 'produced' or 'discharged'.

The `output` property has [many more configurable features](/configuration/output), but let's spend some time understanding some of the most common use cases for the `output` property.

[Learn more!](/concepts/output)


## Loaders

The goal is to have all of the assets in your project be **webpack's** concern and not the browser's (though, to be clear, this doesn't mean that they all have to be bundled together). webpack treats [every file (.css, .html, .scss, .jpg, etc.) as a module](/concepts/modules). However, webpack itself **only understands JavaScript**.

**Loaders in webpack _transform these files into modules_ as they are added to your dependency graph.**

At a high level, **loaders** have two purposes in your webpack config. They work to:

1. Identify which file or files should be transformed by a certain Loader. (`test` property)
2. Transform those files so that they can be added to your dependency graph (and eventually your bundle). (`use` property)

**webpack.config.js**

```javascript
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

The configuration above has defined a `rules` property for a single module with two required properties: `test` and `use`. This tells webpack's compiler the following:

> "Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a `require()`/`import` statement, **use** the `raw-loader` to transform it before you add it to the bundle."

W> It is important to remember that **when defining rules in your webpack config, you are defining them under `module.rules` and not `rules`**. For your benefit, webpack will 'yell at you' if this is done incorrectly.

There are other, more specific properties to define on Loaders that we haven't yet covered.

[Learn more!](/concepts/loaders)


## Plugins

While Loaders only execute transforms on a per-file basis, `plugins` are most commonly used to perform actions and custom functionality on "compilations" or "chunks" of your bundled modules [(and so much more!)](/concepts/plugins). The webpack Plugin system is [extremely powerful and customizable](/api/plugins).

In order to use a plugin, you just need to `require()` it and add it to the `plugins` array. Most plugins are customizable via options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it with `new`.

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

There are many plugins that webpack provides out of the box! Check out our [list of plugins](/plugins) for more information.

Using plugins in your webpack config is straightforward - however, there are many use cases that are worth further exploration.

[Learn more!](/concepts/plugins)
