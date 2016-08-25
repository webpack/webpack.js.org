---
title: Core Concepts
---

## Overview
webpack is [incredibly configurable](./api/configuration), however there are 4 **Core Concepts** you should understand before you get started! 

### Entry
In the [previous article]('./index'), we mentioned that webpack creates a graph of all of your application's depenencies. The starting point of this graph is known as an _entry point_. The _Entry point_ tells webpack _where to start_ and follows the graph of dependendencies to know _what to bundle_. You can think of your applications _entry point_ as the **contextual root** or **the first file to kick off your app**.

In webpack we define _entry points_ using the `entry` property in our [webpack configuration object](./webpack-config). 

The simplest example is seen below: 

**webpack.config.js**
```
  module.exports = config; 

  var config = {
    entry: './path/to/my/entry/file.js'  
  }

```

To see the **complete usage** for the `entry` property 

### Output


### Loaders

### Plugins

