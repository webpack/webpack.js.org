---
title: 目标
contributors:
  - TheLarkInn
---

Because JavaScript can be written for both server and browser, webpack offers multiple deployment _targets_ that you can set in your webpack [configuration](/configuration).

W> The webpack `target` property is not to be confused with the `output.libraryTarget` property. For more information see [our guide](/concepts/output) on the `output` property.

## Usage

To set the `target` property, you simply set the target value in your webpack config:

**webpack.config.js**

```javascript
const config = {
  target: 'node'
};

module.exports = config;
```

## Options

The following is a list of values you can pass to the `target` property.

* `"async-node"` Compile for usage in a node.js-like environment (use `fs` and `vm` to load chunks async)
* `"electron-main"` Compile for electron renderer process, provide a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environment and `NodeTargetPlugin` and `ExternalsPlugin` for commonjs and electron bulit-in modules. *Note: need `webpack` >= 1.12.15.
* `"node"` Compile for usage in a node.js-like environment (use `require` to load chunks)
* `"node-webkit"` Compile for usage in webkit, uses jsonp chunk loading but also supports build in node.js modules plus require("nw.gui") (experimental)
* `"web"` Compile for usage in a browser-like environment (default)
* `"webworker"` Compile as WebWorker

Each _target_ has a variety of deployment/environment specific additions, support to fit its needs.

For example, when you use the `electron-main` _target_, *webpack* includes multiple `electron-main` specific variables. For more information on which templates and _externals_ are used, you can refer [directly to the webpack source code](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L70-L185).

?> We should expand on this further. What specifically is included.

## Multiple Targets

Although webpack does **not** support multiple strings being passed into the `target` property, you can create an isomorphic library by bundling two separate configurations:

**webpack.config.js**

```javascript
var serverConfig = {
  target: 'node',
  output: {
    path: 'dist',
    filename: 'lib.node.js'
  }
  //…
};

var clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    path: 'dist',
    filename: 'lib.js'
  }
  //…
};

module.exports = [ serverConfig, clientConfig ];
```

The example above will create a `lib.js` and `lib.node.js` file in your `dist` folder.

## Resources

As seen from the options above there are multiple different deployment _targets_ that you can choose from. Below is a list of examples, and resources that you can refer to.

### Bundle Output Comparison

  **[compare-webpack-target-bundles](https://github.com/TheLarkInn/compare-webpack-target-bundles)**: A great resource for testing and viewing different webpack _targets_. Also great for bug reporting.

?> Need to find up to date examples of these webpack targets being used in live code or boilerplates.
