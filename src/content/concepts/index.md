---
title: Concepts
sort: 1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - johnstew
  - jimrfenner
  - TheDutchCoder
---

At its core, *webpack* is a _module bundler_ for modern JavaScript applications. When webpack processes your application, it recursively builds a _dependency graph_ that includes every module your application needs, then packages all of those modules into one or more _bundles_ to be loaded by the browser.

It is [incredibly configurable](/configuration), but to get started you only need to understand four **Core Concepts**:
 * Entry
 * Output
 * Loaders
 * Plugins

This document is intended to give a **high-level** overview of these concepts, while providing links to detailed concept specific use cases.


## Entry

The **entry** is the starting point for webpack to generate its internal *dependency graph*. This means that webpack starts at your entry point and figures out all the other files and libraries that your entry point is dependent on. It then generates files called *bundles* bases on the **output** configuration (which we'll tackle in the next session).

You can tell webpack which entry point(s) to use by configuring the `entry` property in the [webpack configuration](/configuration).

Here's the simplest example of the `entry` configuration:

__webpack.config.js__

``` js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

T> There are multiple ways to declare your `entry` property that are specific to your application's needs. You can learn more about this in the [entry points concepts](/concepts/entry-points).


## Output

The **output** tells webpack where to output the *bundles* it creates. It can also be used to generate filenames dynamically. You can configure the output by specifying an `output` property in the webpack configuration file:

__webpack.config.js__

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

The `output` property has [many more configurable features](/configuration/output) and if you like to know more about the concepts behind the `output` property, you can [read more in the concepts section](/concepts/output).


## Loaders

*Loaders* enable webpack to process more than just JavaScript files (webpack itself only understands JavaScript). They make sure that you can leverage webpack's bundling abilities for files that aren't JavaScript by treating them as [webpack modules](/concepts/modules).

In short: **Loaders in webpack _transform non JavaScript files into modules_ as they are added to your dependency graph.**

At a high level, **loaders** have two purposes in your webpack config. They work to:

1. Identify which file or files should be transformed by a certain loader (with the `test` property).
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

While Loaders only execute transforms on a per-file basis, `plugins` are most commonly used to perform actions and custom functionality on pieces (e.g. chunks) of your bundled modules [(and so much more!)](/concepts/plugins). The webpack Plugin system is [extremely powerful and customizable](/api/plugins).

In order to use a plugin, you need to `require()` it and add it to the `plugins` array. Most plugins are customizable through options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it with the `new` operator.

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
