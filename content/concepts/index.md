---
title: Introduction
contributors:
  - TheLarkInn
---

*webpack* is a _module bundler_ for modern JavaScript applications. It is [incredibly configurable](./api/configuration), however, there are **4 Core Concepts** we feel you should understand before you get started!

As part of your webpack learning journey, we wrote this document aimed to give you a **high-level** overview of these concepts, while still providing links to concept specific use-cases.

## Entry

webpack creates a graph of all of your application's dependencies. The starting point of this graph is known as an _entry point_. The _Entry point_ tells webpack _where to start_ and follows the graph of dependendencies to know _what to bundle_. You can think of your applications _entry point_ as the **contextual root** or **the first file to kick off your app**.

In webpack we define _entry points_ using the `entry` property in our [webpack configuration object](./configuration).

The simplest example is seen below:

**webpack.config.js**

```javascript
  module.exports = config;

  const config = {
    entry: './path/to/my/entry/file.js'
  };

```

There are multiple ways to declare your `entry` property that are specific to your applications needs.

[**Learn more!**](./entry-points)

## Output

Once you've bundled all of your assets together, we still need to tell webpack **where** to bundle our application. The webpack `output` property describes to webpack **how to treat bundled code**.

**webpack.config.js**

```javascript
  module.exports = config;

  const config = {
    entry: './path/to/my/entry/file.js',
    output: {
      filename: 'my-first-webpack.bundle.js',
      path: './dist'
    }
  };
```

In the example above, through the `output.filename` and `output.path` properties we are describing to webpack the name of our bundle, and where we want it to be emitted to.

T> You may see the term **emitted** or **emit** used throughout our documentation and [plugin API](../api/plugins). This is a fancy term for "produced or discharged".

The `output` property has [many more configurable features](../api/configuration), but lets spend some time understanding some of the most common use cases for the `output` property.

[**Learn more!**](./output)


## Loaders

The goal is to have all of your assets in your project to be **webpack's** concern and not the browser. (This doesn't mean that they all have to be bundled together). webpack treats [every file (.css, .html, .scss, .jpg, etc.) as a module](./modules). However, webpack **only understands JavaScript**.

**Loaders tell webpack _how to treat these files as modules_ as they are added to your dependency graph.**

At a high level, they have two purposes in your webpack config.

1. Identify what files should be transformed by a certain loader. (`test` property)
2. Transform that file so that it can be added to your dependency graph (and eventually your bundle). (`loader` property)

**webpack.config.js**

```javascript
  module.exports = config;

  const config = {
    entry: './path/to/my/entry/file.js',
    output: {
      filename: 'my-first-webpack.bundle.js',
      path: './dist'
    },
    module: {
      loaders: [
        {test: /\.(js|jsx)$/, loader: 'babel-loader'}
      ]
    }
  };
```

In the configuration above we have defined our loader with its two required properties: `test`, and `loader`. It tells webpack's compiler the following:

> "Hey webpack compiler, when you come across a path that resolves to a '.js' or '.jsx' file inside of a require() statement, use the babel-loader to transform it before you bundle it together".

W> It is important to remember when defining loaders in your webpack config, you are defining them under `module.loaders`, and not `loaders`.

There are more specific properties to define on loaders that we haven't yet covered.

[**Learn more!**]('./loaders')

## Plugins

Since Loaders only execute transforms on a per-file basis, Plugins are most commonly used (but not limited to) performing actions and custom functionality on "compilations" or "chunks" of your bundled modules [(and so much more)](./plugins). The webpack Plugin system is [extremely and powerful and customizable](../api/plugins).

In order to use a plugin, you just need to `require()` it and add it to the `plugins` array. Since most plugins are customizable via options, you need to create an instance of it by calling it with `new`.

**webpack.config.js**

```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
  const webpack = require('webpack'); //to access built-in plugins

  module.exports = config;

  const config = {
    entry: './path/to/my/entry/file.js',
    output: {
      filename: 'my-first-webpack.bundle.js',
      path: './dist'
    },
    module: {
      loaders: [
        {test: /\.(js|jsx)$/, loader: 'babel-loader'}
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({template: './src/index.html'})
    ]
  };
```

There are many plugins that webpack provides out of the box! Check out our [list of plugins](https://webpack.github.io/docs/list-of-plugins.html) for more information.

Using plugins in your webpack config is straight-forward, however there are many use-cases that are worth discussing further.

[**Learn more!**](./plugins)
