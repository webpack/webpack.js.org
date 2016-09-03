---
title: Core Concepts
---

## Overview
webpack is [incredibly configurable](./api/configuration), however there are **4 Core Concepts** we feel you should understand before you get started! 

### Entry
In the [previous article](./index), we mentioned that webpack creates a graph of all of your application's depenencies. The starting point of this graph is known as an _entry point_. The _Entry point_ tells webpack _where to start_ and follows the graph of dependendencies to know _what to bundle_. You can think of your applications _entry point_ as the **contextual root** or **the first file to kick off your app**.

In webpack we define _entry points_ using the `entry` property in our [webpack configuration object](./configuration). 

The simplest example is seen below: 

**webpack.config.js**
```
  module.exports = config; 

  var config = {
    entry: './path/to/my/entry/file.js' 
  }

```

There are multiple ways to declare your `entry` property that are specific to your applications needs. Let's learn more about [webpack entry points](./entry-points)

### Output
Once you've bundled all of your assets together, we still need to tell webpack **where** to bundle our application. The webpack `output` property describes to webpack **how to treat bundled code**. 

**webpack.config.js**
```
  module.exports = config; 

  var config = {
    entry: './path/to/my/entry/file.js',
    output: {
      filename: 'my-first-webpack.bundle.js',
      path: __dirname + 'dist/'
    }
  }

```

In the example above, through the `output.filename` and `output.path` properties we are describing to webpack the name of our bundle, and where we want it to be emitted to.

T> You may see the term **emitted** or **emit** used throughout our documentation and [plugin API](../api/plugins). This is a fancy term for "produced or discharged". 

The `output` property has [many more configurable features](../api/configuration), but lets spend some time understanding some of the most [common use cases for the `output` property](./output).

### Loaders
The goal of webpack is to have all of your assets in your project **managed** or **known** by webpack. (This doesn't mean that they all have to be bundled together). webpack treats [every file (.css, .html, scss, jpg, etc.) as a module](./everything-is-a-module). However, webpack can only treat them as _javascript modules_. 

**Loaders describes to webpack _how to treat these files as modules_ as they are added to your dependency graph.**

At a high level, they have two purposes in your webpack config. 
1. Identify what files belong to which loader. (`test` property)
2. Transform that file so that it can be added to your dependency graph (and eventually your bundle) (`loader` property)

**webpack.config.js**
```
  module.exports = config; 

  var config = {
    entry: './path/to/my/entry/file.js',
    output: {
      filename: 'my-first-webpack.bundle.js',
      path: __dirname + 'dist/'
    },
    modules: {
      loaders: [
        {test: /.jsx?$/, loader: 'babel-loader'} 
      ]
    }
  };
```

In the configuration above we have defined our loader with its two required properties: `test`, and `loader`. It tells webpack's compiler the following: 

```"Hey webpack compiler, when you come across a file with extension '.js' or '.jsx' inside of a require() statement, use the babel-loader to transform it before you bundle it together".```

W> It is important to remember when defining loaders in your webpack config, you are defining them under `module.loaders`, and not `loaders`.

### Plugins

