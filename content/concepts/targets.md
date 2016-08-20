---
title: Targets
---
## Overview

Because JavaScript can be written for both server & browser, *webpack* offer's multiple deployment _targets_.

*webpack* offer's a variety of deployment _targets_ that you can set in your webpack [configuration](./api/configuration).

W> The webpack `target` property is not to be confused with the `output.target` property. For more information see [our guide](./concepts/output) on the `output` property.


### Usage

To set the `target` property, you simply set the target value in your webpack config: 

```javascript
// webpack.config.js

module.exports = config;

config = {
  target: 'node' // <===== Just pass the name of the target  
}
```

### Options

The following is a list of values you can pass to the target property. 

* `"web"` Compile for usage in a browser-like environment (default)
* `"webworker"` Compile as WebWorker
* `"node"` Compile for usage in a node.js-like environment (use `require` to load chunks)
* `"async-node"` Compile for usage in a node.js-like environment (use `fs` and `vm` to load chunks async)
* `"node-webkit"` Compile for usage in webkit, uses jsonp chunk loading but also supports build in node.js modules plus require("nw.gui") (experimental)
* `"electron"` Compile for usage in [Electron](http://electron.atom.io/) – supports `require`-ing Electron-specific modules.
* `"electron-renderer"` Compile for electron renderer process, provide a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environment and `NodeTargetPlugin` and `ExternalsPlugin` for commonjs and electron bulit-in modules. *Note: need `webpack` >= 1.12.15.*

Each _target_ has a variety of deployment/environment specific additions, support to fit its needs. 

For example, when you use the `electron` target, *webpack* includes multiple `electron` specific variables. For more information on which templates and _externals_ are used, you can refer [directly to the webpack source code](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L70-L185).

### Multiple Targets

Although webpack does **not** support multiple strings being passed into the target property, you can create an isomorphic/universal library by bundling two separate configurations: 

```javascript
//webpack.config.js

module.exports = [ serverConfig, clientConfig ];

var serverConfig = {
  target: 'node',
  output: {
    path: 'dist',
    filename: 'lib.node.js'
  }
  //... 
}

var clientConfig = {
  target: 'web' // <=== can be omitted as default is 'web'
  output: {
    path: 'dist'
    filename: 'lib.js'
  }
  //...
}

```

The example above will create a `lib.js` and `lib.node.js` file in your `dist` folder.

### Resources

As seen from the options above there are multiple different deployment _targets_ that you can choose from. Below is a list of examples, and resources that you can refer to. 

#### `webworker`: 
 * *webpack* source: https://github.com/webpack/webpack/tree/master/examples/web-worker

